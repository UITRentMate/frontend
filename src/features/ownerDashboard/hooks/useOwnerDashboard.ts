import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { mockOwnerDashboard } from '../services/mockData';

export function useOwnerDashboard() {
  return useQuery({
    queryKey: queryKeys.ownerDashboard.overview(),
    queryFn: () => Promise.resolve(mockOwnerDashboard),
  });
}
