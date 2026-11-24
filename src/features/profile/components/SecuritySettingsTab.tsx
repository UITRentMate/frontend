// 1. Thư viện bên ngoài (React, Router)
import React, { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

// 2. Cấu hình, hằng số & tiện ích toàn cục (@/)
import { ROUTES } from '@/routes/paths';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  hasMinPasswordLength,
  hasPasswordNumberOrSpecial,
  hasValidMaxPasswordLength,
  validateChangePasswordRules,
} from '@/utils';

// 3. Components & Icons dùng chung (@/components)
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  EyeIcon,
  EyeOffIcon,
} from '@/components/ui/icons';

// 4. Hooks nội bộ feature
import { useChangePassword } from '../hooks/useChangePassword';

// 5. Types nội bộ feature (Centralized Types)
import type { SecuritySettingsTabProps } from '../types';

export const SecuritySettingsTab: React.FC<SecuritySettingsTabProps> = ({ className = '' }) => {
  const changePasswordMutation = useChangePassword();
  const resetMutationRef = useRef(changePasswordMutation.reset);
  resetMutationRef.current = changePasswordMutation.reset;
  const isPending = changePasswordMutation.isPending;

  useEffect(() => {
    return () => {
      resetMutationRef.current();
    };
  }, []);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAllEmpty = !currentPassword && !newPassword && !confirmPassword;
  const hasMinLength = hasMinPasswordLength(newPassword);
  const hasValidMaxLength = hasValidMaxPasswordLength(newPassword);
  const hasNumberOrSpecial = hasPasswordNumberOrSpecial(newPassword);
  const isNewPasswordRuleMet = hasMinLength && hasValidMaxLength && hasNumberOrSpecial;

  const currentPasswordError = useMemo<string | undefined>(() => {
    if (hasSubmitted && !currentPassword) {
      return 'Vui lòng nhập mật khẩu hiện tại.';
    }
    return undefined;
  }, [hasSubmitted, currentPassword]);

  const newPasswordError = useMemo<string | undefined>(() => {
    if (!hasSubmitted) return undefined;
    if (!hasMinLength) {
      return `Mật khẩu mới phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự.`;
    }
    if (!hasValidMaxLength) {
      return `Mật khẩu mới không được vượt quá ${PASSWORD_MAX_LENGTH} ký tự.`;
    }
    if (!hasNumberOrSpecial) {
      return 'Mật khẩu mới phải bao gồm ít nhất 1 số hoặc ký tự đặc biệt.';
    }
    if (currentPassword && newPassword === currentPassword) {
      return 'Mật khẩu mới không được trùng với mật khẩu hiện tại.';
    }
    return undefined;
  }, [hasSubmitted, hasMinLength, hasValidMaxLength, hasNumberOrSpecial, currentPassword, newPassword]);

  const confirmPasswordError = useMemo<string | undefined>(() => {
    if (!confirmPassword && hasSubmitted) {
      return 'Vui lòng xác nhận mật khẩu mới.';
    }
    if (confirmPassword && confirmPassword !== newPassword) {
      return 'Xác nhận mật khẩu mới không trùng khớp.';
    }
    return undefined;
  }, [confirmPassword, newPassword, hasSubmitted]);

  const resetAllFields = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setHasSubmitted(false);
    changePasswordMutation.reset();
  };

  const handleCancel = () => {
    resetAllFields();
    setFormError(null);
    setSuccessMessage(null);
  };

  const clearFeedback = () => {
    if (formError) setFormError(null);
    if (successMessage) setSuccessMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    setFormError(null);
    setSuccessMessage(null);

    const validationError = validateChangePasswordRules({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      const response = await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      resetAllFields();
      setFormError(null);
      const nextMessage =
        typeof response?.message === 'string' && response.message.trim()
          ? response.message
          : 'Đổi mật khẩu thành công!';
      setSuccessMessage(nextMessage);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể đổi mật khẩu lúc này. Vui lòng thử lại sau.';
      setFormError(message);
    }
  };

  const renderVisibilityToggle = (
    isVisible: boolean,
    onToggle: () => void,
    showLabel: string,
    hideLabel: string
  ) => (
    <button
      type="button"
      disabled={isPending}
      onClick={onToggle}
      aria-label={isVisible ? hideLabel : showLabel}
      className="text-text-muted hover:text-text-primary transition p-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isVisible ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
    </button>
  );

  return (
    <div
      id="profile-panel-security"
      role="tabpanel"
      aria-labelledby="profile-tab-security"
      className={`mt-6 bg-surface-card rounded-xl border border-border-subtle shadow-soft-sm p-6 sm:p-8 ${className}`}
    >
      {/* 1. Tiêu đề khối */}
      <h2 className="text-lg font-bold font-heading text-text-primary">Đổi mật khẩu</h2>

      {/* 2. Hộp thông báo liên kết Google */}
      <div className="mt-4 mb-6 flex items-start gap-2.5 p-3.5 rounded-lg bg-brand-50/70 border border-brand-100 text-xs text-text-secondary leading-relaxed">
        <AlertCircleIcon className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
        <p>
          Nếu tài khoản được liên kết qua Google và chưa thiết lập mật khẩu riêng, vui lòng đăng
          nhập bằng Google hoặc tạo mật khẩu qua luồng{' '}
          <Link to={ROUTES.FORGOT_PASSWORD} className="font-semibold text-brand-500 hover:underline">
            Quên mật khẩu
          </Link>
          .
        </p>
      </div>

      {/* Phản hồi lỗi validation / API */}
      {formError && (
        <div
          role="alert"
          className="mb-5 bg-danger-soft border border-danger-border text-danger rounded-lg p-3 text-xs flex items-start gap-2"
        >
          <AlertCircleIcon className="w-4 h-4 text-danger shrink-0 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      {/* Phản hồi đổi mật khẩu thành công */}
      {successMessage && (
        <div
          role="status"
          className="mb-5 bg-success-soft border border-success-border text-secondary-700 rounded-lg p-3 text-xs flex items-center gap-2 font-medium"
        >
          <CheckCircle2Icon className="w-4 h-4 text-secondary-500 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 3. Biểu mẫu 3 trường mật khẩu */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5 pb-6 border-b border-border-subtle/70">
          {/* Trường 1: Mật khẩu hiện tại */}
          <div>
            <label
              htmlFor="security-current-password"
              className="text-sm font-semibold text-text-primary block mb-1.5"
            >
              Mật khẩu hiện tại <span className="text-danger">*</span>
            </label>
            <Input
              id="security-current-password"
              type={showCurrent ? 'text' : 'password'}
              autoComplete="current-password"
              disabled={isPending}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                clearFeedback();
              }}
              placeholder="Nhập mật khẩu đang dùng"
              error={currentPasswordError}
              rightElement={renderVisibilityToggle(
                showCurrent,
                () => setShowCurrent((prev) => !prev),
                'Hiện mật khẩu hiện tại',
                'Ẩn mật khẩu hiện tại'
              )}
              className="py-2.5"
            />
          </div>

          {/* Trường 2: Mật khẩu mới */}
          <div>
            <label
              htmlFor="security-new-password"
              className="text-sm font-semibold text-text-primary block mb-1.5"
            >
              Mật khẩu mới <span className="text-danger">*</span>
            </label>
            <Input
              id="security-new-password"
              type={showNew ? 'text' : 'password'}
              autoComplete="new-password"
              disabled={isPending}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                clearFeedback();
              }}
              placeholder="Nhập mật khẩu mới"
              error={newPasswordError}
              rightElement={renderVisibilityToggle(
                showNew,
                () => setShowNew((prev) => !prev),
                'Hiện mật khẩu mới',
                'Ẩn mật khẩu mới'
              )}
              className="py-2.5"
            />

            {/* Ghi chú quy tắc mật khẩu */}
            <div
              className={`mt-2 flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                isNewPasswordRuleMet ? 'text-secondary-500 font-medium' : 'text-text-muted'
              }`}
            >
              {isNewPasswordRuleMet ? (
                <CheckCircle2Icon className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>Mật khẩu tối thiểu 8 ký tự, bao gồm ít nhất 1 số hoặc ký tự đặc biệt.</span>
            </div>
          </div>

          {/* Trường 3: Xác nhận mật khẩu mới */}
          <div>
            <label
              htmlFor="security-confirm-password"
              className="text-sm font-semibold text-text-primary block mb-1.5"
            >
              Xác nhận mật khẩu mới <span className="text-danger">*</span>
            </label>
            <Input
              id="security-confirm-password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              disabled={isPending}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearFeedback();
              }}
              placeholder="Nhập lại mật khẩu mới"
              error={confirmPasswordError}
              rightElement={renderVisibilityToggle(
                showConfirm,
                () => setShowConfirm((prev) => !prev),
                'Hiện xác nhận mật khẩu mới',
                'Ẩn xác nhận mật khẩu mới'
              )}
              className="py-2.5"
            />
          </div>
        </div>

        {/* 4. Thanh nút hành động */}
        <div className="pt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleCancel}
            disabled={isAllEmpty || isPending}
            className="border-border-subtle text-text-secondary hover:bg-brand-50/50 hover:border-brand-300 cursor-pointer"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isPending}
            disabled={isPending}
            className="cursor-pointer"
          >
            {isPending ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettingsTab;
