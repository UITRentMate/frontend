import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiResponse } from '@/types';

import { ownerDashboardApi } from '../api/ownerDashboardApi';
import type { OwnerDashboardData } from '../types';
import { ownerDashboardKeys } from './ownerDashboardKeys';

export function useOwnerDashboardActions() {
  const queryClient = useQueryClient();
  const updateOverview = (response: ApiResponse<OwnerDashboardData>) => {
    queryClient.setQueryData(ownerDashboardKeys.overview(), response.data);
  };
  const cancelOverview = () => queryClient.cancelQueries({ queryKey: ownerDashboardKeys.overview() });

  const confirmAppointment = useMutation({
    mutationFn: ownerDashboardApi.confirmAppointment,
    onMutate: cancelOverview,
    onSuccess: updateOverview,
  });
  const createAppointment = useMutation({
    mutationFn: ownerDashboardApi.createAppointment,
    onMutate: cancelOverview,
    onSuccess: updateOverview,
  });
  const rescheduleAppointment = useMutation({
    mutationFn: ownerDashboardApi.rescheduleAppointment,
    onMutate: cancelOverview,
    onSuccess: updateOverview,
  });
  const reconcileReceipt = useMutation({
    mutationFn: ownerDashboardApi.reconcileReceipt,
    onMutate: cancelOverview,
    onSuccess: updateOverview,
  });
  const saveUtilities = useMutation({
    mutationFn: ownerDashboardApi.saveUtilities,
    onMutate: cancelOverview,
    onSuccess: updateOverview,
  });
  const createReceipt = useMutation({
    mutationFn: ownerDashboardApi.createReceipt,
    onMutate: cancelOverview,
    onSuccess: updateOverview,
  });

  return { confirmAppointment, createAppointment, rescheduleAppointment, reconcileReceipt, saveUtilities, createReceipt };
}
