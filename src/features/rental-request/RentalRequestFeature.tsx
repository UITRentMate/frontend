import React, { useState } from 'react';
import { BreadcrumbHeader } from './components/BreadcrumbHeader';
import { TenantInfoCard } from './components/TenantInfoCard';
import { RentalPlanCard } from './components/RentalPlanCard';
import { ActionCard } from './components/ActionCard';
import { RoomSummarySidebar } from './components/RoomSummarySidebar';
import {
  TenantProfile,
  RoomDetail,
  ContractDurationOption,
} from '../../types/rental-request';
import { CheckCircle2 } from 'lucide-react';

const MOCK_TENANT: TenantProfile = {
  fullName: 'Nguyễn Minh Hoàng',
  phone: '098***321',
  email: 'hoang.nguyen***@email.com',
};

const MOCK_ROOM: RoomDetail = {
  id: 'room-ag-302',
  roomCode: 'AG-302',
  title: 'Phòng Studio gác lửng ban công thoáng mát (Tầng 3)',
  buildingName: 'Khu trọ An Gia Building',
  address: '285/12 Cách Mạng Tháng 8, Phường 12, Quận 10, TP.HCM',
  isAvailable: true,
  statusLabel: 'Đang trống • Nhận khách',
  specs: {
    area: 28,
    maxTenants: 2,
    furnished: true,
    hasBalcony: true,
  },
  financials: {
    monthlyRent: 4500000,
    deposit: 4500000,
    electricityCost: 3800,
    waterCost: 25000,
    serviceFee: 150000,
  },
  landlord: {
    name: 'Nguyễn Văn An',
    avatarText: 'NA',
    isVerified: true,
    approvalRate: 96,
    responseTime: '< 30 phút',
  },
  imageUrl: '',
};

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

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleBack = () => {
    alert('Quay lại trang chi tiết phòng!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Banner / Breadcrumb & Header */}
      <BreadcrumbHeader
        buildingName={MOCK_ROOM.buildingName}
        roomTitle={MOCK_ROOM.title}
      />

      {/* Main Content Body */}
      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-8">
        {isSubmitted ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-xs">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Gửi yêu cầu thuê thành công!
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Yêu cầu thuê phòng <strong>{MOCK_ROOM.roomCode}</strong> của bạn đã
              được chuyển đến chủ trọ <strong>{MOCK_ROOM.landlord.name}</strong>.
              Bạn sẽ nhận được phản hồi qua thông báo và email trong vòng{' '}
              {MOCK_ROOM.landlord.responseTime}.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Chỉnh sửa lại yêu cầu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & Personal Info (62% - 7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <TenantInfoCard tenant={MOCK_TENANT} />

              <RentalPlanCard
                moveInDate={moveInDate}
                onMoveInDateChange={setMoveInDate}
                tenantCount={tenantCount}
                onTenantCountChange={setTenantCount}
                maxTenants={MOCK_ROOM.specs.maxTenants}
                contractDuration={contractDuration}
                onContractDurationChange={setContractDuration}
                note={noteToLandlord}
                onNoteChange={setNoteToLandlord}
              />

              <ActionCard
                isConfirmed={isConfirmed}
                onConfirmChange={setIsConfirmed}
                onSubmit={handleSubmit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Right Column: Room & Financial Summary (38% - 5 cols) */}
            <div className="lg:col-span-5">
              <RoomSummarySidebar room={MOCK_ROOM} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
