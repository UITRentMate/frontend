// Owner UI model only; deliberately separate from public Room and API contracts.
import type { RoomStatus } from './roomStatus';

export type WaterBillingMode = 'meter' | 'person';

export interface RoomServiceFee {
  id: string;
  name: string;
  amount: number;
  unit: string;
  enabled: boolean;
}

export interface ManagedRoom {
  id: string;
  propertyId: string;
  code: string;
  floor: number;
  status: RoomStatus;
  image?: string;
  area: number;
  capacity: number;
  amenities: string[];
  monthlyRent: number | null;
  depositAmount?: number | null;
  isPublished: boolean;
  guestName?: string;
  guestDetail?: string;
  note?: string;
  electricityRate?: number;
  waterBillingMode?: WaterBillingMode;
  waterRate?: number;
  waterPerPersonRate?: number;
  depositMonths?: number;
  serviceFees?: RoomServiceFee[];
  electricityReading?: number;
  waterReading?: number;
}

export interface RoomFormValues {
  code: string;
  floor: string;
  area: string;
  capacity: string;
  amenities: string[];
}

export type RoomFormErrors = Partial<Record<keyof RoomFormValues, string>>;

export interface CreateManagedRoomInput {
  propertyId: string;
  values: RoomFormValues;
}

export interface RoomPricingFormValues {
  monthlyRent: string;
  depositAmount: string;
  electricityRate: string;
  waterBillingMode: WaterBillingMode;
  waterRate: string;
  waterPerPersonRate: string;
  serviceFees: RoomServiceFee[];
  isPublished: boolean;
}

export interface RoomPricingFormErrors {
  monthlyRent?: string;
  depositAmount?: string;
  electricityRate?: string;
  waterRate?: string;
  waterPerPersonRate?: string;
  serviceFees?: string;
}

export interface UpdateRoomPricingInput {
  propertyId: string;
  roomId: string;
  values: RoomPricingFormValues;
  copyToOtherRooms?: boolean;
}

export interface RoomManagementCardProps {
  room: ManagedRoom;
  onConfigurePrice: (room: ManagedRoom) => void;
  onUnsupported: () => void;
}

export interface ManagementPhotoStripProps {
  images: string[];
  labels: string[];
  uploadIcon: string;
}

export interface AddRoomModalProps {
  propertyId: string;
  propertyName: string;
  floors: number[];
  rooms: ManagedRoom[];
  isPending: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: RoomFormValues, configurePrice: boolean) => void;
}

export interface RoomPricingModalProps {
  room: ManagedRoom;
  otherVacantCount: number;
  isPending: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: RoomPricingFormValues, copyToOtherRooms: boolean) => void;
}

export interface RoomServiceFeesSectionProps {
  serviceFees: RoomServiceFee[];
  feeAmountInputs: Record<string, string>;
  error?: string;
  onToggleFee: (feeId: string) => void;
  onFeeAmountChange: (feeId: string, rawValue: string) => void;
  onAddFee: (name: string, amount: number, unit: string) => void;
  onValidationError: (message?: string) => void;
}
