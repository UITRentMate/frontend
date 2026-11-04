import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import { authKeys } from './authKeys';
import type { RegisterCredentials, RegisterResponseData } from '../types/auth.types';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponseData, Error, RegisterCredentials>({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}

export default useRegister;
