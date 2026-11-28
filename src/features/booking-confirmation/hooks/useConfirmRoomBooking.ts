import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bookingConfirmationApi } from '../api/bookingConfirmationApi';
import { bookingConfirmationKeys } from './bookingConfirmationKeys';
import type { ConfirmBookingPayload, ConfirmBookingResponse } from '../types';

export function useConfirmRoomBooking() {
  const queryClient = useQueryClient();

  return useMutation<ConfirmBookingResponse, Error, ConfirmBookingPayload>({
    mutationKey: bookingConfirmationKeys.mutations.confirm(),
    mutationFn: (payload: ConfirmBookingPayload) =>
      bookingConfirmationApi.confirmRoomBooking(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: bookingConfirmationKeys.detail(variables.roomId),
      });
    },
  });
}

export default useConfirmRoomBooking;
