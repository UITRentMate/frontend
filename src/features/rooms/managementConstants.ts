import { managementAssets } from '@/assets/property-management';
import type { RoomFormValues, RoomServiceFee, RoomStatus } from './types';

export const MANAGED_ROOM_STATUSES: { value: RoomStatus; label: string }[] = [
  { value: 'vacant', label: 'Trống' },
  { value: 'reserved', label: 'Đang giữ chỗ' },
  { value: 'occupied', label: 'Đang thuê' },
  { value: 'maintenance', label: 'Bảo trì' },
];

export const ROOM_AMENITIES = [
  { label: 'Máy điều hòa', icon: managementAssets.room.airConditionerIcon },
  { label: 'Gác lửng đúc', icon: managementAssets.room.mezzanineIcon },
  { label: 'WC khép kín', icon: managementAssets.room.privateBathroomIcon },
  { label: 'Tủ lạnh mini', icon: managementAssets.room.miniFridgeIcon },
  { label: 'Kệ bếp & Bồn rửa', icon: managementAssets.room.kitchenSinkIcon },
  { label: 'Bàn ghế làm việc', icon: managementAssets.room.deskIcon },
  { label: 'Giường & Nệm', icon: managementAssets.room.bedIcon },
  { label: 'Ban công thoáng', icon: managementAssets.room.balconyIcon },
  { label: 'Máy giặt riêng', icon: managementAssets.room.washingMachineIcon },
];

export const EMPTY_ROOM_FORM: RoomFormValues = {
  code: '',
  floor: '',
  area: '',
  capacity: '',
  amenities: [],
};

export const ROOM_PHOTO_LABELS = ['Phòng', 'WC', 'Ban công'];

export const DEFAULT_ROOM_SERVICE_FEES: RoomServiceFee[] = [
  { id: 'trash', name: 'Rác sinh hoạt', amount: 30000, unit: '/phòng', enabled: true },
  { id: 'wifi', name: 'Internet / Wifi', amount: 50000, unit: '/phòng', enabled: true },
  { id: 'parking', name: 'Phí giữ xe máy', amount: 100000, unit: '/chiếc', enabled: true },
];

export const ROOM_STATUS_CLASSES: Record<RoomStatus, string> = {
  vacant: 'border-success-border bg-success-soft text-secondary-600',
  reserved: 'border-warning-border bg-warning-soft text-warning',
  occupied: 'border-info-border bg-info-soft text-info',
  maintenance: 'border-danger-border bg-danger-soft text-danger',
};
