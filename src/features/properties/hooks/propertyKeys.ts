export const propertyKeys = {
  all: ['owner-properties'] as const,
  overview: () => [...propertyKeys.all, 'overview'] as const,
};
