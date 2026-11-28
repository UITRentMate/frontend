import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/paths';

import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { AlertCircleIcon } from '@/components/ui/icons';

import { useDepositPaymentSummary, useCreateDepositTransaction } from '../hooks';
import { MOCK_PAYMENT_GATEWAYS } from '../services/mockData';
import { canSubmitDepositPayment, validatePaymentMethod } from '../utils/validation';
import { DepositPaymentBreadcrumb } from './DepositPaymentBreadcrumb';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { SecurityNoticeCard } from './SecurityNoticeCard';
import { DepositSummaryCard } from './DepositSummaryCard';
import { DepositPaymentSuccessView } from './DepositPaymentSuccessView';
import type { CreateDepositTransactionResponse, PaymentGateway } from '../types';

export const DepositPaymentFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roomId = id?.trim() || 'room-ag-302';
  const {
    data: summary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
    refetch: refetchSummary,
  } = useDepositPaymentSummary(roomId);
  const { mutate: createTransaction, isPending: isSubmitting } = useCreateDepositTransaction();

  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('VNPAY');
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [createdTransaction, setCreatedTransaction] =
    useState<CreateDepositTransactionResponse | null>(null);

  const handleBack = () => {
    const targetRoomId = summary?.roomId || id?.trim();
    navigate(targetRoomId ? ROUTES.ROOM_DETAIL.replace(':id', targetRoomId) : ROUTES.ROOMS);
  };

  const handleSelectGateway = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway);
    setGatewayError(null);
    setFeedbackError(null);
  };

  const handleSubmit = () => {
    if (!summary || isSubmitting) return;

    const methodErr = validatePaymentMethod(selectedGateway);
    setGatewayError(methodErr);
    if (methodErr) {
      setFeedbackError(methodErr);
      return;
    }

    if (!canSubmitDepositPayment(selectedGateway, summary.isHoldExpired, summary.depositAmount)) {
      setFeedbackError('Phiên giữ chỗ đã hết hạn hoặc khoản tiền cọc không hợp lệ.');
      return;
    }

    setFeedbackError(null);
    createTransaction(
      {
        roomId: summary.roomId || roomId,
        requestCode: summary.requestCode,
        gateway: selectedGateway,
        amount: summary.depositAmount,
      },
      {
        onSuccess: (response) => {
          setCreatedTransaction(response);
        },
        onError: (err) => {
          setFeedbackError(
            err.message || 'Không thể khởi tạo giao dịch thanh toán. Vui lòng thử lại.'
          );
        },
      }
    );
  };

  if (isLoadingSummary) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <Loading message="Đang tải thông tin thanh toán tiền cọc..." fullScreen />
      </div>
    );
  }

  if (isErrorSummary || !summary) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-surface-card border border-border-subtle rounded-xl text-center space-y-4 shadow-soft-xs">
        <div className="w-12 h-12 mx-auto rounded-pill bg-danger-soft text-danger flex items-center justify-center">
          <AlertCircleIcon className="w-6 h-6" />
        </div>
        <h2 className="text-base sm:text-lg font-bold font-heading text-text-primary">
          Không thể tải thông tin thanh toán
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          Phiên giữ chỗ không tồn tại, đã hết hạn hoặc kết nối máy chủ tạm thời gián đoạn.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              void refetchSummary();
            }}
            className="w-full sm:w-auto"
          >
            Thử tải lại
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="w-full sm:w-auto"
          >
            Quay lại bài đăng phòng
          </Button>
        </div>
      </div>
    );
  }

  const resolvedSummary = {
    ...summary,
    tenantName: user?.name || summary.tenantName,
  };
  const canSubmit = canSubmitDepositPayment(
    selectedGateway,
    resolvedSummary.isHoldExpired,
    resolvedSummary.depositAmount
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <DepositPaymentBreadcrumb
        roomId={resolvedSummary.roomId || roomId}
        buildingName={resolvedSummary.buildingName}
        roomTitle={resolvedSummary.roomTitle}
      />

      {createdTransaction ? (
        <DepositPaymentSuccessView
          transaction={createdTransaction}
          summary={resolvedSummary}
          onChangeMethod={() => setCreatedTransaction(null)}
          onBackToDetail={handleBack}
        />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left Column (~60% - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-heading font-bold text-text-primary tracking-tight">
                Thanh toán tiền cọc
              </h1>
              <p className="text-sm text-text-muted">
                Kiểm tra thông tin chi tiết và lựa chọn cổng thanh toán điện tử an toàn để tiếp tục.
              </p>
            </div>

            {feedbackError && (
              <div
                role="alert"
                className="p-3.5 bg-danger-soft border border-danger-border rounded-md text-xs text-danger font-medium flex items-center justify-between gap-3"
              >
                <span>{feedbackError}</span>
                <button
                  type="button"
                  onClick={() => setFeedbackError(null)}
                  aria-label="Đóng thông báo lỗi"
                  className="text-danger hover:opacity-80 font-bold text-sm px-1 shrink-0 cursor-pointer"
                >
                  ×
                </button>
              </div>
            )}

            <PaymentMethodSelector
              gateways={MOCK_PAYMENT_GATEWAYS}
              selectedGateway={selectedGateway}
              onSelectGateway={handleSelectGateway}
              inlineError={gatewayError}
            />

            <SecurityNoticeCard sessionMinutes={15} />
          </div>

          {/* Right Column (~40% - 5 cols) */}
          <div className="lg:col-span-5">
            <DepositSummaryCard
              summary={resolvedSummary}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              onBack={handleBack}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default DepositPaymentFeature;
