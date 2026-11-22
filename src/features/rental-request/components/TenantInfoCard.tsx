import React from 'react';
import { FileTextIcon, ExternalLinkIcon, LockIcon, CheckCircle2Icon } from '@/components/ui/icons';
import type { TenantInfoCardProps } from '../types';

export const TenantInfoCard: React.FC<TenantInfoCardProps> = ({
  tenant,
  onUpdateProfile,
}) => {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-6 shadow-soft-xs flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
            <FileTextIcon className="w-4 h-4 text-brand-500" />
          </div>
          <h2 className="text-sm sm:text-base font-heading font-bold text-text-primary">
            Thông tin người gửi (Chủ hợp đồng)
          </h2>
        </div>

        <button
          type="button"
          onClick={onUpdateProfile}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors cursor-pointer"
        >
          <span>Cập nhật hồ sơ</span>
          <ExternalLinkIcon className="w-3 h-3" />
        </button>
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-text-muted">
          Họ và tên người thuê
        </label>
        <div className="bg-canvas border border-border-subtle rounded-md px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-text-primary">
          {tenant.fullName}
        </div>
      </div>

      {/* Phone & Email (2 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-muted">
            Số điện thoại
          </label>
          <div className="bg-canvas border border-border-subtle rounded-md px-3.5 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-text-primary font-mono">
              {tenant.phone}
            </span>
            <LockIcon className="w-4 h-4 text-text-muted shrink-0" />
          </div>
          <span className="text-[11px] text-text-muted leading-tight">
            Chỉ hiển thị đầy đủ cho chủ trọ sau khi được duyệt
          </span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-text-muted">
            Email liên lạc
          </label>
          <div className="bg-canvas border border-border-subtle rounded-md px-3.5 py-2.5 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-semibold text-text-primary font-mono truncate">
              {tenant.email}
            </span>
            <CheckCircle2Icon className="w-4 h-4 text-success shrink-0" />
          </div>
          <span className="text-[11px] text-text-muted leading-tight">
            Dùng nhận thông báo duyệt & ký kết hợp đồng số
          </span>
        </div>
      </div>
    </div>
  );
};

export default TenantInfoCard;
