import React from 'react';
import { Sun, CloudSun, Moon } from 'lucide-react';
import { TimeSlotOption } from '../../../types/schedule-tour';

interface TimeSlotSelectorProps {
  slots: TimeSlotOption[];
  selectedSlotIds: string[];
  onToggleSlot: (slotId: string) => void;
  maxSlots?: number;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedSlotIds,
  onToggleSlot,
  maxSlots = 3,
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
          className="flex-1 min-w-[120px] p-3 rounded-xl bg-slate-100 border border-slate-200 text-center cursor-not-allowed opacity-80"
        >
          <span className="text-xs sm:text-sm font-normal text-slate-400 line-through block">
            {slot.timeRange}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            (Đã kín)
          </span>
        </button>
      );
    }

    return (
      <button
        key={slot.id}
        type="button"
        onClick={() => onToggleSlot(slot.id)}
        className={`flex-1 min-w-[120px] p-3 rounded-xl border text-center transition-all cursor-pointer ${
          isSelected
            ? 'bg-blue-700 border-blue-700 text-white shadow-md shadow-blue-700/20 ring-2 ring-blue-700'
            : 'bg-white border-indigo-100 hover:border-indigo-300 text-slate-900'
        }`}
      >
        <span
          className={`text-xs sm:text-sm font-bold block ${
            isSelected ? 'text-white' : 'text-slate-900'
          }`}
        >
          {slot.timeRange}
        </span>
        <span
          className={`text-[10px] font-medium block mt-0.5 ${
            isSelected ? 'text-blue-100' : 'text-slate-400'
          }`}
        >
          {isSelected ? '✓ (Đã chọn)' : 'Khung giờ trống'}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header with counter badge */}
      <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            2. Khung giờ xem phòng <span className="text-rose-500">*</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Chọn từ 1 đến {maxSlots} khung giờ mong muốn (30 - 45 phút/ca).
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 text-blue-700 font-bold text-xs px-3 py-1 rounded-full">
          Đã chọn {selectedSlotIds.length}/{maxSlots}
        </div>
      </div>

      {/* Morning Slots */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>BUỔI SÁNG (08:30 - 11:30)</span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
          {morningSlots.map(renderSlotButton)}
        </div>
      </div>

      {/* Afternoon Slots */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <CloudSun className="w-3.5 h-3.5 text-blue-500" />
          <span>BUỔI CHIỀU (14:00 - 17:30)</span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
          {afternoonSlots.map(renderSlotButton)}
        </div>
      </div>

      {/* Evening Slots */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Moon className="w-3.5 h-3.5 text-indigo-500" />
          <span>BUỔI TỐI (18:00 - 20:00)</span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
          {eveningSlots.map(renderSlotButton)}
        </div>
      </div>
    </div>
  );
};
