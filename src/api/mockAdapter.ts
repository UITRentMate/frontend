import { AxiosError, type AxiosAdapter, type AxiosResponse } from 'axios';

import type { ApiResponse } from '@/types';

import { mockPropertyManagementService } from '@/features/properties/services/mockPropertyManagementService';
import type { PropertyFormValues, PropertyManagementData } from '@/features/properties/types';
import type { RoomFormValues } from '@/features/rooms/types';

import { ENDPOINTS } from './endpoints';

// Intercept only FE-06 endpoints. Other features keep the shared client's HTTP adapter.
export function createMockAdapter(httpAdapter: AxiosAdapter): AxiosAdapter {
  return async (config) => {
    const url = config.url ?? '';
    const roomMatch = /^\/properties\/([^/]+)\/rooms$/.exec(url);
    const isOverview = config.method === 'get' && url === ENDPOINTS.PROPERTIES.OVERVIEW;
    const isCreateProperty = config.method === 'post' && url === ENDPOINTS.PROPERTIES.CREATE;
    const isCreateRoom = config.method === 'post' && roomMatch !== null;

    if (!isOverview && !isCreateProperty && !isCreateRoom) return httpAdapter(config);

    try {
      // Axios serializes the typed request body before invoking the adapter.
      const payload: unknown = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      let data: ApiResponse<PropertyManagementData>;
      if (isOverview) {
        data = await mockPropertyManagementService.getOverview();
      } else if (isCreateProperty) {
        data = await mockPropertyManagementService.createProperty(payload as PropertyFormValues);
      } else {
        data = await mockPropertyManagementService.createRoom({
          propertyId: decodeURIComponent(roomMatch?.[1] ?? ''),
          values: payload as RoomFormValues,
        });
      }
      return { data, status: 200, statusText: 'OK', headers: {}, config };
    } catch (error: unknown) {
      const response: AxiosResponse<{ message: string }> = {
        data: { message: error instanceof Error ? error.message : 'Không thể xử lý yêu cầu khu trọ.' },
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config,
      };
      throw new AxiosError(response.data.message, AxiosError.ERR_BAD_REQUEST, config, undefined, response);
    }
  };
}
