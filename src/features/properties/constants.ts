import { managementAssets } from '@/assets/property-management';
import type { PropertyFormValues } from './types';

export const EMPTY_PROPERTY_FORM: PropertyFormValues = {
  name: '',
  city: '',
  district: '',
  ward: '',
  street: '',
  amenities: [],
  gateMode: 'free',
  safetyRules: [],
};

// Illustrative address hierarchy from Figma, not an administrative directory.
export const MOCK_ADDRESS_OPTIONS = [
  {
    city: 'TP. Hồ Chí Minh',
    districts: [
      { name: 'TP. Thủ Đức', wards: ['Phường Linh Trung', 'Phường Linh Chiểu'] },
      { name: 'Quận Bình Thạnh', wards: ['Phường 25', 'Phường 26'] },
    ],
  },
];

export const PROPERTY_AMENITIES = [
  { label: 'Thang máy', icon: managementAssets.property.elevatorIcon },
  { label: 'Camera 24/7', icon: managementAssets.property.cctvIcon },
  { label: 'Cổng vân tay', icon: managementAssets.property.fingerprintIcon },
  { label: 'Nhà xe bảo vệ', icon: managementAssets.property.guardedParkingIcon },
  { label: 'Sân phơi', icon: managementAssets.property.dryingYardIcon },
  { label: 'Máy giặt sấy', icon: managementAssets.property.sharedLaundryIcon },
];

export const SAFETY_RULES = ['Cấm bếp than/gas mini', 'Tắt CB khi ra ngoài'];
export const VISITOR_RULES = ['Rời đi trước 22:30', 'Đăng ký ở qua đêm App'];
export const QUIET_PET_RULES = ['Yên tĩnh 22:00 - 06:30', 'Thú cưng nhỏ (<5kg)'];

export const PROPERTY_PHOTO_LABELS = ['Mặt tiền', 'Cổng chính', 'Nhà xe', 'Hành lang'];
export const PROPERTY_SETTINGS_PHOTO_LABELS = [
  'Mặt tiền & Biển',
  'Cổng vân tay',
  'Nhà xe có CCTV',
  'Sân phơi mái che',
];
