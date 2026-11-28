export const bookingConfirmationKeys = {
  all: ['booking-confirmation'] as const,
  details: () => [...bookingConfirmationKeys.all, 'detail'] as const,
  detail: (roomId: string) => [...bookingConfirmationKeys.details(), roomId] as const,
  mutations: {
    confirm: () => [...bookingConfirmationKeys.all, 'mutation', 'confirm'] as const,
  },
};
