import React from 'react';

import Loading from '@/components/ui/Loading';
import { SunIcon, CloudSunIcon, MoonIcon, CheckIcon } from '@/components/ui/icons';

import type { TimeSlotSelectorProps, TimeSlotOption } from '../types';

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedSlotIds,
  onToggleSlot,
  maxSlots = 3,
  inlineError,
  isLoading = false,
}) => {
  const morningSlots = slots.filter((s) => s.period === 'morning');
  const afternoonSlots = slots.filter((s) => s.period === 'afternoon');
  const eveningSlots = slots.filter((s) => s.period === 'evening');

  const renderSlotButton = (slot: TimeSlotOption) => {
    const isSelected = selectedSlotIds.includes(slot.id);

    if (slot.isFull) {
      return (
        <button
          key={slot.id}
          type="button"
          disabled
          aria-disabled="true"
          className="flex-1 min-w-[120px] p-3 rounded-lg bg-surface-muted/50 border border-border-subtle text-center cursor-not-allowed opacity-70"
        >
          <span className="text-xs sm:text-sm font-normal text-text-disabled line-through block">
            {slot.timeRange}
          </span>
          <span className="text-[10px] text-text-disabled block mt-0.5">
            (Đã kín)
          </span>
        </button>
      );
    }

    return (
      <button
        key={slot.id}
        type="button"
        aria-pressed={isSelected}
        onClick={() => onToggleSlot(slot.id)}
        className={`flex-1 min-w-[120px] p-3 rounded-lg border text-center transition-all cursor-pointer ${
          isSelected
            ? 'bg-brand-500 border-brand-500 text-white shadow-soft-md ring-2 ring-brand-500'
            : 'bg-surface-card border-border-subtle hover:border-brand-200 text-text-primary'
        }`}
      >
        <span
          className={`text-xs sm:text-sm font-bold block ${
            isSelected ? 'text-white' : 'text-text-primary'
          }`}
        >
          {slot.timeRange}
        </span>
        <span
          className={`text-[10px] font-medium flex items-center justify-center gap-1 mt-0.5 ${
            isSelected ? 'text-brand-50' : 'text-text-muted'
          }`}
        >
          {isSelected ? (
            <>
              <CheckIcon className="w-3 h-3 text-white inline" />
              <span>(Đã chọn)</span>
            </>
          ) : (
            'Khung giờ trống'
          )}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header with counter badge */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-text-primary">
            2. Khung giờ xem phòng <span className="text-danger">*</span>
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Chọn từ 1 đến {maxSlots} khung giờ mong muốn (30 - 45 phút/ca).
          </p>
        </div>

        <div className="bg-brand-50 border border-brand-200 text-brand-600 font-bold text-xs px-3 py-1 rounded-pill">
          Đã chọn {selectedSlotIds.length}/{maxSlots}
        </div>
      </div>

      {inlineError && (
        <span className="text-xs text-danger font-medium -mt-1">{inlineError}</span>
      )}

      {isLoading ? (
        <Loading message="Đang tải khung giờ trống..." size="sm" className="p-4" />
      ) : (
        <>
          {/* Morning Slots */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider">
              <SunIcon className="w-3.5 h-3.5 text-warning" />
              <span>BUỔI SÁNG (08:30 - 11:30)</span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
              {morningSlots.map(renderSlotButton)}
            </div>
          </div>

          {/* Afternoon Slots */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider">
              <CloudSunIcon className="w-3.5 h-3.5 text-accent-300" />
              <span>BUỔI CHIỀU (14:00 - 17:30)</span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
              {afternoonSlots.map(renderSlotButton)}
            </div>
          </div>

          {/* Evening Slots */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider">
              <MoonIcon className="w-3.5 h-3.5 text-brand-600" />
              <span>BUỔI TỐI (18:00 - 20:00)</span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
              {eveningSlots.map(renderSlotButton)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeSlotSelector;
