import { ENDPOINTS } from '@/api/endpoints';
import apiClient from '@/lib/apiClient';
import type { ApiError, ApiResponse } from '@/types/api.types';

import { MOCK_BOOKING_DETAIL } from '../services/mockData';
import type {
  BookingDetailData,
  InitiateDepositPayload,
  InitiateDepositResponse,
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

export const bookingDetailApi = {
  /**
   * Lấy thông tin chi tiết đặt phòng và trạng thái tiền cọc theo roomId
   */
  async getBookingDetail(roomId: string): Promise<BookingDetailData> {
    try {
      const response = await apiClient.get<ApiResponse<BookingDetailData>>(
        ENDPOINTS.BOOKING_DETAIL.DETAIL(roomId)
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Không tìm thấy dữ liệu chi tiết đặt phòng.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        const normalizedId = roomId || MOCK_BOOKING_DETAIL.room.id;
        return {
          ...MOCK_BOOKING_DETAIL,
          room: {
            ...MOCK_BOOKING_DETAIL.room,
            id: normalizedId,
          },
        };
      }
      throw error;
    }
  },

  /**
   * Khởi tạo giao dịch thanh toán tiền cọc giữ phòng (C02)
   */
  async initiateDepositPayment(
    payload: InitiateDepositPayload
  ): Promise<InitiateDepositResponse> {
    try {
      const response = await apiClient.post<ApiResponse<InitiateDepositResponse>>(
        ENDPOINTS.BOOKING_DETAIL.INITIATE_PAYMENT,
        payload
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Phản hồi khởi tạo thanh toán không hợp lệ.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const txCode = `RM-DEP-${Math.floor(100000 + Math.random() * 900000)}`;
        return {
          transactionCode: txCode,
          status: 'AWAITING_PAYMENT',
          statusLabel: 'Đã tạo mã giao dịch — Chờ quét thanh toán',
          recordedAtLabel: 'Đang chờ xác nhận từ cổng VNPay/MoMo',
          message: `Đã khởi tạo giao dịch thanh toán cọc ${txCode}. Cổng thanh toán trực tuyến [C02] sẽ mở ở bước tiếp theo.`,
        };
      }
      throw error;
    }
  },
};

export default bookingDetailApi;
