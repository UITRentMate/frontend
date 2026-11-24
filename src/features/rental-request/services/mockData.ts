import type { TenantProfile, RentalRoomDetail } from '../types';

export const MOCK_TENANT: TenantProfile = {
  fullName: 'Nguyễn Minh Hoàng',
  phone: '098***321',
  email: 'hoang.nguyen***@email.com',
};

export const MOCK_RENTAL_ROOM: RentalRoomDetail = {
  id: 'room-ag-302',
  roomCode: 'AG-302',
  title: 'Phòng Studio gác lửng ban công thoáng mát (Tầng 3)',
  buildingName: 'Khu trọ An Gia Building',
  address: '285/12 Cách Mạng Tháng 8, Phường 12, Quận 10, TP.HCM',
  isAvailable: true,
  statusLabel: 'Đang trống • Nhận khách',
  specs: {
    area: 28,
    maxTenants: 2,
    furnished: true,
    hasBalcony: true,
  },
  financials: {
    monthlyRent: 4500000,
    deposit: 4500000,
    electricityCost: 3800,
    waterCost: 25000,
    serviceFee: 150000,
  },
  landlord: {
    name: 'Nguyễn Văn An',
    avatarText: 'NA',
    isVerified: true,
    approvalRate: 96,
    responseTime: '< 30 phút',
  },
  imageUrl: '',
};
