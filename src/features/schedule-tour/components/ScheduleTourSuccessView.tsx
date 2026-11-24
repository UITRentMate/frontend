import React from 'react';
import Button from '@/components/ui/Button';
import { CheckCircle2Icon } from '@/components/ui/icons';
import type { ScheduleTourSuccessViewProps } from '../types';

export const ScheduleTourSuccessView: React.FC<ScheduleTourSuccessViewProps> = ({
  room,
  selectedDate,
  selectedSlotCount,
  onEditBooking,
  onBackToDetail,
}) => {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-lg mx-auto text-center shadow-soft-sm my-8">
      <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-pill flex items-center justify-center mx-auto mb-4">
        <CheckCircle2Icon className="w-8 h-8 text-secondary-600" />
      </div>

      <h2 className="text-xl font-heading font-bold text-text-primary">
        Đặt lịch xem phòng thành công!
      </h2>

      <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
        Yêu cầu xem phòng <strong className="text-text-primary">{room.roomCode}</strong> vào
        ngày <strong className="text-text-primary">{selectedDate}</strong> ({selectedSlotCount} khung
        giờ) đã được gửi tới chủ nhà{' '}
        <strong className="text-text-primary">{room.landlord.name}</strong>.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onEditBooking}
          className="w-full sm:w-auto"
        >
          Chỉnh sửa lịch hẹn
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBackToDetail}
          className="w-full sm:w-auto"
        >
          Quay lại chi tiết phòng
        </Button>
      </div>
    </div>
  );
};

export default ScheduleTourSuccessView;
