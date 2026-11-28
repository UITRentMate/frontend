import type { BookingConfirmationFixture } from '../types';

export const BOOKING_CONFIRMATION_FIXTURE: BookingConfirmationFixture = {
  pageTitle: 'Xác nhận đặt phòng',
  pageSubtitle: 'Kiểm tra thông tin trước khi tiếp tục thanh toán tiền cọc.',
  approvedSummary: {
    requestCode: '#RM-REQ-2041',
    statusLabel: 'Đã chấp thuận',
    moveInDate: '01/11/2026',
    leaseDuration: '12 tháng',
    occupantCountLabel: '2 người',
  },
  tenantContact: {
    fullName: 'Nguyễn Minh Hoàng',
    phone: '098***321',
    email: 'hoang.nguyen***@email.com',
  },
  depositHold: {
    ruleBadge: 'Quy định giữ chỗ 24h',
    depositAmount: 4500000,
    holdDeadline: '15:30 — 25/10/2026',
    remainingTimeText: 'Còn lại 18 giờ 25 phút để hoàn tất cọc',
    policyNotice:
      'Sau 24 giờ kể từ thời điểm chủ trọ duyệt yêu cầu (15:30 — 24/10/2026) mà người thuê chưa hoàn tất đặt cọc, hệ thống RentMate sẽ tự động giải phóng phòng và mở lại công khai theo quy định giữ chỗ.',
  },
  confirmationTerms: {
    description:
      'Yêu cầu thuê đã được chủ trọ duyệt. Bạn có thể tiếp tục thanh toán tiền cọc để hoàn tất bước đặt cọc và chuyển sang bước tiếp theo của quy trình thuê.',
    checkboxLabel:
      'Tôi đã kiểm tra kỹ thông tin đặt phòng, giá thuê niêm yết và thời hạn thanh toán giữ chỗ 24 giờ.',
    backButtonLabel: 'Quay lại yêu cầu',
    continueButtonLabel: 'Tiếp tục thanh toán',
  },
  room: {
    id: 'room-ag-302',
    roomCode: 'AG-302',
    floorLabel: 'Tầng 3',
    buildingName: 'An Gia Building',
    title: 'Phòng Studio gác lửng ban công thoáng mát',
    address: '285/12 CMT8, P.12, Q.10, TP.HCM',
    areaSqm: 28,
    maxTenants: 2,
    monthlyRent: 4500000,
    electricityRate: 3800,
    waterRate: 25000,
    serviceFee: 150000,
    feesFootnote: '(chưa gồm điện & nước theo chỉ số công tơ).',
    oneTimeDepositNote:
      '* Khoản thanh toán một lần, tách biệt hoàn toàn với chi phí hằng tháng, không cộng gộp gây hiểu nhầm.',
  },
  landlord: {
    name: 'Nguyễn Văn An',
    avatarText: 'NA',
    isVerified: true,
    verifiedLabel: 'Chính chủ xác thực',
    approvalRate: 96,
    responseTime: '< 30 phút',
    messageButtonLabel: 'Nhắn tin trao đổi',
  },
  supportNote: {
    description: 'Cần hỗ trợ quy trình đặt cọc? Hotline kỹ thuật',
    hotline: '1900 6868',
  },
};
