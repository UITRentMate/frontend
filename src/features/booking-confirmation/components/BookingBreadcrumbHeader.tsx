import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import breadcrumbChevronIcon from '@/assets/booking-confirmation/744f2.svg';

import type { BookingBreadcrumbHeaderProps } from '../types';

export const BookingBreadcrumbHeader: React.FC<BookingBreadcrumbHeaderProps> = ({
  roomId,
  buildingName,
  roomTitle,
  pageTitle,
  pageSubtitle,
}) => {
  const roomDetailPath = ROUTES.ROOM_DETAIL.replace(':id', roomId);

  return (
    <header className="w-full flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs">
        <Link
          to={ROUTES.HOME}
          className="text-text-muted hover:text-brand-500 transition-colors"
        >
          Trang chủ
        </Link>
        <img
          src={breadcrumbChevronIcon}
          alt=""
          aria-hidden="true"
          className="shrink-0"
        />
        <Link
          to={ROUTES.ROOMS}
          className="text-text-muted hover:text-brand-500 transition-colors"
        >
          Tìm phòng
        </Link>
        <img
          src={breadcrumbChevronIcon}
          alt=""
          aria-hidden="true"
          className="shrink-0"
        />
        <Link
          to={ROUTES.ROOMS}
          className="text-text-muted hover:text-brand-500 transition-colors"
        >
          {buildingName}
        </Link>
        <img
          src={breadcrumbChevronIcon}
          alt=""
          aria-hidden="true"
          className="shrink-0"
        />
        <Link
          to={roomDetailPath}
          className="text-text-muted hover:text-brand-500 transition-colors truncate max-w-[200px] sm:max-w-[280px]"
        >
          {roomTitle}
        </Link>
        <img
          src={breadcrumbChevronIcon}
          alt=""
          aria-hidden="true"
          className="shrink-0"
        />
        <span aria-current="page" className="font-semibold text-text-primary">
          Xác nhận đặt phòng
        </span>
      </nav>

      <div className="border-b border-border-subtle pt-1 pb-4">
        <h1 className="text-2xl sm:text-[28px] font-heading font-bold text-text-primary tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-sm text-text-muted mt-1">{pageSubtitle}</p>
      </div>
    </header>
  );
};

export default BookingBreadcrumbHeader;
