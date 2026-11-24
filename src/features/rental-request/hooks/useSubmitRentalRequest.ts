import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rentalRequestApi } from '../api/rentalRequestApi';
import { rentalRequestKeys } from './rentalRequestKeys';
import type { SubmitRentalRequestPayload } from '../types';

export function useSubmitRentalRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitRentalRequestPayload) =>
      rentalRequestApi.submitRentalRequest(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: rentalRequestKeys.roomDetail(variables.roomId),
      });
    },
  });
}
