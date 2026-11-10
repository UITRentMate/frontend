const cardSlots = [0, 1, 2, 3];
const panelSlots = [0, 1, 2];
const placeholderClass = 'rounded-sm bg-surface-muted motion-safe:animate-pulse';
const cardClass = 'flex min-w-0 flex-col gap-4 rounded-lg border border-border-subtle bg-surface-card p-4 shadow-soft-xs';

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Đang tải dữ liệu tổng quan" className="space-y-5">
      <span className="sr-only">Đang tải dữ liệu tổng quan…</span>
      <div aria-hidden="true" className="space-y-5">
        <div className="space-y-3">
          <div className="flex h-7 items-center gap-3">
            <div className={`h-5 w-40 ${placeholderClass}`} />
            <div className={`h-5 w-24 rounded-pill ${placeholderClass}`} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
            {cardSlots.map((slot) => (
              <div key={slot} className={`${cardClass} min-h-52 border-l-4`}>
                <div className={`size-9 ${placeholderClass}`} />
                <div className="flex-1 space-y-2">
                  <div className={`h-4 w-4/5 ${placeholderClass}`} />
                  <div className={`h-4 w-3/5 ${placeholderClass}`} />
                </div>
                <div className="border-t border-border-subtle pt-3">
                  <div className={`h-11 w-full ${placeholderClass}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {cardSlots.map((slot) => (
            <div key={slot} className={`${cardClass} min-h-56`}>
              <div className="flex items-center justify-between gap-3">
                <div className={`h-4 w-28 ${placeholderClass}`} />
                <div className={`size-9 shrink-0 ${placeholderClass}`} />
              </div>
              <div className="mt-auto space-y-3">
                <div className={`h-8 w-36 max-w-full ${placeholderClass}`} />
                <div className={`h-2 w-full rounded-pill ${placeholderClass}`} />
                <div className={`h-3 w-4/5 ${placeholderClass}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className={`h-7 w-56 max-w-full ${placeholderClass}`} />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4">
            {panelSlots.map((slot) => (
              <div key={slot} className="min-h-96 min-w-0 space-y-4 rounded-lg border border-border-subtle bg-surface-card p-4 shadow-soft-xs sm:p-5">
                <div className="flex items-start gap-3 border-b border-border-subtle pb-3">
                  <div className={`size-5 shrink-0 ${placeholderClass}`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-5 w-3/4 ${placeholderClass}`} />
                    <div className={`h-3 w-full ${placeholderClass}`} />
                  </div>
                </div>
                {panelSlots.map((row) => (
                  <div key={row} className="space-y-3 rounded-sm border border-border-subtle bg-canvas p-3">
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
