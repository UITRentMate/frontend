import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';
import { tokenStorage } from '@/utils/tokenStorage';

import { authKeys } from '@/features/auth/hooks/authKeys';

import { profileApi } from '../services/profileApi';
import { profileKeys } from './profileKeys';
import type { UpdateProfilePayload, UpdateProfileResponse } from '../types';

const MAX_STORAGE_DATA_URL_LENGTH = 256 * 1024; // Tránh vượt quota ~5MB của Web Storage

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user, setUser, logout } = useAuth();

  return useMutation<UpdateProfileResponse, Error, UpdateProfilePayload>({
    mutationKey: profileKeys.update(),
    mutationFn: (payload: UpdateProfilePayload) => {
      if (!user) {
        return Promise.reject(
          new Error('Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.')
        );
      }
      return profileApi.updateProfile(payload, user);
    },
    onSuccess: (data) => {
      // 1. Đồng bộ AuthContext
      setUser(data.user);

      // 2. Lưu vào tokenStorage an toàn (bỏ qua data URL quá lớn để không chạm QuotaExceededError)
      const isOversizedDataUrl =
        typeof data.user.avatarUrl === 'string' &&
        data.user.avatarUrl.startsWith('data:') &&
        data.user.avatarUrl.length > MAX_STORAGE_DATA_URL_LENGTH;

      const userForStorage = isOversizedDataUrl
        ? { ...data.user, avatarUrl: user?.avatarUrl }
        : data.user;
      tokenStorage.setUser(userForStorage, tokenStorage.isRemembered());

      // 3. Cập nhật & làm mới cache TanStack Query liên quan
      queryClient.setQueryData(authKeys.currentUser(), data.user);
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
    onError: () => {
      // Nếu interceptor đã xóa token do 401 Unauthorized, đồng bộ đăng xuất ngay trên AuthContext
      if (!tokenStorage.getAccessToken()) {
        logout();
      }
    },
  });
}

export default useUpdateProfile;
