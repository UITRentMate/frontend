import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ScheduleBreadcrumbProps {
  buildingName: string;
  roomTitle: string;
}

export const ScheduleBreadcrumb: React.FC<ScheduleBreadcrumbProps> = ({
  buildingName,
  roomTitle,
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Breadcrumb links */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs">
        <a href="#search" className="text-slate-500 hover:text-blue-700 transition-colors">
          Tìm phòng
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <a href="#building" className="text-slate-500 hover:text-blue-700 transition-colors">
          {buildingName}
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-500 truncate max-w-[200px] sm:max-w-[280px]">
          {roomTitle}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="font-semibold text-slate-900">
          Đặt lịch xem phòng
        </span>
      </nav>

      {/* Header Block */}
      <div className="pb-4 pt-1 border-b border-indigo-100">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Đặt lịch xem phòng
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Chọn thời gian thuận tiện để đến xem phòng và gặp trực tiếp chủ nhà.
        </p>
      </div>
    </div>
  );
};
