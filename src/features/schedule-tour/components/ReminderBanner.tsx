import React from 'react';
import { InfoIcon, XIcon } from '@/components/ui/icons';
import type { ReminderBannerProps } from '../types';

export const ReminderBanner: React.FC<ReminderBannerProps> = ({ onDismiss }) => {
  return (
    <div className="w-full bg-warning-soft border border-warning-border rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-soft-xs transition-all">
      <div className="flex items-center gap-2.5 text-text-primary">
        <InfoIcon className="w-4 h-4 text-warning shrink-0" />
        <p className="leading-snug">
          <strong className="font-bold">Lưu ý khi đi xem phòng:</strong>
          <span className="font-normal text-text-secondary ml-1">
            Nên đến đúng giờ hẹn và liên hệ với chủ nhà qua RentMate khi đến nơi.
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Đóng thông báo lưu ý"
        className="p-1 rounded-lg text-text-secondary hover:bg-warning-border/40 transition-colors cursor-pointer shrink-0"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ReminderBanner;
