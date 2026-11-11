const cardSlots = [0, 1, 2, 3];
const panelSlots = [0, 1, 2];
const placeholderClass = 'rounded-sm bg-surface-muted motion-safe:animate-pulse';
const cardClass = 'dashboard-surface flex min-w-0 flex-col gap-4 p-4';

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Đang tải dữ liệu tổng quan" className="space-y-6">
      <span className="sr-only">Đang tải dữ liệu tổng quan…</span>
      <div aria-hidden="true" className="space-y-6">
        <div className="space-y-2">
          <div className="flex h-6 items-center gap-3">
            <div className={`h-5 w-40 ${placeholderClass}`} />
            <div className={`h-5 w-24 rounded-pill ${placeholderClass}`} />
          </div>
          <div className="dashboard-four-columns">
            {cardSlots.map((slot) => (
              <div key={slot} className={`${cardClass} h-[182px] border-l-4`}>
                <div className={`size-8 ${placeholderClass}`} />
                <div className="flex-1 space-y-2">
                  <div className={`h-4 w-4/5 ${placeholderClass}`} />
                  <div className={`h-4 w-3/5 ${placeholderClass}`} />
                </div>
                <div className="border-t border-border-subtle pt-3">
                  <div className={`h-[34px] w-full ${placeholderClass}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-four-columns">
          {cardSlots.map((slot) => (
            <div key={slot} className={`${cardClass} h-[212px]`}>
              <div className="flex items-center justify-between gap-3">
                <div className={`h-4 w-28 ${placeholderClass}`} />
                <div className={`size-8 shrink-0 ${placeholderClass}`} />
              </div>
              <div className="mt-auto space-y-2">
                <div className={`h-8 w-36 max-w-full ${placeholderClass}`} />
                <div className={`h-2 w-full rounded-pill ${placeholderClass}`} />
                <div className={`h-3 w-4/5 ${placeholderClass}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className={`h-6 w-56 max-w-full ${placeholderClass}`} />
          <div className="dashboard-panels">
            {panelSlots.map((slot) => (
              <div key={slot} className="dashboard-panel dashboard-surface">
                <div className="flex items-start gap-3 border-b border-border-subtle pb-3">
                  <div className={`size-5 shrink-0 ${placeholderClass}`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-5 w-3/4 ${placeholderClass}`} />
                    <div className={`h-3 w-full ${placeholderClass}`} />
                  </div>
                </div>
                {panelSlots.map((row) => (
                  <div key={row} className="space-y-2 rounded-sm border border-border-subtle bg-canvas p-3">
                    <div className={`h-4 w-4/5 ${placeholderClass}`} />
                    <div className={`h-3 w-3/5 ${placeholderClass}`} />
                    <div className={`h-7 w-1/2 ${placeholderClass}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
