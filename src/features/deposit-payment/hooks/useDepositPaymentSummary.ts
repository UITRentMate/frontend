import { useQuery } from '@tanstack/react-query';

import { depositPaymentApi } from '../api/depositPaymentApi';
import { depositPaymentKeys } from './depositPaymentKeys';
import type { DepositPaymentSummary } from '../types';

export function useDepositPaymentSummary(roomId: string) {
  return useQuery<DepositPaymentSummary, Error>({
    queryKey: depositPaymentKeys.detail(roomId),
    queryFn: () => depositPaymentApi.getDepositPaymentSummary(roomId),
    enabled: Boolean(roomId),
    staleTime: 2 * 60 * 1000,
  });
}

export default useDepositPaymentSummary;
