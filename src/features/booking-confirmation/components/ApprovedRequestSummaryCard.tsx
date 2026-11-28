import React from 'react';

import type { ApprovedRequestSummaryCardProps } from '../types';

export const ApprovedRequestSummaryCard: React.FC<ApprovedRequestSummaryCardProps> = ({
  summary,
}) => {
  const summaryTiles = [
    {
      label: 'Mã yêu cầu',
      value: summary.requestCode,
      isMono: true,
    },
    {
      label: 'Ngày dự kiến vào ở',
      value: summary.moveInDate,
      isMono: false,
    },
    {
      label: 'Thời hạn thuê',
      value: summary.leaseDuration,
      isMono: false,
    },
    {
      label: 'Số người đăng ký',
      value: summary.occupantCountLabel,
      isMono: false,
    },
  ];

  return (
    <section
      aria-labelledby="approved-summary-heading"
      className="w-full bg-surface-card border border-border-subtle rounded-[12px] p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-full bg-brand-50 text-brand-500 font-heading font-bold text-sm flex items-center justify-center shrink-0"
          >
            1
          </span>
          <h2
            id="approved-summary-heading"
            className="text-base font-heading font-bold text-text-primary"
          >
            Tóm tắt yêu cầu thuê đã duyệt
          </h2>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-success-soft border border-success-border text-secondary-700 rounded-pill px-3 py-1 text-xs font-semibold">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-secondary-600" />
          <span>{summary.statusLabel}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {summaryTiles.map((tile) => (
          <div
            key={tile.label}
            className="bg-canvas border border-border-subtle rounded-sm px-4 py-3 flex flex-col gap-1"
          >
            <span className="text-xs font-medium text-text-muted">{tile.label}</span>
            <span
              className={`text-sm font-bold text-text-primary ${
                tile.isMono ? 'font-mono tracking-tight' : ''
              }`}
            >
              {tile.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApprovedRequestSummaryCard;
