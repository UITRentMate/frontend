import React from 'react';

import { formatCurrency } from '@/utils/formatCurrency';

import Button from '@/components/ui/Button';
import { CheckCircle2Icon } from '@/components/ui/icons';

import type { DepositPaymentSuccessViewProps } from '../types';

export const DepositPaymentSuccessView: React.FC<DepositPaymentSuccessViewProps> = ({
  transaction,
  summary,
  onChangeMethod,
  onBackToDetail,
}) => {
  const gatewayLabel =
    transaction.gateway === 'VNPAY' ? 'Cổng thanh toán VNPAY' : 'Ví điện tử MoMo';

  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-lg mx-auto text-center shadow-soft-sm my-8">
      <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-pill flex items-center justify-center mx-auto mb-4">
        <CheckCircle2Icon className="w-8 h-8 text-secondary-600" />
      </div>

      <h2 className="text-xl font-heading font-bold text-text-primary">
        Đã khởi tạo giao dịch thanh toán!
      </h2>

      <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
        Mã giao dịch{' '}
        <strong className="text-text-primary font-mono">{transaction.transactionCode}</strong> qua{' '}
        <strong className="text-text-primary">{gatewayLabel}</strong> cho phòng{' '}
        <strong className="text-text-primary">{summary.roomCode}</strong> với số tiền{' '}
        <strong className="text-brand-500">{formatCurrency(transaction.amount)}</strong>.
      </p>

      <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700 leading-normal">
        {transaction.message}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onChangeMethod}
          className="w-full sm:w-auto"
        >
          Đổi phương thức thanh toán
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

export default DepositPaymentSuccessView;
