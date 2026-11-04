import apiClient from '../../../lib/apiClient';
import type { LoginCredentials, LoginResponseData } from '../types/auth.types';
import { authenticateMockUser, delay } from './mockAuthData';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponseData> => {
    try {
      const response = await apiClient.post<LoginResponseData>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      return response.data;
    } catch {
      // Giả lập độ trễ mạng thực tế 500ms khi chạy mock
      await delay(500);
      return authenticateMockUser(credentials);
    }
  },

  getCurrentUser: async (): Promise<LoginResponseData['user'] | null> => {
    try {
      const response = await apiClient.get<LoginResponseData['user']>('/auth/me');
      return response.data;
    } catch {
      return null;
    }
  },
};

export default authApi;
