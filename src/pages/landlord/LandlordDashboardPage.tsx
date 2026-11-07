import { Link } from 'react-router-dom';
import EmptyState from '@/components/ui/EmptyState';
import Loading from '@/components/ui/Loading';
import { Building2Icon } from '@/components/ui/icons';
import { DashboardCards, PriorityTasks, SummarySections, useOwnerDashboard } from '@/features/ownerDashboard';
import { ROUTES } from '@/routes/paths';

const dashboardDateFormatter = new Intl.DateTimeFormat('vi-VN', {
  dateStyle: 'full',
  timeZone: 'Asia/Ho_Chi_Minh',
});

export function LandlordDashboardPage() {
  const { data, isPending, refetch } = useOwnerDashboard();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-5 rounded-lg border border-border-subtle bg-surface-card px-5 py-6 shadow-soft-xs sm:px-6 xl:px-7 xl:py-8">
        <div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-text-secondary">
            <span className="rounded-pill border border-success-border bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-secondary-700">
              Dữ liệu mẫu
            </span>
            {data && (
              <time dateTime={data.date}>{dashboardDateFormatter.format(new Date(data.date))}</time>
            )}
          </div>
          <h1 className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">
            Trung tâm vận hành &amp; giám sát khu trọ
          </h1>
          <p className="mt-2 max-w-lg text-sm text-text-secondary">
            Theo dõi tình hình cho thuê, doanh thu và các việc cần xử lý.
          </p>
        </div>
        <Link
          to={ROUTES.LANDLORD_PROPERTIES}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <span aria-hidden="true"><Building2Icon /></span>
          Quản lý khu trọ &amp; phòng
        </Link>
      </header>

      {isPending && <Loading message="Đang tải tổng quan…" />}
      {!isPending && !data && (
        <EmptyState
          title="Không tải được dữ liệu tổng quan"
          actionLabel="Thử lại"
          onAction={() => void refetch()}
        />
      )}
      {data && (
        <>
          <PriorityTasks tasks={data.tasks} />
          <DashboardCards {...data.stats} />
          <SummarySections {...data.summary} />
        </>
      )}
    </div>
  );
}
