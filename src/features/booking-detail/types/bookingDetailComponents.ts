import type {
  BookingContractSummary,
  BookingDepositInfo,
  BookingDetailLandlord,
  BookingDetailRoomInfo,
  BookingHoldWindow,
  BookingRecurringCost,
} from './bookingDetail.types';

export interface BookingDetailBreadcrumbProps {
  roomId: string;
  district: string;
  roomTitle: string;
  roomCode: string;
}

export interface BookingInfoSectionProps {
  room: BookingDetailRoomInfo;
  landlord: BookingDetailLandlord;
  contract: BookingContractSummary;
  recurringCost: BookingRecurringCost;
  onMessageLandlord: () => void;
}

export interface DepositStatusCardProps {
  deposit: BookingDepositInfo;
}

export interface HoldDeadlineCardProps {
  holdWindow: BookingHoldWindow;
  canProceedPayment: boolean;
  isInitiatingPayment: boolean;
  onProceedPayment: () => void;
  onBackToRequests: () => void;
}
