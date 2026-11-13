import type { ManagedRoom } from '@/features/rooms/types';

export interface ManagedProperty {
  id: string;
  name: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  floors: number[];
  amenities: string[];
  gateMode: 'free' | 'scheduled';
  safetyRules: string[];
}

export interface PropertyManagementData { properties: ManagedProperty[]; rooms: ManagedRoom[]; }
export type PropertyFormValues = Omit<ManagedProperty, 'id' | 'floors'>;
export type PropertyFormErrors = Partial<Record<keyof PropertyFormValues, string>>;

export interface AddPropertyModalProps {
  isPending: boolean;
  error: string;
  onClose: () => void;
  onSubmit: (values: PropertyFormValues) => void;
}
