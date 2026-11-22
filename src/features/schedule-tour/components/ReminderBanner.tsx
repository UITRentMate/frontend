import React from 'react';
import { InfoIcon, XIcon } from '@/components/ui/icons';
import type { ReminderBannerProps } from '../types';

export const ReminderBanner: React.FC<ReminderBannerProps> = ({ onDismiss }) => {
  return (
    <div className="w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-soft-xs transition-all">
      <div className="flex items-center gap-2.5 text-[#451A03]">
        <InfoIcon className="w-4 h-4 text-warning shrink-0" />
        <p className="leading-snug">
          <strong className="font-bold">Lưu ý khi đi xem phòng:</strong>
          <span className="font-normal text-[#78350F] ml-1">
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
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ReminderBanner;
