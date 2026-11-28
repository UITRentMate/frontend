import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import { ChevronRightIcon } from '@/components/ui/icons';

import type { DepositPaymentBreadcrumbProps } from '../types';

export const DepositPaymentBreadcrumb: React.FC<DepositPaymentBreadcrumbProps> = ({
  roomId,
  buildingName,
  roomTitle,
}) => {
  const roomDetailPath = ROUTES.ROOM_DETAIL.replace(':id', roomId);
  const rentalRequestPath = ROUTES.ROOM_RENTAL_REQUEST.replace(':id', roomId);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs sm:text-sm">
      <Link to={ROUTES.HOME} className="text-text-muted hover:text-brand-500 transition-colors">
        Trang chủ
      </Link>
      <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
      <Link to={ROUTES.ROOMS} className="text-text-muted hover:text-brand-500 transition-colors">
        Tìm phòng
      </Link>
      <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
      <Link
        to={roomDetailPath}
        className="text-text-muted hover:text-brand-500 transition-colors"
      >
        {buildingName}
      </Link>
      <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
      <Link
        to={roomDetailPath}
        className="text-text-muted hover:text-brand-500 transition-colors truncate max-w-[200px] sm:max-w-[260px]"
      >
        {roomTitle}
      </Link>
      <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
      <Link
        to={rentalRequestPath}
        className="text-text-muted hover:text-brand-500 transition-colors"
      >
        Xác nhận đặt phòng
      </Link>
      <ChevronRightIcon className="w-3.5 h-3.5 text-text-muted shrink-0" />
      <span aria-current="page" className="font-semibold text-text-primary">
        Thanh toán tiền cọc
      </span>
    </nav>
  );
};

export default DepositPaymentBreadcrumb;
