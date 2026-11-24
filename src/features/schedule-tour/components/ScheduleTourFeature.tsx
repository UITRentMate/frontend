import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/routes/paths';
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
  const [dateError, setDateError] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  const { data: slots = [], isLoading: isLoadingSlots } = useAvailableTourSlots(roomId, selectedDate);
  const { mutate: bookTour, isPending: isBooking } = useBookRoomTour();

  const handleToggleSlot = (slotId: string) => {
    setFeedbackMessage(null);
    setSlotError(null);
    if (selectedSlotIds.includes(slotId)) {
      setSelectedSlotIds((prev) => prev.filter((item) => item !== slotId));
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
    setDateError(null);
    setFeedbackMessage(null);
  };

  const handleCustomDateChange = (dateVal: string) => {
    setCustomDate(dateVal);
    setSelectedDate(dateVal);
    setDateError(null);
    setFeedbackMessage(null);
  };

  const handleBack = () => {
    if (id) {
      navigate(`/rooms/${id}`);
    } else {
      navigate(ROUTES.ROOMS);
    }
  };

  const handleSubmit = () => {
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
        <Loading size="lg" message="Đang tải thông tin đặt lịch xem phòng..." />
      </div>
    );
  }

  if (isErrorRoom || !room) {
    return (
      <div className="bg-surface-card border border-border-subtle rounded-xl p-8 max-w-md mx-auto text-center my-12">
        <h3 className="text-base font-bold text-text-primary mb-2">Không tìm thấy thông tin phòng</h3>
        <p className="text-xs text-text-muted mb-4">
          Phòng trọ này có thể đã bị gỡ hoặc đường dẫn không còn hiệu lực.
        </p>
        <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.ROOMS)}>
          Quay lại danh sách phòng
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 1. Reminder Banner */}
      {showBanner && <ReminderBanner onDismiss={() => setShowBanner(false)} />}

      {/* 2. Breadcrumb & Header */}
      <ScheduleBreadcrumb
        buildingName={room.buildingName}
        roomTitle={room.title}
        roomId={room.id}
      />

      {/* 3. Main Form or Success View */}
      {isSubmitted ? (
        <ScheduleTourSuccessView
          room={room}
          selectedDate={selectedDate}
          selectedSlotCount={selectedSlotIds.length}
          onEditBooking={() => setIsSubmitted(false)}
          onBackToDetail={handleBack}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (~65% - 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <StepIndicator />

            {/* Validation Message if any */}
            {feedbackMessage && (
              <div
                role="alert"
                className="bg-danger-soft border border-danger-border text-danger text-xs px-4 py-2.5 rounded-lg flex items-center justify-between"
              >
                <span>{feedbackMessage}</span>
                <button
                  type="button"
                  onClick={() => setFeedbackMessage(null)}
                  aria-label="Đóng thông báo lỗi"
                  className="font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Booking Form Card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-7 shadow-soft-xs flex flex-col gap-6"
            >
              {/* Section 1: Date Selection */}
              <DateSelector
                dateOptions={dynamicDateOptions}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                customDate={customDate}
                onCustomDateChange={handleCustomDateChange}
                inlineError={dateError}
              />

              {/* Section 2: Time Slots */}
              {isLoadingSlots ? (
                <div className="py-6 flex justify-center">
                  <Loading size="sm" message="Đang cập nhật khung giờ trống..." />
                </div>
              ) : (
                <TimeSlotSelector
                  slots={slots}
                  selectedSlotIds={selectedSlotIds}
                  onToggleSlot={handleToggleSlot}
                  maxSlots={3}
                  inlineError={slotError}
                />
              )}

              {/* Section 3: Note to landlord */}
              <div className="flex flex-col gap-1.5">
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
                  className="w-full bg-canvas border border-border-subtle rounded-md p-3 text-xs sm:text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white resize-none transition-all"
                />
              </div>

              {/* Identity Protection Notice */}
              <IdentityNotice userName={user?.name || 'Nguyễn Minh Hoàng'} />

              {/* Action Bar */}
              <TourActionBar
                onBack={handleBack}
                onSubmit={handleSubmit}
                isSubmitting={isBooking}
                isDisabled={selectedSlotIds.length === 0}
              />
            </form>
          </div>

          {/* Right Column (~35% - 4 cols, Sticky) */}
          <div className="lg:col-span-4">
            <RoomTourSidebar room={room} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTourFeature;
