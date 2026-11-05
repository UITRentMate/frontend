import apiClient from '@/lib/apiClient';
import type { Room, RoomFilterParams } from '../types/room.types';
import { MOCK_ROOMS } from './mockData';

export const roomApi = {
  getRooms: async (filters?: RoomFilterParams): Promise<Room[]> => {
    try {
      const response = await apiClient.get<Room[]>('/rooms', { params: filters });
      return response.data;
    } catch {
      // Graceful fallback to mock data during frontend development
      let filtered = [...MOCK_ROOMS];
      if (filters?.campusZone) {
        filtered = filtered.filter((r) => r.campusZone.includes(filters.campusZone!));
      }
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.title.toLowerCase().includes(query) ||
            r.specificAddress.toLowerCase().includes(query)
        );
      }
      return filtered;
    }
  },

  getRoomById: async (id: string): Promise<Room | null> => {
    try {
      const response = await apiClient.get<Room>(`/rooms/${id}`);
      return response.data;
    } catch {
      const found = MOCK_ROOMS.find((r) => r.id === id);
      return found || null;
    }
  },
};

export default roomApi;
