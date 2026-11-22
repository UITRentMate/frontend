import React, { useState } from 'react';
import { ReminderBanner } from './components/ReminderBanner';
import { ScheduleBreadcrumb } from './components/ScheduleBreadcrumb';
import { StepIndicator } from './components/StepIndicator';
import { DateSelector } from './components/DateSelector';
import { TimeSlotSelector } from './components/TimeSlotSelector';
import { IdentityNotice } from './components/IdentityNotice';
import { TourActionBar } from './components/TourActionBar';
import { RoomTourSidebar } from './components/RoomTourSidebar';
import { CheckCircle2Icon } from '@/components/ui/icons';
import {
  MOCK_DATE_OPTIONS,
  MOCK_TIME_SLOTS,
  MOCK_ROOM_SNAPSHOT,
} from './services/mockData';

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
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleToggleSlot = (slotId: string) => {
    setFeedbackMessage(null);
    if (selectedSlotIds.includes(slotId)) {
      setSelectedSlotIds((prev) => prev.filter((id) => id !== slotId));
    } else {
      if (selectedSlotIds.length >= 3) {
        setFeedbackMessage('Bạn chỉ có thể chọn tối đa 3 khung giờ xem phòng.');
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
      setFeedbackMessage('Vui lòng chọn ít nhất 1 khung giờ xem phòng.');
      return;
    }
    setFeedbackMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Reminder Banner */}
      {showBanner && <ReminderBanner onDismiss={() => setShowBanner(false)} />}

      {/* 2. Breadcrumb & Header */}
      <ScheduleBreadcrumb
        buildingName={MOCK_ROOM_SNAPSHOT.buildingName}
        roomTitle={MOCK_ROOM_SNAPSHOT.title}
      />

      {/* 3. Main Form or Success View */}
      {isSubmitted ? (
        <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-lg mx-auto text-center shadow-soft-sm my-8">
          <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-pill flex items-center justify-center mx-auto mb-4">
            <CheckCircle2Icon className="w-8 h-8 text-secondary-600" />
          </div>
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Đặt lịch xem phòng thành công!
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
            Yêu cầu xem phòng <strong className="text-text-primary">{MOCK_ROOM_SNAPSHOT.roomCode}</strong> vào
            ngày <strong className="text-text-primary">{selectedDate}</strong> ({selectedSlotIds.length} khung
            giờ) đã được gửi tới chủ nhà{' '}
            <strong className="text-text-primary">{MOCK_ROOM_SNAPSHOT.landlord.name}</strong>.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold rounded-md shadow-soft-xs transition-colors cursor-pointer"
            >
              Chỉnh sửa lịch hẹn
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
          {/* Left Column (~65% - 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Step Indicator */}
            <StepIndicator />

            {/* Validation Message if any */}
            {feedbackMessage && (
              <div className="bg-danger-soft border border-danger-border text-danger text-xs px-4 py-2.5 rounded-lg flex items-center justify-between">
                <span>{feedbackMessage}</span>
                <button
                  type="button"
                  onClick={() => setFeedbackMessage(null)}
                  className="font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Booking Form Card */}
            <div className="bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-7 shadow-soft-xs flex flex-col gap-6">
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
                  <label
                    htmlFor="tour-note"
                    className="font-bold text-text-primary"
                  >
                    3. Lời nhắn gửi chủ trọ{' '}
                    <span className="font-normal text-text-muted">
                      (Không bắt buộc)
                    </span>
                  </label>
                  <span className="text-text-disabled font-mono text-[11px]">
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
                  className="w-full bg-canvas border border-border-subtle rounded-md p-3 text-xs sm:text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none transition-all"
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
