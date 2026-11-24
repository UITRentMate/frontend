import React from 'react';

import { Button } from '@/components/ui/Button';
import { CheckCircle2Icon } from '@/components/ui/icons';

import type { ResetPasswordSuccessViewProps } from '../types';

export const ResetPasswordSuccessView: React.FC<ResetPasswordSuccessViewProps> = ({
  onNavigateLogin,
}) => {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="w-16 h-16 rounded-pill bg-secondary-50 border border-secondary-200 text-secondary-500 flex items-center justify-center mb-5">
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
        onClick={onNavigateLogin}
      >
        Đăng nhập ngay
      </Button>
    </div>
  );
};

export default ResetPasswordSuccessView;
