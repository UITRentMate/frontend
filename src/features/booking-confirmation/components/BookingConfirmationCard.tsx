import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';

import confirmationHeadingIcon from '@/assets/booking-confirmation/0b7ad.svg';
import checkboxTickIcon from '@/assets/booking-confirmation/b5bd9.svg';
import backArrowIcon from '@/assets/booking-confirmation/047fa.svg';
import continueArrowIcon from '@/assets/booking-confirmation/03d99.svg';

import type { BookingConfirmationCardProps } from '../types';

export const BookingConfirmationCard: React.FC<BookingConfirmationCardProps> = ({
  terms,
  isConfirmed,
  onConfirmChange,
  backToRentalRequestPath,
  onContinue,
  paymentNotice,
  onDismissNotice,
}) => {
  return (
    <section
      aria-labelledby="booking-confirmation-heading"
      className="w-full bg-surface-card border border-border-subtle rounded-[12px] p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-border-subtle">
        <div className="w-7 h-7 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
          <img
            src={confirmationHeadingIcon}
            alt=""
            aria-hidden="true"
            className="shrink-0"
          />
        </div>
        <h2
          id="booking-confirmation-heading"
          className="text-base font-heading font-bold text-text-primary"
        >
          4. Điều kiện tiếp tục
        </h2>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">{terms.description}</p>

      <label
        htmlFor="booking-confirmation-checkbox"
        className={`flex items-start gap-3 rounded-md border p-4 cursor-pointer transition-colors ${
          isConfirmed
            ? 'bg-brand-50/70 border-brand-200'
            : 'bg-canvas border-border-subtle hover:border-brand-300'
        }`}
      >
        <span className="relative mt-0.5 flex items-center justify-center shrink-0">
          <input
            id="booking-confirmation-checkbox"
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => onConfirmChange(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={`w-5 h-5 rounded-xs border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-1 ${
              isConfirmed
                ? 'bg-brand-500 border-brand-500'
                : 'bg-surface-card border-brand-200'
            }`}
          >
            {isConfirmed && (
              <img src={checkboxTickIcon} alt="" aria-hidden="true" />
            )}
          </span>
        </span>
        <span className="text-xs sm:text-sm font-medium text-text-primary leading-relaxed select-none">
          {terms.checkboxLabel}
        </span>
      </label>

      {paymentNotice && (
        <div
          role="status"
          aria-live="polite"
          className="bg-brand-50 border border-brand-200 text-brand-700 text-xs px-4 py-3 rounded-sm flex items-center justify-between gap-3"
        >
          <span>{paymentNotice}</span>
          <button
            type="button"
            aria-label="Đóng thông báo xác nhận"
            onClick={onDismissNotice}
            className="text-brand-700 hover:text-brand-900 font-bold text-sm px-1 shrink-0 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      <div className="pt-1 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Link
          to={backToRentalRequestPath}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface-card px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-surface-muted/40 transition-colors button-press"
        >
          <img src={backArrowIcon} alt="" aria-hidden="true" className="shrink-0" />
          <span>{terms.backButtonLabel}</span>
        </Link>

        <Button
          type="button"
          variant="primary"
          size="md"
          disabled={!isConfirmed}
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5"
        >
          <span>{terms.continueButtonLabel}</span>
          <img src={continueArrowIcon} alt="" aria-hidden="true" className="shrink-0" />
        </Button>
      </div>
    </section>
  );
};

export default BookingConfirmationCard;
