import { useQuery } from '@tanstack/react-query';

import { bookingConfirmationApi } from '../api/bookingConfirmationApi';
import { bookingConfirmationKeys } from './bookingConfirmationKeys';
import type { BookingConfirmationData } from '../types';

export function useBookingConfirmation(roomId: string) {
  return useQuery<BookingConfirmationData, Error>({
    queryKey: bookingConfirmationKeys.detail(roomId),
    queryFn: () => bookingConfirmationApi.getBookingConfirmation(roomId),
    enabled: Boolean(roomId),
    staleTime: 2 * 60 * 1000,
  });
}

export default useBookingConfirmation;
