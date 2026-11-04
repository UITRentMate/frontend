const ACCESS_TOKEN_KEY = 'rentmate_access_token';
const USER_DATA_KEY = 'rentmate_user_data';
const REMEMBER_ME_KEY = 'rentmate_remember_me';

/**
 * An toàn quản lý Token & User session qua localStorage (nếu rememberMe) hoặc sessionStorage
 */
export const tokenStorage = {
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken: (token: string, rememberMe: boolean = false): void => {
    if (rememberMe) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REMEMBER_ME_KEY);
    }
  },

  getUser: <T = unknown>(): T | null => {
    const raw = localStorage.getItem(USER_DATA_KEY) || sessionStorage.getItem(USER_DATA_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  setUser: <T = unknown>(user: T, rememberMe: boolean = false): void => {
    const serialized = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(USER_DATA_KEY, serialized);
      sessionStorage.removeItem(USER_DATA_KEY);
    } else {
      sessionStorage.setItem(USER_DATA_KEY, serialized);
      localStorage.removeItem(USER_DATA_KEY);
    }
  },

  isRemembered: (): boolean => {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  },

  clearAuth: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(USER_DATA_KEY);
  },
};

export default tokenStorage;
