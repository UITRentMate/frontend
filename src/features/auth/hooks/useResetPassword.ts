import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authApi';
import { authKeys } from './authKeys';
import type { ResetPasswordPayload, ResetPasswordResponse } from '../types/auth.types';

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationKey: authKeys.resetPassword(),
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
  });
}

export default useResetPassword;
