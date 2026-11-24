import type { DatePillOption, TimeSlotOption, RoomTourSnapshot } from './scheduleTour.types';

export interface ReminderBannerProps {
  onDismiss: () => void;
}

export interface ScheduleBreadcrumbProps {
  buildingName: string;
  roomTitle: string;
  roomId?: string;
}

export interface DateSelectorProps {
  dateOptions: DatePillOption[];
  selectedDate: string;
  onSelectDate: (dateVal: string) => void;
  customDate: string;
  onCustomDateChange: (customDateVal: string) => void;
  inlineError?: string | null;
}

export interface TimeSlotSelectorProps {
  slots: TimeSlotOption[];
  selectedSlotIds: string[];
  onToggleSlot: (slotId: string) => void;
  maxSlots?: number;
  inlineError?: string | null;
}

export interface IdentityNoticeProps {
  userName: string;
}

export interface TourActionBarProps {
  onBack: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

export interface RoomTourSidebarProps {
  room: RoomTourSnapshot;
  onContactLandlord?: () => void;
}

export interface ScheduleTourSuccessViewProps {
  room: RoomTourSnapshot;
  selectedDate: string;
  selectedSlotCount: number;
  onEditBooking: () => void;
  onBackToDetail: () => void;
}
