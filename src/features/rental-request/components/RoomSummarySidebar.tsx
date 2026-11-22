import React from 'react';
import {
  ExternalLinkIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  Maximize2Icon,
  UsersIcon,
  SofaIcon,
  LeafIcon,
} from '@/components/ui/icons';
import roomPreviewImg from '@/assets/room-preview.png';
import type { RoomSummarySidebarProps } from '../types';

export const RoomSummarySidebar: React.FC<RoomSummarySidebarProps> = ({ room }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  return (
    <aside className="w-full bg-surface-card border border-border-subtle rounded-xl p-4 shadow-soft-xs sticky top-20 flex flex-col gap-4">
      {/* Image with badges */}
      <div className="relative h-48 bg-surface-muted rounded-lg overflow-hidden">
        <img
          src={roomPreviewImg || room.imageUrl}
          alt={room.title}
          className="w-full h-full object-cover"
        />

        {/* Room Code Badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 text-text-primary text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-soft-xs">
          Mã phòng: {room.roomCode}
        </div>

        {/* Status Badge */}
        <div className="absolute top-2.5 right-2.5 bg-secondary-50 text-secondary-700 border border-secondary-200 text-[11px] font-semibold px-2 py-0.5 rounded-xs">
          {room.statusLabel}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-2.5 right-2.5 bg-text-primary/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-xs">
          <span>{formatCurrency(room.financials.monthlyRent)}</span>
          <span className="font-normal text-[10px] text-slate-300 ml-1">/ tháng</span>
        </div>
      </div>

      {/* Building & Title */}
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
          {room.buildingName}
        </span>
        <h3 className="text-sm sm:text-base font-heading font-bold text-text-primary leading-snug">
          {room.title}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          📍 {room.address}
        </p>
      </div>

      {/* 2x2 Specs Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* DT */}
        <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
          <Maximize2Icon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
          <span className="text-text-primary font-semibold">{room.specs.area} m²</span>
        </div>

        {/* Max Tenants */}
        <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
          <UsersIcon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
          <span className="text-text-primary font-semibold">Tối đa {room.specs.maxTenants} người</span>
        </div>

        {/* Furnished */}
        <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
          <SofaIcon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
          <span className="text-text-primary font-semibold">Đầy đủ nội thất</span>
        </div>

        {/* Balcony */}
        <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
          <LeafIcon className="w-3.5 h-3.5 text-secondary-600 shrink-0" />
          <span className="text-text-primary font-semibold">Ban công riêng</span>
        </div>
      </div>

      {/* Financial Table */}
      <div className="border border-border-subtle rounded-lg p-3 bg-canvas/60 flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1.5 border-b border-border-subtle text-xs">
          <span className="font-bold text-text-primary">Biểu phí & Điều kiện tài chính</span>
          <span className="text-[10px] text-text-muted">Niêm yết minh bạch</span>
        </div>

        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Giá thuê phòng:</span>
            <strong className="text-brand-500 font-bold">
              {formatCurrency(room.financials.monthlyRent)}/tháng
            </strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Tiền cọc phòng (1 tháng):</span>
            <span className="font-semibold text-text-primary">
              {formatCurrency(room.financials.deposit)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Tiền điện:</span>
            <span className="font-semibold text-text-primary">
              {formatCurrency(room.financials.electricityCost)}/kWh
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Tiền nước:</span>
            <span className="font-semibold text-text-primary">
              {formatCurrency(room.financials.waterCost)}/m³
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Phí dịch vụ:</span>
            <span className="font-semibold text-text-primary">
              {formatCurrency(room.financials.serviceFee)}/phòng
            </span>
          </div>
        </div>
      </div>

      {/* Landlord Box */}
      <div className="bg-brand-50/60 border border-brand-200 rounded-lg p-3.5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
            CHỦ QUẢN NHÀ TRỌ
          </span>
          {room.landlord.isVerified && (
            <div className="flex items-center gap-1 bg-secondary-50 border border-secondary-200 text-secondary-700 text-[10px] font-semibold px-2 py-0.5 rounded-xs">
              <ShieldCheckIcon className="w-3 h-3 text-secondary-600" />
              <span>Chính chủ xác thực</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-pill bg-brand-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {room.landlord.avatarText}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-text-primary truncate">
              {room.landlord.name}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
              <span>Tỷ lệ duyệt: <strong className="text-text-primary">{room.landlord.approvalRate}%</strong></span>
              <span>•</span>
              <span>Phản hồi: <strong className="text-secondary-600">{room.landlord.responseTime}</strong></span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="w-full h-9 bg-surface-card hover:bg-surface-muted border border-border-subtle rounded-md text-xs font-bold text-text-primary flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageSquareIcon className="w-3.5 h-3.5 text-brand-500" />
          <span>Nhắn tin hỏi chủ trọ trước khi gửi yêu cầu</span>
        </button>
      </div>

      {/* View Full Listing */}
      <div className="text-center pt-1">
        <a
          href="#full-listing"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
        >
          <span>Xem lại bài đăng chi tiết phòng (802)</span>
          <ExternalLinkIcon className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};

export default RoomSummarySidebar;
