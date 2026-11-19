import React, { useState } from 'react';
import { ReminderBanner } from './components/ReminderBanner';
import { ScheduleBreadcrumb } from './components/ScheduleBreadcrumb';
import { StepIndicator } from './components/StepIndicator';
import { DateSelector } from './components/DateSelector';
import { TimeSlotSelector } from './components/TimeSlotSelector';
import { IdentityNotice } from './components/IdentityNotice';
import { TourActionBar } from './components/TourActionBar';
import { RoomTourSidebar } from './components/RoomTourSidebar';
import {
  DatePillOption,
  TimeSlotOption,
  RoomTourSnapshot,
} from '../../types/schedule-tour';
import { CheckCircle2 } from 'lucide-react';

const MOCK_DATE_OPTIONS: DatePillOption[] = [
  {
    id: 'date-today',
    label: 'HÔM NAY',
    dateFormatted: 'T.Sáu, 24/10/2026',
    dateValue: '24/10/2026',
    availableSlotsCount: 4,
  },
  {
    id: 'date-tomorrow',
    label: 'NGÀY MAI',
    dateFormatted: 'T.Bảy, 25/10/2026',
    dateValue: '25/10/2026',
    availableSlotsCount: 6,
  },
  {
    id: 'date-sunday',
    label: 'CHỦ NHẬT',
    dateFormatted: 'C.Nhật, 26/10/2026',
    dateValue: '26/10/2026',
    availableSlotsCount: 5,
  },
  {
    id: 'date-monday',
    label: 'ĐẦU TUẦN',
    dateFormatted: 'Thứ 2, 27/10/2026',
    dateValue: '27/10/2026',
    availableSlotsCount: 2,
  },
];

const MOCK_TIME_SLOTS: TimeSlotOption[] = [
  // Sáng
  { id: 'slot-m1', timeRange: '09:00 - 09:45', period: 'morning', isFull: false },
  { id: 'slot-m2', timeRange: '10:30 - 11:15', period: 'morning', isFull: false },
  { id: 'slot-m3', timeRange: '11:30 - 12:15', period: 'morning', isFull: true },
  // Chiều
  { id: 'slot-a1', timeRange: '14:00 - 14:45', period: 'afternoon', isFull: false },
  { id: 'slot-a2', timeRange: '15:30 - 16:15', period: 'afternoon', isFull: false },
  { id: 'slot-a3', timeRange: '16:30 - 17:30', period: 'afternoon', isFull: false },
  // Tối
  { id: 'slot-e1', timeRange: '18:15 - 19:00', period: 'evening', isFull: false },
  { id: 'slot-e2', timeRange: '19:15 - 20:00', period: 'evening', isFull: false },
  { id: 'slot-e3', timeRange: '20:15 - 21:00', period: 'evening', isFull: true },
];

const MOCK_ROOM_SNAPSHOT: RoomTourSnapshot = {
  roomCode: 'AG-302',
  title: 'Phòng Studio ban công thoáng mát',
  buildingName: 'Khu trọ An Gia Building',
  monthlyRent: 4500000,
  deposit: 4500000,
  electricityCost: 3800,
  waterCost: 25000,
  area: 28,
  address: '285/12 Cách Mạng Tháng 8, Phường 12, Quận 10, TP.HCM',
  imageUrl: '',
  photosCount: 8,
  landlord: {
    name: 'Nguyễn Văn An',
    avatarText: 'NA',
    role: 'Quản lý tòa An Gia (4 năm uy tín)',
    isVerified: true,
    approvalRate: 96,
    responseTime: '< 30 phút',
  },
};

export const ScheduleTourFeature: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [selectedDate, setSelectedDate] = useState('24/10/2026');
  const [customDate, setCustomDate] = useState('24/10/2026');
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([
    'slot-a1',
    'slot-a3',
  ]);
  const [landlordNote, setLandlordNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleSlot = (slotId: string) => {
    if (selectedSlotIds.includes(slotId)) {
      setSelectedSlotIds((prev) => prev.filter((id) => id !== slotId));
    } else {
      if (selectedSlotIds.length >= 3) {
        alert('Bạn chỉ có thể chọn tối đa 3 khung giờ xem phòng.');
        return;
      }
      setSelectedSlotIds((prev) => [...prev, slotId]);
    }
  };

  const handleSelectDate = (dateVal: string) => {
    setSelectedDate(dateVal);
    setCustomDate(dateVal);
  };

  const handleSubmit = () => {
    if (selectedSlotIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 khung giờ xem phòng.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleBack = () => {
    alert('Quay lại chi tiết phòng!');
  };

  return (
    <div className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-8 lg:px-16 py-6 flex flex-col gap-5">
      {/* 1. Reminder Banner */}
      {showBanner && (
        <ReminderBanner onDismiss={() => setShowBanner(false)} />
      )}

      {/* 2. Breadcrumb & Header */}
      <ScheduleBreadcrumb
        buildingName={MOCK_ROOM_SNAPSHOT.buildingName}
        roomTitle={MOCK_ROOM_SNAPSHOT.title}
      />

      {/* 3. Main Form or Success View */}
      {isSubmitted ? (
        <div className="bg-white border border-indigo-100 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-xs my-8">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Đặt lịch xem phòng thành công!
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Yêu cầu xem phòng <strong>{MOCK_ROOM_SNAPSHOT.roomCode}</strong> vào ngày{' '}
            <strong>{selectedDate}</strong> ({selectedSlotIds.length} khung giờ) đã được gửi tới chủ nhà{' '}
            <strong>{MOCK_ROOM_SNAPSHOT.landlord.name}</strong>.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-6 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Chỉnh sửa lịch hẹn
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (~65% - 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Step Indicator */}
            <StepIndicator />

            {/* Booking Form Card */}
            <div className="bg-white border border-indigo-100 rounded-2xl p-5 sm:p-7 shadow-xs flex flex-col gap-6">
              {/* Section 1: Date Selection */}
              <DateSelector
                dateOptions={MOCK_DATE_OPTIONS}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                customDate={customDate}
                onCustomDateChange={(val) => {
                  setCustomDate(val);
                  setSelectedDate(val);
                }}
              />

              {/* Section 2: Time Slots */}
              <TimeSlotSelector
                slots={MOCK_TIME_SLOTS}
                selectedSlotIds={selectedSlotIds}
                onToggleSlot={handleToggleSlot}
                maxSlots={3}
              />

              {/* Section 3: Note to landlord */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tour-note" className="font-bold text-slate-900">
                    3. Lời nhắn gửi chủ trọ{' '}
                    <span className="font-normal text-slate-500">(Không bắt buộc)</span>
                  </label>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {landlordNote.length} / 250 ký tự
                  </span>
                </div>
                <textarea
                  id="tour-note"
                  rows={2}
                  maxLength={250}
                  value={landlordNote}
                  onChange={(e) => setLandlordNote(e.target.value)}
                  placeholder="Nhập lời nhắn nếu cần (tối đa 250 ký tự)..."
                  className="w-full bg-slate-50 border border-indigo-100 rounded-xl p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none transition-all"
                />
              </div>

              {/* Identity Protection Notice */}
              <IdentityNotice userName="Nguyễn Minh Hoàng" />

              {/* Action Bar */}
              <TourActionBar
                onBack={handleBack}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isDisabled={selectedSlotIds.length === 0}
              />
            </div>
          </div>

          {/* Right Column (~35% - 4 cols, Sticky) */}
          <div className="lg:col-span-4">
            <RoomTourSidebar room={MOCK_ROOM_SNAPSHOT} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTourFeature;

