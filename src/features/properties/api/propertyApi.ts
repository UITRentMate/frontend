import { ENDPOINTS } from '@/api/endpoints';
import { apiClient } from '@/lib/apiClient';
import type { ApiResponse } from '@/types';

import type { CreateManagedRoomInput } from '@/features/rooms/types';

import type { PropertyFormValues, PropertyManagementData } from '../types';

export const propertyApi = {
  async getOverview(): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.get<ApiResponse<PropertyManagementData>>(ENDPOINTS.PROPERTIES.OVERVIEW);
    return response.data;
  },

  async createProperty(values: PropertyFormValues): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.post<ApiResponse<PropertyManagementData>>(ENDPOINTS.PROPERTIES.CREATE, values);
    return response.data;
  },

  async createRoom({ propertyId, values }: CreateManagedRoomInput): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.post<ApiResponse<PropertyManagementData>>(ENDPOINTS.PROPERTIES.CREATE_ROOM(propertyId), values);
    return response.data;
  },
};
