import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/paths';

import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { AlertCircleIcon } from '@/components/ui/icons';

import { useBookingDetail, useInitiateDepositPayment } from '../hooks';
import { canProceedDepositPayment } from '../utils/validation';
import { BookingDetailBreadcrumb } from './BookingDetailBreadcrumb';
import { BookingInfoSection } from './BookingInfoSection';
import { DepositStatusCard } from './DepositStatusCard';
import { HoldDeadlineCard } from './HoldDeadlineCard';

export const BookingDetailFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roomId = id?.trim() || 'room-ag-302';
  const {
    data,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    refetch: refetchDetail,
  } = useBookingDetail(roomId);
  const { mutate: initiatePayment, isPending: isInitiatingPayment } =
    useInitiateDepositPayment();

  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBackToRoomOrList = () => {
    const targetRoomId = data?.room.id || id?.trim();
    navigate(targetRoomId ? ROUTES.ROOM_DETAIL.replace(':id', targetRoomId) : ROUTES.ROOMS);
  };

  const handleMessageLandlord = () => {
    if (!data) return;
    setErrorMessage(null);
    setActionNotice(
      `Đã mở kênh trao đổi chính thức trên RentMate với chủ nhà ${data.landlord.name}.`
    );
  };

  const handleProceedPayment = () => {
    if (!data || isInitiatingPayment) return;
    if (!canProceedDepositPayment(data.deposit.status, data.holdWindow.isExpired)) {
      setErrorMessage('Yêu cầu đặt cọc hiện không khả dụng hoặc đã hết hạn giữ chỗ.');
      return;
    }

    setErrorMessage(null);
    initiatePayment(
      {
        roomId: data.room.id || roomId,
        requestCode: data.contract.requestCode,
        depositAmount: data.deposit.depositAmount,
      },
      {
        onSuccess: (response) => {
          setActionNotice(response.message);
        },
        onError: (err) => {
          setErrorMessage(
            err.message || 'Không thể khởi tạo thanh toán tiền cọc lúc này. Vui lòng thử lại.'
          );
        },
      }
    );
  };

  if (isLoadingDetail) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <Loading message="Đang tải chi tiết đặt phòng..." fullScreen />
      </div>
    );
  }

  if (isErrorDetail || !data) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-surface-card border border-border-subtle rounded-xl text-center space-y-4 shadow-soft-xs">
        <div className="w-12 h-12 mx-auto rounded-pill bg-danger-soft text-danger flex items-center justify-center">
          <AlertCircleIcon className="w-6 h-6" />
        </div>
        <h2 className="text-base sm:text-lg font-bold font-heading text-text-primary">
          Không thể tải chi tiết đặt phòng
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          Thông tin đặt phòng này hiện không tồn tại, đã hết hạn giữ chỗ hoặc gặp sự cố kết nối.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              void refetchDetail();
            }}
            className="w-full sm:w-auto"
          >
            Thử tải lại
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBackToRoomOrList}
            className="w-full sm:w-auto"
          >
            Quay lại bài đăng phòng
          </Button>
        </div>
      </div>
    );
  }

  const actualRoomId = data.room.id || roomId;
  const resolvedContract = {
    ...data.contract,
    tenantName: user?.name || data.contract.tenantName,
  };
  const canProceedPayment = canProceedDepositPayment(
    data.deposit.status,
    data.holdWindow.isExpired
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      <BookingDetailBreadcrumb
        roomId={actualRoomId}
        district={data.room.district}
        roomTitle={data.room.title}
        roomCode={data.room.roomCode}
      />

      {errorMessage && (
        <div
          role="alert"
          className="p-3.5 bg-danger-soft border border-danger-border rounded-md text-xs text-danger font-medium flex items-center justify-between gap-3"
        >
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            aria-label="Đóng thông báo lỗi"
            className="text-danger hover:opacity-80 font-bold text-sm px-1 shrink-0 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {actionNotice && (
        <div
          role="status"
          aria-live="polite"
          className="p-3.5 bg-brand-50 border border-brand-200 rounded-md text-xs text-brand-700 font-medium flex items-center justify-between gap-3"
        >
          <span>{actionNotice}</span>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            aria-label="Đóng thông báo"
            className="text-brand-700 hover:text-brand-900 font-bold text-sm px-1 shrink-0 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <BookingInfoSection
            room={data.room}
            landlord={data.landlord}
            contract={resolvedContract}
            recurringCost={data.recurringCost}
            onMessageLandlord={handleMessageLandlord}
          />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-20 flex flex-col gap-5">
          <DepositStatusCard deposit={data.deposit} />
          <HoldDeadlineCard
            holdWindow={data.holdWindow}
            canProceedPayment={canProceedPayment}
            isInitiatingPayment={isInitiatingPayment}
            onProceedPayment={handleProceedPayment}
            onBackToRequests={handleBackToRoomOrList}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetailFeature;
