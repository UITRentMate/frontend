import React from 'react';

import { CalendarIcon } from '@/components/ui/icons';

import type { DateSelectorProps } from '../types';

export const DateSelector: React.FC<DateSelectorProps> = ({
  dateOptions,
  selectedDate,
  onSelectDate,
  customDate,
  onCustomDateChange,
  onCustomDateBlur,
  inlineError,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Title & Hint */}
      <div className="flex items-center justify-between flex-wrap gap-1">
        <h3 className="text-sm sm:text-base font-bold text-text-primary">
          1. Ngày muốn xem phòng <span className="text-danger">*</span>
        </h3>
        <span className="text-xs text-text-muted">
          Chủ trọ mở lịch xem trong 7 ngày tới
        </span>
      </div>

      {/* Date pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {dateOptions.map((opt) => {
          const isSelected = selectedDate === opt.dateValue;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectDate(opt.dateValue)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500 shadow-soft-xs'
                  : 'bg-surface-card border-border-subtle hover:border-brand-200'
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-brand-600' : 'text-text-muted'
                }`}
              >
                {opt.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-text-primary mt-1 leading-snug">
                {opt.dateFormatted}
              </span>
              <span
                className={`text-[11px] font-semibold mt-1.5 ${
                  opt.availableSlotsCount <= 2
                    ? 'text-warning'
                    : 'text-success'
                }`}
              >
                Còn {opt.availableSlotsCount} khung giờ
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Date Input */}
      <div className="pt-1 flex items-center flex-wrap gap-2 text-xs">
        <label htmlFor="custom-tour-date" className="text-text-muted">
          Hoặc chọn ngày khác:
        </label>
        <div className="relative">
          <input
            id="custom-tour-date"
            type="text"
            value={customDate}
            onChange={(e) => onCustomDateChange(e.target.value)}
            onBlur={onCustomDateBlur}
            placeholder="DD/MM/YYYY"
            aria-label="Nhập ngày xem phòng tùy chọn (DD/MM/YYYY)"
            aria-invalid={Boolean(inlineError)}
            aria-describedby={inlineError ? 'custom-date-error' : undefined}
            className="h-9 bg-surface-card border border-border-subtle rounded-md pl-3 pr-8 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
          <CalendarIcon className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {inlineError && (
        <span
          id="custom-date-error"
          role="alert"
          className="text-xs text-danger font-medium mt-0.5"
        >
          {inlineError}
        </span>
      )}
    </div>
  );
};

export default DateSelector;
