import type { DatePillOption, TimeSlotOption, RoomTourSnapshot } from './scheduleTour.types';

export interface ReminderBannerProps {
  onDismiss: () => void;
}

export interface ScheduleBreadcrumbProps {
  buildingName: string;
  roomTitle: string;
}

export interface DateSelectorProps {
  dateOptions: DatePillOption[];
  selectedDate: string;
  onSelectDate: (dateVal: string) => void;
  customDate: string;
  onCustomDateChange: (customDateVal: string) => void;
}

export interface TimeSlotSelectorProps {
  slots: TimeSlotOption[];
  selectedSlotIds: string[];
  onToggleSlot: (slotId: string) => void;
  maxSlots?: number;
}

export interface IdentityNoticeProps {
  userName: string;
}

export interface TourActionBarProps {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

export interface RoomTourSidebarProps {
  room: RoomTourSnapshot;
}
