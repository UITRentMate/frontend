import type { ApiResponse } from '@/types';

import { mockOwnerDashboardService } from '../services/mockOwnerDashboardService';
import type {
  CreateAppointmentInput,
  CreateReceiptInput,
  OwnerDashboardData,
  RescheduleAppointmentInput,
  SaveUtilitiesInput,
} from '../types';

// FE-05 uses a mock service until the dashboard backend contract is agreed.
// HTTP integration belongs here and must use the shared apiClient at that point.
export const ownerDashboardApi = {
  getOverview: (): Promise<ApiResponse<OwnerDashboardData>> => mockOwnerDashboardService.getOverview(),
  createAppointment: (input: CreateAppointmentInput): Promise<ApiResponse<OwnerDashboardData>> =>
    mockOwnerDashboardService.createAppointment(input),
  confirmAppointment: (id: string): Promise<ApiResponse<OwnerDashboardData>> =>
    mockOwnerDashboardService.confirmAppointment(id),
  rescheduleAppointment: (input: RescheduleAppointmentInput): Promise<ApiResponse<OwnerDashboardData>> =>
    mockOwnerDashboardService.rescheduleAppointment(input),
  reconcileReceipt: (id: string): Promise<ApiResponse<OwnerDashboardData>> =>
    mockOwnerDashboardService.reconcileReceipt(id),
  saveUtilities: (input: SaveUtilitiesInput): Promise<ApiResponse<OwnerDashboardData>> =>
    mockOwnerDashboardService.saveUtilities(input),
  createReceipt: (input: CreateReceiptInput): Promise<ApiResponse<OwnerDashboardData>> =>
    mockOwnerDashboardService.createReceipt(input),
};
