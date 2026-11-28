export interface ApprovedBookingSummary {
  requestCode: string;
  statusLabel: string;
  moveInDate: string;
  leaseDuration: string;
  occupantCountLabel: string;
}

export interface BookingTenantContact {
  fullName: string;
  phone: string;
  email: string;
}

export interface BookingDepositHold {
  ruleBadge: string;
  depositAmount: number;
  holdDeadline: string;
  remainingTimeText: string;
  policyNotice: string;
}

export interface BookingConfirmationTerms {
  description: string;
  checkboxLabel: string;
  backButtonLabel: string;
  continueButtonLabel: string;
}

export interface BookingRoomSidebarSummary {
  id: string;
  roomCode: string;
  floorLabel: string;
  buildingName: string;
  title: string;
  address: string;
  imageUrl?: string;
  areaSqm: number;
  maxTenants: number;
  monthlyRent: number;
  electricityRate: number;
  waterRate: number;
  serviceFee: number;
  feesFootnote: string;
  oneTimeDepositNote: string;
}

export interface BookingLandlordSummary {
  name: string;
  avatarText: string;
  isVerified: boolean;
  verifiedLabel: string;
  approvalRate: number;
  responseTime: string;
  messageButtonLabel: string;
}

export interface BookingSupportNote {
  description: string;
  hotline: string;
}

export interface BookingConfirmationData {
  pageTitle: string;
  pageSubtitle: string;
  approvedSummary: ApprovedBookingSummary;
  tenantContact: BookingTenantContact;
  depositHold: BookingDepositHold;
  confirmationTerms: BookingConfirmationTerms;
  room: BookingRoomSidebarSummary;
  landlord: BookingLandlordSummary;
  supportNote: BookingSupportNote;
}

export interface ConfirmBookingPayload {
  roomId: string;
  requestCode: string;
  depositAmount: number;
  isTermsAccepted: boolean;
}

export interface ConfirmBookingResponse {
  confirmationId: string;
  bookingCode: string;
  status: 'AWAITING_DEPOSIT' | 'CONFIRMED';
  depositAmount: number;
  holdDeadline: string;
  message: string;
  createdAt: string;
}
