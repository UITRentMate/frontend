import type { User } from '@/types';
import { isSafeAvatarUrl, validateChangePasswordRules } from '@/utils';

import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '../types';
import { validateAvatarFile } from '../utils/avatarValidation';

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

export async function updateProfileMock(
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

export async function changePasswordMock(
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> {
  await delay(500);

  const validationError = validateChangePasswordRules(payload);
  if (validationError) {
    throw new Error(validationError);
  }

  return {
    success: true,
    message: 'Đổi mật khẩu thành công!',
  };
}
