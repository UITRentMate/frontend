import { useMutation, useQueryClient } from '@tanstack/react-query';

import { depositPaymentApi } from '../api/depositPaymentApi';
import { depositPaymentKeys } from './depositPaymentKeys';
import type {
  CreateDepositTransactionPayload,
  CreateDepositTransactionResponse,
} from '../types';

export function useCreateDepositTransaction() {
  const queryClient = useQueryClient();

  return useMutation<CreateDepositTransactionResponse, Error, CreateDepositTransactionPayload>({
    mutationKey: depositPaymentKeys.mutations.createTransaction(),
    mutationFn: (payload: CreateDepositTransactionPayload) =>
      depositPaymentApi.createDepositTransaction(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: depositPaymentKeys.detail(variables.roomId),
      });
    },
  });
}

export default useCreateDepositTransaction;
