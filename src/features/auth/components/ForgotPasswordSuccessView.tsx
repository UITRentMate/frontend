import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, CheckCircleIcon, InfoIcon } from '@/components/ui/icons';

import type { ForgotPasswordSuccessViewProps } from '../types';

export const ForgotPasswordSuccessView: React.FC<ForgotPasswordSuccessViewProps> = ({
  submittedEmail,
  onResetForm,
}) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center py-4">
      <div className="w-16 h-16 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-500 flex items-center justify-center mb-5">
        <CheckCircleIcon className="w-9 h-9 text-secondary-500" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-heading mb-3">
        Kiểm tra hòm thư của bạn
      </h2>

      <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-md">
        Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến{' '}
        <strong className="text-text-primary font-semibold break-all">
          {submittedEmail}
        </strong>
        . Vui lòng kiểm tra hộp thư đến hoặc hòm thư rác (Spam).
      </p>

      <div className="w-full p-4 mb-6 rounded-lg bg-canvas border border-border-subtle text-xs sm:text-sm text-text-muted text-left flex items-start gap-2.5">
        <InfoIcon className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
        <span>
          Không nhận được email? Hãy kiểm tra kỹ hộp thư rác hoặc bấm nút gửi lại phía dưới.
        </span>
      </div>

      <div className="w-full space-y-3">
        {import.meta.env.DEV && (
          <Link
            to={`${ROUTES.RESET_PASSWORD}?token=demo-reset-token`}
            className="w-full h-11 rounded-md bg-secondary-50 border border-secondary-200 text-secondary-600 hover:bg-secondary-100 text-sm font-medium flex items-center justify-center gap-2 transition"
          >
            Mở liên kết đặt lại mật khẩu (Dev Demo)
          </Link>
        )}

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onResetForm}
          className="w-full h-11 rounded-md cursor-pointer"
        >
          Gửi lại email khác
        </Button>

        <Link
          to={ROUTES.LOGIN}
          className="w-full h-11 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium flex items-center justify-center gap-2 transition shadow-soft-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Quay lại đăng nhập</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordSuccessView;
