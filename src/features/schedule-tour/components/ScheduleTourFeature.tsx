import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/paths';

import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';

import {
  useScheduleTourRoom,
  useAvailableTourSlots,
  useBookRoomTour,
} from '../hooks';
import {
  validateTourDate,
  validateSlotSelection,
  generateDynamicDateOptions,
} from '../utils/validation';
import { ReminderBanner } from './ReminderBanner';
import { ScheduleBreadcrumb } from './ScheduleBreadcrumb';
import { StepIndicator } from './StepIndicator';
import { DateSelector } from './DateSelector';
import { TimeSlotSelector } from './TimeSlotSelector';
import { IdentityNotice } from './IdentityNotice';
import { TourActionBar } from './TourActionBar';
import { RoomTourSidebar } from './RoomTourSidebar';
import { ScheduleTourSuccessView } from './ScheduleTourSuccessView';

const MAX_TOUR_SLOTS = 3;
const PARTIAL_DATE_PATTERN = /^\d{0,2}(\/\d{0,2}(\/\d{0,4})?)?$/;

export const ScheduleTourFeature: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roomId = id || 'room-1';
  const { data: room, isLoading: isLoadingRoom, isError: isErrorRoom } = useScheduleTourRoom(roomId);

  const dynamicDateOptions = useMemo(() => generateDynamicDateOptions(), []);
  const initialDate = dynamicDateOptions[0]?.dateValue || '';

  const [showBanner, setShowBanner] = useState(true);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [customDate, setCustomDate] = useState(initialDate);
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [landlordNote, setLandlordNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  const {
    data: slots = [],
    isLoading: isLoadingSlots,
    isError: isErrorSlots,
    refetch: refetchSlots,
  } = useAvailableTourSlots(roomId, selectedDate);
  const { mutate: bookTour, isPending: isBooking } = useBookRoomTour();

  const handleToggleSlot = (slotId: string) => {
    setFeedbackMessage(null);
    setSlotError(null);
    if (selectedSlotIds.includes(slotId)) {
      setSelectedSlotIds((prev) => prev.filter((item) => item !== slotId));
    } else {
      if (selectedSlotIds.length >= MAX_TOUR_SLOTS) {
        setFeedbackMessage(`Bạn chỉ có thể chọn tối đa ${MAX_TOUR_SLOTS} khung giờ xem phòng.`);
        return;
      }
      setSelectedSlotIds((prev) => [...prev, slotId]);
    }
  };

  const handleSelectDate = (dateVal: string) => {
    setSelectedDate(dateVal);
    setCustomDate(dateVal);
    setSelectedSlotIds([]);
    setDateError(null);
    setSlotError(null);
    setFeedbackMessage(null);
  };

  const handleCustomDateChange = (dateVal: string) => {
    setCustomDate(dateVal);
    setSelectedDate(dateVal);
    setSelectedSlotIds([]);
    setSlotError(null);
    setFeedbackMessage(null);

    const trimmed = dateVal.trim();
    if (!trimmed) {
      setDateError(validateTourDate(dateVal));
    } else if (!PARTIAL_DATE_PATTERN.test(trimmed) || trimmed.length >= 8) {
      setDateError(validateTourDate(dateVal));
    } else {
      setDateError(null);
    }
  };

  const handleCustomDateBlur = () => {
    setDateError(validateTourDate(customDate));
  };

  const handleContactLandlord = () => {
    setActionNotice('Đang mở kết nối nhắn tin trực tiếp với chủ trọ...');
  };

  const handleBack = () => {
    const targetRoomId = room?.id || id;
    navigate(targetRoomId ? `/rooms/${targetRoomId}` : ROUTES.ROOMS);
  };

  const handleSubmit = () => {
    if (isBooking) return;

    const vDateErr = validateTourDate(selectedDate);
    const vSlotErr = validateSlotSelection(selectedSlotIds);

    setDateError(vDateErr);
    setSlotError(vSlotErr);

    if (vDateErr || vSlotErr) {
      setFeedbackMessage(vDateErr || vSlotErr);
      return;
    }

    setFeedbackMessage(null);
    bookTour(
      {
        roomId,
        date: selectedDate,
        slotIds: selectedSlotIds,
        note: landlordNote.trim() || undefined,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
        onError: (err) => {
          setFeedbackMessage(err.message || 'Không thể gửi lịch xem phòng, vui lòng thử lại.');
        },
      }
    );
  };

  if (isLoadingRoom) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loading message="Đang tải thông tin phòng..." fullScreen />
      </div>
    );
  }

  if (isErrorRoom || !room) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-surface-card border border-border-subtle rounded-xl text-center space-y-4 shadow-soft-xs">
        <div className="w-12 h-12 mx-auto rounded-pill bg-danger-soft text-danger flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h2 className="text-base sm:text-lg font-bold font-heading text-text-primary">
          Không thể tải thông tin phòng
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          Phòng trọ này hiện không khả dụng hoặc liên kết đặt lịch xem phòng đã hết hạn.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={handleBack} className="w-full">
            Quay lại bài đăng phòng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5">
      {/* 1. Breadcrumb */}
      <ScheduleBreadcrumb
        buildingName={room.buildingName}
        roomTitle={room.title}
        roomId={room.id}
      />

      {/* 2. Reminder Banner */}
      {showBanner && (
        <ReminderBanner onDismiss={() => setShowBanner(false)} />
      )}

      {/* 3. Main layout 2 columns (Content vs Sidebar) */}
      {isSubmitted ? (
        <ScheduleTourSuccessView
          room={room}
          selectedDate={selectedDate}
          selectedSlotCount={selectedSlotIds.length}
          onEditBooking={() => setIsSubmitted(false)}
          onBackToDetail={handleBack}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-start">
          {/* Left Column (~65% - 7 cols) */}
          <div className="lg:col-span-7 bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-6 shadow-soft-xs flex flex-col gap-6">
            {/* Step indicator */}
            <StepIndicator />

            {/* Error or validation alert */}
            {feedbackMessage && (
              <div
                role="alert"
                className="p-3 bg-danger-soft border border-danger-border rounded-md text-xs text-danger font-medium flex items-center justify-between"
              >
                <span>{feedbackMessage}</span>
                <button
                  type="button"
                  onClick={() => setFeedbackMessage(null)}
                  className="text-danger hover:opacity-80 font-bold text-sm px-1 cursor-pointer"
                  aria-label="Đóng thông báo lỗi"
                >
                  ×
                </button>
              </div>
            )}

            {/* Action notice (non-error status feedback) */}
            {actionNotice && (
              <div
                role="status"
                className="p-3 bg-brand-50 border border-brand-200 rounded-md text-xs text-brand-700 font-medium flex items-center justify-between"
              >
                <span>{actionNotice}</span>
                <button
                  type="button"
                  onClick={() => setActionNotice(null)}
                  className="text-brand-700 hover:text-brand-900 font-bold text-sm px-1 cursor-pointer"
                  aria-label="Đóng thông báo"
                >
                  ×
                </button>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-6">
              {/* Section 1: Choose Date */}
              <DateSelector
                dateOptions={dynamicDateOptions}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                customDate={customDate}
                onCustomDateChange={handleCustomDateChange}
                onCustomDateBlur={handleCustomDateBlur}
                inlineError={dateError}
              />

              {/* Section 2: Choose Time Slots (3 ca) */}
              <div className="pt-2 border-t border-border-subtle">
                <TimeSlotSelector
                  slots={slots}
                  selectedSlotIds={selectedSlotIds}
                  onToggleSlot={handleToggleSlot}
                  maxSlots={MAX_TOUR_SLOTS}
                  inlineError={slotError}
                  isLoading={isLoadingSlots}
                  isError={isErrorSlots}
                  onRetry={() => {
                    void refetchSlots();
                  }}
                />
              </div>

              {/* Section 3: Note for Landlord */}
              <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tour-note" className="font-bold text-text-primary">
                    3. Lời nhắn gửi chủ trọ{' '}
                    <span className="font-normal text-text-muted">(Không bắt buộc)</span>
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
                  className="w-full bg-canvas border border-border-subtle rounded-md p-3 text-xs sm:text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-surface-card resize-none transition-all"
                />
              </div>

              {/* Identity Protection Notice */}
              <IdentityNotice userName={user?.name || 'Bạn'} />

              {/* Action Bar */}
              <TourActionBar
                onBack={handleBack}
                isSubmitting={isBooking}
                isDisabled={selectedSlotIds.length === 0 || Boolean(dateError)}
              />
            </form>
          </div>

          {/* Right Column (~35% - 4 cols, Sticky) */}
          <div className="lg:col-span-4">
            <RoomTourSidebar room={room} onContactLandlord={handleContactLandlord} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTourFeature;
