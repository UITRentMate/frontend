export const depositPaymentKeys = {
  all: ['deposit-payment'] as const,
  details: () => [...depositPaymentKeys.all, 'detail'] as const,
  detail: (roomId: string) => [...depositPaymentKeys.details(), roomId] as const,
  mutations: {
    createTransaction: () => [...depositPaymentKeys.all, 'mutation', 'create'] as const,
  },
};
