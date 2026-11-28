export type DepositStatus = 'AWAITING_PAYMENT' | 'PAID' | 'EXPIRED';

export interface BookingDetailRoomInfo {
  id: string;
  roomCode: string;
  floorLabel: string;
  district: string;
  title: string;
  address: string;
  imageUrl?: string;
  amenities: string[];
}

export interface BookingDetailLandlord {
  name: string;
  avatarText: string;
  roleLabel: string;
  channelSubtitle: string;
  isVerified: boolean;
}

export interface BookingContractSummary {
  requestCode: string;
  tenantName: string;
  moveInDate: string;
  leaseAndOccupantsLabel: string;
}

export interface BookingRecurringCost {
  monthlyRent: number;
  serviceFee: number;
  electricityRate: number;
  waterRate: number;
  waterMeterNotice: string;
}

export interface BookingDepositInfo {
  depositAmount: number;
  depositEquivalentNote: string;
  status: DepositStatus;
  statusLabel: string;
  paymentMethodLabel: string;
  transactionCode: string;
  recordedAtLabel: string;
}

export interface BookingHoldWindow {
  remainingTimeLabel: string;
  startedAt: string;
  expiresAt: string;
  isExpired: boolean;
  expiryPolicyNote: string;
}

export interface BookingDetailData {
  room: BookingDetailRoomInfo;
  landlord: BookingDetailLandlord;
  contract: BookingContractSummary;
  recurringCost: BookingRecurringCost;
  deposit: BookingDepositInfo;
  holdWindow: BookingHoldWindow;
}

export interface InitiateDepositPayload {
  roomId: string;
  requestCode: string;
  depositAmount: number;
}

export interface InitiateDepositResponse {
  transactionCode: string;
  status: DepositStatus;
  statusLabel: string;
  recordedAtLabel: string;
  message: string;
}
