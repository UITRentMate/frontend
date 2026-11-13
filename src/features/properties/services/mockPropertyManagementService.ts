import type { ApiResponse } from '@/types';

import type { CreateManagedRoomInput } from '@/features/rooms/types';
import { validateRoomForm } from '@/features/rooms/utils/roomManagement';

import type { PropertyFormValues, PropertyManagementData } from '../types';
import { validatePropertyForm } from '../utils/validation';
import { MOCK_PROPERTY_MANAGEMENT } from './mockData';

// FE-06 is exclusively in memory, independent of the HTTP/mock environment flag.
const store: PropertyManagementData = structuredClone(MOCK_PROPERTY_MANAGEMENT);
const delay = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 350));
function snapshot(): ApiResponse<PropertyManagementData> {
  return { success: true, message: 'Dữ liệu minh họa trong bộ nhớ.', data: structuredClone(store), timestamp: new Date().toISOString() };
}

export const mockPropertyManagementService = {
  async getOverview(): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    return snapshot();
  },
  async createProperty(values: PropertyFormValues): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    const errors = validatePropertyForm(values);
    if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
    // New mock properties get a ground-floor option; no floor-management workflow.
    store.properties.push({ ...structuredClone(values), name: values.name.trim(), street: values.street.trim(), id: crypto.randomUUID(), floors: [0] });
    return snapshot();
  },
  async createRoom({ propertyId, values }: CreateManagedRoomInput): Promise<ApiResponse<PropertyManagementData>> {
    await delay();
    const property = store.properties.find((item) => item.id === propertyId);
    if (!property) throw new Error('Khu trọ không còn tồn tại.');
    const errors = validateRoomForm(values, store.rooms, propertyId, property.floors);
    if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
    store.rooms.push({ id: crypto.randomUUID(), propertyId, code: values.code.trim(), floor: Number(values.floor), area: Number(values.area), capacity: Number(values.capacity), amenities: [...values.amenities], status: 'vacant', monthlyRent: null, isPublished: false });
    return snapshot();
  },
};
