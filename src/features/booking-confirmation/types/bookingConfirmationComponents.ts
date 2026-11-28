import type {
  ApprovedBookingSummary,
  BookingConfirmationTerms,
  BookingDepositHold,
  BookingLandlordSummary,
  BookingRoomSidebarSummary,
  BookingSupportNote,
  BookingTenantContact,
} from './bookingConfirmation.types';

export interface BookingBreadcrumbHeaderProps {
  roomId: string;
  buildingName: string;
  roomTitle: string;
  pageTitle: string;
  pageSubtitle: string;
}

export interface ApprovedRequestSummaryCardProps {
  summary: ApprovedBookingSummary;
}

export interface TenantContactCardProps {
  tenant: BookingTenantContact;
}

export interface DepositHoldCardProps {
  depositHold: BookingDepositHold;
}

export interface BookingConfirmationCardProps {
  terms: BookingConfirmationTerms;
  isConfirmed: boolean;
  onConfirmChange: (checked: boolean) => void;
  backToRentalRequestPath: string;
  onContinue: () => void;
  paymentNotice: string | null;
  onDismissNotice: () => void;
}

export interface BookingRoomSidebarProps {
  room: BookingRoomSidebarSummary;
  depositAmount: number;
  landlord: BookingLandlordSummary;
  supportNote: BookingSupportNote;
  onMessageLandlord: () => void;
  messageNotice: string | null;
  onDismissMessageNotice: () => void;
}
