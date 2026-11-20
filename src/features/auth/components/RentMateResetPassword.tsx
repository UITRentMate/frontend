// 1. Thư viện bên ngoài (React, Router)
import React, { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// 2. Cấu hình, hằng số và layouts toàn cục (@/)
import { ROUTES } from '@/routes/paths';
import AuthLayout from '@/layouts/AuthLayout';

// 3. Components & Icons dùng chung (@/components)
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckCircle2Icon,
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from '@/components/ui/icons';

// 4. Hooks nội bộ feature
import { useResetPassword } from '../hooks/useResetPassword';

// 5. Types nội bộ feature (Centralized Types)
import type { RentMateResetPasswordProps } from '../types';

const SPECIAL_OR_NUMBER_REGEX = /[0-9!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'~`]/;

const STRENGTH_CONFIG = [
  { label: 'Chưa nhập', textClass: 'text-text-muted', barClass: 'bg-surface-accent' },
  { label: 'Yếu', textClass: 'text-danger', barClass: 'bg-danger' },
  { label: 'Trung bình', textClass: 'text-warning', barClass: 'bg-warning' },
  { label: 'Khá', textClass: 'text-brand-400', barClass: 'bg-brand-400' },
  { label: 'Mạnh', textClass: 'text-secondary-500', barClass: 'bg-secondary-500' },
] as const;

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const resetPasswordMutation = useResetPassword();
  const isPending = resetPasswordMutation.isPending;

  // Tiêu chí kiểm tra mật khẩu realtime
  const hasMinLength = newPassword.length >= 8;
  const hasNumberOrSpecial = SPECIAL_OR_NUMBER_REGEX.test(newPassword);

  // Tính điểm độ mạnh mật khẩu từ 0 đến 4
  const strengthScore = useMemo<number>(() => {
    if (!newPassword) return 0;
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasNumberOrSpecial) score += 1;
    if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) score += 1;
    if (
      newPassword.length >= 12 ||
      (/[0-9]/.test(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword))
    ) {
      score += 1;
    }
    return Math.max(1, Math.min(4, score));
  }, [newPassword, hasMinLength, hasNumberOrSpecial]);

  const currentStrength = STRENGTH_CONFIG[strengthScore];

  // Lỗi mật khẩu mới khi người dùng đã bấm submit nhưng chưa đạt tiêu chí
  const newPasswordError = useMemo<string | undefined>(() => {
    if (!hasSubmitted) return undefined;
    if (newPassword.trim().length < 8) {
      return 'Mật khẩu mới phải có tối thiểu 8 ký tự.';
    }
    if (newPassword.length > 128) {
      return 'Mật khẩu mới không được vượt quá 128 ký tự.';
    }
    if (!hasNumberOrSpecial) {
      return 'Mật khẩu mới cần chứa ít nhất một chữ số hoặc ký tự đặc biệt.';
    }
    return undefined;
  }, [hasSubmitted, newPassword, hasNumberOrSpecial]);

  // Lỗi xác nhận mật khẩu hiển thị realtime khi đã nhập hoặc sau khi bấm submit
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

    if (!resetToken) {
      setErrorMessage(
        'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu gửi lại email.'
      );
      return;
    }

    if (newPassword.trim().length < 8 || !hasNumberOrSpecial) {
      setErrorMessage(
        'Mật khẩu mới chưa đáp ứng đủ tiêu chí bảo mật. Vui lòng kiểm tra lại các yêu cầu bên dưới.'
      );
      return;
    }

    if (newPassword.length > 128) {
      setErrorMessage('Mật khẩu mới không được vượt quá 128 ký tự.');
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
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể đặt lại mật khẩu. Liên kết có thể đã hết hạn hoặc không hợp lệ.';
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
          /* TRẠNG THÁI ĐẶT LẠI MẬT KHẨU THÀNH CÔNG */
          <div className="flex flex-col items-center text-center py-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-secondary-50 border border-secondary-200 text-secondary-500 flex items-center justify-center mb-5">
              <CheckCircle2Icon className="w-9 h-9 text-secondary-500" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary tracking-tight">
              Đặt lại mật khẩu thành công!
            </h1>

            <p className="text-sm text-text-muted mt-2 mb-8 leading-relaxed font-sans max-w-sm">
              Mật khẩu tài khoản RentMate của bạn đã được cập nhật an toàn. Bạn có thể đăng nhập ngay bằng mật khẩu mới.
            </p>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full h-11 rounded-md cursor-pointer"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Đăng nhập ngay
            </Button>
          </div>
        ) : (
          /* BIỂU MẪU ĐẶT LẠI MẬT KHẨU */
          <>
            {/* 1. Khối tiêu đề */}
            <div>
              <h1 className="text-3xl font-bold font-heading text-text-primary tracking-tight">
                Đặt lại mật khẩu
              </h1>
              <p className="text-sm text-text-muted mt-1.5 font-sans">
                Tạo mật khẩu mới để tiếp tục sử dụng tài khoản RentMate.
              </p>
            </div>

            {/* Alert lỗi từ client/API */}
            {errorMessage && (
              <div
                role="alert"
                className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-danger-soft border border-danger-border text-xs text-danger animate-in fade-in duration-200"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircleIcon className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
                {(errorMessage.toLowerCase().includes('hết hạn') ||
                  errorMessage.toLowerCase().includes('không hợp lệ') ||
                  errorMessage.toLowerCase().includes('token')) && (
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
              {/* 2. Trường "Mật khẩu mới" */}
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
                  disabled={isPending}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Nhập tối thiểu 8 ký tự"
                  error={newPasswordError}
                  leftIcon={<LockIcon className="w-4 h-4 text-text-muted" />}
                  rightElement={
                    <button
                      type="button"
                      tabIndex={-1}
                      disabled={isPending}
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

                {/* Thanh tiến trình độ mạnh mật khẩu (4 đoạn) */}
                <div className="grid grid-cols-4 gap-1.5 mt-2.5" aria-hidden="true">
                  {[1, 2, 3, 4].map((segment) => (
                    <div
                      key={segment}
                      className={`h-1 rounded-full transition-colors duration-200 ${
                        strengthScore >= segment ? currentStrength.barClass : 'bg-surface-accent'
                      }`}
                    />
                  ))}
                </div>

                {/* Khối tiêu chí mật khẩu */}
                <div className="mt-3 p-3.5 rounded-lg bg-brand-50/70 border border-brand-100/80 flex flex-col gap-2 text-xs select-none">
                  <div
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      hasMinLength ? 'text-secondary-500 font-medium' : 'text-text-muted'
                    }`}
                  >
                    {hasMinLength ? (
                      <CheckCircle2Icon className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
                    ) : (
                      <CircleIcon className="w-3.5 h-3.5 text-text-disabled shrink-0" />
                    )}
                    <span>Tối thiểu 8 ký tự</span>
                  </div>

                  <div
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      hasNumberOrSpecial ? 'text-secondary-500 font-medium' : 'text-text-muted'
                    }`}
                  >
                    {hasNumberOrSpecial ? (
                      <CheckCircle2Icon className="w-3.5 h-3.5 text-secondary-500 shrink-0" />
                    ) : (
                      <CircleIcon className="w-3.5 h-3.5 text-text-disabled shrink-0" />
                    )}
                    <span>Chứa ít nhất một chữ số (0-9) hoặc ký tự đặc biệt (@, #, $, ...)</span>
                  </div>
                </div>
              </div>

              {/* 3. Trường "Xác nhận mật khẩu mới" */}
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
                  disabled={isPending}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Nhập lại mật khẩu mới"
                  error={confirmPasswordError}
                  leftIcon={<LockIcon className="w-4 h-4 text-text-muted" />}
                  rightElement={
                    <button
                      type="button"
                      tabIndex={-1}
                      disabled={isPending}
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

              {/* 4. Nút hành động chính & Link quay lại */}
              <div className="pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
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
