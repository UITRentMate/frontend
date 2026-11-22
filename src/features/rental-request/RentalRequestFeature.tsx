import React, { useState } from 'react';
import { BreadcrumbHeader } from './components/BreadcrumbHeader';
import { TenantInfoCard } from './components/TenantInfoCard';
import { RentalPlanCard } from './components/RentalPlanCard';
import { ActionCard } from './components/ActionCard';
import { RoomSummarySidebar } from './components/RoomSummarySidebar';
import { CheckCircle2Icon } from '@/components/ui/icons';
import { MOCK_TENANT, MOCK_RENTAL_ROOM } from './services/mockData';
import type { ContractDurationOption } from './types';

export const RentalRequestFeature: React.FC = () => {
  const [moveInDate, setMoveInDate] = useState('01/11/2026');
  const [tenantCount, setTenantCount] = useState(2);
  const [contractDuration, setContractDuration] =
    useState<ContractDurationOption>('12_months');
  const [noteToLandlord, setNoteToLandlord] = useState(
    'Chào anh An, em làm kỹ sư phần mềm tại Q.1, lịch sinh hoạt gọn gàng, dự kiến dọn vào đúng đầu tháng 11 ạ.'
  );
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!moveInDate.trim()) {
      setValidationError('Vui lòng nhập ngày dự kiến dọn vào ở.');
      return;
    }
    if (!isConfirmed) {
      setValidationError('Vui lòng xác nhận tính chính xác của thông tin trước khi gửi.');
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleUpdateProfile = () => {
    alert('Chuyển hướng đến trang cập nhật hồ sơ cá nhân.');
  };

  const getContractDurationLabel = (val: ContractDurationOption) => {
    switch (val) {
      case '6_months':
        return '6 tháng';
      case '12_months':
        return '12 tháng';
      case 'flexible':
        return 'Linh hoạt';
      default:
        return val;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Breadcrumb & Header */}
      <BreadcrumbHeader
        buildingName={MOCK_RENTAL_ROOM.buildingName}
        roomTitle={MOCK_RENTAL_ROOM.title}
      />

      {/* 2. Main Content Body */}
      {isSubmitted ? (
        <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-lg mx-auto text-center shadow-soft-sm my-8">
          <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-pill flex items-center justify-center mx-auto mb-4">
            <CheckCircle2Icon className="w-8 h-8 text-secondary-600" />
          </div>
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Gửi yêu cầu thuê phòng thành công!
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
            Hồ sơ yêu cầu thuê phòng <strong className="text-text-primary">{MOCK_RENTAL_ROOM.roomCode}</strong> (Thời hạn{' '}
            <strong className="text-text-primary">{getContractDurationLabel(contractDuration)}</strong>, {tenantCount} người ở) đã được chuyển đến chủ trọ{' '}
            <strong className="text-text-primary">{MOCK_RENTAL_ROOM.landlord.name}</strong>.
          </p>
          <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-700 leading-normal">
            Chủ nhà thường phản hồi trong vòng <strong>{MOCK_RENTAL_ROOM.landlord.responseTime}</strong>. Bạn sẽ nhận được thông báo ngay khi hồ sơ được duyệt.
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold rounded-md shadow-soft-xs transition-colors cursor-pointer"
            >
              Chỉnh sửa lại yêu cầu
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto px-6 py-2.5 bg-surface-card border border-border-subtle hover:bg-surface-muted text-text-primary text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer"
            >
              Quay lại chi tiết phòng
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Personal Info (60% - 7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Validation alert */}
            {validationError && (
              <div className="bg-danger-soft border border-danger-border text-danger text-xs px-4 py-2.5 rounded-lg flex items-center justify-between">
                <span>{validationError}</span>
                <button
                  type="button"
                  onClick={() => setValidationError(null)}
                  className="font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Card 1: Tenant Profile */}
            <TenantInfoCard
              tenant={MOCK_TENANT}
              onUpdateProfile={handleUpdateProfile}
            />

            {/* Card 2: Rental Plan */}
            <RentalPlanCard
              moveInDate={moveInDate}
              onMoveInDateChange={setMoveInDate}
              tenantCount={tenantCount}
              onTenantCountChange={setTenantCount}
              maxTenants={MOCK_RENTAL_ROOM.specs.maxTenants}
              contractDuration={contractDuration}
              onContractDurationChange={setContractDuration}
              note={noteToLandlord}
              onNoteChange={setNoteToLandlord}
            />

            {/* Card 3: Confirmation and Action */}
            <ActionCard
              isConfirmed={isConfirmed}
              onConfirmChange={setIsConfirmed}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Room & Financial Summary (40% - 5 cols on lg) */}
          <div className="lg:col-span-5">
            <RoomSummarySidebar room={MOCK_RENTAL_ROOM} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalRequestFeature;
