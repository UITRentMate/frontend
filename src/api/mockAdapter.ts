import { AxiosError, type AxiosAdapter, type AxiosResponse } from 'axios';

import type { ApiResponse } from '@/types';

import { mockPropertyManagementService } from '@/features/properties/services/mockPropertyManagementService';
import type {
  PropertyFormValues,
  PropertyManagementData,
  PropertySettingsValues,
} from '@/features/properties/types';
import type { RoomFormValues, RoomPricingFormValues } from '@/features/rooms/types';

import { ENDPOINTS } from './endpoints';

// Intercept only FE-06 endpoints. Other features keep the shared client's HTTP adapter.
export function createMockAdapter(httpAdapter: AxiosAdapter): AxiosAdapter {
  return async (config) => {
    const url = config.url ?? '';
    const method = config.method?.toLowerCase();
    const roomMatch = /^\/properties\/([^/]+)\/rooms$/.exec(url);
    const settingsMatch = /^\/properties\/([^/]+)\/settings$/.exec(url);
    const pricingMatch = /^\/properties\/([^/]+)\/rooms\/([^/]+)\/pricing$/.exec(url);

    const isOverview = method === 'get' && url === ENDPOINTS.PROPERTIES.OVERVIEW;
    const isCreateProperty = method === 'post' && url === ENDPOINTS.PROPERTIES.CREATE;
    const isUpdateSettings = method === 'patch' && settingsMatch !== null;
    const isCreateRoom = method === 'post' && roomMatch !== null;
    const isUpdatePricing = method === 'patch' && pricingMatch !== null;

    if (!isOverview && !isCreateProperty && !isUpdateSettings && !isCreateRoom && !isUpdatePricing) {
      return httpAdapter(config);
    }

    try {
      // Axios serializes the typed request body before invoking the adapter.
      const payload: unknown =
        typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      let data: ApiResponse<PropertyManagementData>;

      if (isOverview) {
        data = await mockPropertyManagementService.getOverview();
      } else if (isCreateProperty) {
        data = await mockPropertyManagementService.createProperty(payload as PropertyFormValues);
      } else if (isUpdateSettings && settingsMatch) {
        const body = payload as { values: PropertySettingsValues; isDraft?: boolean };
        data = await mockPropertyManagementService.updatePropertySettings({
          propertyId: decodeURIComponent(settingsMatch[1]),
          values: body.values,
          isDraft: body.isDraft,
        });
      } else if (isCreateRoom && roomMatch) {
        data = await mockPropertyManagementService.createRoom({
          propertyId: decodeURIComponent(roomMatch[1]),
          values: payload as RoomFormValues,
        });
      } else {
        const body = payload as { values: RoomPricingFormValues; copyToOtherRooms?: boolean };
        data = await mockPropertyManagementService.updateRoomPricing({
          propertyId: decodeURIComponent(pricingMatch?.[1] ?? ''),
          roomId: decodeURIComponent(pricingMatch?.[2] ?? ''),
          values: body.values,
          copyToOtherRooms: body.copyToOtherRooms,
        });
      }

      return { data, status: 200, statusText: 'OK', headers: {}, config };
    } catch (error: unknown) {
      const response: AxiosResponse<{ message: string }> = {
        data: {
          message: error instanceof Error ? error.message : 'Không thể xử lý yêu cầu khu trọ.',
        },
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config,
      };
      throw new AxiosError(
        response.data.message,
        AxiosError.ERR_BAD_REQUEST,
        config,
        undefined,
        response,
      );
    }
  };
}
