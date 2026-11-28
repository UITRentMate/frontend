import { ENDPOINTS } from '@/api/endpoints';
import apiClient from '@/lib/apiClient';
import type { ApiError, ApiResponse } from '@/types/api.types';

import { MOCK_DEPOSIT_PAYMENT_SUMMARY } from '../services/mockData';
import type {
  CreateDepositTransactionPayload,
  CreateDepositTransactionResponse,
  DepositPaymentSummary,
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

export const depositPaymentApi = {
  /**
   * Lấy thông tin tóm tắt giao dịch đặt cọc theo roomId
   */
  async getDepositPaymentSummary(roomId: string): Promise<DepositPaymentSummary> {
    try {
      const response = await apiClient.get<ApiResponse<DepositPaymentSummary>>(
        ENDPOINTS.DEPOSIT_PAYMENT.SUMMARY(roomId)
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Không tìm thấy thông tin giao dịch đặt cọc.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return {
          ...MOCK_DEPOSIT_PAYMENT_SUMMARY,
          roomId: roomId || MOCK_DEPOSIT_PAYMENT_SUMMARY.roomId,
        };
      }
      throw error;
    }
  },

  /**
   * Khởi tạo giao dịch thanh toán tiền cọc qua cổng thanh toán đã chọn
   */
  async createDepositTransaction(
    payload: CreateDepositTransactionPayload
  ): Promise<CreateDepositTransactionResponse> {
    try {
      const response = await apiClient.post<ApiResponse<CreateDepositTransactionResponse>>(
        ENDPOINTS.DEPOSIT_PAYMENT.TRANSACTIONS,
        payload
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Phản hồi khởi tạo giao dịch thanh toán không hợp lệ.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const txCode = `${payload.gateway}-${Math.floor(100000 + Math.random() * 900000)}`;
        return {
          transactionId: `TX-${Date.now()}`,
          transactionCode: txCode,
          gateway: payload.gateway,
          amount: payload.amount,
          sessionExpiresInMinutes: 15,
          status: 'PENDING_GATEWAY',
          message: `Đã khởi tạo phiên thanh toán qua ${payload.gateway}. Vui lòng hoàn tất giao dịch trong vòng 15 phút.`,
          createdAt: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};

export default depositPaymentApi;
