// 2. Cấu hình, API client & endpoints toàn cục (@/)
import { ENDPOINTS } from '@/api/endpoints';
import apiClient from '@/lib/apiClient';
import type { ApiError } from '@/types/api.types';

// 5. Types & mock nội bộ feature
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginCredentials,
  LoginResponseData,
  RegisterCredentials,
  RegisterResponseData,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from '../types/auth.types';
import {
  authenticateMockUser,
  delay,
  forgotPasswordMock,
  registerMockUser,
  resetPasswordMock,
} from './mockAuthData';

function isNetworkOfflineError(apiErr: Partial<ApiError>): boolean {
  const statusCode = apiErr?.statusCode;
  return (
    !statusCode ||
    (statusCode === 500 &&
      (!apiErr.message ||
        apiErr.message.includes('Network Error') ||
        apiErr.message.includes('An unexpected error')))
  );
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponseData> => {
    try {
      const response = await apiClient.post<LoginResponseData>(ENDPOINTS.AUTH.LOGIN, {
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
      if (!import.meta.env.DEV) {
        throw new Error(apiErr?.message || 'Không thể kết nối máy chủ. Vui lòng thử lại sau.');
      }
      await delay(500);
      return authenticateMockUser(credentials);
    }
  },

  register: async (credentials: RegisterCredentials): Promise<RegisterResponseData> => {
    try {
      const response = await apiClient.post<RegisterResponseData>(
        ENDPOINTS.AUTH.REGISTER,
        credentials
      );
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
      if (!import.meta.env.DEV) {
        throw new Error(apiErr?.message || 'Không thể kết nối máy chủ. Vui lòng thử lại sau.');
      }
      await delay(500);
      return registerMockUser(credentials);
    }
  },

  getCurrentUser: async (): Promise<LoginResponseData['user'] | null> => {
    try {
      const response = await apiClient.get<LoginResponseData['user']>(ENDPOINTS.AUTH.ME);
      return response.data;
    } catch {
      return null;
    }
  },

  forgotPassword: async (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>(
        ENDPOINTS.AUTH.FORGOT_PASSWORD,
        payload
      );
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      const statusCode = apiErr?.statusCode;

      if (statusCode && statusCode >= 400 && statusCode < 500) {
        throw new Error(apiErr.message || 'Không thể gửi yêu cầu đặt lại mật khẩu.');
      }

      // Chỉ fallback về mock data trong môi trường dev khi backend offline / lỗi mạng
      if (import.meta.env.DEV && isNetworkOfflineError(apiErr)) {
        return forgotPasswordMock(payload);
      }

      throw new Error('Hệ thống đang gặp sự cố tạm thời. Vui lòng thử lại sau.');
    }
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    try {
      const response = await apiClient.post<ResetPasswordResponse>(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        payload
      );
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      const statusCode = apiErr?.statusCode;

      // Map lỗi 4xx sang thông báo an toàn, không leak chi tiết nội bộ
      if (statusCode === 401 || statusCode === 404 || statusCode === 410) {
        const tokenError = new Error(
          'Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại email.'
        );
        tokenError.name = 'ResetTokenError';
        throw tokenError;
      }
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        throw new Error('Thông tin đặt lại mật khẩu không hợp lệ. Vui lòng kiểm tra lại.');
      }

      // Chỉ fallback về mock data trong môi trường dev khi backend offline / lỗi mạng
      if (import.meta.env.DEV && isNetworkOfflineError(apiErr)) {
        return resetPasswordMock(payload);
      }

      // Không bao giờ trả raw HTTP 5xx hoặc Axios transport error lên UI
      throw new Error('Hệ thống đang gặp sự cố tạm thời. Vui lòng thử lại sau.');
    }
  },
};

export default authApi;
