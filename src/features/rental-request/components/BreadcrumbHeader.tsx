import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbHeaderProps {
  buildingName: string;
  roomTitle: string;
}

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({
  buildingName,
  roomTitle,
}) => {
  return (
    <div className="w-full bg-white border-b border-slate-200 py-5 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1152px] mx-auto flex flex-col gap-3">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs">
          <a
            href="#"
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            Trang chủ
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <a
            href="#"
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            Tìm phòng
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <a
            href="#"
            className="text-slate-500 hover:text-blue-600 transition-colors"
          >
            {buildingName}
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-600 truncate max-w-[220px] sm:max-w-[320px]">
            {roomTitle}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-blue-700">Gửi yêu cầu thuê</span>
        </nav>

        {/* Title and Subtitle */}
        <div className="pt-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Gửi yêu cầu thuê phòng
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Kiểm tra thông tin phòng, kế hoạch ở và gửi đề xuất để chủ trọ xem xét duyệt hồ sơ.
          </p>
        </div>
      </div>
    </div>
  );
};
