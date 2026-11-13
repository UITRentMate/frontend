import { managementAssets } from '@/assets/property-management';

import type { PropertyManagementData } from '../types';

export const MOCK_PROPERTY_MANAGEMENT: PropertyManagementData = {
  properties: [
    { id: 'green-campus', name: 'Nhà trọ Xanh - Cơ sở Làng Đại học', city: 'TP. Hồ Chí Minh', district: 'TP. Thủ Đức', ward: 'Phường Linh Trung', street: 'Khu phố 6, Đường số 8', floors: [1, 2, 3], amenities: ['Camera 24/7', 'Nhà xe bảo vệ'], gateMode: 'free', safetyRules: ['Trật tự sau 22:00'] },
    { id: 'green-garden', name: 'Nhà trọ Xanh - Cơ sở Bình Thạnh', city: 'TP. Hồ Chí Minh', district: 'Quận Bình Thạnh', ward: 'Phường 25', street: '12 Nguyễn Gia Trí', floors: [0, 1], amenities: [], gateMode: 'scheduled', safetyRules: [] },
  ],
  rooms: [
    { id: 'room-201', propertyId: 'green-campus', code: 'P.201', floor: 2, status: 'vacant', image: managementAssets.photos[0], area: 25, capacity: 2, amenities: ['Máy điều hòa', 'Gác lửng đúc', 'WC khép kín', 'Tủ lạnh mini', 'Ban công thoáng'], monthlyRent: 3500000, electricityRate: 3500, waterRate: 20000, depositMonths: 1, isPublished: true },
    { id: 'room-102', propertyId: 'green-campus', code: 'P.102', floor: 1, status: 'occupied', image: managementAssets.photos[1], area: 25, capacity: 2, amenities: [], monthlyRent: 3200000, isPublished: false, guestName: 'Trần Hữu Nam', guestDetail: 'HĐ đến: 12/2026', note: 'Kỳ đóng tiền: Ngày 05 hàng tháng', electricityReading: 1428, waterReading: 42 },
    { id: 'room-304', propertyId: 'green-campus', code: 'P.304', floor: 3, status: 'reserved', image: managementAssets.photos[2], area: 22, capacity: 2, amenities: ['Gác lửng đúc'], monthlyRent: 3800000, isPublished: false, guestName: 'Lê Hoài Phương', guestDetail: '0982***192', note: 'Chờ cọc 24h • Còn lại 14 giờ (minh họa)' },
    { id: 'room-105', propertyId: 'green-campus', code: 'P.105', floor: 1, status: 'maintenance', image: managementAssets.photos[3], area: 22, capacity: 2, amenities: [], monthlyRent: 3000000, isPublished: false, note: 'Sơn mới tường & thay vòi sen', guestDetail: 'Dự kiến hoàn tất: 28/11 (Thợ: Chú Bảy)' },
    { id: 'room-202', propertyId: 'green-campus', code: 'P.202', floor: 2, status: 'occupied', image: managementAssets.photos[4], area: 25, capacity: 2, amenities: ['Giường & Nệm'], monthlyRent: 3600000, isPublished: false, guestName: 'Lê Minh Tú', guestDetail: 'Hạn thanh toán: 05/11', note: 'Hợp đồng 12 tháng • Còn 7 tháng' },
    { id: 'room-301', propertyId: 'green-campus', code: 'P.301', floor: 3, status: 'vacant', image: managementAssets.photos[5], area: 28, capacity: 2, amenities: ['Ban công thoáng'], monthlyRent: 4000000, electricityRate: 3500, waterRate: 20000, depositMonths: 1, isPublished: true },
  ],
};
