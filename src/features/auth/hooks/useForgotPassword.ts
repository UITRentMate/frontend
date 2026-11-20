import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import { authKeys } from './authKeys';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '../types/auth.types';

export function useForgotPassword() {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationKey: authKeys.forgotPassword(),
    mutationFn: (payload: ForgotPasswordRequest) => authApi.forgotPassword(payload),
  });
}

export default useForgotPassword;
