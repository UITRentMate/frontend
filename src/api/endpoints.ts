export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    ME: '/users/me',
    CHANGE_PASSWORD: '/users/me/password',
  },
  ROOMS: {
    LIST: '/rooms',
    DETAIL: (id: string) => `/rooms/${id}`,
  },
  RENTAL: {
    ROOM_INFO: (id: string) => `/rooms/${id}/rental-info`,
    TENANT_PROFILE: '/user/profile/tenant',
    REQUESTS: '/rental-requests',
  },
} as const;
