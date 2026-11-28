import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import { BOOKING_CONFIRMATION_FIXTURE } from '../fixtures/bookingConfirmationFixture';
import { BookingBreadcrumbHeader } from './BookingBreadcrumbHeader';
import { ApprovedRequestSummaryCard } from './ApprovedRequestSummaryCard';
import { TenantContactCard } from './TenantContactCard';
import { DepositHoldCard } from './DepositHoldCard';
import { BookingConfirmationCard } from './BookingConfirmationCard';
import { BookingRoomSidebar } from './BookingRoomSidebar';

export const BookingConfirmationFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState<string | null>(null);
  const [messageNotice, setMessageNotice] = useState<string | null>(null);

  const fixture = BOOKING_CONFIRMATION_FIXTURE;
  const actualRoomId = id?.trim() || fixture.room.id;
  const backToRentalRequestPath = ROUTES.ROOM_RENTAL_REQUEST.replace(':id', actualRoomId);

  const handleConfirmChange = (checked: boolean) => {
    setIsConfirmed(checked);
    if (!checked) {
      setPaymentNotice(null);
    }
  };

  const handleContinue = () => {
    if (!isConfirmed) return;
    setPaymentNotice(
      `Demo xác nhận đặt phòng: Đã ghi nhận kiểm tra thông tin cho yêu cầu ${fixture.approvedSummary.requestCode}. Cổng thanh toán tiền cọc trực tuyến chưa được kích hoạt trong bản demo.`
    );
  };

  const handleMessageLandlord = () => {
    setMessageNotice(
      `Demo nhắn tin: Đã ghi nhận yêu cầu liên hệ chủ trọ ${fixture.landlord.name}. Kênh chat trực tuyến chưa được kích hoạt trong bản demo.`
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <BookingBreadcrumbHeader
        roomId={actualRoomId}
        buildingName={fixture.room.buildingName}
        roomTitle={fixture.room.title}
        pageTitle={fixture.pageTitle}
        pageSubtitle={fixture.pageSubtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ApprovedRequestSummaryCard summary={fixture.approvedSummary} />
          <TenantContactCard tenant={fixture.tenantContact} />
          <DepositHoldCard depositHold={fixture.depositHold} />
          <BookingConfirmationCard
            terms={fixture.confirmationTerms}
            isConfirmed={isConfirmed}
            onConfirmChange={handleConfirmChange}
            backToRentalRequestPath={backToRentalRequestPath}
            onContinue={handleContinue}
            paymentNotice={paymentNotice}
            onDismissNotice={() => setPaymentNotice(null)}
          />
        </div>

        <div className="lg:col-span-5">
          <BookingRoomSidebar
            room={fixture.room}
            depositAmount={fixture.depositHold.depositAmount}
            landlord={fixture.landlord}
            supportNote={fixture.supportNote}
            onMessageLandlord={handleMessageLandlord}
            messageNotice={messageNotice}
            onDismissMessageNotice={() => setMessageNotice(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationFeature;
