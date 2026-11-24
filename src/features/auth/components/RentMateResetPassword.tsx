import React, { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import AuthLayout from '@/layouts/AuthLayout';
import {
  hasMinPasswordLength,
  hasPasswordNumberOrSpecial,
  hasValidPasswordLength,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/utils';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from '@/components/ui/icons';

import { useResetPassword } from '../hooks/useResetPassword';
import type { RentMateResetPasswordProps } from '../types';
import { PasswordStrengthMeter, usePasswordStrength } from './PasswordStrengthMeter';
import { ResetPasswordSuccessView } from './ResetPasswordSuccessView';

export const RentMateResetPassword: React.FC<RentMateResetPasswordProps> = ({
  onSuccess,
  className = '',
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Lưu token vào state và xóa khỏi URL ngay khi mount để tránh lộ token qua lịch sử trình duyệt
  const [resetToken] = useState<string>(() => searchParams.get('token')?.trim() ?? '');

  useEffect(() => {
    if (searchParams.has('token')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('token');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    resetToken
      ? null
      : 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu gửi lại email.'
  );
  const [isTokenError, setIsTokenError] = useState<boolean>(() => !resetToken);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const resetPasswordMutation = useResetPassword();
  const isPending = resetPasswordMutation.isPending;

  const hasMinLength = hasMinPasswordLength(newPassword);
  const hasNumberOrSpecial = hasPasswordNumberOrSpecial(newPassword);
  const currentStrength = usePasswordStrength(newPassword, hasMinLength, hasNumberOrSpecial);

  const newPasswordError = useMemo<string | undefined>(() => {
    if (!hasSubmitted) return undefined;
    if (newPassword.trim().length < PASSWORD_MIN_LENGTH) {
      return `Mật khẩu mới phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự.`;
    }
    if (newPassword.length > PASSWORD_MAX_LENGTH) {
      return `Mật khẩu mới không được vượt quá ${PASSWORD_MAX_LENGTH} ký tự.`;
    }
    if (!hasNumberOrSpecial) {
      return 'Mật khẩu mới cần chứa ít nhất một chữ số hoặc ký tự đặc biệt.';
    }
    return undefined;
  }, [hasSubmitted, newPassword, hasNumberOrSpecial]);

  const confirmPasswordError = useMemo<string | undefined>(() => {
    if (!confirmPassword && hasSubmitted) {
      return 'Vui lòng nhập lại mật khẩu mới.';
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      return 'Mật khẩu xác nhận không trùng khớp.';
    }
    return undefined;
  }, [confirmPassword, newPassword, hasSubmitted]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrorMessage(null);
    setIsTokenError(false);

    if (!resetToken) {
      setIsTokenError(true);
      setErrorMessage(
        'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu gửi lại email.'
      );
      return;
    }

    if (!hasValidPasswordLength(newPassword) || !hasNumberOrSpecial) {
      setErrorMessage(
        'Mật khẩu mới chưa đáp ứng đủ tiêu chí bảo mật. Vui lòng kiểm tra lại các yêu cầu bên dưới.'
      );
      return;
    }

    if (!confirmPassword || confirmPassword !== newPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp với mật khẩu mới.');
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token: resetToken,
        newPassword,
        confirmPassword,
      });
      setNewPassword('');
      setConfirmPassword('');
      setIsCompleted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const isInvalidToken = err instanceof Error && err.name === 'ResetTokenError';
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể đặt lại mật khẩu. Liên kết có thể đã hết hạn hoặc không hợp lệ.';
      setIsTokenError(isInvalidToken);
      setErrorMessage(message);
    }
  };

  return (
    <AuthLayout
      headline="Bảo mật tài khoản của bạn"
      subtext="Một mật khẩu an toàn giúp bảo vệ thông tin và hoạt động thuê trọ của bạn."
      imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85"
      className={className}
    >
      <div className="max-w-md w-full space-y-6">
        {isCompleted ? (
          <ResetPasswordSuccessView onNavigateLogin={() => navigate(ROUTES.LOGIN)} />
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold font-heading text-text-primary tracking-tight">
                Đặt lại mật khẩu
              </h1>
              <p className="text-sm text-text-muted mt-1.5 font-sans">
                Tạo mật khẩu mới để tiếp tục sử dụng tài khoản RentMate.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex flex-col gap-1.5 p-3.5 rounded-sm bg-danger-soft border border-danger-border text-xs text-danger"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircleIcon className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
                {isTokenError && (
                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="ml-6.5 font-semibold text-brand-500 hover:underline w-fit"
                  >
                    Yêu cầu gửi lại liên kết mới →
                  </Link>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="reset-new-password"
                    className="text-sm font-medium text-text-primary"
                  >
                    Mật khẩu mới <span className="text-danger">*</span>
                  </label>
                  <span className={`text-xs font-medium transition-colors ${currentStrength.textClass}`}>
                    {currentStrength.label}
                  </span>
                </div>

                <Input
                  id="reset-new-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  disabled={isPending || !resetToken}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errorMessage && !isTokenError) setErrorMessage(null);
                  }}
                  placeholder="Nhập tối thiểu 8 ký tự"
                  error={newPasswordError}
                  leftIcon={<LockIcon className="w-4 h-4 text-text-muted" />}
                  rightElement={
                    <button
                      type="button"
                      disabled={isPending || !resetToken}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Ẩn mật khẩu mới' : 'Hiện mật khẩu mới'}
                      className="text-text-muted hover:text-text-primary transition p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  }
                  className="py-2.5"
                />

                <PasswordStrengthMeter
                  password={newPassword}
                  hasMinLength={hasMinLength}
                  hasNumberOrSpecial={hasNumberOrSpecial}
                />
              </div>

              <div>
                <label
                  htmlFor="reset-confirm-password"
                  className="text-sm font-medium text-text-primary block mb-1.5"
                >
                  Xác nhận mật khẩu mới <span className="text-danger">*</span>
                </label>

                <Input
                  id="reset-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  disabled={isPending || !resetToken}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage && !isTokenError) setErrorMessage(null);
                  }}
                  placeholder="Nhập lại mật khẩu mới"
                  error={confirmPasswordError}
                  leftIcon={<LockIcon className="w-4 h-4 text-text-muted" />}
                  rightElement={
                    <button
                      type="button"
                      disabled={isPending || !resetToken}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? 'Ẩn xác nhận mật khẩu' : 'Hiện xác nhận mật khẩu'
                      }
                      className="text-text-muted hover:text-text-primary transition p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                  }
                  className="py-2.5"
                />
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!resetToken}
                  isLoading={isPending}
                  className="w-full h-11 rounded-md cursor-pointer"
                >
                  {isPending ? 'Đang cập nhật mật khẩu...' : 'Đặt lại mật khẩu'}
                </Button>

                <div className="mt-5 flex justify-center">
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-sm font-medium text-text-muted hover:text-brand-500 transition flex items-center gap-1.5 group select-none"
                  >
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Hủy và quay lại đăng nhập</span>
                  </Link>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default RentMateResetPassword;
