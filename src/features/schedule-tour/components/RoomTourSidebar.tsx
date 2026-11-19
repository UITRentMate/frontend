import React from 'react';
import {
  Images,
  MapPin,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  Maximize2,
  Receipt,
  Zap,
  Droplets,
} from 'lucide-react';
import { RoomTourSnapshot } from '../../../types/schedule-tour';
import roomPreviewImg from '../../../assets/room-preview.png';

interface RoomTourSidebarProps {
  room: RoomTourSnapshot;
}

export const RoomTourSidebar: React.FC<RoomTourSidebarProps> = ({ room }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <aside className="w-full bg-white border border-indigo-100 rounded-2xl p-4 shadow-xs sticky top-20 flex flex-col gap-4">
      {/* Image with badges */}
      <div className="relative h-44 bg-slate-100 rounded-xl overflow-hidden">
        <img
          src={roomPreviewImg || room.imageUrl}
          alt={room.title}
          className="w-full h-full object-cover"
        />

        {/* Room Code Badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
          Mã phòng: {room.roomCode}
        </div>

        {/* Photos Count Badge */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Images className="w-3 h-3" />
          <span>{room.photosCount} ảnh</span>
        </div>
      </div>

      {/* Room Details */}
      <div className="flex flex-col gap-3">
        <div>
          <span className="text-xs font-semibold text-slate-500 block">
            {room.buildingName}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 leading-snug">
            {room.title}
          </h3>
        </div>

        {/* Price */}
        <div className="pb-3 border-b border-indigo-100 flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-bold text-blue-700">
            {formatCurrency(room.monthlyRent)}
          </span>
          <span className="text-xs text-slate-500">/ tháng</span>
        </div>

        {/* 2x2 Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* DT */}
          <div className="bg-slate-50 border border-indigo-100/80 rounded-lg p-2 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-500">DT: </span>
              <strong className="text-slate-900 font-bold">{room.area} m²</strong>
            </div>
          </div>

          {/* Cọc */}
          <div className="bg-slate-50 border border-indigo-100/80 rounded-lg p-2 flex items-center gap-2">
            <Receipt className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div className="truncate">
              <span className="text-slate-500">Cọc: </span>
              <strong className="text-slate-900 font-bold">{formatCurrency(room.deposit)}</strong>
            </div>
          </div>

          {/* Điện */}
          <div className="bg-slate-50 border border-indigo-100/80 rounded-lg p-2 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <div className="truncate">
              <span className="text-slate-500">Điện: </span>
              <strong className="text-slate-900 font-bold">{formatCurrency(room.electricityCost)}/kWh</strong>
            </div>
          </div>

          {/* Nước */}
          <div className="bg-slate-50 border border-indigo-100/80 rounded-lg p-2 flex items-center gap-2">
            <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <div className="truncate">
              <span className="text-slate-500">Nước: </span>
              <strong className="text-slate-900 font-bold">{formatCurrency(room.waterCost)}/m³</strong>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="pt-2 border-t border-indigo-100 flex items-start gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="leading-snug">{room.address}</span>
        </div>

        {/* View Listing Link */}
        <div className="text-center pt-0.5">
          <a
            href="#full-listing"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            <span>Xem bài đăng đầy đủ</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Landlord Box */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            CHỦ QUẢN NHÀ TRỌ
          </span>
          {room.landlord.isVerified && (
            <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Chính chủ xác thực</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {room.landlord.avatarText}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">
              {room.landlord.name}
            </p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {room.landlord.role}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border border-indigo-100 rounded-lg p-2 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Chấp thuận: <strong className="text-slate-900">{room.landlord.approvalRate}%</strong>
          </span>
          <span className="text-slate-500">
            Phản hồi: <strong className="text-emerald-700">{room.landlord.responseTime}</strong>
          </span>
        </div>

        <button
          type="button"
          className="w-full h-9 bg-white hover:bg-slate-50 border border-indigo-200 rounded-lg text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
          <span>Nhắn tin hỏi trước khi đến</span>
        </button>
      </div>
    </aside>
  );
};

