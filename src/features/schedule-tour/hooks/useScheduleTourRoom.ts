import { useQuery } from '@tanstack/react-query';

import { scheduleTourApi } from '../api/scheduleTourApi';
import { scheduleTourKeys } from './scheduleTourKeys';
import type { RoomTourSnapshot } from '../types';

export function useScheduleTourRoom(roomId: string) {
  return useQuery<RoomTourSnapshot, Error>({
    queryKey: scheduleTourKeys.detail(roomId),
    queryFn: () => scheduleTourApi.getScheduleTourRoom(roomId),
    enabled: Boolean(roomId),
    staleTime: 5 * 60 * 1000,
  });
}

export default useScheduleTourRoom;
