export const MANAGEMENT_UNSUPPORTED = 'Chức năng này chưa hỗ trợ ở giai đoạn này.';

export const PROPERTY_MANAGEMENT_MESSAGES = {
  PROPERTY_CREATED: 'Đã tạo khu trọ minh họa. Dữ liệu sẽ mất khi tải lại trang.',
  SETTINGS_UPDATED: 'Đã cập nhật cài đặt & nội quy khu trọ (minh họa).',
  ROOM_CREATED: 'Đã thêm phòng minh họa; dữ liệu sẽ mất khi tải lại trang.',
  ROOM_CREATED_OPEN_PRICING: (code: string) =>
    `Đã thêm phòng ${code}. Tiếp tục cấu hình giá & dịch vụ.`,
  ROOM_PRICING_UPDATED: 'Đã lưu cấu hình giá & dịch vụ phòng (minh họa).',
} as const;
