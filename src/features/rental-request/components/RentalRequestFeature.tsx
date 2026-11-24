import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import { AlertCircleIcon } from '@/components/ui/icons';

import { BreadcrumbHeader } from './BreadcrumbHeader';
import { TenantInfoCard } from './TenantInfoCard';
import { RentalPlanCard } from './RentalPlanCard';
import { ActionCard } from './ActionCard';
import { RoomSummarySidebar } from './RoomSummarySidebar';
import { RentalRequestSuccessView } from './RentalRequestSuccessView';
import {
  useRentalRoomDetail,
  useTenantProfile,
  useSubmitRentalRequest,
} from '../hooks';
import { validateMoveInDate, validateTenantCount } from '../utils/validation';
import type { ContractDurationOption } from '../types';

export const RentalRequestFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const roomId = id || 'room-ag-302';
  const {
    data: room,
    isLoading: isLoadingRoom,
    isError: isRoomError,
    refetch: refetchRoom,
  } = useRentalRoomDetail(roomId);
  const { data: tenant, isLoading: isLoadingTenant } = useTenantProfile();
  const submitMutation = useSubmitRentalRequest();

  // Form State
  const [moveInDate, setMoveInDate] = useState('');
  const [tenantCount, setTenantCount] = useState(1);
  const [contractDuration, setContractDuration] =
    useState<ContractDurationOption>('12_months');
  const [noteToLandlord, setNoteToLandlord] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Field validation error states
  const [dateError, setDateError] = useState<string | null>(null);
  const [tenantCountError, setTenantCountError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleBack = () => {
    navigate(room?.id ? `/rooms/${room.id}` : ROUTES.ROOMS);
  };

  const handleUpdateProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  const handleContactLandlord = () => {
    setActionNotice('Tính năng nhắn tin trực tiếp với chủ trọ đang được đồng bộ qua hệ thống RentMate Chat.');
  };

  const handleDateChange = (val: string) => {
    setMoveInDate(val);
    if (dateError) setDateError(null);
    if (generalError) setGeneralError(null);
  };

  const handleTenantCountChange = (val: number) => {
    setTenantCount(val);
    if (tenantCountError) setTenantCountError(null);
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setGeneralError(null);

    // Validate fields
    const dateErr = validateMoveInDate(moveInDate);
    const countErr = validateTenantCount(
      tenantCount,
      room?.specs?.maxTenants || 2
    );

    if (dateErr) {
      setDateError(dateErr);
    }
    if (countErr) {
      setTenantCountError(countErr);
    }

    if (dateErr || countErr) {
      setGeneralError('Vui lòng kiểm tra lại các trường thông tin kế hoạch thuê phòng.');
      return;
    }

    if (!isConfirmed) {
      setGeneralError('Vui lòng đọc và tích cam kết xác nhận thông tin trước khi gửi.');
      return;
    }

    try {
      await submitMutation.mutateAsync({
        roomId,
        moveInDate,
        tenantCount,
        contractDuration,
        note: noteToLandlord.trim() || undefined,
      });
      setIsSubmitted(true);
    } catch {
      setGeneralError('Không thể gửi yêu cầu thuê phòng lúc này. Vui lòng thử lại sau.');
    }
  };

  // 1. Loading State
  if (isLoadingRoom || isLoadingTenant) {
    return (
      <div className="w-full py-16 flex items-center justify-center">
        <Loading message="Đang tải dữ liệu hồ sơ thuê phòng..." size="lg" />
      </div>
    );
  }

  // 2. Error State
  if (isRoomError || !room) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-danger-soft text-danger flex items-center justify-center mx-auto mb-1">
          <AlertCircleIcon className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-heading font-bold text-text-primary">
          Không tìm thấy thông tin phòng trọ
        </h2>
        <p className="text-xs sm:text-sm text-text-muted max-w-md">
          Không thể tải dữ liệu phòng để gửi yêu cầu thuê. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Button variant="primary" size="sm" onClick={() => refetchRoom()}>
            Thử tải lại
          </Button>
          <Button variant="outline" size="sm" onClick={handleBack}>
            Quay lại danh sách phòng
          </Button>
        </div>
      </div>
    );
  }

  // 3. Success State
  if (isSubmitted) {
    return (
      <div className="w-full">
        <BreadcrumbHeader
          buildingName={room.buildingName}
          roomTitle={room.title}
        />
        <RentalRequestSuccessView
          room={room}
          moveInDate={moveInDate}
          tenantCount={tenantCount}
          contractDuration={contractDuration}
          onReset={() => setIsSubmitted(false)}
          onBack={handleBack}
        />
      </div>
    );
  }

  // 4. Main Form State
  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Breadcrumb & Header */}
      <BreadcrumbHeader
        buildingName={room.buildingName}
        roomTitle={room.title}
      />

      {/* Main Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Personal Info (60% - 7 cols on lg) */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* General Error Banner */}
          {generalError && (
            <div
              role="alert"
              className="bg-danger-soft border border-danger-border text-danger text-xs px-4 py-2.5 rounded-lg flex items-center justify-between"
            >
              <span>{generalError}</span>
              <button
                type="button"
                aria-label="Đóng thông báo lỗi"
                onClick={() => setGeneralError(null)}
                className="font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Action Notice Banner if any */}
          {actionNotice && (
            <div
              role="status"
              className="bg-brand-50 border border-brand-200 text-brand-700 text-xs px-4 py-2.5 rounded-lg flex items-center justify-between"
            >
              <span>{actionNotice}</span>
              <button
                type="button"
                aria-label="Đóng thông báo"
                onClick={() => setActionNotice(null)}
                className="font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* Card 1: Tenant Profile */}
          {tenant && (
            <TenantInfoCard
              tenant={tenant}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {/* Card 2: Rental Plan */}
          <RentalPlanCard
            moveInDate={moveInDate}
            onMoveInDateChange={handleDateChange}
            tenantCount={tenantCount}
            onTenantCountChange={handleTenantCountChange}
            maxTenants={room.specs.maxTenants}
            contractDuration={contractDuration}
            onContractDurationChange={setContractDuration}
            note={noteToLandlord}
            onNoteChange={setNoteToLandlord}
            dateError={dateError}
            tenantCountError={tenantCountError}
          />

          {/* Card 3: Confirmation and Action */}
          <ActionCard
            isConfirmed={isConfirmed}
            onConfirmChange={setIsConfirmed}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={submitMutation.isPending}
          />
        </form>

        {/* Right Column: Room & Financial Summary (40% - 5 cols on lg) */}
        <div className="lg:col-span-5">
          <RoomSummarySidebar
            room={room}
            onContactLandlord={handleContactLandlord}
          />
        </div>
      </div>
    </div>
  );
};

export default RentalRequestFeature;
