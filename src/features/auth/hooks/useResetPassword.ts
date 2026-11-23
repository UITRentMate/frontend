import { useMutation } from '@tanstack/react-query';

import { authApi } from '../services/authApi';
import type { ResetPasswordPayload, ResetPasswordResponse } from '../types/auth.types';
import { authKeys } from './authKeys';

export function useResetPassword() {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationKey: authKeys.resetPassword(),
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
  });
}

export default useResetPassword;
