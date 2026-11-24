import apiClient from '@/lib/apiClient';
import type {
  RentalRoomDetail,
  TenantProfile,
  SubmitRentalRequestPayload,
  RentalRequestResponse,
} from '../types';
import { MOCK_TENANT, MOCK_RENTAL_ROOM } from '../services/mockData';

export const rentalRequestApi = {
  getRentalRoomDetail: async (roomId: string): Promise<RentalRoomDetail> => {
    try {
      const response = await apiClient.get<RentalRoomDetail>(`/rooms/${roomId}/rental-info`);
      return response.data;
    } catch {
      // Graceful fallback for mock during development
      await new Promise((resolve) => setTimeout(resolve, 250));
      return {
        ...MOCK_RENTAL_ROOM,
        id: roomId || MOCK_RENTAL_ROOM.id,
      };
    }
  },

  getTenantProfile: async (): Promise<TenantProfile> => {
    try {
      const response = await apiClient.get<TenantProfile>('/user/profile/tenant');
      return response.data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_TENANT;
    }
  },

  submitRentalRequest: async (
    payload: SubmitRentalRequestPayload
  ): Promise<RentalRequestResponse> => {
    try {
      const response = await apiClient.post<RentalRequestResponse>(
        '/rental-requests',
        payload
      );
      return response.data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return {
        id: `req-${Date.now()}`,
        roomId: payload.roomId,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        message: 'Gửi yêu cầu thuê phòng thành công!',
      };
    }
  },
};

export default rentalRequestApi;
