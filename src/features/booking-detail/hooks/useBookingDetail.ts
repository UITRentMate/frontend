import { useQuery } from '@tanstack/react-query';

import { bookingDetailApi } from '../api/bookingDetailApi';
import { bookingDetailKeys } from './bookingDetailKeys';
import type { BookingDetailData } from '../types';

export function useBookingDetail(roomId: string) {
  return useQuery<BookingDetailData, Error>({
    queryKey: bookingDetailKeys.detail(roomId),
    queryFn: () => bookingDetailApi.getBookingDetail(roomId),
    enabled: Boolean(roomId),
    staleTime: 2 * 60 * 1000,
  });
}

export default useBookingDetail;
