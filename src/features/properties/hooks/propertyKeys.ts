export const propertyKeys = {
  all: ['owner-properties'] as const,
  overview: () => [...propertyKeys.all, 'overview'] as const,
  mutations: {
    createProperty: () => [...propertyKeys.all, 'create-property'] as const,
    updateSettings: () => [...propertyKeys.all, 'update-settings'] as const,
    createRoom: () => [...propertyKeys.all, 'create-room'] as const,
    updateRoomPricing: () => [...propertyKeys.all, 'update-room-pricing'] as const,
  },
} as const;
