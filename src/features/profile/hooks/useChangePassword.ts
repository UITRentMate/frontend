import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';
import { tokenStorage } from '@/utils/tokenStorage';

import { profileApi } from '../services/profileApi';
import type { ChangePasswordPayload, ChangePasswordResponse } from '../types';
import { profileKeys } from './profileKeys';

export function useChangePassword() {
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();

  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationKey: profileKeys.changePassword(),
    gcTime: 0,
    mutationFn: (payload: ChangePasswordPayload) => {
      if (!user || !tokenStorage.getAccessToken()) {
        return Promise.reject(
          new Error('Không tìm thấy phiên đăng nhập hợp lệ. Vui lòng đăng nhập lại.')
        );
      }
      return profileApi.changePassword(payload);
    },
    onError: () => {
      // Đồng bộ AuthContext nếu interceptor đã xóa token do 401 hết phiên
      if (!tokenStorage.getAccessToken()) {
        logout();
      }
    },
    onSettled: () => {
      // Xóa ngay entry chứa mật khẩu plaintext khỏi MutationCache sau khi mutation kết thúc
      const mutationCache = queryClient.getMutationCache();
      mutationCache
        .findAll({ mutationKey: profileKeys.changePassword() })
        .forEach((mutation) => {
          mutationCache.remove(mutation);
        });
    },
  });
}

export default useChangePassword;
