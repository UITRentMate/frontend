import React from 'react';
import { Link } from 'react-router-dom';

import { formatCurrency } from '@/utils/formatCurrency';

import Button from '@/components/ui/Button';
import { CheckCircle2Icon } from '@/components/ui/icons';

import type { BookingConfirmationSuccessViewProps } from '../types';

export const BookingConfirmationSuccessView: React.FC<BookingConfirmationSuccessViewProps> = ({
  confirmation,
  room,
  backToDetailPath,
  onEditConfirmation,
}) => {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-lg mx-auto text-center shadow-soft-sm my-8">
      <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-pill flex items-center justify-center mx-auto mb-4">
        <CheckCircle2Icon className="w-8 h-8 text-secondary-600" />
      </div>

      <h2 className="text-xl font-heading font-bold text-text-primary">
        Xác nhận đặt phòng thành công!
      </h2>

      <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
        Mã xác nhận{' '}
        <strong className="text-text-primary font-mono">{confirmation.bookingCode}</strong> cho phòng{' '}
        <strong className="text-text-primary">{room.roomCode}</strong> đã được ghi nhận với số tiền
        cọc giữ chỗ{' '}
        <strong className="text-brand-500">{formatCurrency(confirmation.depositAmount)}</strong>.
      </p>

      <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700 leading-normal">
        {confirmation.message} Hạn giữ chỗ: <strong>{confirmation.holdDeadline}</strong>.
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onEditConfirmation}
          className="w-full sm:w-auto"
        >
          Xem lại thông tin đặt phòng
        </Button>
        <Link to={backToDetailPath} className="w-full sm:w-auto">
          <Button type="button" variant="outline" size="md" className="w-full">
            Quay lại chi tiết phòng
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationSuccessView;
