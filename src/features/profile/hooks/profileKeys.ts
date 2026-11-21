/**
 * Query Key Factory cho phân hệ Profile / Account Settings của RentMate
 */
export const profileKeys = {
  all: ['profile'] as const,
  detail: () => [...profileKeys.all, 'detail'] as const,
  update: () => [...profileKeys.all, 'update'] as const,
  changePassword: () => [...profileKeys.all, 'changePassword'] as const,
} as const;

export default profileKeys;
