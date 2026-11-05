import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import { authKeys } from './authKeys';
import { tokenStorage } from '@/utils/tokenStorage';
import type { LoginCredentials, LoginResponseData } from '../types/auth.types';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponseData, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data, variables) => {
      // Lưu trữ phiên đăng nhập vào tokenStorage
      const rememberMe = Boolean(variables.rememberMe);
      tokenStorage.setAccessToken(data.tokens.accessToken, rememberMe);
      tokenStorage.setUser(data.user, rememberMe);

      // Cập nhật cache TanStack Query
      queryClient.setQueryData(authKeys.currentUser(), data.user);
    },
  });
}

export default useLogin;
