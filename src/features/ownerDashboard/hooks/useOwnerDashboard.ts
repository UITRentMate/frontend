import { useQuery } from '@tanstack/react-query';

import { ownerDashboardApi } from '../api/ownerDashboardApi';
import { ownerDashboardKeys } from './ownerDashboardKeys';

export function useOwnerDashboard() {
  return useQuery({
    queryKey: ownerDashboardKeys.overview(),
    queryFn: async () => {
      const response = await ownerDashboardApi.getOverview();
      return response.data;
    },
    staleTime: 1000 * 60 * 3,
  });
}
