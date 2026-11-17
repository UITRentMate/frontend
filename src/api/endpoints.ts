// Proposed FE-06 endpoints. Confirm these contracts when integrating the backend.
export const ENDPOINTS = {
  PROPERTIES: {
    OVERVIEW: '/properties/management',
    CREATE: '/properties',
    CREATE_ROOM: (propertyId: string) => `/properties/${encodeURIComponent(propertyId)}/rooms`,
  },
} as const;
