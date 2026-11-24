import apiClient from '@/lib/apiClient';
import type { ApiResponse } from '@/types/api.types';
import type { RoomTourSnapshot, TimeSlotOption, BookTourPayload, BookTourResponse } from '../types';
import { MOCK_ROOM_SNAPSHOT, MOCK_TIME_SLOTS } from '../services/mockData';

export const scheduleTourApi = {
  /**
   * Lấy thông tin tóm tắt của phòng để hiển thị sidebar đặt lịch
   */
  async getScheduleTourRoom(roomId: string): Promise<RoomTourSnapshot> {
    try {
      const response = await apiClient.get<ApiResponse<RoomTourSnapshot>>(`/rooms/${roomId}/tour-snapshot`);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch {
      // API backend đang phát triển -> fallback dữ liệu snapshot mẫu có gắn roomId
    }

    return {
      ...MOCK_ROOM_SNAPSHOT,
      id: roomId || 'room-1',
      roomCode: roomId ? `P-${roomId.toUpperCase()}` : 'AG-302',
    };
  },

  /**
   * Lấy danh sách khung giờ còn trống theo ngày
   */
  async getAvailableTourSlots(roomId: string, date: string): Promise<TimeSlotOption[]> {
    try {
      const response = await apiClient.get<ApiResponse<TimeSlotOption[]>>(`/rooms/${roomId}/tour-slots`, {
        params: { date },
      });
      if (response.data?.data) {
        return response.data.data;
      }
    } catch {
      // Fallback
    }

    return MOCK_TIME_SLOTS;
  },

  /**
   * Gửi yêu cầu đặt lịch hẹn xem phòng
   */
  async bookRoomTour(payload: BookTourPayload): Promise<BookTourResponse> {
    try {
      const response = await apiClient.post<ApiResponse<BookTourResponse>>('/tour-bookings', payload);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch {
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return {
      bookingId: `TB-${Date.now()}`,
      bookingCode: `LICH-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'PENDING_CONFIRMATION',
      message: 'Đặt lịch xem phòng thành công. Chủ trọ sẽ phản hồi trong 30 phút.',
      createdAt: new Date().toISOString(),
    };
  },
};

export default scheduleTourApi;
