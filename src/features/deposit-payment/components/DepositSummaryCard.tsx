import React from 'react';

import holdClockIcon from '@/assets/deposit-payment/7d8b1.svg';
import supportHeadsetIcon from '@/assets/deposit-payment/d16d4.svg';
import { formatCurrency } from '@/utils/formatCurrency';

import Button from '@/components/ui/Button';
import { ArrowLeftIcon, ExternalLinkIcon } from '@/components/ui/icons';

import type { DepositSummaryCardProps } from '../types';

export const DepositSummaryCard: React.FC<DepositSummaryCardProps> = ({
  summary,
  canSubmit,
  isSubmitting,
  onBack,
}) => {
  return (
    <aside
      aria-label="Tóm tắt giao dịch đặt cọc"
      className="w-full lg:sticky lg:top-20 flex flex-col gap-5"
    >
      <div className="bg-surface-card border border-border-subtle rounded-lg p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5">
        <h2 className="pb-3 border-b border-border-subtle text-base font-heading font-bold text-text-primary">
          Tóm tắt giao dịch đặt cọc
        </h2>

        {/* Transaction Specs */}
        <dl className="flex flex-col gap-2.5 text-sm pb-4 border-b border-border-subtle">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-text-muted">Mã yêu cầu giữ chỗ:</dt>
            <dd className="font-semibold text-text-primary font-mono">{summary.requestCode}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-text-muted">Căn hộ / Tòa nhà:</dt>
            <dd className="font-semibold text-text-primary text-right">{summary.buildingName}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-text-muted">Mã phòng:</dt>
            <dd className="font-bold text-brand-500 text-right">
              Phòng {summary.roomCode} ({summary.floorLabel})
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-text-muted">Người đặt thuê:</dt>
            <dd className="font-medium text-text-primary text-right">{summary.tenantName}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-text-muted">Thời điểm tạo yêu cầu:</dt>
            <dd className="text-text-secondary text-right">{summary.requestCreatedAt}</dd>
          </div>
        </dl>

        {/* Deposit Amount Box */}
        <div className="bg-brand-50/70 border border-brand-200 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
              KHOẢN TIỀN CỌC GIỮ PHÒNG
            </span>
            <span className="bg-brand-100 text-brand-500 text-xs font-bold px-2.5 py-0.5 rounded-pill">
              Thanh toán một lần
            </span>
          </div>

          <strong className="text-3xl font-heading font-bold text-brand-500 tracking-tight py-0.5">
            {formatCurrency(summary.depositAmount)}
          </strong>

          <p className="text-xs text-text-muted leading-relaxed">{summary.depositPolicyNote}</p>
        </div>

        {/* Hold Limit Countdown Card */}
        <div className="bg-canvas border border-border-subtle rounded-lg p-4 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <img src={holdClockIcon} alt="" aria-hidden="true" className="shrink-0" />
              <span className="text-sm font-semibold text-text-primary">Hạn giữ chỗ</span>
            </div>
            <span className="bg-warning-soft border border-warning-border text-text-primary text-xs font-bold px-2.5 py-0.5 rounded-xs">
              {summary.holdRemainingLabel}
            </span>
          </div>

          <div className="pt-2 border-t border-border-subtle flex items-center justify-between gap-2 text-sm">
            <span className="text-text-muted">Hết hạn vào lúc:</span>
            <strong className="font-semibold text-text-primary">{summary.holdExpiresAt}</strong>
          </div>

          <p className="text-xs text-text-muted leading-relaxed">{summary.holdPolicyNote}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            disabled={!canSubmit || isSubmitting}
            className="w-full h-11 inline-flex items-center justify-center gap-2"
          >
            <span>Tiếp tục thanh toán</span>
            <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onBack}
            className="w-full h-10 border-border-subtle text-text-secondary hover:bg-canvas inline-flex items-center justify-center gap-2"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Quay lại thông tin đặt phòng</span>
          </Button>
        </div>

        <p className="text-[11px] text-text-muted text-center leading-relaxed">
          Giao dịch chỉ được RentMate ghi nhận hoàn tất sau khi cổng thanh toán trả về xác nhận
          giao dịch hợp lệ.
        </p>
      </div>

      {/* Support Card */}
      <div className="bg-surface-card border border-border-subtle rounded-lg p-4 shadow-soft-xs flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-text-secondary">
          <img src={supportHeadsetIcon} alt="" aria-hidden="true" className="shrink-0" />
          <span>Cần trợ giúp sự cố thanh toán?</span>
        </div>
        <a
          href={`tel:${summary.supportHotline.replace(/\s+/g, '')}`}
          className="font-bold text-brand-500 hover:text-brand-600 transition-colors shrink-0"
        >
          {summary.supportHotline}
        </a>
      </div>
    </aside>
  );
};

export default DepositSummaryCard;
