import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { CreateManagedRoomInput, ManagedRoomStatus, RoomFormValues } from '@/features/rooms/types';
import { filterManagedRooms } from '@/features/rooms/utils/roomManagement';
import { MANAGEMENT_UNSUPPORTED } from '@/features/rooms/managementConstants';

import { mockPropertyManagementService } from '../services/mockPropertyManagementService';
import type { PropertyFormValues } from '../types';
import { propertyKeys } from './propertyKeys';

export function usePropertyManagement() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: propertyKeys.overview(), queryFn: async () => (await mockPropertyManagementService.getOverview()).data, staleTime: 1000 * 60 * 5 });
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ManagedRoomStatus | 'all'>('all');
  const [floor, setFloor] = useState('all');
  const [modal, setModal] = useState<'property' | 'room' | null>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    // Preserve the original page trigger through the create-property → add-room handoff.
    if (modal === null && modalTriggerRef.current?.isConnected) {
      modalTriggerRef.current.focus();
      modalTriggerRef.current = null;
    }
  }, [modal]);
  const property = query.data?.properties.find((item) => item.id === selectedId) ?? query.data?.properties[0];
  const rooms = query.data?.rooms.filter((room) => room.propertyId === property?.id) ?? [];
  const visibleRooms = filterManagedRooms(rooms, search, status, floor);
  const clearFilters = () => { setSearch(''); setStatus('all'); setFloor('all'); };
  const createProperty = useMutation({
    mutationFn: (values: PropertyFormValues) => mockPropertyManagementService.createProperty(values),
    onSuccess: (response) => {
      queryClient.setQueryData(propertyKeys.overview(), response.data);
      setSelectedId(response.data.properties[response.data.properties.length - 1].id);
      clearFilters(); setNotice('Đã tạo khu trọ minh họa. Dữ liệu sẽ mất khi tải lại trang.'); setModal('room');
    },
  });
  const createRoom = useMutation({
    mutationFn: (input: CreateManagedRoomInput) => mockPropertyManagementService.createRoom(input),
    onSuccess: (response) => { queryClient.setQueryData(propertyKeys.overview(), response.data); clearFilters(); setModal(null); },
  });
  const isPending = createProperty.isPending || createRoom.isPending;
  const openModal = (kind: 'property' | 'room') => {
    modalTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    createProperty.reset(); createRoom.reset(); setModal(kind);
  };
  const closeModal = () => { if (!isPending) setModal(null); };
  const saveRoom = (values: RoomFormValues, configurePrice: boolean) => {
    if (!property || isPending) return;
    createRoom.mutate({ propertyId: property.id, values }, { onSuccess: () => setNotice(`Đã thêm phòng minh họa; dữ liệu sẽ mất khi tải lại trang.${configurePrice ? ' Cấu hình giá sẽ được tích hợp ở giai đoạn sau.' : ''}`) });
  };
  return {
    query, property, properties: query.data?.properties ?? [], rooms, visibleRooms,
    search, setSearch, status, setStatus, floor, setFloor, clearFilters, modal, openModal, closeModal, notice,
    isPending, createProperty, createRoom, saveRoom,
    selectProperty: (id: string) => { setSelectedId(id); clearFilters(); },
    unsupported: () => setNotice(MANAGEMENT_UNSUPPORTED),
  };
}
