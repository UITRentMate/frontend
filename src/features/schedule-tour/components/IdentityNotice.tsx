import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface IdentityNoticeProps {
  userName: string;
}

export const IdentityNotice: React.FC<IdentityNoticeProps> = ({ userName }) => {
  return (
    <div className="w-full bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3.5 flex items-start gap-3">
      <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
      <div className="text-xs">
        <span className="font-bold text-slate-900 block">
          Thông tin cá nhân của bạn được bảo vệ:
        </span>
        <span className="text-slate-600 mt-0.5 block leading-relaxed">
          <strong>{userName}</strong> • Số điện thoại thật chỉ hiển thị sau khi chủ trọ xác nhận lịch hẹn.
        </span>
      </div>
    </div>
  );
};
