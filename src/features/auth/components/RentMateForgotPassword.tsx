import React, { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';
import AuthLayout from '@/layouts/AuthLayout';
import { isValidEmail } from '@/utils';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  InfoIcon,
  MailIcon,
  SendIcon,
} from '@/components/ui/icons';

import { useForgotPassword } from '../hooks/useForgotPassword';
import type { RentMateForgotPasswordProps } from '../types';
import { ForgotPasswordSuccessView } from './ForgotPasswordSuccessView';

export const RentMateForgotPassword: React.FC<RentMateForgotPasswordProps> = ({
  onSuccess,
  className = '',
}) => {
  const [email, setEmail] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const forgotPasswordMutation = useForgotPassword();
  const isLoading = forgotPasswordMutation.isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldError(undefined);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setFieldError('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setFieldError('Địa chỉ email không đúng định dạng.');
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync({ email: trimmedEmail });
      setSubmittedEmail(trimmedEmail);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.';
      setErrorMessage(message);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setFieldError(undefined);
  };

  return (
    <AuthLayout
      headline="Lấy lại quyền truy cập tài khoản"
      subtext="Thực hiện vài bước đơn giản để tiếp tục tìm phòng và quản lý thuê trọ trên RentMate."
      imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85"
      className={className}
    >
      <div className="max-w-md w-full space-y-6">
        {isSubmitted ? (
          <ForgotPasswordSuccessView
            submittedEmail={submittedEmail}
            onResetForm={handleResetForm}
          />
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold text-text-primary font-heading tracking-tight">
                Quên mật khẩu?
              </h1>
              <p className="text-sm text-text-muted mt-1.5 font-sans leading-relaxed">
                Nhập email đã đăng ký RentMate. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 p-3.5 rounded-sm bg-danger-soft border border-danger-border text-xs text-danger"
              >
                <AlertCircleIcon className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="forgot-password-email"
                  className="text-sm font-medium text-text-primary block mb-1.5"
                >
                  Email tài khoản <span className="text-danger">*</span>
                </label>

                <Input
                  id="forgot-password-email"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldError) setFieldError(undefined);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="tenban@example.com"
                  error={fieldError}
                  leftIcon={<MailIcon className="w-4 h-4 text-text-muted" />}
                  className="py-2.5"
                />

                <div className="text-xs text-text-muted flex items-center gap-1.5 mt-2">
                  <InfoIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>Liên kết đặt lại mật khẩu sẽ có thời hạn sử dụng.</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full h-11 rounded-md cursor-pointer gap-2"
              >
                {isLoading ? (
                  'Đang gửi hướng dẫn...'
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    <span>Gửi hướng dẫn đặt lại mật khẩu</span>
                  </>
                )}
              </Button>

              <div className="pt-1 flex justify-center">
                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm font-medium text-text-muted hover:text-brand-500 transition flex items-center gap-1.5 group select-none"
                >
                  <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Quay lại đăng nhập</span>
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default RentMateForgotPassword;
