/**
 * Centralized Query Key Factory
 * Ensures consistent cache invalidation and query keys across features
 */
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
  },
  rooms: {
    all: ['rooms'] as const,
    lists: () => [...queryKeys.rooms.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.rooms.lists(), { ...(filters || {}) }] as const,
    details: () => [...queryKeys.rooms.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.rooms.details(), id] as const,
  },
  barter: {
    all: ['barter'] as const,
    proposals: () => [...queryKeys.barter.all, 'proposals'] as const,
    proposal: (id: string | number) => [...queryKeys.barter.proposals(), id] as const,
  },
  users: {
    all: ['users'] as const,
    profile: (id: string) => [...queryKeys.users.all, 'profile', id] as const,
  },
} as const;

export default queryKeys;
