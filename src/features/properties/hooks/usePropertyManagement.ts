import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { MANAGEMENT_UNSUPPORTED, PROPERTY_MANAGEMENT_MESSAGES } from '@/constants';

import type {
  CreateManagedRoomInput,
  ManagedRoom,
  RoomFormValues,
  RoomPricingFormValues,
  RoomStatus,
  UpdateRoomPricingInput,
} from '@/features/rooms/types';
import { filterManagedRooms } from '@/features/rooms/utils/roomManagement';

import { propertyApi } from '../api/propertyApi';
import type {
  PropertyFormValues,
  PropertySettingsValues,
  UpdatePropertySettingsInput,
} from '../types';
import { propertyKeys } from './propertyKeys';

export function usePropertyManagement() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: propertyKeys.overview(),
    queryFn: async () => (await propertyApi.getOverview()).data,
    staleTime: 1000 * 60 * 5,
  });

  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<RoomStatus | 'all'>('all');
  const [floor, setFloor] = useState('all');
  const [modal, setModal] = useState<'property' | 'room' | 'settings' | 'pricing' | null>(null);
  const [pricingRoomId, setPricingRoomId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Preserve the original page trigger through modal handoffs.
    if (modal === null && modalTriggerRef.current?.isConnected) {
      modalTriggerRef.current.focus();
      modalTriggerRef.current = null;
    }
  }, [modal]);

  const properties = query.data?.properties ?? [];
  const property = properties.find((item) => item.id === selectedId) ?? properties[0];
  const rooms = query.data?.rooms.filter((room) => room.propertyId === property?.id) ?? [];
  const visibleRooms = filterManagedRooms(rooms, search, status, floor);
  const pricingRoom = rooms.find((room) => room.id === pricingRoomId) ?? null;

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setFloor('all');
  };

  const createProperty = useMutation({
    mutationKey: propertyKeys.mutations.createProperty(),
    mutationFn: (values: PropertyFormValues) => propertyApi.createProperty(values),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      const created = response.data.properties[response.data.properties.length - 1];
      setSelectedId(created.id);
      clearFilters();
      setNotice(PROPERTY_MANAGEMENT_MESSAGES.PROPERTY_CREATED);
      setModal('room');
    },
  });

  const updateSettings = useMutation({
    mutationKey: propertyKeys.mutations.updateSettings(),
    mutationFn: (input: UpdatePropertySettingsInput) => propertyApi.updatePropertySettings(input),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      setNotice(response.message ?? PROPERTY_MANAGEMENT_MESSAGES.SETTINGS_UPDATED);
      setModal(null);
    },
  });

  const createRoom = useMutation({
    mutationKey: propertyKeys.mutations.createRoom(),
    mutationFn: (input: CreateManagedRoomInput) => propertyApi.createRoom(input),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      clearFilters();
    },
  });

  const updateRoomPricing = useMutation({
    mutationKey: propertyKeys.mutations.updateRoomPricing(),
    mutationFn: (input: UpdateRoomPricingInput) => propertyApi.updateRoomPricing(input),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      setNotice(response.message ?? PROPERTY_MANAGEMENT_MESSAGES.ROOM_PRICING_UPDATED);
      setModal(null);
      setPricingRoomId(null);
    },
  });

  const isPending =
    createProperty.isPending ||
    updateSettings.isPending ||
    createRoom.isPending ||
    updateRoomPricing.isPending;

  const captureTrigger = () => {
    modalTriggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
  };

  const resetMutations = () => {
    createProperty.reset();
    updateSettings.reset();
    createRoom.reset();
    updateRoomPricing.reset();
  };

  const openModal = (kind: 'property' | 'room' | 'settings') => {
    captureTrigger();
    resetMutations();
    setPricingRoomId(null);
    setModal(kind);
  };

  const openPricingModal = (room: ManagedRoom) => {
    captureTrigger();
    resetMutations();
    setPricingRoomId(room.id);
    setModal('pricing');
  };

  const closeModal = () => {
    if (!isPending) {
      setModal(null);
      setPricingRoomId(null);
    }
  };

  const saveRoom = (values: RoomFormValues, configurePrice: boolean) => {
    if (!property || isPending) return;
    createRoom.mutate(
      { propertyId: property.id, values },
      {
        onSuccess: (response) => {
          if (configurePrice) {
            const createdRoom = response.data.rooms[response.data.rooms.length - 1];
            setPricingRoomId(createdRoom.id);
            setNotice(PROPERTY_MANAGEMENT_MESSAGES.ROOM_CREATED_OPEN_PRICING(createdRoom.code));
            setModal('pricing');
            return;
          }
          setNotice(PROPERTY_MANAGEMENT_MESSAGES.ROOM_CREATED);
          setModal(null);
        },
      },
    );
  };

  const savePropertySettings = (values: PropertySettingsValues, isDraft = false) => {
    if (!property || isPending) return;
    updateSettings.mutate({ propertyId: property.id, values, isDraft });
  };

  const saveRoomPricing = (values: RoomPricingFormValues, copyToOtherRooms: boolean) => {
    if (!property || !pricingRoom || isPending) return;
    updateRoomPricing.mutate({
      propertyId: property.id,
      roomId: pricingRoom.id,
      values,
      copyToOtherRooms,
    });
  };

  return {
    query,
    property,
    properties,
    rooms,
    visibleRooms,
    pricingRoom,
    search,
    setSearch,
    status,
    setStatus,
    floor,
    setFloor,
    clearFilters,
    modal,
    openModal,
    openPricingModal,
    closeModal,
    notice,
    isPending,
    createProperty,
    updateSettings,
    createRoom,
    updateRoomPricing,
    saveRoom,
    savePropertySettings,
    saveRoomPricing,
    selectProperty: (id: string) => {
      setSelectedId(id);
      clearFilters();
    },
    unsupported: () => setNotice(MANAGEMENT_UNSUPPORTED),
  };
}
