// Owner UI model only; deliberately separate from public Room and API contracts.
export type ManagedRoomStatus = 'vacant' | 'reserved' | 'occupied' | 'maintenance';

export interface ManagedRoom {
  id: string;
  propertyId: string;
  code: string;
  floor: number;
  status: ManagedRoomStatus;
  image?: string;
  area: number;
  capacity: number;
  amenities: string[];
  monthlyRent: number | null;
  isPublished: boolean;
  guestName?: string;
  guestDetail?: string;
  note?: string;
  electricityRate?: number;
  waterRate?: number;
  depositMonths?: number;
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

export interface RoomManagementCardProps { room: ManagedRoom; onUnsupported: () => void; }
export interface MockPhotoStripProps { images: string[]; labels: string[]; uploadIcon: string; }

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
