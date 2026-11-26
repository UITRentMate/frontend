import { ENDPOINTS } from '@/api/endpoints';
import apiClient from '@/lib/apiClient';
import type { ApiError, ApiResponse } from '@/types/api.types';

import { MOCK_ROOM_SNAPSHOT, MOCK_TIME_SLOTS } from '../services/mockData';
import type {
  RoomTourSnapshot,
  TimeSlotOption,
  BookTourPayload,
  BookTourResponse,
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

export const scheduleTourApi = {
  /**
   * Lấy thông tin tóm tắt của phòng để hiển thị sidebar đặt lịch
   */
  async getScheduleTourRoom(roomId: string): Promise<RoomTourSnapshot> {
    try {
      const response = await apiClient.get<ApiResponse<RoomTourSnapshot>>(
        ENDPOINTS.TOUR.ROOM_SNAPSHOT(roomId)
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Không tìm thấy dữ liệu thông tin phòng.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        return {
          ...MOCK_ROOM_SNAPSHOT,
          id: roomId || 'room-1',
          roomCode: roomId ? `P-${roomId.toUpperCase()}` : 'AG-302',
        };
      }
      throw error;
    }
  },

  /**
   * Lấy danh sách khung giờ còn trống theo ngày
   */
  async getAvailableTourSlots(roomId: string, date: string): Promise<TimeSlotOption[]> {
    try {
      const response = await apiClient.get<ApiResponse<TimeSlotOption[]>>(
        ENDPOINTS.TOUR.ROOM_SLOTS(roomId),
        {
          params: { date },
        }
      );
      if (response.data?.data !== undefined && response.data?.data !== null) {
        return response.data.data;
      }
      throw new Error('Không thể tải danh sách khung giờ xem phòng.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        return MOCK_TIME_SLOTS;
      }
      throw error;
    }
  },

  /**
   * Gửi yêu cầu đặt lịch hẹn xem phòng
   */
  async bookRoomTour(payload: BookTourPayload): Promise<BookTourResponse> {
    try {
      const response = await apiClient.post<ApiResponse<BookTourResponse>>(
        ENDPOINTS.TOUR.BOOKINGS,
        payload
      );
      if (response.data?.data) {
        return response.data.data;
      }
      throw new Error('Phản hồi đặt lịch xem phòng không hợp lệ.');
    } catch (error) {
      if (shouldFallbackToMock(error)) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          bookingId: `TB-${Date.now()}`,
          bookingCode: `LICH-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'PENDING_CONFIRMATION',
          message: 'Đặt lịch xem phòng thành công. Chủ trọ sẽ phản hồi trong 30 phút.',
          createdAt: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};

export default scheduleTourApi;
