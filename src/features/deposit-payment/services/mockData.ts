import type { DepositPaymentSummary, PaymentGatewayOption } from '../types';

export const MOCK_PAYMENT_GATEWAYS: PaymentGatewayOption[] = [
  {
    id: 'VNPAY',
    title: 'Cổng thanh toán VNPAY',
    description:
      'Quét mã VNPAY-QR, Thẻ ATM/Tài khoản ngân hàng nội địa, Thẻ quốc tế (Visa/Mastercard)',
  },
  {
    id: 'MOMO',
    title: 'Ví điện tử MoMo',
    description: 'Quét mã MoMo QR trên ứng dụng hoặc thanh toán bằng nguồn tiền ví liên kết',
    badgeText: 'MoMo',
  },
];

export const MOCK_DEPOSIT_PAYMENT_SUMMARY: DepositPaymentSummary = {
  roomId: 'room-ag-302',
  requestCode: '#RM-REQ-2041',
  buildingName: 'An Gia Building',
  roomTitle: 'Phòng Studio gác lửng ban công',
  roomCode: 'AG-302',
  floorLabel: 'Tầng 3',
  tenantName: 'Thành viên RentMate',
  requestCreatedAt: '15:30 — 24/10/2026',
  depositAmount: 4500000,
  depositPolicyNote:
    'Khoản đặt cọc độc lập để giữ chỗ theo thỏa thuận đã duyệt tại bước B04, tách biệt hoàn toàn với tiền thuê tháng đầu và các chi phí sinh hoạt định kỳ.',
  holdRemainingLabel: 'Còn lại 18 giờ 25 phút',
  holdExpiresAt: '15:30 — 25/10/2026',
  holdPolicyNote:
    'Thời hạn do máy chủ trung tâm tự động khóa. Nếu quá 24h mà tiền cọc chưa được ghi nhận thành công, yêu cầu giữ chỗ này sẽ tự động hủy bỏ.',
  isHoldExpired: false,
  supportHotline: '1900 6868',
};
