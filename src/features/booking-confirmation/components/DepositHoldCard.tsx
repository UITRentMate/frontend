import React from 'react';

import { formatCurrency } from '@/utils/formatCurrency';

import depositHeadingIcon from '@/assets/booking-confirmation/9a22f.svg';
import calendarIcon from '@/assets/booking-confirmation/268fd.svg';
import countdownIcon from '@/assets/booking-confirmation/1372b.svg';
import policyIcon from '@/assets/booking-confirmation/89d4d.svg';

import type { DepositHoldCardProps } from '../types';

export const DepositHoldCard: React.FC<DepositHoldCardProps> = ({ depositHold }) => {
  return (
    <section
      aria-labelledby="deposit-hold-heading"
      className="w-full bg-surface-card border border-border-subtle rounded-[12px] p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
            <img src={depositHeadingIcon} alt="" aria-hidden="true" className="shrink-0" />
          </div>
          <h2
            id="deposit-hold-heading"
            className="text-base font-heading font-bold text-text-primary"
          >
            3. Tiền cọc &amp; Hạn giữ chỗ thanh toán
          </h2>
        </div>

        <span className="inline-flex items-center bg-brand-50 border border-brand-200 text-brand-600 rounded-pill px-3 py-1 text-xs font-semibold">
          {depositHold.ruleBadge}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-brand-50/70 border border-brand-200 rounded-md p-4 flex flex-col justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
            TIỀN ĐẶT CỌC GIỮ PHÒNG
          </span>
          <p className="text-2xl font-heading font-bold text-brand-500">
            {formatCurrency(depositHold.depositAmount)}
          </p>
        </div>

        <div className="bg-canvas border border-border-subtle rounded-md p-4 flex flex-col justify-between gap-2.5">
          <div className="flex items-center gap-1.5">
            <img src={calendarIcon} alt="" aria-hidden="true" className="shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              THỜI HẠN GIỮ CHỖ
            </span>
          </div>

          <p className="text-base font-heading font-bold text-text-primary">
            {depositHold.holdDeadline}
          </p>

          <div className="inline-flex items-center gap-1.5 bg-warning-soft border border-warning-border text-amber-800 rounded-xs px-2.5 py-1 text-xs font-semibold w-fit">
            <img src={countdownIcon} alt="" aria-hidden="true" className="shrink-0" />
            <span>{depositHold.remainingTimeText}</span>
          </div>
        </div>
      </div>

      <div className="bg-canvas border border-border-subtle rounded-md p-3.5 flex items-start gap-2.5">
        <img src={policyIcon} alt="" aria-hidden="true" className="mt-0.5 shrink-0" />
        <p className="text-xs text-text-secondary leading-relaxed">
          {depositHold.policyNotice}
        </p>
      </div>
    </section>
  );
};

export default DepositHoldCard;
