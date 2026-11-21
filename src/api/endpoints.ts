// Proposed FE-06 endpoints. Confirm these contracts when integrating the backend.
export const ENDPOINTS = {
  PROPERTIES: {
    OVERVIEW: '/properties/management',
    CREATE: '/properties',
    UPDATE_SETTINGS: (propertyId: string) => `/properties/${encodeURIComponent(propertyId)}/settings`,
    CREATE_ROOM: (propertyId: string) => `/properties/${encodeURIComponent(propertyId)}/rooms`,
    UPDATE_ROOM_PRICING: (propertyId: string, roomId: string) =>
      `/properties/${encodeURIComponent(propertyId)}/rooms/${encodeURIComponent(roomId)}/pricing`,
  },
} as const;
