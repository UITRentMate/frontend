import React from 'react';
import { User, Lock, Mail, ExternalLink } from 'lucide-react';
import { TenantProfile } from '../../../types/rental-request';

interface TenantInfoCardProps {
  tenant: TenantProfile;
}

export const TenantInfoCard: React.FC<TenantInfoCardProps> = ({ tenant }) => {
  return (
    <article className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Thông tin người gửi (Chủ hợp đồng)
            </h2>
          </div>
        </div>

        <a
          href="#update-profile"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
        >
          <span>Cập nhật hồ sơ</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Info Grid */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <p className="text-[11px] text-slate-500 font-medium">Họ và tên người thuê</p>
          <p className="text-sm font-bold text-slate-900 mt-0.5">{tenant.fullName}</p>
        </div>

        {/* Phone */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-medium">Số điện thoại</span>
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-900 tracking-wider mt-1">{tenant.phone}</p>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Chỉ hiển thị đầy đủ cho chủ trọ sau khi được duyệt
          </p>
        </div>

        {/* Email */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[11px] font-medium">Email liên lạc</span>
              <Mail className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-900 mt-1 truncate">{tenant.email}</p>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            Dùng nhận thông báo duyệt & ký kết hợp đồng số
          </p>
        </div>
      </div>
    </article>
  );
};
