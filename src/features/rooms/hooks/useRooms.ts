import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryKeys';
import { roomApi } from '../services/roomApi';
import type { RoomFilterParams } from '../types/room.types';

export function useRooms(filters?: RoomFilterParams) {
  return useQuery({
    queryKey: queryKeys.rooms.list(filters as Record<string, unknown>),
    queryFn: () => roomApi.getRooms(filters),
  });
}

export function useRoom(id: string) {
  return useQuery({
    queryKey: queryKeys.rooms.detail(id),
    queryFn: () => roomApi.getRoomById(id),
    enabled: Boolean(id),
  });
}
