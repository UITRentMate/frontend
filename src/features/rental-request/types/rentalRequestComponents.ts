import type {
  TenantProfile,
  RentalRoomDetail,
  ContractDurationOption,
} from './rentalRequest.types';

export interface BreadcrumbHeaderProps {
  buildingName: string;
  roomTitle: string;
}

export interface TenantInfoCardProps {
  tenant: TenantProfile;
  onUpdateProfile?: () => void;
}

export interface RentalPlanCardProps {
  moveInDate: string;
  onMoveInDateChange: (val: string) => void;
  tenantCount: number;
  onTenantCountChange: (val: number) => void;
  maxTenants: number;
  contractDuration: ContractDurationOption;
  onContractDurationChange: (val: ContractDurationOption) => void;
  note: string;
  onNoteChange: (val: string) => void;
}

export interface ActionCardProps {
  isConfirmed: boolean;
  onConfirmChange: (val: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export interface RoomSummarySidebarProps {
  room: RentalRoomDetail;
}
