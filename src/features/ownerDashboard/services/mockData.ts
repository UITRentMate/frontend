import { ROUTES } from '@/routes/paths';
import { dashboardSections } from '../constants';
import type { OwnerDashboardData } from '../types';

export const mockOwnerDashboard: OwnerDashboardData = {
  date: '2026-11-07',
  tasks: [
    {
      id: 'new-appointments',
      count: 2,
      label: 'lịch hẹn xem phòng mới',
      tone: 'warning',
      actionLabel: 'Xem lịch hẹn',
      href: `#${dashboardSections.appointments}`,
    },
    {
      id: 'rental-requests',
      count: 1,
      label: 'yêu cầu thuê chờ duyệt',
      tone: 'success',
      actionLabel: 'Xem khu trọ và phòng',
      href: ROUTES.LANDLORD_PROPERTIES,
    },
    {
      id: 'urgent-incidents',
      count: 1,
      label: 'sự cố khẩn cấp mới',
      tone: 'danger',
      actionLabel: 'Xem sơ đồ phòng',
      href: `#${dashboardSections.roomMap}`,
    },
    {
      id: 'overdue-invoices',
      count: 3,
      label: 'hóa đơn quá hạn',
      tone: 'danger',
      actionLabel: 'Xem đối soát',
      href: `#${dashboardSections.reconciliation}`,
    },
  ],
  stats: {
    roomCounts: { vacant: 3, reserved: 1, occupied: 19, maintenance: 1 },
    monthlyRevenue: 45_200_000,
    receivedRevenue: 38_700_000,
    revenuePeriod: 'Tháng 11/2026',
    utilityReadings: 18,
    utilityPeriod: '01/11 – 07/11',
  },
  summary: {
    appointments: [
      {
        id: 'check-out-p104',
        time: '09:30',
        title: 'Khảo sát trả phòng P.104',
        detail: 'Khách: Hoàng Văn Bình',
        status: 'completed',
      },
      {
        id: 'viewing-p201',
        time: '15:30',
        title: 'Dẫn khách xem phòng P.201',
        detail: 'Khách: Trần Văn An',
        status: 'upcoming',
      },
      {
        id: 'maintenance-p102',
        time: '17:00',
        title: 'Sửa điều hòa phòng P.102',
        detail: 'Kỹ thuật: Anh Tuấn',
        status: 'scheduled',
      },
    ],
    receipts: [
      {
        id: 'receipt-p301',
        tenantName: 'Nguyễn Thanh',
        roomCode: 'P.301',
        detail: 'VCB · Tiền thuê phòng',
        amount: 3_500_000,
      },
      {
        id: 'receipt-p204',
        tenantName: 'Lê Đức Trọng',
        roomCode: 'P.204',
        detail: 'MB · Cọc 1 tháng',
        amount: 4_200_000,
      },
      {
        id: 'receipt-p105',
        tenantName: 'Phạm Hồng Như',
        roomCode: 'P.105',
        detail: 'TCB · Tiền điện nước',
        amount: 850_000,
      },
    ],
    property: {
      name: '48 Lê Văn Lương',
      roomCount: 12,
      rooms: [
        { code: 'P.101', status: 'occupied', detail: 'Trần Thị Hà' },
        { code: 'P.102', status: 'maintenance', detail: 'Sửa điều hòa' },
        { code: 'P.103', status: 'vacant', detail: 'Sẵn sàng cho thuê' },
        { code: 'P.104', status: 'vacant', detail: 'Đang dọn phòng' },
        { code: 'P.201', status: 'reserved', detail: 'Hẹn xem 15:30' },
        { code: 'P.202', status: 'occupied', detail: 'Lê Minh Tú' },
      ],
    },
  },
};
