import type { BookingDetailData } from '../types';

export const MOCK_BOOKING_DETAIL: BookingDetailData = {
  room: {
    id: 'room-ag-302',
    roomCode: 'AG-302',
    floorLabel: 'Tầng 3',
    district: 'Quận 10',
    title: 'Phòng Studio gác lửng ban công thoáng mát',
    address: '285/12 Cách Mạng Tháng 8, Phường 12, Quận 10, TP. Hồ Chí Minh',
    imageUrl: '',
    amenities: ['Ban công', 'Máy lạnh', 'Nước nóng NLMT'],
  },
  landlord: {
    name: 'Nguyễn Văn An',
    avatarText: 'NA',
    roleLabel: 'Chủ nhà trọ',
    channelSubtitle: 'Kênh trao đổi chính thức trên RentMate',
    isVerified: true,
  },
  contract: {
    requestCode: '#RM-REQ-2041',
    tenantName: 'Thành viên RentMate',
    moveInDate: '01/11/2026',
    leaseAndOccupantsLabel: '12 tháng • 02 người',
  },
  recurringCost: {
    monthlyRent: 4500000,
    serviceFee: 150000,
    electricityRate: 3800,
    waterRate: 25000,
    waterMeterNotice:
      'Lưu ý: Nếu người thuê không nhập chỉ số nước đúng hạn, hệ thống áp dụng mức tiêu thụ mặc định 5 m³ cho kỳ tính đó.',
  },
  deposit: {
    depositAmount: 4500000,
    depositEquivalentNote: 'Tương đương 01 tháng tiền thuê phòng',
    status: 'AWAITING_PAYMENT',
    statusLabel: 'Chờ thanh toán qua VNPay/MoMo',
    paymentMethodLabel: 'VNPay QR / Thẻ ATM / MoMo',
    transactionCode: 'Chưa khởi tạo',
    recordedAtLabel: 'Chưa thanh toán',
  },
  holdWindow: {
    remainingTimeLabel: 'Còn lại 18 giờ 25 phút',
    startedAt: '15:30 — 24/10/2026',
    expiresAt: '15:30 — 25/10/2026',
    isExpired: false,
    expiryPolicyNote:
      'Yêu cầu giữ chỗ có hiệu lực trong 24 giờ. Quá thời hạn này, hệ thống sẽ tự động hủy yêu cầu và mở lại phòng công khai.',
  },
};
