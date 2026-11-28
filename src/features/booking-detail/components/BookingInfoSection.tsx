import React from 'react';

import roomDefaultImg from '@/assets/booking-detail/b3e49.png';
import roomHeaderIcon from '@/assets/booking-detail/93112.svg';
import balconyIcon from '@/assets/booking-detail/1b076.svg';
import airconIcon from '@/assets/booking-detail/1ef36.svg';
import solarWaterIcon from '@/assets/booking-detail/61814.svg';
import verifiedIcon from '@/assets/booking-detail/e0012.svg';
import { formatCurrency } from '@/utils/formatCurrency';

import Button from '@/components/ui/Button';
import {
  MapPinIcon,
  MessageSquareIcon,
  CalendarIcon,
  UsersIcon,
  InfoIcon,
} from '@/components/ui/icons';

import { calculateMonthlyFixedTotal } from '../utils/validation';
import type { BookingInfoSectionProps } from '../types';

export const BookingInfoSection: React.FC<BookingInfoSectionProps> = ({
  room,
  landlord,
  contract,
  recurringCost,
  onMessageLandlord,
}) => {
  const amenityIcons: Record<string, string> = {
    'Ban công': balconyIcon,
    'Máy lạnh': airconIcon,
    'Nước nóng NLMT': solarWaterIcon,
  };

  const monthlyTotal = calculateMonthlyFixedTotal(
    recurringCost.monthlyRent,
    recurringCost.serviceFee
  );

  return (
    <section
      aria-labelledby="booking-info-heading"
      className="bg-surface-card border border-border-subtle rounded-lg p-5 sm:p-6 shadow-soft-xs flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
            <img src={roomHeaderIcon} alt="" aria-hidden="true" className="shrink-0" />
          </div>
          <div>
            <h2
              id="booking-info-heading"
              className="text-base sm:text-lg font-heading font-bold text-text-primary leading-snug"
            >
              Thông tin căn phòng &amp; Đặt phòng
            </h2>
            <p className="text-xs text-text-muted">
              Thông tin căn thuê và thông tin người đứng tên hợp đồng
            </p>
          </div>
        </div>

        <span className="bg-brand-50 border border-brand-200 text-brand-500 text-xs font-bold px-3 py-1 rounded-xs">
          Mã căn: {room.roomCode}
        </span>
      </div>

      {/* Room Thumbnail & Title */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="relative w-full sm:w-[176px] h-[140px] sm:h-[128px] bg-surface-muted border border-border-subtle rounded-lg overflow-hidden shrink-0">
          <img
            src={room.imageUrl || roomDefaultImg}
            alt={room.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1.5 left-1.5 bg-text-primary/80 text-white text-xs font-semibold px-2 py-0.5 rounded-xs">
            {room.floorLabel}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <h3 className="text-base font-heading font-bold text-text-primary leading-snug">
            {room.title}
          </h3>

          <div className="flex items-start gap-1.5 text-xs text-text-muted">
            <MapPinIcon className="w-3.5 h-3.5 text-danger shrink-0 mt-0.5" />
            <span className="leading-relaxed">{room.address}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {room.amenities.map((amenity) => {
              const iconSrc = amenityIcons[amenity];
              return (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1.5 bg-canvas border border-border-subtle rounded-xs px-2.5 py-1 text-xs font-medium text-text-secondary"
                >
                  {iconSrc && (
                    <img src={iconSrc} alt="" aria-hidden="true" className="shrink-0" />
                  )}
                  <span>{amenity}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Landlord Row (Phone hidden, RentMate chat button) */}
      <div className="bg-canvas border border-border-subtle rounded-lg p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-pill bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center shrink-0">
            {landlord.avatarText}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-bold text-text-primary truncate">
                {landlord.name}
              </span>
              {landlord.isVerified && (
                <img
                  src={verifiedIcon}
                  alt="Chủ trọ đã xác thực"
                  className="shrink-0"
                />
              )}
              <span className="bg-surface-card border border-border-subtle text-text-secondary text-xs font-medium px-2 py-0.5 rounded-xs">
                {landlord.roleLabel}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">{landlord.channelSubtitle}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onMessageLandlord}
          className="inline-flex items-center gap-1.5 border-border-subtle text-brand-500 hover:bg-brand-50 font-semibold px-3.5 py-2"
        >
          <MessageSquareIcon className="w-3.5 h-3.5 shrink-0" />
          <span>Nhắn tin trao đổi</span>
        </Button>
      </div>

      {/* Contract Summary 2x2 Grid */}
      <div className="flex flex-col gap-3 pt-1">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
          THÔNG TIN HỢP ĐỒNG ĐĂNG KÝ
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-canvas border border-border-subtle rounded-sm p-3 flex flex-col gap-0.5">
            <span className="text-xs text-text-muted">Mã yêu cầu giữ chỗ</span>
            <span className="text-sm font-bold text-text-primary font-mono">
              {contract.requestCode}
            </span>
          </div>

          <div className="bg-canvas border border-border-subtle rounded-sm p-3 flex flex-col gap-0.5">
            <span className="text-xs text-text-muted">Người đứng hợp đồng</span>
            <span className="text-sm font-bold text-text-primary">
              {contract.tenantName}
            </span>
          </div>

          <div className="bg-canvas border border-border-subtle rounded-sm p-3 flex flex-col gap-0.5">
            <span className="text-xs text-text-muted">Ngày dự kiến vào ở</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
              <CalendarIcon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span>{contract.moveInDate}</span>
            </span>
          </div>

          <div className="bg-canvas border border-border-subtle rounded-sm p-3 flex flex-col gap-0.5">
            <span className="text-xs text-text-muted">Thời hạn thuê &amp; số người</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary">
              <UsersIcon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span>{contract.leaseAndOccupantsLabel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Recurring Cost Summary */}
      <div className="bg-canvas border border-border-subtle rounded-lg p-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-sm font-semibold text-text-primary">
            Chi phí định kỳ dự kiến:
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-brand-500">
              {formatCurrency(monthlyTotal)}
            </span>
            <span className="text-xs text-text-muted">/tháng</span>
          </div>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Bao gồm tiền thuê phòng cố định ({formatCurrency(recurringCost.monthlyRent)}) và phí dịch
          vụ chung ({formatCurrency(recurringCost.serviceFee)}). Tiền điện (
          {formatCurrency(recurringCost.electricityRate)}/kWh) và tiền nước (
          {formatCurrency(recurringCost.waterRate)}/m³) tính theo chỉ số tiêu thụ thực tế mỗi kỳ.
        </p>

        <div className="pt-2 border-t border-border-subtle flex items-start gap-1.5 text-xs text-text-muted">
          <InfoIcon className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
          <p className="leading-snug">{recurringCost.waterMeterNotice}</p>
        </div>
      </div>
    </section>
  );
};

export default BookingInfoSection;
