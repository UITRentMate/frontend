import apiClient from '@/lib/apiClient';
import type { ApiError } from '@/types/api.types';
import type {
  LoginCredentials,
  LoginResponseData,
  RegisterCredentials,
  RegisterResponseData,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from '../types/auth.types';
import {
  authenticateMockUser,
  registerMockUser,
  forgotPasswordMock,
  resetPasswordMock,
  delay,
} from './mockAuthData';

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

  forgotPassword: async (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      // Khi Backend phản hồi lỗi thật (400, 404 không tìm thấy email...), ném lỗi để UI hiển thị thông báo
      if (apiErr?.statusCode && apiErr.statusCode < 500) {
        throw new Error(apiErr.message || 'Không thể gửi yêu cầu đặt lại mật khẩu.');
      }
      if (
        apiErr?.statusCode === 500 &&
        apiErr.message &&
        !apiErr.message.includes('Network Error') &&
        !apiErr.message.includes('An unexpected error')
      ) {
        throw new Error(apiErr.message);
      }
      // Fallback về mock data khi backend offline trong môi trường dev
      return forgotPasswordMock(payload);
    }
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    try {
      const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', payload);
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      const statusCode = apiErr?.statusCode;

      // Map lỗi 4xx sang thông báo an toàn, không leak chi tiết nội bộ
      if (statusCode === 401 || statusCode === 404 || statusCode === 410) {
        throw new Error(
          'Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại email.'
        );
      }
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        throw new Error('Thông tin đặt lại mật khẩu không hợp lệ. Vui lòng kiểm tra lại.');
      }

      // Chỉ fallback về mock data trong môi trường dev khi backend offline / lỗi mạng
      const isNetworkOffline =
        !statusCode ||
        (statusCode === 500 &&
          (!apiErr.message ||
            apiErr.message.includes('Network Error') ||
            apiErr.message.includes('An unexpected error')));

      if (import.meta.env.DEV && isNetworkOffline) {
        return resetPasswordMock(payload);
      }

      // Không bao giờ trả raw HTTP 5xx hoặc Axios transport error lên UI
      throw new Error('Hệ thống đang gặp sự cố tạm thời. Vui lòng thử lại sau.');
    }
  },
};

export default authApi;
