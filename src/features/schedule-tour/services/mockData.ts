import type { TimeSlotOption, RoomTourSnapshot } from '../types';

export const MOCK_TIME_SLOTS: TimeSlotOption[] = [
  // Sáng (08:30 - 11:30)
  {
    id: 'slot-m1',
    timeRange: '09:00 - 09:45',
    period: 'morning',
    isFull: false,
  },
  {
    id: 'slot-m2',
    timeRange: '10:30 - 11:15',
    period: 'morning',
    isFull: false,
  },
  {
    id: 'slot-m3',
    timeRange: '11:30 - 12:15',
    period: 'morning',
    isFull: true,
  },
  // Chiều (14:00 - 17:30)
  {
    id: 'slot-a1',
    timeRange: '14:00 - 14:45',
    period: 'afternoon',
    isFull: false,
  },
  {
    id: 'slot-a2',
    timeRange: '15:30 - 16:15',
    period: 'afternoon',
    isFull: false,
  },
  {
    id: 'slot-a3',
    timeRange: '16:30 - 17:30',
    period: 'afternoon',
    isFull: false,
  },
  // Tối (18:00 - 20:00)
  {
    id: 'slot-e1',
    timeRange: '18:15 - 19:00',
    period: 'evening',
    isFull: false,
  },
  {
    id: 'slot-e2',
    timeRange: '19:15 - 20:00',
    period: 'evening',
    isFull: false,
  },
  {
    id: 'slot-e3',
    timeRange: '20:15 - 21:00',
    period: 'evening',
    isFull: true,
  },
];

export const MOCK_ROOM_SNAPSHOT: RoomTourSnapshot = {
  roomCode: 'AG-302',
  title: 'Phòng Studio ban công thoáng mát',
  buildingName: 'Khu trọ An Gia Building',
  monthlyRent: 4500000,
  deposit: 4500000,
  electricityCost: 3800,
  waterCost: 25000,
  area: 28,
  address: '285/12 Cách Mạng Tháng 8, Phường 12, Quận 10, TP.HCM',
  imageUrl: '',
  photosCount: 8,
  landlord: {
    name: 'Nguyễn Văn An',
    avatarText: 'NA',
    role: 'Quản lý tòa An Gia (4 năm uy tín)',
    isVerified: true,
    approvalRate: 96,
    responseTime: '< 30 phút',
  },
};
