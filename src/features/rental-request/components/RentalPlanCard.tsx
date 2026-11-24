import React from 'react';
import { CalendarIcon, ChevronDownIcon, CircleIcon, CheckCircle2Icon } from '@/components/ui/icons';
import { CONTRACT_DURATION_OPTIONS } from '../constants';
import type { RentalPlanCardProps } from '../types';

export const RentalPlanCard: React.FC<RentalPlanCardProps> = ({
  moveInDate,
  onMoveInDateChange,
  tenantCount,
  onTenantCountChange,
  maxTenants,
  contractDuration,
  onContractDurationChange,
  note,
  onNoteChange,
  dateError,
  tenantCountError,
}) => {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-border-subtle">
        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
          <CalendarIcon className="w-4 h-4 text-brand-500" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-heading font-bold text-text-primary">
            Kế hoạch thuê phòng
          </h2>
          <p className="text-xs text-text-muted">
            Cung cấp thông tin ngày nhận phòng và quy mô người ở
          </p>
        </div>
      </div>

      {/* Row 1: Move-in Date & Tenant Count (2 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="move-in-date" className="text-xs font-bold text-text-primary">
              Ngày dự kiến vào ở <span className="text-danger">*</span>
            </label>
            <span className="text-[11px] text-text-muted font-mono">(DD/MM/YYYY)</span>
          </div>
          <div className="relative">
            <input
              id="move-in-date"
              type="text"
              value={moveInDate}
              onChange={(e) => onMoveInDateChange(e.target.value)}
              placeholder="DD/MM/YYYY"
              aria-invalid={Boolean(dateError)}
              aria-describedby={dateError ? 'move-in-date-error' : undefined}
              className={`w-full h-10 bg-canvas border rounded-md pl-3.5 pr-9 text-xs sm:text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 transition-all ${
                dateError
                  ? 'border-danger focus:ring-danger'
                  : 'border-border-subtle focus:ring-brand-500'
              }`}
            />
            <CalendarIcon className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {dateError && (
            <p id="move-in-date-error" className="text-[11px] text-danger leading-tight mt-0.5">
              {dateError}
            </p>
          )}
        </div>

        {/* Tenant Count Dropdown */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="tenant-count" className="text-xs font-bold text-text-primary">
              Số người dự kiến ở <span className="text-danger">*</span>
            </label>
            <span className="bg-brand-50 text-brand-600 font-semibold text-[10px] px-2 py-0.5 rounded-xs">
              Tối đa: {maxTenants} người
            </span>
          </div>
          <div className="relative">
            <select
              id="tenant-count"
              value={tenantCount}
              onChange={(e) => onTenantCountChange(Number(e.target.value))}
              aria-invalid={Boolean(tenantCountError)}
              aria-describedby={tenantCountError ? 'tenant-count-error' : undefined}
              className={`w-full h-10 bg-canvas border rounded-md pl-3.5 pr-9 text-xs sm:text-sm font-semibold text-text-primary appearance-none cursor-pointer focus:outline-none focus:ring-2 transition-all ${
                tenantCountError
                  ? 'border-danger focus:ring-danger'
                  : 'border-border-subtle focus:ring-brand-500'
              }`}
            >
              {Array.from({ length: maxTenants }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} người
                </option>
              ))}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {tenantCountError && (
            <p id="tenant-count-error" className="text-[11px] text-danger leading-tight mt-0.5">
              {tenantCountError}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Contract Duration Options (fieldset + radiogroup for a11y) */}
      <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
        <legend className="text-xs font-bold text-text-primary p-0 mb-1">
          Thời hạn hợp đồng mong muốn <span className="text-danger">*</span>
        </legend>
        <div
          role="radiogroup"
          aria-label="Thời hạn hợp đồng mong muốn"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {CONTRACT_DURATION_OPTIONS.map((opt) => {
            const isSelected = contractDuration === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onContractDurationChange(opt.value)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500 shadow-soft-xs'
                    : 'bg-surface-card border-border-subtle hover:border-brand-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      isSelected ? 'text-brand-600' : 'text-text-primary'
                    }`}
                  >
                    {opt.title}
                  </span>
                  {isSelected ? (
                    <CheckCircle2Icon className="w-4 h-4 text-brand-500 shrink-0" />
                  ) : (
                    <CircleIcon className="w-4 h-4 text-border-subtle shrink-0" />
                  )}
                </div>
                <span className="text-[11px] text-text-muted mt-1.5 leading-snug">
                  {opt.description}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Row 3: Note to Landlord */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="rental-note" className="font-bold text-text-primary">
            Lời nhắn gửi chủ trọ{' '}
            <span className="font-normal text-text-muted">(Không bắt buộc)</span>
          </label>
          <span className="text-text-disabled font-mono text-[11px]">
            {note.length} / 250
          </span>
        </div>
        <textarea
          id="rental-note"
          rows={3}
          maxLength={250}
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Nhập lời nhắn gửi chủ trọ (nghề nghiệp, lịch sinh hoạt, mong muốn đặc biệt nếu có)..."
          className="w-full bg-canvas border border-border-subtle rounded-md p-3 text-xs sm:text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none transition-all leading-relaxed"
        />
      </div>
    </div>
  );
};

export default RentalPlanCard;
