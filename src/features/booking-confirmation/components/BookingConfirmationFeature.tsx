import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/paths';

import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { AlertCircleIcon } from '@/components/ui/icons';

import { useBookingConfirmation, useConfirmRoomBooking } from '../hooks';
import { validateBookingConfirmationTerms } from '../utils/validation';
import { BookingBreadcrumbHeader } from './BookingBreadcrumbHeader';
import { ApprovedRequestSummaryCard } from './ApprovedRequestSummaryCard';
import { TenantContactCard } from './TenantContactCard';
import { DepositHoldCard } from './DepositHoldCard';
import { BookingConfirmationCard } from './BookingConfirmationCard';
import { BookingRoomSidebar } from './BookingRoomSidebar';
import { BookingConfirmationSuccessView } from './BookingConfirmationSuccessView';
import type { ConfirmBookingResponse } from '../types';

export const BookingConfirmationFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roomId = id?.trim() || 'room-ag-302';
  const {
    data,
    isLoading: isLoadingBooking,
    isError: isErrorBooking,
    refetch: refetchBooking,
  } = useBookingConfirmation(roomId);
  const { mutate: confirmBooking, isPending: isConfirming } = useConfirmRoomBooking();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messageNotice, setMessageNotice] = useState<string | null>(null);
  const [confirmedResult, setConfirmedResult] = useState<ConfirmBookingResponse | null>(null);

  const handleBackToDetail = () => {
    const targetRoomId = data?.room.id || id?.trim();
    navigate(targetRoomId ? ROUTES.ROOM_DETAIL.replace(':id', targetRoomId) : ROUTES.ROOMS);
  };

  const handleConfirmChange = (checked: boolean) => {
    setIsConfirmed(checked);
    if (checked) {
      setErrorMessage(null);
    }
  };

  const handleContinue = () => {
    if (!data || isConfirming) return;

    const termsError = validateBookingConfirmationTerms(isConfirmed);
    if (termsError) {
      setErrorMessage(termsError);
      return;
    }

    setErrorMessage(null);
    confirmBooking(
      {
        roomId: data.room.id || roomId,
        requestCode: data.approvedSummary.requestCode,
        depositAmount: data.depositHold.depositAmount,
        isTermsAccepted: isConfirmed,
      },
      {
        onSuccess: (response) => {
          setConfirmedResult(response);
        },
        onError: (err) => {
          setErrorMessage(
            err.message || 'Không thể xác nhận đặt phòng lúc này. Vui lòng thử lại sau.'
          );
        },
      }
    );
  };

  const handleMessageLandlord = () => {
    if (!data) return;
    setMessageNotice(
      `Đã ghi nhận yêu cầu liên hệ chủ trọ ${data.landlord.name}. Kênh nhắn tin trực tiếp đang được kết nối.`
    );
  };

  if (isLoadingBooking) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <Loading message="Đang tải thông tin xác nhận đặt phòng..." fullScreen />
      </div>
    );
  }

  if (isErrorBooking || !data) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-surface-card border border-border-subtle rounded-xl text-center space-y-4 shadow-soft-xs">
        <div className="w-12 h-12 mx-auto rounded-pill bg-danger-soft text-danger flex items-center justify-center">
          <AlertCircleIcon className="w-6 h-6" />
        </div>
        <h2 className="text-base sm:text-lg font-bold font-heading text-text-primary">
          Không thể tải thông tin xác nhận đặt phòng
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          Yêu cầu thuê phòng này không khả dụng, đã hết hạn giữ chỗ hoặc đã có lỗi kết nối.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              void refetchBooking();
            }}
            className="w-full sm:w-auto"
          >
            Thử tải lại
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBackToDetail}
            className="w-full sm:w-auto"
          >
            Quay lại bài đăng phòng
          </Button>
        </div>
      </div>
    );
  }

  const actualRoomId = data.room.id || roomId;
  const backToRentalRequestPath = ROUTES.ROOM_RENTAL_REQUEST.replace(':id', actualRoomId);
  const backToDetailPath = ROUTES.ROOM_DETAIL.replace(':id', actualRoomId);
  const resolvedTenantContact = {
    fullName: user?.name || data.tenantContact.fullName,
    phone: user?.phoneNumber || data.tenantContact.phone,
    email: user?.email || data.tenantContact.email,
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <BookingBreadcrumbHeader
        roomId={actualRoomId}
        buildingName={data.room.buildingName}
        roomTitle={data.room.title}
        pageTitle={data.pageTitle}
        pageSubtitle={data.pageSubtitle}
      />

      {confirmedResult ? (
        <BookingConfirmationSuccessView
          confirmation={confirmedResult}
          room={data.room}
          backToDetailPath={backToDetailPath}
          onEditConfirmation={() => setConfirmedResult(null)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ApprovedRequestSummaryCard summary={data.approvedSummary} />
            <TenantContactCard tenant={resolvedTenantContact} />
            <DepositHoldCard depositHold={data.depositHold} />
            <BookingConfirmationCard
              terms={data.confirmationTerms}
              isConfirmed={isConfirmed}
              onConfirmChange={handleConfirmChange}
              backToRentalRequestPath={backToRentalRequestPath}
              onContinue={handleContinue}
              isSubmitting={isConfirming}
              errorMessage={errorMessage}
              onDismissError={() => setErrorMessage(null)}
            />
          </div>

          <div className="lg:col-span-5">
            <BookingRoomSidebar
              room={data.room}
              depositAmount={data.depositHold.depositAmount}
              landlord={data.landlord}
              supportNote={data.supportNote}
              onMessageLandlord={handleMessageLandlord}
              messageNotice={messageNotice}
              onDismissMessageNotice={() => setMessageNotice(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmationFeature;
