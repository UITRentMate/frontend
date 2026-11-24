import React from 'react';
import { CheckCircle2Icon } from '@/components/ui/icons';
import Button from '@/components/ui/Button';
import { getContractDurationLabel } from '../constants';
import type { RentalRequestSuccessViewProps } from '../types';

export const RentalRequestSuccessView: React.FC<RentalRequestSuccessViewProps> = ({
  room,
  tenantCount,
  contractDuration,
  onReset,
  onBack,
}) => {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-lg mx-auto text-center shadow-soft-sm my-8">
      <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-pill flex items-center justify-center mx-auto mb-4">
        <CheckCircle2Icon className="w-8 h-8 text-secondary-600" />
      </div>
      <h2 className="text-xl font-heading font-bold text-text-primary">
        Gửi yêu cầu thuê phòng thành công!
      </h2>
      <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
        Hồ sơ yêu cầu thuê phòng <strong className="text-text-primary">{room.roomCode}</strong> (Thời hạn{' '}
        <strong className="text-text-primary">{getContractDurationLabel(contractDuration)}</strong>, {tenantCount} người ở) đã được chuyển đến chủ trọ{' '}
        <strong className="text-text-primary">{room.landlord.name}</strong>.
      </p>
      <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700 leading-normal">
        Chủ nhà thường phản hồi trong vòng <strong>{room.landlord.responseTime}</strong>. Bạn sẽ nhận được thông báo ngay khi hồ sơ được duyệt.
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={onReset}
          className="w-full sm:w-auto"
        >
          Chỉnh sửa lại yêu cầu
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onBack}
          className="w-full sm:w-auto"
        >
          Quay lại chi tiết phòng
        </Button>
      </div>
    </div>
  );
};

export default RentalRequestSuccessView;
