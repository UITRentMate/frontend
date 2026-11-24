export const rentalRequestKeys = {
  all: ['rental-request'] as const,
  details: () => [...rentalRequestKeys.all, 'detail'] as const,
  roomDetail: (roomId: string) => [...rentalRequestKeys.details(), roomId] as const,
  tenantProfile: () => [...rentalRequestKeys.all, 'tenant-profile'] as const,
};
