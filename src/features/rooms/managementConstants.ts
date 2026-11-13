import { managementAssets } from '@/assets/property-management';
import type { ManagedRoomStatus, RoomFormValues } from './types';

export const MANAGED_ROOM_STATUSES: { value: ManagedRoomStatus; label: string }[] = [
  { value: 'vacant', label: 'Trống' },
  { value: 'reserved', label: 'Đang giữ chỗ' },
  { value: 'occupied', label: 'Đang thuê' },
  { value: 'maintenance', label: 'Bảo trì' },
];
export const ROOM_AMENITIES = [
  { label: 'Máy điều hòa', icon: managementAssets.room.container4 },
  { label: 'Gác lửng đúc', icon: managementAssets.room.container5 },
  { label: 'WC khép kín', icon: managementAssets.room.container6 },
  { label: 'Tủ lạnh mini', icon: managementAssets.room.container7 },
  { label: 'Kệ bếp & Bồn rửa', icon: managementAssets.room.container8 },
  { label: 'Bàn ghế làm việc', icon: managementAssets.room.container9 },
  { label: 'Giường & Nệm', icon: managementAssets.room.container10 },
  { label: 'Ban công thoáng', icon: managementAssets.room.container11 },
  { label: 'Máy giặt riêng', icon: managementAssets.room.container12 },
];
export const EMPTY_ROOM_FORM: RoomFormValues = { code: '', floor: '', area: '', capacity: '', amenities: [] };
export const ROOM_PHOTO_LABELS = ['Phòng', 'WC', 'Ban công'];
export const MANAGEMENT_UNSUPPORTED = 'Chức năng này chưa hỗ trợ ở giai đoạn này.';
export const rentFormatter = new Intl.NumberFormat('vi-VN');
