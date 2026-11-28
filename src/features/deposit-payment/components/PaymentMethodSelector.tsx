import React from 'react';

import walletIcon from '@/assets/deposit-payment/9a22f.svg';
import vnpayLogo from '@/assets/deposit-payment/ce128.svg';

import type { PaymentMethodSelectorProps } from '../types';

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  gateways,
  selectedGateway,
  onSelectGateway,
  inlineError,
}) => {
  return (
    <section
      aria-labelledby="payment-method-heading"
      className="w-full bg-surface-card border border-border-subtle rounded-lg p-5 sm:p-6 shadow-soft-xs flex flex-col gap-4"
    >
      <div className="pb-3 border-b border-border-subtle flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <img src={walletIcon} alt="" aria-hidden="true" className="shrink-0" />
          <h2
            id="payment-method-heading"
            className="text-base font-heading font-bold text-text-primary"
          >
            Chọn phương thức thanh toán
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          Vui lòng chọn cổng thanh toán điện tử được hệ thống hỗ trợ để tiến hành ký quỹ đặt cọc.
        </p>
      </div>

      {inlineError && (
        <span
          id="payment-gateway-error"
          role="alert"
          className="text-xs text-danger font-medium"
        >
          {inlineError}
        </span>
      )}

      <div
        role="radiogroup"
        aria-labelledby="payment-method-heading"
        aria-describedby={inlineError ? 'payment-gateway-error' : undefined}
        className="flex flex-col gap-3"
      >
        {gateways.map((gateway) => {
          const isSelected = selectedGateway === gateway.id;
          const inputId = `payment-gateway-${gateway.id.toLowerCase()}`;

          return (
            <label
              key={gateway.id}
              htmlFor={inputId}
              className={`flex items-center gap-3.5 rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-brand-50/60 border-2 border-brand-500 shadow-soft-xs'
                  : 'bg-surface-card border border-border-subtle hover:border-brand-200'
              }`}
            >
              <input
                id={inputId}
                type="radio"
                name="paymentGateway"
                value={gateway.id}
                checked={isSelected}
                onChange={() => onSelectGateway(gateway.id)}
                className="peer sr-only"
              />

              {/* Radio Circle */}
              <span
                aria-hidden="true"
                className={`w-5 h-5 rounded-pill border-2 flex items-center justify-center shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-1 ${
                  isSelected
                    ? 'bg-surface-card border-brand-500'
                    : 'bg-surface-card border-text-disabled'
                }`}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-pill bg-brand-500" />}
              </span>

              {/* Gateway Brand Logo */}
              {gateway.id === 'VNPAY' ? (
                <div className="w-12 h-10 rounded-sm bg-surface-card border border-border-subtle flex items-center justify-center p-1.5 shrink-0">
                  <img src={vnpayLogo} alt="VNPAY" className="shrink-0" />
                </div>
              ) : (
                <div className="w-12 h-10 rounded-sm bg-[#a50064] flex items-center justify-center shrink-0">
                  <span className="text-xs font-heading font-bold text-white">
                    {gateway.badgeText || 'MoMo'}
                  </span>
                </div>
              )}

              {/* Gateway Label & Description */}
              <div className="min-w-0 flex flex-col gap-0.5">
                <span className="text-sm font-bold text-text-primary leading-snug">
                  {gateway.title}
                </span>
                <span className="text-xs text-text-muted leading-relaxed">
                  {gateway.description}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethodSelector;
