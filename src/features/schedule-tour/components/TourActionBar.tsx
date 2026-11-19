import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface TourActionBarProps {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

export const TourActionBar: React.FC<TourActionBarProps> = ({
  onBack,
  onSubmit,
  isSubmitting = false,
  isDisabled = false,
}) => {
  return (
    <div className="pt-4 border-t border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="w-full sm:w-auto px-5 h-11 bg-white border border-indigo-200 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại chi tiết phòng</span>
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled || isSubmitting}
        className={`w-full sm:w-auto px-6 h-11 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
          isDisabled || isSubmitting
            ? 'bg-slate-300 cursor-not-allowed shadow-none'
            : 'bg-blue-700 hover:bg-blue-800 shadow-blue-700/20 active:scale-[0.99]'
        }`}
      >
        <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu đặt lịch'}</span>
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

