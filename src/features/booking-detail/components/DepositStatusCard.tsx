import React from 'react';

import depositWalletIcon from '@/assets/booking-detail/79741.svg';
import { formatCurrency } from '@/utils/formatCurrency';

import type { DepositStatusCardProps } from '../types';

export const DepositStatusCard: React.FC<DepositStatusCardProps> = ({ deposit }) => {
  const statusTextColor =
    deposit.status === 'PAID'
      ? 'text-secondary-700'
      : deposit.status === 'EXPIRED'
      ? 'text-danger'
      : 'text-text-primary';

  return (
    <section
      aria-labelledby="deposit-status-heading"
      className="bg-surface-card border border-border-subtle rounded-lg p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      <div className="flex items-center gap-2 pb-3 border-b border-border-subtle">
        <div className="w-8 h-8 rounded-sm bg-brand-500 flex items-center justify-center shrink-0">
          <img src={depositWalletIcon} alt="" aria-hidden="true" className="shrink-0" />
        </div>
        <h2
          id="deposit-status-heading"
          className="text-base font-heading font-bold text-text-primary"
        >
          Tiền cọc giữ phòng
        </h2>
      </div>

      <div className="bg-canvas border border-border-subtle rounded-lg p-5 flex flex-col items-center justify-center gap-1 text-center">
        <span className="text-xs font-medium text-text-muted">Số tiền cọc cần thanh toán</span>
        <strong className="text-3xl font-heading font-extrabold text-brand-500 tracking-tight my-0.5">
          {formatCurrency(deposit.depositAmount)}
        </strong>
        <span className="text-xs font-medium text-text-muted">
          {deposit.depositEquivalentNote}
        </span>
      </div>

      <dl className="flex flex-col gap-2.5 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-text-muted">Trạng thái tiền cọc</dt>
          <dd className={`font-semibold text-right ${statusTextColor}`}>{deposit.statusLabel}</dd>
        </div>

        <div className="pt-2.5 border-t border-border-subtle flex items-center justify-between gap-2">
          <dt className="text-text-muted">Phương thức thanh toán</dt>
          <dd className="font-semibold text-text-primary text-right">
            {deposit.paymentMethodLabel}
          </dd>
        </div>

        <div className="pt-2.5 border-t border-border-subtle flex items-center justify-between gap-2">
          <dt className="text-text-muted">Mã giao dịch</dt>
          <dd className="text-xs font-semibold text-text-secondary font-mono text-right">
            {deposit.transactionCode}
          </dd>
        </div>

        <div className="pt-2.5 border-t border-border-subtle flex items-center justify-between gap-2">
          <dt className="text-text-muted">Thời điểm ghi nhận</dt>
          <dd className="font-medium text-text-muted text-right">{deposit.recordedAtLabel}</dd>
        </div>
      </dl>
    </section>
  );
};

export default DepositStatusCard;
