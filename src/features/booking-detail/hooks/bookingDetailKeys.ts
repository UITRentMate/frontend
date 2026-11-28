export const bookingDetailKeys = {
  all: ['booking-detail'] as const,
  details: () => [...bookingDetailKeys.all, 'detail'] as const,
  detail: (roomId: string) => [...bookingDetailKeys.details(), roomId] as const,
  mutations: {
    initiatePayment: () => [...bookingDetailKeys.all, 'mutation', 'initiate-payment'] as const,
  },
};
