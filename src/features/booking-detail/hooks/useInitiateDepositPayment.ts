import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bookingDetailApi } from '../api/bookingDetailApi';
import { bookingDetailKeys } from './bookingDetailKeys';
import type {
  BookingDetailData,
  InitiateDepositPayload,
  InitiateDepositResponse,
} from '../types';

export function useInitiateDepositPayment() {
  const queryClient = useQueryClient();

  return useMutation<InitiateDepositResponse, Error, InitiateDepositPayload>({
    mutationKey: bookingDetailKeys.mutations.initiatePayment(),
    mutationFn: (payload: InitiateDepositPayload) =>
      bookingDetailApi.initiateDepositPayment(payload),
    onSuccess: (response, variables) => {
      queryClient.setQueryData<BookingDetailData>(
        bookingDetailKeys.detail(variables.roomId),
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            deposit: {
              ...prev.deposit,
              status: response.status,
              statusLabel: response.statusLabel,
              transactionCode: response.transactionCode,
              recordedAtLabel: response.recordedAtLabel,
            },
          };
        }
      );
    },
  });
}

export default useInitiateDepositPayment;
