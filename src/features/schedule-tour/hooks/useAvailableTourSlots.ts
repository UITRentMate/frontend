import { useQuery } from '@tanstack/react-query';
import { scheduleTourApi } from '../api/scheduleTourApi';
import { scheduleTourKeys } from './scheduleTourKeys';
import type { TimeSlotOption } from '../types';

export function useAvailableTourSlots(roomId: string, date: string) {
  return useQuery<TimeSlotOption[], Error>({
    queryKey: scheduleTourKeys.slots(roomId, date),
    queryFn: () => scheduleTourApi.getAvailableTourSlots(roomId, date),
    enabled: Boolean(date),
    staleTime: 2 * 60 * 1000,
  });
}

export default useAvailableTourSlots;
