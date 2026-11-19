import React from 'react';
import {
  Building2,
  MapPin,
  Maximize2,
  Users,
  Armchair,
  Sun,
  ShieldCheck,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { RoomDetail } from '../../../types/rental-request';
import roomPreviewImg from '../../../assets/room-preview.png';

interface RoomSummarySidebarProps {
  room: RoomDetail;
}

export const RoomSummarySidebar: React.FC<RoomSummarySidebarProps> = ({ room }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <aside className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs sticky top-6">
      {/* Room Image with Badges */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        <img
          src={roomPreviewImg || room.imageUrl}
          alt={room.title}
          className="w-full h-full object-cover"
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          <div className="backdrop-blur-xs bg-slate-900/80 border border-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            Mã phòng: {room.roomCode}
          </div>
          <div className="backdrop-blur-xs bg-emerald-600/90 border border-emerald-400/30 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{room.statusLabel}</span>
          </div>
        </div>

        {/* Bottom Right Price Overlay */}
        <div className="absolute bottom-3 right-3 text-right drop-shadow-md">
          <div className="text-2xl font-bold text-white tracking-tight leading-none">
            {formatCurrency(room.financials.monthlyRent)}
          </div>
          <div className="text-xs font-medium text-blue-100 mt-0.5">/ tháng</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title & Location */}
        <div>
          <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>{room.buildingName}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
            {room.title}
          </h3>
          <div className="flex items-start gap-1.5 text-slate-500 text-xs mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>{room.address}</span>
          </div>
        </div>

        {/* Specs Badges */}
        <div className="flex flex-wrap gap-2">
          <div className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{room.specs.area} m²</span>
          </div>
          <div className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Tối đa {room.specs.maxTenants} người</span>
          </div>
          {room.specs.furnished && (
            <div className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Armchair className="w-3.5 h-3.5 text-slate-500" />
              <span>Đầy đủ nội thất</span>
            </div>
          )}
          {room.specs.hasBalcony && (
            <div className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-slate-500" />
              <span>Ban công riêng</span>
            </div>
          )}
        </div>

        {/* Deposit Breakdown Pill */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
            <span className="font-bold text-slate-900">Biểu phí & Điều kiện tài chính</span>
            <span className="text-[11px] text-slate-500">Niêm yết minh bạch</span>
          </div>

          <div className="flex flex-col gap-2 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Giá thuê phòng:</span>
              <span className="font-bold text-blue-700 text-sm">
                {formatCurrency(room.financials.monthlyRent)}/tháng
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Tiền cọc phòng (1 tháng):</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(room.financials.deposit)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Tiền điện:</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(room.financials.electricityCost)}/kWh
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Tiền nước:</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(room.financials.waterCost)}/m³
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Phí dịch vụ:</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(room.financials.serviceFee)}/phòng
              </span>
            </div>
          </div>
        </div>

        {/* Landlord Box */}
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-500 tracking-wider text-[11px] uppercase">
              CHỦ QUẢN NHÀ TRỌ
            </span>
            {room.landlord.isVerified && (
              <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Chính chủ xác thực</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-100 border-2 border-white shadow-xs flex items-center justify-center font-bold text-sm text-blue-700 shrink-0">
              {room.landlord.avatarText}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {room.landlord.name}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                <span>
                  Tỷ lệ duyệt: <strong className="text-slate-800">{room.landlord.approvalRate}%</strong>
                </span>
                <span>•</span>
                <span>
                  Phản hồi: <strong className="text-slate-800">{room.landlord.responseTime}</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full h-10 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Nhắn tin hỏi chủ trọ trước khi gửi yêu cầu</span>
          </button>
        </div>

        {/* View Listing Link */}
        <div className="text-center pt-1">
          <a
            href="#view-details"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-700 transition-colors"
          >
            <span>Xem lại bài đăng chi tiết phòng ({room.roomCode})</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
