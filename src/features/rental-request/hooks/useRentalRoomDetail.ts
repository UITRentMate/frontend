import { useQuery } from '@tanstack/react-query';
import { rentalRequestApi } from '../api/rentalRequestApi';
import { rentalRequestKeys } from './rentalRequestKeys';

export function useRentalRoomDetail(roomId: string) {
  return useQuery({
    queryKey: rentalRequestKeys.roomDetail(roomId),
    queryFn: () => rentalRequestApi.getRentalRoomDetail(roomId),
    staleTime: 1000 * 60 * 5,
  });
}
