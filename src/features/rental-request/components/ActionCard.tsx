import React from 'react';
import Button from '@/components/ui/Button';
import { ArrowLeftIcon, SendIcon } from '@/components/ui/icons';
import type { ActionCardProps } from '../types';

export const ActionCard: React.FC<ActionCardProps> = ({
  isConfirmed,
  onConfirmChange,
  onSubmit,
  onBack,
  isSubmitting = false,
}) => {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-6 shadow-soft-xs flex flex-col gap-4">
      {/* Confirmation Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={(e) => onConfirmChange(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded-xs border-border-subtle text-brand-500 focus:ring-brand-500 cursor-pointer accent-brand-500"
        />
        <span className="text-xs sm:text-sm font-semibold text-text-primary leading-snug group-hover:text-brand-600 transition-colors">
          Tôi đã kiểm tra thông tin phòng trọ và xác nhận thông tin gửi yêu cầu là chính xác.
        </span>
      </label>

      {/* Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span>Quay lại chi tiết phòng</span>
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onSubmit}
          isLoading={isSubmitting}
          disabled={!isConfirmed || isSubmitting}
          className="w-full sm:w-auto"
        >
          {!isSubmitting && <SendIcon className="w-4 h-4 mr-2" />}
          <span>{isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu thuê phòng'}</span>
        </Button>
      </div>

      {/* Assurance subtext */}
      <p className="text-[11px] text-text-muted text-center sm:text-left leading-relaxed pt-1">
        Bạn chưa cần thanh toán tiền cọc ở bước này. Yêu cầu của bạn sẽ được gửi đến chủ trọ để xem xét.
      </p>
    </div>
  );
};

export default ActionCard;
