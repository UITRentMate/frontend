import { managementAssets } from '@/assets/property-management';
import type { PropertyFormValues } from './types';

export const EMPTY_PROPERTY_FORM: PropertyFormValues = {
  name: '', city: '', district: '', ward: '', street: '', amenities: [], gateMode: 'free', safetyRules: [],
};
// Illustrative address hierarchy from Figma, not an administrative directory.
export const MOCK_ADDRESS_OPTIONS = [
  { city: 'TP. Hồ Chí Minh', districts: [
    { name: 'TP. Thủ Đức', wards: ['Phường Linh Trung', 'Phường Linh Chiểu'] },
    { name: 'Quận Bình Thạnh', wards: ['Phường 25', 'Phường 26'] },
  ] },
];
export const PROPERTY_AMENITIES = [
  { label: 'Thang máy', icon: managementAssets.property.elevatorIcon },
  { label: 'Camera 24/7', icon: managementAssets.property.cctvIcon },
  { label: 'Vân tay/FaceID', icon: managementAssets.property.fingerprintIcon },
  { label: 'Nhà xe bảo vệ', icon: managementAssets.property.guardedParkingIcon },
  { label: 'Sân phơi', icon: managementAssets.property.dryingYardIcon },
  { label: 'Giặt sấy chung', icon: managementAssets.property.sharedLaundryIcon },
];
export const SAFETY_RULES = ['Cấm bếp gas mini', 'Trật tự sau 22:00', 'Đăng ký khách đêm'];
export const PROPERTY_PHOTO_LABELS = ['Mặt tiền', 'Cổng chính', 'Nhà xe', 'Hành lang'];
