import { ENDPOINTS } from '@/api/endpoints';
import { apiClient } from '@/lib/apiClient';
import type { ApiResponse } from '@/types';

import type { CreateManagedRoomInput, UpdateRoomPricingInput } from '@/features/rooms/types';

import type {
  PropertyFormValues,
  PropertyManagementData,
  UpdatePropertySettingsInput,
} from '../types';

export const propertyApi = {
  async getOverview(): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.get<ApiResponse<PropertyManagementData>>(
      ENDPOINTS.PROPERTIES.OVERVIEW,
    );
    return response.data;
  },

  async createProperty(values: PropertyFormValues): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.post<ApiResponse<PropertyManagementData>>(
      ENDPOINTS.PROPERTIES.CREATE,
      values,
    );
    return response.data;
  },

  async updatePropertySettings({
    propertyId,
    values,
    isDraft,
  }: UpdatePropertySettingsInput): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.patch<ApiResponse<PropertyManagementData>>(
      ENDPOINTS.PROPERTIES.UPDATE_SETTINGS(propertyId),
      { values, isDraft },
    );
    return response.data;
  },

  async createRoom({
    propertyId,
    values,
  }: CreateManagedRoomInput): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.post<ApiResponse<PropertyManagementData>>(
      ENDPOINTS.PROPERTIES.CREATE_ROOM(propertyId),
      values,
    );
    return response.data;
  },

  async updateRoomPricing({
    propertyId,
    roomId,
    values,
    copyToOtherRooms,
  }: UpdateRoomPricingInput): Promise<ApiResponse<PropertyManagementData>> {
    const response = await apiClient.patch<ApiResponse<PropertyManagementData>>(
      ENDPOINTS.PROPERTIES.UPDATE_ROOM_PRICING(propertyId, roomId),
      { values, copyToOtherRooms },
    );
    return response.data;
  },
};
