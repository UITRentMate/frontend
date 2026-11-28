import React from 'react';

import { formatCurrency } from '@/utils/formatCurrency';

import Button from '@/components/ui/Button';
import studioPhotoImg from '@/assets/room-preview.png';
import areaMetricIcon from '@/assets/booking-confirmation/a6e37.svg';
import capacityMetricIcon from '@/assets/booking-confirmation/ccc8f.svg';
import verifiedBadgeIcon from '@/assets/booking-confirmation/ba259.svg';
import approvalIcon from '@/assets/booking-confirmation/ada8f.svg';
import responseIcon from '@/assets/booking-confirmation/36008.svg';
import messageIcon from '@/assets/booking-confirmation/fc6c4.svg';
import supportIcon from '@/assets/booking-confirmation/d16d4.svg';

import type { BookingRoomSidebarProps } from '../types';

export const BookingRoomSidebar: React.FC<BookingRoomSidebarProps> = ({
  room,
  depositAmount,
  landlord,
  supportNote,
  onMessageLandlord,
  messageNotice,
  onDismissMessageNotice,
}) => {
  return (
    <aside aria-label="Thông tin phòng và chi phí" className="w-full flex flex-col gap-6">
      {/* 1. Studio photo, room details & monthly fees */}
      <div className="bg-surface-card border border-border-subtle rounded-[12px] overflow-hidden shadow-soft-xs flex flex-col">
        <div className="relative aspect-[7/3] w-full bg-surface-muted overflow-hidden">
          <img
            src={studioPhotoImg}
            alt={room.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-3 left-3 bg-text-primary/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-xs">
            Phòng {room.roomCode} • {room.floorLabel}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
              KHU TRỌ {room.buildingName.toUpperCase()}
            </span>
            <h2 className="text-base sm:text-lg font-heading font-bold text-text-primary leading-snug">
              {room.title}
            </h2>
            <p className="text-xs text-text-muted">{room.address}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-y border-border-subtle py-2 text-xs text-text-primary">
            <span className="inline-flex items-center gap-1.5">
              <img src={areaMetricIcon} alt="" aria-hidden="true" className="shrink-0" />
              <span>{room.areaSqm} m²</span>
            </span>
            <span aria-hidden="true" className="text-text-disabled">
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <img
                src={capacityMetricIcon}
                alt=""
                aria-hidden="true"
                className="shrink-0"
              />
              <span>Tối đa {room.maxTenants} người</span>
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              CÁC KHOẢN ĐỊNH KỲ HÀNG THÁNG
            </h3>

            <dl className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-text-muted">Giá thuê phòng hàng tháng:</dt>
                <dd className="font-bold text-brand-500">
                  {formatCurrency(room.monthlyRent)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-text-muted">Tiền điện:</dt>
                <dd className="font-semibold text-text-primary">
                  {formatCurrency(room.electricityRate)} / kWh
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-text-muted">Tiền nước:</dt>
                <dd className="font-semibold text-text-primary">
                  {formatCurrency(room.waterRate)} / m³
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-text-muted">Phí dịch vụ &amp; rác:</dt>
                <dd className="font-semibold text-text-primary">
                  {formatCurrency(room.serviceFee)} / phòng
                </dd>
              </div>
            </dl>

            <p className="rounded-sm border border-border-subtle bg-canvas p-2.5 text-xs text-text-muted">
              Tổng các khoản cố định định kỳ hằng tháng:{' '}
              <strong className="text-text-primary">{formatCurrency(room.monthlyRent + room.serviceFee)} / tháng</strong>
              <br />
              {room.feesFootnote}
            </p>
          </div>

          <div className="mt-2 flex flex-col gap-2.5 rounded-[12px] border border-brand-200 bg-brand-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  TIỀN CỌC GIỮ PHÒNG
                </span>
              </div>
              <span className="bg-surface-card border border-brand-200 text-brand-600 rounded-pill px-2.5 py-0.5 text-[11px] font-semibold">
                Thanh toán 1 lần
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-text-muted">Thu tiền giữ chỗ:</span>
              <strong className="font-heading text-xl text-brand-500">{formatCurrency(depositAmount)}</strong>
            </div>

            <p className="text-xs text-brand-700/90 leading-relaxed">{room.oneTimeDepositNote}</p>
          </div>
        </div>
      </div>

      {/* 3. Owner card */}
      <div className="bg-surface-card border border-border-subtle rounded-[12px] p-5 shadow-soft-xs flex flex-col gap-4">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
          Thông tin chủ nhà cho thuê
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-sm font-bold text-brand-500">
            {landlord.avatarText}
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-bold text-text-primary">
              {landlord.name}
              {landlord.isVerified && <img src={verifiedBadgeIcon} alt={landlord.verifiedLabel} />}
            </p>
            <p className="text-xs text-text-muted">Chủ tòa nhà {room.buildingName}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border-subtle pt-2 text-xs text-text-muted">
          <p className="flex items-center gap-1">
            <img src={approvalIcon} alt="" />
            <span>Tỷ lệ duyệt: <strong className="text-text-primary">{landlord.approvalRate}%</strong></span>
          </p>
          <p className="flex items-center gap-1">
            <img src={responseIcon} alt="" />
            <span>Phản hồi: <strong className="text-text-primary">{landlord.responseTime}</strong></span>
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onMessageLandlord}
          className="w-full inline-flex items-center justify-center gap-2"
        >
          <img src={messageIcon} alt="" aria-hidden="true" className="shrink-0" />
          <span>{landlord.messageButtonLabel}</span>
        </Button>

        {messageNotice && (
          <div
            role="status"
            aria-live="polite"
            className="bg-brand-50 border border-brand-200 text-brand-700 text-xs px-3.5 py-2.5 rounded-sm flex items-center justify-between gap-2"
          >
            <span>{messageNotice}</span>
            <button
              type="button"
              aria-label="Đóng thông báo nhắn tin"
              onClick={onDismissMessageNotice}
              className="text-brand-700 hover:text-brand-900 font-bold text-sm px-1 shrink-0 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* 4. Support note */}
      <div className="flex items-center gap-2 rounded-md border border-border-subtle bg-surface-muted/40 p-3 text-xs text-text-muted">
        <img src={supportIcon} alt="" className="shrink-0" />
        <p>{supportNote.description} <strong className="text-text-primary">{supportNote.hotline}</strong> (nhánh 2).</p>
      </div>
    </aside>
  );
};

export default BookingRoomSidebar;
