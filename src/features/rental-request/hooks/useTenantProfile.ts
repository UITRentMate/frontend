import { useQuery } from '@tanstack/react-query';
import { rentalRequestApi } from '../api/rentalRequestApi';
import { rentalRequestKeys } from './rentalRequestKeys';

export function useTenantProfile() {
  return useQuery({
    queryKey: rentalRequestKeys.tenantProfile(),
    queryFn: () => rentalRequestApi.getTenantProfile(),
    staleTime: 1000 * 60 * 10,
  });
}
