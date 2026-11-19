import React from 'react';

export const StepIndicator: React.FC = () => {
  return (
    <div className="w-full bg-white border border-indigo-100 rounded-2xl p-4 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Step 1: Active */}
        <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-xl p-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-xs shrink-0">
            1
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
              BƯỚC 1
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              Chọn ngày & khung giờ
            </span>
          </div>
        </div>

        {/* Step 2: Upcoming */}
        <div className="opacity-60 px-3 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-800 text-sm font-bold shrink-0">
            2
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              BƯỚC 2
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              Chủ trọ xác nhận
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

