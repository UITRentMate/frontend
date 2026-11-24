import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ImageIcon,
  MapPinIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  Maximize2Icon,
  ReceiptIcon,
  ZapIcon,
  DropletsIcon,
} from '@/components/ui/icons';
import roomPreviewImg from '@/assets/room-preview.png';
import { formatCurrency } from '@/utils/formatCurrency';
import { ROUTES } from '@/routes/paths';
import type { RoomTourSidebarProps } from '../types';

export const RoomTourSidebar: React.FC<RoomTourSidebarProps> = ({ room, onContactLandlord }) => {
  const [copiedContact, setCopiedContact] = useState(false);

  const handleMessageClick = () => {
    if (onContactLandlord) {
      onContactLandlord();
      return;
    }
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2500);
  };

  const detailUrl = room.id ? `/rooms/${room.id}` : ROUTES.ROOMS;

  return (
    <aside className="w-full bg-surface-card border border-border-subtle rounded-xl p-4 shadow-soft-xs sticky top-20 flex flex-col gap-4">
      {/* Image with badges (Ưu tiên ảnh phòng thật, fallback sang ảnh mẫu) */}
      <div className="relative h-44 bg-surface-muted rounded-lg overflow-hidden">
        <img
          src={room.imageUrl || roomPreviewImg}
          alt={room.title}
          className="w-full h-full object-cover"
        />

        {/* Room Code Badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 text-brand-600 text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-soft-xs">
          Mã phòng: {room.roomCode}
        </div>

        {/* Photos Count Badge */}
        <div className="absolute bottom-2.5 right-2.5 bg-text-primary/75 text-white text-[11px] font-medium px-2 py-0.5 rounded-xs flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          <span>{room.photosCount || 8} ảnh</span>
        </div>
      </div>

      {/* Room Details */}
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-xs font-semibold text-text-muted block">
            {room.buildingName}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-text-primary mt-0.5 leading-snug">
            {room.title}
          </h3>
        </div>

        {/* Price */}
        <div className="pb-3 border-b border-border-subtle flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-bold font-heading text-brand-500">
            {formatCurrency(room.monthlyRent)}
          </span>
          <span className="text-xs text-text-muted">/ tháng</span>
        </div>

        {/* 2x2 Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* DT */}
          <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
            <Maximize2Icon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <div className="truncate">
              <span className="text-text-muted">DT: </span>
              <strong className="text-text-primary font-bold">
                {room.area} m²
              </strong>
            </div>
          </div>

          {/* Cọc */}
          <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
            <ReceiptIcon className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <div className="truncate">
              <span className="text-text-muted">Cọc: </span>
              <strong className="text-text-primary font-bold">
                {formatCurrency(room.deposit)}
              </strong>
            </div>
          </div>

          {/* Điện */}
          <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
            <ZapIcon className="w-3.5 h-3.5 text-warning shrink-0" />
            <div className="truncate">
              <span className="text-text-muted">Điện: </span>
              <strong className="text-text-primary font-bold">
                {formatCurrency(room.electricityCost)}/kWh
              </strong>
            </div>
          </div>

          {/* Nước */}
          <div className="bg-canvas border border-border-subtle rounded-md p-2 flex items-center gap-2">
            <DropletsIcon className="w-3.5 h-3.5 text-info shrink-0" />
            <div className="truncate">
              <span className="text-text-muted">Nước: </span>
              <strong className="text-text-primary font-bold">
                {formatCurrency(room.waterCost)}/m³
              </strong>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="pt-2 border-t border-border-subtle flex items-start gap-1.5 text-xs text-text-muted">
          <MapPinIcon className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
          <span className="leading-snug">{room.address}</span>
        </div>

        {/* View Listing Link */}
        <div className="text-center pt-0.5">
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            <span>Xem bài đăng đầy đủ</span>
            <ExternalLinkIcon className="w-3 h-3" />
          </Link>
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
            <p className="text-[11px] text-text-muted truncate mt-0.5">
              {room.landlord.role}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-surface-card border border-border-subtle rounded-md p-2 flex items-center justify-between text-xs">
          <span className="text-text-muted">
            Chấp thuận:{' '}
            <strong className="text-text-primary">
              {room.landlord.approvalRate}%
            </strong>
          </span>
          <span className="text-text-muted">
            Phản hồi:{' '}
            <strong className="text-secondary-600">
              {room.landlord.responseTime}
            </strong>
          </span>
        </div>

        <button
          type="button"
          onClick={handleMessageClick}
          className="w-full h-9 bg-surface-card hover:bg-surface-muted border border-border-subtle rounded-md text-xs font-bold text-text-primary flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageSquareIcon className="w-3.5 h-3.5 text-brand-500" />
          <span>{copiedContact ? '✓ Đã mở kết nối trò chuyện' : 'Nhắn tin hỏi trước khi đến'}</span>
        </button>
      </div>
    </aside>
  );
};

export default RoomTourSidebar;
