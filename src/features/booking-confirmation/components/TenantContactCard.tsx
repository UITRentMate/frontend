import React from 'react';

import tenantHeadingIcon from '@/assets/booking-confirmation/98809.svg';

import type { TenantContactCardProps } from '../types';

export const TenantContactCard: React.FC<TenantContactCardProps> = ({ tenant }) => {
  const contactItems = [
    {
      label: 'Họ và tên',
      value: tenant.fullName,
    },
    {
      label: 'Số điện thoại liên lạc',
      value: tenant.phone,
    },
    {
      label: 'Email liên hệ',
      value: tenant.email,
    },
  ];

  return (
    <section
      aria-labelledby="tenant-contact-heading"
      className="w-full bg-surface-card border border-border-subtle rounded-[12px] p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      <div className="flex items-center gap-2.5 pb-3.5 border-b border-border-subtle">
        <div className="w-7 h-7 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
          <img src={tenantHeadingIcon} alt="" aria-hidden="true" className="shrink-0" />
        </div>
        <h2
          id="tenant-contact-heading"
          className="text-base font-heading font-bold text-text-primary"
        >
          2. Thông tin người thuê (Chủ hợp đồng)
        </h2>
      </div>

      <div className="grid gap-3.5 rounded-sm border border-border-subtle bg-canvas px-3.5 py-3 md:grid-cols-[1fr_0.75fr_1.25fr]">
        {contactItems.map((item) => (
          <div
            key={item.label}
            className="flex min-w-0 flex-col gap-1"
          >
            <span className="text-xs font-medium text-text-muted">{item.label}</span>
            <span
              title={item.value}
              className="break-words text-sm font-semibold text-text-primary"
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TenantContactCard;
