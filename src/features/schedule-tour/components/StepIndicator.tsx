import React from 'react';

export const StepIndicator: React.FC = () => {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-3.5 sm:p-4 shadow-soft-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Step 1: Active */}
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-brand-500 flex items-center justify-center text-white text-sm font-bold shadow-soft-xs shrink-0">
            1
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
              BƯỚC 1
            </span>
            <span className="text-xs sm:text-sm font-bold text-text-primary">
              Chọn ngày & khung giờ
            </span>
          </div>
        </div>

        {/* Step 2: Upcoming */}
        <div className="opacity-60 px-3 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center text-sm font-bold shrink-0">
            2
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-text-muted uppercase tracking-wider block">
              BƯỚC 2
            </span>
            <span className="text-xs sm:text-sm font-semibold text-text-primary">
              Chủ trọ xác nhận
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
