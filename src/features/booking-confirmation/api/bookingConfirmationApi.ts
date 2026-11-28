import { ENDPOINTS } from '@/api/endpoints';
import apiClient from '@/lib/apiClient';
import type { ApiError, ApiResponse } from '@/types/api.types';

import { MOCK_BOOKING_CONFIRMATION } from '../services/mockData';
import type {
  BookingConfirmationData,
  ConfirmBookingPayload,
  ConfirmBookingResponse,
} from '../types';

function shouldFallbackToMock(error: unknown): boolean {
  if (!import.meta.env.DEV) return false;
  const apiErr = error as Partial<ApiError>;
  // Không nuốt lỗi nghiệp vụ 4xx (400, 401, 403, 404, 422...) mà ném để UI xử lý
  if (apiErr?.statusCode && apiErr.statusCode >= 400 && apiErr.statusCode < 500) {
    return false;
  }
  return true;
}

export const bookingConfirmationApi = {
  /**
   * Lấy thông tin chi tiết xác nhận đặt phòng và giữ chỗ cọc theo roomId
   */
  async getBookingConfirmation(roomId: string): Promise<BookingConfirmationData> {
    try {
      const response = await apiClient.get<ApiResponse<BookingConfirmationData>>(
        ENDPOINTS.BOOKING_CONFIRMATION.DETAIL(roomId)
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Không tìm thấy dữ liệu xác nhận đặt phòng.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        const normalizedId = roomId || MOCK_BOOKING_CONFIRMATION.room.id;
        return {
          ...MOCK_BOOKING_CONFIRMATION,
          room: {
            ...MOCK_BOOKING_CONFIRMATION.room,
            id: normalizedId,
          },
        };
      }
      throw error;
    }
  },

  /**
   * Xác nhận điều khoản giữ chỗ và khởi tạo bước thanh toán tiền cọc
   */
  async confirmRoomBooking(payload: ConfirmBookingPayload): Promise<ConfirmBookingResponse> {
    try {
      const response = await apiClient.post<ApiResponse<ConfirmBookingResponse>>(
        ENDPOINTS.BOOKING_CONFIRMATION.CONFIRM,
        payload
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Phản hồi xác nhận đặt phòng không hợp lệ.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        return {
          confirmationId: `BC-${Date.now()}`,
          bookingCode: `COC-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'AWAITING_DEPOSIT',
          depositAmount: payload.depositAmount,
          holdDeadline: MOCK_BOOKING_CONFIRMATION.depositHold.holdDeadline,
          message:
            'Đã ghi nhận xác nhận đặt phòng. Vui lòng hoàn tất thanh toán tiền cọc trước thời hạn giữ chỗ.',
          createdAt: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};

export default bookingConfirmationApi;
