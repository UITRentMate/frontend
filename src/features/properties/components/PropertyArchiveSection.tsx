import { ArchiveIcon, ShieldIcon } from '@/components/ui';

import type { PropertyArchiveSectionProps } from '../types';

export function PropertyArchiveSection({
  occupiedCount,
  reservedCount,
  vacantCount,
  isArchived,
  isPending,
  error,
  onToggleArchive,
}: PropertyArchiveSectionProps) {
  const hasActiveObligations = occupiedCount > 0 || reservedCount > 0;

  return (
    <section className="flex flex-1 flex-col rounded-xl border border-border-subtle bg-surface-card p-4 shadow-soft-xs">
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-xs bg-brand-50 font-heading text-xs font-bold text-brand-500">
            05
          </span>
          <h3 className="font-heading text-sm font-bold text-text-primary">
            Vòng đời &amp; Trạng thái lưu trữ
          </h3>
        </div>
        <span
          className={`rounded-pill border px-2.5 py-0.5 text-[11px] font-semibold ${
            isArchived
              ? 'border-warning-border bg-warning-soft text-warning'
              : 'border-success-border bg-success-soft text-secondary-600'
          }`}
        >
          {isArchived ? '● Đã lưu trữ' : '● Đang hoạt động bình thường'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-lg border border-border-subtle bg-canvas/60 px-3 py-2.5">
          <span className="block text-[11px] text-text-muted">Hợp đồng:</span>
          <strong className="mt-1 block font-heading text-sm font-bold text-brand-500">
            {String(occupiedCount).padStart(2, '0')} phòng
          </strong>
        </div>
        <div className="rounded-lg border border-border-subtle bg-canvas/60 px-3 py-2.5">
          <span className="block text-[11px] text-text-muted">Đặt cọc giữ:</span>
          <strong className="mt-1 block font-heading text-sm font-bold text-warning">
            {String(reservedCount).padStart(2, '0')} phòng
          </strong>
        </div>
        <div className="rounded-lg border border-border-subtle bg-canvas/60 px-3 py-2.5">
          <span className="block text-[11px] text-text-muted">Phòng trống:</span>
          <strong className="mt-1 block font-heading text-sm font-bold text-text-primary">
            {String(vacantCount).padStart(2, '0')} phòng
          </strong>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-warning-border bg-warning-soft/70 px-3 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-xs text-text-secondary">
          <ShieldIcon className="size-4 shrink-0 text-warning" />
          <span>
            {hasActiveObligations
              ? `Còn ${occupiedCount} hợp đồng hiệu lực và ${reservedCount} phòng đang giữ chỗ. Không thể lưu trữ khi vẫn còn nghĩa vụ.`
              : 'Không còn hợp đồng hiệu lực hoặc phòng giữ chỗ. Có thể chuyển sang trạng thái lưu trữ nếu ngừng khai thác.'}
          </span>
        </div>
        <button
          type="button"
          disabled={hasActiveObligations || isPending}
          onClick={onToggleArchive}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
            hasActiveObligations
              ? 'cursor-not-allowed border-border-subtle bg-white/60 text-text-disabled'
              : 'cursor-pointer border-warning-border bg-white text-warning hover:bg-warning-soft'
          }`}
        >
          <ArchiveIcon className="size-3.5" />
          {isArchived ? 'Khôi phục' : 'Lưu trữ'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </section>
  );
}
