import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import { ChevronRightIcon } from '@/components/ui/icons';

import type { BookingDetailBreadcrumbProps } from '../types';

export const BookingDetailBreadcrumb: React.FC<BookingDetailBreadcrumbProps> = ({
  roomId,
  district,
  roomTitle,
  roomCode,
}) => {
  const roomDetailPath = ROUTES.ROOM_DETAIL.replace(':id', roomId);

  return (
    <header className="w-full flex flex-col gap-2">
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 py-0.5 text-xs">
        <Link to={ROUTES.HOME} className="text-text-muted hover:text-brand-500 transition-colors">
          Trang chủ
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <Link to={ROUTES.ROOMS} className="text-text-muted hover:text-brand-500 transition-colors">
          Tìm phòng
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <Link to={ROUTES.ROOMS} className="text-text-muted hover:text-brand-500 transition-colors">
          {district}
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <Link
          to={roomDetailPath}
          className="text-text-secondary font-medium hover:text-brand-500 transition-colors truncate max-w-[240px] sm:max-w-[320px]"
        >
          {roomTitle} ({roomCode})
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <span aria-current="page" className="font-semibold text-brand-500">
          Chi tiết đặt phòng
        </span>
      </nav>

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl sm:text-[30px] font-heading font-bold text-text-primary tracking-tight leading-tight">
            Chi tiết đặt phòng
          </h1>
          <span className="bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1 rounded-xs">
            BƯỚC C04
          </span>
          <span className="bg-surface-muted/60 text-text-secondary text-xs font-semibold px-3 py-1 rounded-xs">
            SRS UC-13
          </span>
        </div>
        <p className="text-sm text-text-muted">
          Theo dõi trạng thái đặt cọc và thông tin thuê phòng của bạn.
        </p>
      </div>
    </header>
  );
};

export default BookingDetailBreadcrumb;
