import EmptyState from '@/components/ui/EmptyState';

import { DashboardHeader, DashboardSkeleton, DashboardWorkspace, useOwnerDashboard } from '@/features/ownerDashboard';

export function LandlordDashboardPage() {
  const { data, isPending, isError, isFetching, refetch } = useOwnerDashboard();

  return (
    <div className="space-y-5">
      {!data && <DashboardHeader disabled onUtilities={() => undefined} onCreateReceipt={() => undefined} />}
      {isPending && <DashboardSkeleton />}
      {isError && (
        <div role="alert">
          <EmptyState
            title="Không tải được dữ liệu tổng quan"
            description="Vui lòng thử tải lại để tiếp tục theo dõi và xử lý công việc."
            actionLabel={isFetching ? 'Đang thử lại…' : 'Thử lại'}
            onAction={() => { if (!isFetching) void refetch(); }}
          />
        </div>
      )}
      {data && <DashboardWorkspace data={data} />}
    </div>
  );
}
