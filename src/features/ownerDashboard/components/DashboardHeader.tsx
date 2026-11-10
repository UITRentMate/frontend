import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import { Button } from '@/components/ui/Button';
import { Building2Icon, WalletIcon, ZapIcon } from '@/components/ui/icons';

import type { DashboardHeaderProps } from '../types';

const dashboardDateFormatter = new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'full',
  timeZone: 'Asia/Ho_Chi_Minh',
});

export function DashboardHeader({ date, disabled, onUtilities, onCreateReceipt }: DashboardHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-subtle bg-surface-card p-4 shadow-soft-xs sm:p-5">
      <div className="min-w-0 flex-1 basis-80">
        <div className="flex min-h-5 flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-text-secondary">
          <span className="rounded-pill border border-success-border bg-success-soft px-2 py-0.5 font-semibold text-secondary-700">Dữ liệu mẫu</span>
          {date && <time dateTime={date}>{dashboardDateFormatter.format(new Date(date))}</time>}
        </div>
        <h1 className="mt-2 font-heading text-xl font-bold leading-snug sm:text-2xl">Trung tâm vận hành &amp; giám sát khu trọ</h1>
        <p className="mt-1.5 text-sm text-text-secondary">Theo dõi cho thuê, doanh thu và xử lý công việc tại một nơi.</p>
      </div>
      <div className="flex w-full flex-wrap gap-2 xl:w-auto" aria-label="Thao tác nhanh">
        <Button type="button" variant="outline" onClick={onUtilities} disabled={disabled} className="min-h-11 flex-1 gap-2 sm:flex-none">
          <span aria-hidden="true"><ZapIcon size={18} /></span>Ghi điện nước
        </Button>
        <Button type="button" onClick={onCreateReceipt} disabled={disabled} className="min-h-11 flex-1 gap-2 sm:flex-none">
          <span aria-hidden="true"><WalletIcon size={18} /></span>Tạo phiếu thu
        </Button>
        <Link to={ROUTES.LANDLORD_PROPERTIES} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
          <span aria-hidden="true"><Building2Icon size={18} /></span>Quản lý khu trọ &amp; phòng
        </Link>
      </div>
    </header>
  );
}
