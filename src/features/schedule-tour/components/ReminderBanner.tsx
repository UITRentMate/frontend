import React from 'react';
import { Info, X } from 'lucide-react';

interface ReminderBannerProps {
  onDismiss: () => void;
}

export const ReminderBanner: React.FC<ReminderBannerProps> = ({ onDismiss }) => {
  return (
    <div className="w-full bg-amber-50/90 border border-amber-200/90 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-xs transition-all">
      <div className="flex items-center gap-2.5 text-amber-950">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-snug">
          <strong className="font-bold">Lưu ý khi đi xem phòng:</strong>
          <span className="font-normal text-amber-900 ml-1">
            Nên đến đúng giờ hẹn và liên hệ với chủ nhà qua RentMate khi đến nơi.
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Đóng thông báo"
        className="p-1 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

