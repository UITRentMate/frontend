export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  USERS: {
    ME: '/users/me',
    CHANGE_PASSWORD: '/users/me/password',
  },
  ROOMS: {
    LIST: '/rooms',
    DETAIL: (id: string) => `/rooms/${id}`,
  },
} as const;
