/**
 * Query Key Factory cho phân hệ Authentication RentMate
 * Đảm bảo tính nhất quán của cache state theo chuẩn TanStack Query v5
 */
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
  session: () => [...authKeys.all, 'session'] as const,
} as const;

export default authKeys;
