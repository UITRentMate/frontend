import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { MANAGEMENT_UNSUPPORTED } from '@/constants';

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
    mutationFn: (values: PropertyFormValues) => propertyApi.createProperty(values),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      const created = response.data.properties[response.data.properties.length - 1];
      setSelectedId(created.id);
      clearFilters();
      setNotice('Đã tạo khu trọ minh họa. Dữ liệu sẽ mất khi tải lại trang.');
      setModal('room');
    },
  });

  const updateSettings = useMutation({
    mutationFn: (input: UpdatePropertySettingsInput) => propertyApi.updatePropertySettings(input),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      setNotice(response.message ?? 'Đã cập nhật cài đặt & nội quy khu trọ (minh họa).');
      setModal(null);
    },
  });

  const createRoom = useMutation({
    mutationFn: (input: CreateManagedRoomInput) => propertyApi.createRoom(input),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      clearFilters();
    },
  });

  const updateRoomPricing = useMutation({
    mutationFn: (input: UpdateRoomPricingInput) => propertyApi.updateRoomPricing(input),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      setNotice(response.message ?? 'Đã lưu cấu hình giá & dịch vụ phòng (minh họa).');
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
            setNotice(`Đã thêm phòng ${createdRoom.code}. Tiếp tục cấu hình giá & dịch vụ.`);
            setModal('pricing');
            return;
          }
          setNotice('Đã thêm phòng minh họa; dữ liệu sẽ mất khi tải lại trang.');
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
