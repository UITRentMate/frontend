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
  { label: 'Thang máy', icon: managementAssets.property.container4 },
  { label: 'Camera 24/7', icon: managementAssets.property.container5 },
  { label: 'Vân tay/FaceID', icon: managementAssets.property.container6 },
  { label: 'Nhà xe bảo vệ', icon: managementAssets.property.container7 },
  { label: 'Sân phơi', icon: managementAssets.property.container8 },
  { label: 'Giặt sấy chung', icon: managementAssets.property.container9 },
];
export const SAFETY_RULES = ['Cấm bếp gas mini', 'Trật tự sau 22:00', 'Đăng ký khách đêm'];
export const PROPERTY_PHOTO_LABELS = ['Mặt tiền', 'Cổng chính', 'Nhà xe', 'Hành lang'];
