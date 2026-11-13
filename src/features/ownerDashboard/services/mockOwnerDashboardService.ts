import type { ApiResponse } from '@/types';

import type {
  CreateAppointmentInput,
  DashboardAppointment,
  CreateReceiptInput,
  OwnerDashboardData,
  RescheduleAppointmentInput,
  SaveUtilitiesInput,
} from '../types';
import { mockOwnerDashboard } from './mockData';

// Keep sample operations in memory, isolated from the immutable fixture.
let dashboard: OwnerDashboardData = structuredClone(mockOwnerDashboard);
const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 500));

function snapshot(message: string): ApiResponse<OwnerDashboardData> {
  return {
    success: true,
    message,
    data: structuredClone(dashboard),
    timestamp: new Date().toISOString(),
  };
}

export const mockOwnerDashboardService = {
  async getOverview(): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    return snapshot('Đã tải tổng quan khu trọ.');
  },

  async createAppointment({ time, roomCode, guestName }: CreateAppointmentInput): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || !guestName.trim()) throw new Error('Vui lòng nhập tên khách và giờ hẹn hợp lệ.');
    if (!dashboard.summary.property.rooms.some((room) => room.code === roomCode)) throw new Error('Không tìm thấy phòng.');
    if (dashboard.summary.appointments.some((item) => item.time === time && item.roomCode === roomCode && item.status !== 'completed')) throw new Error('Phòng đã có lịch hẹn vào giờ này.');
    const appointment: DashboardAppointment = {
      id: crypto.randomUUID(), time, roomCode, kind: 'viewing', status: 'upcoming',
      title: `Dẫn khách xem phòng ${roomCode}`, detail: `Khách: ${guestName.trim()}`,
    };
    dashboard.summary.appointments = [...dashboard.summary.appointments, appointment].sort((first, second) => first.time.localeCompare(second.time));
    dashboard.tasks = dashboard.tasks.map((task) => task.id === 'new-appointments' ? { ...task, count: task.count + 1 } : task);
    return snapshot('Đã thêm lịch hẹn xem phòng.');
  },

  async confirmAppointment(id: string): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    const appointment = dashboard.summary.appointments.find((item) => item.id === id);
    if (!appointment) throw new Error('Không tìm thấy lịch hẹn.');
    if (appointment.status === 'completed') throw new Error('Lịch hẹn này đã hoàn thành.');

    appointment.status = 'completed';
    dashboard.tasks = dashboard.tasks.map((task) => task.id === 'new-appointments'
      ? { ...task, count: Math.max(0, task.count - 1) }
      : task);
    return snapshot('Đã xác nhận hoàn thành lịch đón khách.');
  },

  async rescheduleAppointment({ id, time }: RescheduleAppointmentInput): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('Giờ hẹn không hợp lệ.');
    const appointment = dashboard.summary.appointments.find((item) => item.id === id);
    if (!appointment) throw new Error('Không tìm thấy lịch hẹn.');
    if (appointment.status === 'completed') throw new Error('Không thể đổi giờ của lịch hẹn đã hoàn thành.');

    appointment.time = time;
    appointment.status = 'scheduled';
    dashboard.summary.appointments = [...dashboard.summary.appointments]
      .sort((first, second) => first.time.localeCompare(second.time));
    return snapshot('Đã cập nhật giờ hẹn.');
  },

  async reconcileReceipt(id: string): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    if (!dashboard.summary.receipts.some((receipt) => receipt.id === id)) {
      throw new Error('Biên lai không tồn tại hoặc đã được đối soát.');
    }

    dashboard.summary.receipts = dashboard.summary.receipts.filter((receipt) => receipt.id !== id);
    // Receipt types include deposits and utilities; revenue is a separate metric.
    return snapshot('Đã xác nhận nhận tiền và đối soát biên lai.');
  },

  async saveUtilities({ roomCode, electricity, water }: SaveUtilitiesInput): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    if (![electricity, water].every((value) => Number.isFinite(value) && value >= 0)) {
      throw new Error('Chỉ số điện nước phải là số không âm.');
    }
    const room = dashboard.summary.property.rooms.find((item) => item.code === roomCode);
    if (!room) throw new Error('Không tìm thấy phòng.');
    if (room.status !== 'occupied') throw new Error('Chỉ ghi điện nước cho phòng đang thuê.');

    if (!room.utilityReading) dashboard.stats.utilityReadings += 1;
    room.utilityReading = { electricity, water };
    return snapshot('Đã lưu chỉ số điện nước.');
  },

  async createReceipt(input: CreateReceiptInput): Promise<ApiResponse<OwnerDashboardData>> {
    await delay();
    const tenantName = input.tenantName.trim();
    const roomCode = input.roomCode.trim();
    const detail = input.detail.trim();
    if (!tenantName || !detail || !Number.isSafeInteger(input.amount) || input.amount <= 0) {
      throw new Error('Vui lòng nhập đầy đủ thông tin và số tiền nguyên dương.');
    }
    if (!dashboard.summary.property.rooms.some((room) => room.code === roomCode)) {
      throw new Error('Không tìm thấy phòng.');
    }
    if (dashboard.summary.receipts.some((receipt) => receipt.tenantName === tenantName
      && receipt.roomCode === roomCode && receipt.detail === detail && receipt.amount === input.amount)) {
      throw new Error('Phiếu thu này đã có trong danh sách chờ đối soát.');
    }

    dashboard.summary.receipts = [{
      id: crypto.randomUUID(), tenantName, roomCode, detail, amount: input.amount,
    }, ...dashboard.summary.receipts];
    return snapshot('Đã tạo phiếu thu chờ đối soát.');
  },
};
