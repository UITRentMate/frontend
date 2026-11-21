import type { ManagedRoom } from '@/features/rooms/types';

export interface ManagedProperty {
  id: string;
  name: string;
  profileCode?: string;
  updatedAtLabel?: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  floors: number[];
  amenities: string[];
  gateMode: 'free' | 'scheduled';
  visitorRules?: string[];
  safetyRules: string[];
  quietPetRules?: string[];
  isArchived?: boolean;
}

export interface PropertyManagementData {
  properties: ManagedProperty[];
  rooms: ManagedRoom[];
}

export type PropertyFormValues = Pick<
  ManagedProperty,
  'name' | 'city' | 'district' | 'ward' | 'street' | 'amenities' | 'gateMode' | 'safetyRules'
>;

export type PropertyFormErrors = Partial<Record<keyof PropertyFormValues, string>>;

export interface PropertySettingsValues {
  name: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  amenities: string[];
  gateMode: 'free' | 'scheduled';
  visitorRules: string[];
  safetyRules: string[];
  quietPetRules: string[];
  isArchived: boolean;
}

export type PropertySettingsErrors = Partial<
  Record<'name' | 'city' | 'district' | 'ward' | 'street', string>
>;

export interface UpdatePropertySettingsInput {
  propertyId: string;
  values: PropertySettingsValues;
  isDraft?: boolean;
}

export interface AddPropertyModalProps {
  isPending: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: PropertyFormValues) => void;
}

export interface PropertySettingsModalProps {
  property: ManagedProperty;
  rooms: ManagedRoom[];
  isPending: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: PropertySettingsValues, isDraft?: boolean) => void;
}
