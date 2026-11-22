import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@/components/ui/icons';
import { ROUTES } from '@/routes/paths';
import type { ScheduleBreadcrumbProps } from '../types';

export const ScheduleBreadcrumb: React.FC<ScheduleBreadcrumbProps> = ({
  buildingName,
  roomTitle,
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Breadcrumb links */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs">
        <Link
          to={ROUTES.ROOMS}
          className="text-text-muted hover:text-brand-500 transition-colors"
        >
          Tìm phòng
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <Link
          to={ROUTES.ROOMS}
          className="text-text-muted hover:text-brand-500 transition-colors"
        >
          {buildingName}
        </Link>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <span className="text-text-muted truncate max-w-[200px] sm:max-w-[280px]">
          {roomTitle}
        </span>
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <span className="font-semibold text-text-primary">Đặt lịch xem phòng</span>
      </nav>

      {/* Header Block */}
      <div className="pb-3 pt-1 border-b border-border-subtle">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary tracking-tight">
          Đặt lịch xem phòng
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-1">
          Chọn thời gian thuận tiện để đến xem phòng và gặp trực tiếp chủ nhà.
        </p>
      </div>
    </div>
  );
};

export default ScheduleBreadcrumb;
