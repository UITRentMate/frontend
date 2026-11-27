import React from 'react';

import { ShieldCheckIcon } from '@/components/ui/icons';

import type { IdentityNoticeProps } from '../types';

export const IdentityNotice: React.FC<IdentityNoticeProps> = ({ userName }) => {
  return (
    <div className="w-full bg-brand-50 border border-brand-200 rounded-xl p-3.5 flex items-start gap-3">
      <ShieldCheckIcon className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
      <div className="text-xs">
        <span className="font-bold text-text-primary block">
          Thông tin cá nhân của bạn được bảo vệ:
        </span>
        <span className="text-text-muted mt-0.5 block leading-relaxed">
          <strong className="text-text-primary">{userName}</strong> • Số điện thoại thật chỉ hiển thị sau khi chủ trọ xác nhận lịch hẹn.
        </span>
      </div>
    </div>
  );
};

export default IdentityNotice;
