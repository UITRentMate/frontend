import React from 'react';
import { Calendar } from 'lucide-react';
import { DatePillOption } from '../../../types/schedule-tour';

interface DateSelectorProps {
  dateOptions: DatePillOption[];
  selectedDate: string;
  onSelectDate: (dateVal: string) => void;
  customDate: string;
  onCustomDateChange: (customDateVal: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  dateOptions,
  selectedDate,
  onSelectDate,
  customDate,
  onCustomDateChange,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Title & Hint */}
      <div className="flex items-center justify-between flex-wrap gap-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          1. Ngày muốn xem phòng <span className="text-rose-500">*</span>
        </h3>
        <span className="text-xs text-slate-500">
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
              onClick={() => onSelectDate(opt.dateValue)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/70 border-blue-700 ring-2 ring-blue-700 shadow-xs'
                  : 'bg-white border-indigo-100 hover:border-indigo-300'
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-blue-700' : 'text-slate-400'
                }`}
              >
                {opt.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 leading-snug">
                {opt.dateFormatted}
              </span>
              <span
                className={`text-[11px] font-semibold mt-1.5 ${
                  opt.availableSlotsCount <= 2
                    ? 'text-amber-700'
                    : 'text-emerald-700'
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
        <span className="text-slate-500">Hoặc chọn ngày khác:</span>
        <div className="relative">
          <input
            type="text"
            value={customDate}
            onChange={(e) => onCustomDateChange(e.target.value)}
            placeholder="DD/MM/YYYY"
            className="h-9 bg-white border border-indigo-200 rounded-lg pl-3 pr-8 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
