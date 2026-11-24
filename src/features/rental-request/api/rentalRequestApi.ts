import { ENDPOINTS } from '@/api/endpoints';
import apiClient from '@/lib/apiClient';
import type { ApiError } from '@/types/api.types';
import type {
  RentalRoomDetail,
  TenantProfile,
  SubmitRentalRequestPayload,
  RentalRequestResponse,
} from '../types';
import { MOCK_TENANT, MOCK_RENTAL_ROOM } from '../services/mockData';

function shouldFallbackToMock(error: unknown): boolean {
  if (!import.meta.env.DEV) return false;
  const apiErr = error as Partial<ApiError>;
  // Nếu là lỗi nghiệp vụ 4xx (400, 401, 403, 404, 422...), không nuốt lỗi mà ném để UI xử lý
  if (apiErr?.statusCode && apiErr.statusCode >= 400 && apiErr.statusCode < 500) {
    return false;
  }
  return true;
}

export const rentalRequestApi = {
  getRentalRoomDetail: async (roomId: string): Promise<RentalRoomDetail> => {
    try {
      const response = await apiClient.get<RentalRoomDetail>(ENDPOINTS.RENTAL.ROOM_INFO(roomId));
      return response.data;
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return {
          ...MOCK_RENTAL_ROOM,
          id: roomId || MOCK_RENTAL_ROOM.id,
        };
      }
      throw error;
    }
  },

  getTenantProfile: async (): Promise<TenantProfile> => {
    try {
      const response = await apiClient.get<TenantProfile>(ENDPOINTS.RENTAL.TENANT_PROFILE);
      return response.data;
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return MOCK_TENANT;
      }
      throw error;
    }
  },

  submitRentalRequest: async (
    payload: SubmitRentalRequestPayload
  ): Promise<RentalRequestResponse> => {
    try {
      const response = await apiClient.post<RentalRequestResponse>(
        ENDPOINTS.RENTAL.REQUESTS,
        payload
      );
      return response.data;
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          id: `req-${Date.now()}`,
          roomId: payload.roomId,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          message: 'Gửi yêu cầu thuê phòng thành công!',
        };
      }
      throw error;
    }
  },
};

export default rentalRequestApi;
