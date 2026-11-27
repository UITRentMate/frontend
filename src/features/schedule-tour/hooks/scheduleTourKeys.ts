export const scheduleTourKeys = {
  all: ['schedule-tour'] as const,
  lists: () => [...scheduleTourKeys.all, 'list'] as const,
  details: () => [...scheduleTourKeys.all, 'detail'] as const,
  detail: (roomId: string) => [...scheduleTourKeys.details(), roomId] as const,
  slots: (roomId: string, date: string) => [...scheduleTourKeys.all, 'slots', roomId, date] as const,
  mutations: {
    book: () => [...scheduleTourKeys.all, 'mutation', 'book'] as const,
  },
};
