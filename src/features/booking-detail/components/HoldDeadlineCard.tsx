import React from 'react';

import holdClockIcon from '@/assets/booking-detail/0c5f4.svg';
import countdownIcon from '@/assets/booking-detail/22de6.svg';

import Button from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/icons';

import type { HoldDeadlineCardProps } from '../types';

export const HoldDeadlineCard: React.FC<HoldDeadlineCardProps> = ({
  holdWindow,
  canProceedPayment,
  isInitiatingPayment,
  onProceedPayment,
  onBackToRequests,
}) => {
  return (
    <section
      aria-labelledby="hold-deadline-heading"
      className="bg-surface-card border border-border-subtle rounded-lg p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-surface-muted/60 flex items-center justify-center shrink-0">
            <img src={holdClockIcon} alt="" aria-hidden="true" className="shrink-0" />
          </div>
          <h3
            id="hold-deadline-heading"
            className="text-base font-heading font-bold text-text-primary"
          >
            Thời hạn giữ chỗ &amp; Hành động
          </h3>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-warning-soft border border-warning-border text-text-primary rounded-xs px-2.5 py-1 text-xs font-semibold w-fit">
          <img src={countdownIcon} alt="" aria-hidden="true" className="shrink-0" />
          <span>{holdWindow.remainingTimeLabel}</span>
        </div>
      </div>

      <div className="bg-canvas border border-border-subtle rounded-sm p-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="text-text-muted">Bắt đầu giữ chỗ:</span>
          <span className="font-semibold text-text-primary">{holdWindow.startedAt}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-text-muted">Hạn chót thanh toán:</span>
          <span className="font-bold text-text-primary">{holdWindow.expiresAt}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          variant="primary"
          size="md"
          isLoading={isInitiatingPayment}
          disabled={!canProceedPayment || isInitiatingPayment}
          onClick={onProceedPayment}
          className="w-full h-11 inline-flex items-center justify-center gap-2"
        >
          <span>Tiếp tục thanh toán [C02]</span>
          <ArrowRightIcon className="w-4 h-4 shrink-0" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBackToRequests}
          className="w-full h-11 border-border-subtle text-text-primary hover:bg-canvas"
        >
          Quay lại danh sách yêu cầu thuê
        </Button>
      </div>

      <p className="text-xs text-text-muted leading-relaxed">{holdWindow.expiryPolicyNote}</p>
    </section>
  );
};

export default HoldDeadlineCard;
