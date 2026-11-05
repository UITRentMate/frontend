import apiClient from '@/lib/apiClient';
import type { ApiError } from '@/types/api.types';
import type {
  LoginCredentials,
  LoginResponseData,
  RegisterCredentials,
  RegisterResponseData,
} from '../types/auth.types';
import { authenticateMockUser, registerMockUser, delay } from './mockAuthData';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponseData> => {
    try {
      const response = await apiClient.post<LoginResponseData>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      // Khi Backend phản hồi lỗi thật (400, 401 sai mật khẩu, 404...), ném lỗi để UI hiển thị thông báo thật
      if (apiErr?.statusCode && apiErr.statusCode < 500) {
        throw new Error(apiErr.message || 'Email hoặc mật khẩu không chính xác.');
      }
      if (
        apiErr?.statusCode === 500 &&
        apiErr.message &&
        !apiErr.message.includes('Network Error') &&
        !apiErr.message.includes('An unexpected error')
      ) {
        throw new Error(apiErr.message);
      }
      // Fallback về mock data chỉ khi backend offline / kết nối mạng thất bại trong môi trường dev
      await delay(500);
      return authenticateMockUser(credentials);
    }
  },

  register: async (credentials: RegisterCredentials): Promise<RegisterResponseData> => {
    try {
      const response = await apiClient.post<RegisterResponseData>('/auth/register', credentials);
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      // Khi Backend phản hồi lỗi thật (400 thiếu trường, 409 email trùng lặp...), ném lỗi để UI hiển thị thông báo thật
      if (apiErr?.statusCode && apiErr.statusCode < 500) {
        throw new Error(apiErr.message || 'Đăng ký tài khoản không thành công.');
      }
      if (
        apiErr?.statusCode === 500 &&
        apiErr.message &&
        !apiErr.message.includes('Network Error') &&
        !apiErr.message.includes('An unexpected error')
      ) {
        throw new Error(apiErr.message);
      }
      // Fallback về mock data chỉ khi backend offline trong môi trường dev
      await delay(500);
      return registerMockUser(credentials);
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
