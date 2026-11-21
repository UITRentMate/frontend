import apiClient from '@/lib/apiClient';
import type { ApiError, User } from '@/types';

import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '../types';
import { isSafeAvatarUrl, validateAvatarFile } from '../utils/avatarValidation';

const PROFILE_ENDPOINT = '/users/me';
const CHANGE_PASSWORD_ENDPOINT = '/users/me/password';
const PASSWORD_NUMBER_OR_SPECIAL_REGEX = /[0-9!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'~`]/;

const validateChangePasswordPayload = (payload: ChangePasswordPayload): string | null => {
  if (!payload.currentPassword) {
    return 'Vui lòng nhập mật khẩu hiện tại.';
  }
  if (payload.newPassword.trim().length < 8) {
    return 'Mật khẩu mới phải có tối thiểu 8 ký tự.';
  }
  if (payload.newPassword.length > 128) {
    return 'Mật khẩu mới không được vượt quá 128 ký tự.';
  }
  if (!PASSWORD_NUMBER_OR_SPECIAL_REGEX.test(payload.newPassword)) {
    return 'Mật khẩu mới phải bao gồm ít nhất 1 số hoặc ký tự đặc biệt.';
  }
  if (payload.newPassword === payload.currentPassword) {
    return 'Mật khẩu mới không được trùng với mật khẩu hiện tại.';
  }
  if (payload.confirmPassword !== payload.newPassword) {
    return 'Xác nhận mật khẩu mới không trùng khớp.';
  }
  return null;
};

const delay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && isSafeAvatarUrl(reader.result)) {
        resolve(reader.result);
      } else {
        reject(new Error('Không thể đọc tệp ảnh đại diện hợp lệ.'));
      }
    };
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh đại diện.'));
    reader.readAsDataURL(file);
  });

async function updateProfileMock(
  payload: UpdateProfilePayload,
  currentUser: User
): Promise<UpdateProfileResponse> {
  await delay(500);

  const trimmedName = payload.name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 100) {
    throw new Error('Họ và tên phải từ 2 đến 100 ký tự.');
  }

  let nextAvatarUrl = currentUser.avatarUrl;
  if (payload.avatarFile) {
    const fileError = await validateAvatarFile(payload.avatarFile);
    if (fileError) {
      throw new Error(fileError);
    }
    nextAvatarUrl = await readFileAsDataUrl(payload.avatarFile);
  }

  return {
    user: {
      ...currentUser,
      name: trimmedName,
      avatarUrl: nextAvatarUrl,
    },
    message: 'Đã lưu thay đổi hồ sơ thành công!',
  };
}

async function changePasswordMock(
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> {
  await delay(500);

  const validationError = validateChangePasswordPayload(payload);
  if (validationError) {
    throw new Error(validationError);
  }

  return {
    success: true,
    message: 'Đổi mật khẩu thành công!',
  };
}

const isOfflineError = (apiErr: Partial<ApiError>): boolean => {
  const statusCode = apiErr?.statusCode;
  return (
    !statusCode ||
    (statusCode === 500 &&
      (!apiErr.message ||
        apiErr.message.includes('Network Error') ||
        apiErr.message.includes('An unexpected error')))
  );
};

export const profileApi = {
  updateProfile: async (
    payload: UpdateProfilePayload,
    currentUser: User
  ): Promise<UpdateProfileResponse> => {
    const trimmedName = payload.name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      throw new Error('Họ và tên phải từ 2 đến 100 ký tự.');
    }

    if (payload.avatarFile) {
      const fileError = await validateAvatarFile(payload.avatarFile);
      if (fileError) {
        throw new Error(fileError);
      }
    }

    try {
      if (payload.avatarFile) {
        const formData = new FormData();
        formData.append('name', trimmedName);
        formData.append('avatar', payload.avatarFile);

        // Bỏ Content-Type mặc định của apiClient để trình duyệt tự sinh boundary cho multipart/form-data
        const response = await apiClient.patch<UpdateProfileResponse>(PROFILE_ENDPOINT, formData, {
          headers: { 'Content-Type': undefined },
        });
        return response.data;
      }

      const response = await apiClient.patch<UpdateProfileResponse>(PROFILE_ENDPOINT, {
        name: trimmedName,
      });
      return response.data;
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      const statusCode = apiErr?.statusCode;

      if (statusCode === 401 || statusCode === 403) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      if (statusCode === 413) {
        throw new Error('Dung lượng ảnh đại diện vượt quá giới hạn cho phép (5MB).');
      }
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        throw new Error('Thông tin cập nhật không hợp lệ. Vui lòng kiểm tra lại.');
      }

      if (import.meta.env.DEV && isOfflineError(apiErr)) {
        return updateProfileMock(payload, currentUser);
      }

      throw new Error('Không thể cập nhật hồ sơ lúc này. Vui lòng thử lại sau.');
    }
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
    const validationError = validateChangePasswordPayload(payload);
    if (validationError) {
      throw new Error(validationError);
    }

    try {
      const response = await apiClient.put<ChangePasswordResponse | undefined>(
        CHANGE_PASSWORD_ENDPOINT,
        payload
      );
      const data = response.data;
      return {
        success: data?.success ?? true,
        message:
          typeof data?.message === 'string' && data.message.trim()
            ? data.message
            : 'Đổi mật khẩu thành công!',
      };
    } catch (error) {
      const apiErr = error as Partial<ApiError>;
      const statusCode = apiErr?.statusCode;

      if (statusCode === 400 || statusCode === 422) {
        throw new Error('Mật khẩu hiện tại không chính xác hoặc mật khẩu mới không hợp lệ.');
      }
      if (statusCode === 401 || statusCode === 403) {
        throw new Error('Mật khẩu hiện tại không chính xác hoặc phiên đăng nhập đã hết hạn.');
      }
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        throw new Error('Không thể đổi mật khẩu. Vui lòng kiểm tra lại thông tin.');
      }

      if (import.meta.env.DEV && isOfflineError(apiErr)) {
        return changePasswordMock(payload);
      }

      throw new Error('Không thể đổi mật khẩu lúc này. Vui lòng thử lại sau.');
    }
  },
};

export default profileApi;
