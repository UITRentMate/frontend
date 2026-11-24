import React from 'react';
import Button from '@/components/ui/Button';
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
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={onBack}
        className="w-full sm:w-auto flex items-center justify-center gap-2"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Quay lại chi tiết phòng</span>
      </Button>

      <Button
        type="submit"
        variant="primary"
        size="md"
        onClick={onSubmit}
        isLoading={isSubmitting}
        disabled={isDisabled || isSubmitting}
        className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-soft-sm"
      >
        <span>Gửi yêu cầu đặt lịch</span>
        <SendIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TourActionBar;
