import React from 'react';
import { ArrowLeftIcon, SendIcon } from '@/components/ui/icons';
import type { TourActionBarProps } from '../types';

export const TourActionBar: React.FC<TourActionBarProps> = ({
  onBack,
  onSubmit,
  isSubmitting = false,
  isDisabled = false,
}) => {
  return (
    <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        className="w-full sm:w-auto px-5 h-11 bg-surface-card border border-border-subtle hover:bg-surface-muted text-text-primary text-xs sm:text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Quay lại chi tiết phòng</span>
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled || isSubmitting}
        className={`w-full sm:w-auto px-6 h-11 rounded-md text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-soft-sm transition-all cursor-pointer ${
          isDisabled || isSubmitting
            ? 'bg-text-disabled cursor-not-allowed shadow-none'
            : 'bg-brand-500 hover:bg-brand-600 shadow-soft-md active:scale-[0.98]'
        }`}
      >
        <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu đặt lịch'}</span>
        <SendIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TourActionBar;
