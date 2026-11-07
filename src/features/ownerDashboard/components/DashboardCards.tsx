import { Link } from 'react-router-dom';
import { HomeIcon, WalletIcon, ZapIcon } from '@/components/ui/icons';
import { ROUTES } from '@/routes/paths';
import { roomStatuses } from '../constants';
import { countFormatter, currencyFormatter } from '../formatters';
import type { DashboardStats, MetricProgressProps, RoomStatus } from '../types';

const roomStatusOrder: readonly RoomStatus[] = ['vacant', 'reserved', 'occupied', 'maintenance'];
const percentFormatter = new Intl.NumberFormat('vi-VN', { style: 'percent' });

function MetricProgress({ label, value, fillClassName }: MetricProgressProps) {
  const percent = Math.round(Math.max(0, Math.min(value, 1)) * 100);

  return (
    <div
      aria-label={label}
      aria-valuenow={percent}
      role="progressbar"
      className="h-2 overflow-hidden rounded-pill bg-canvas ring-1 ring-inset ring-border-subtle"
    >
      <div className={`h-full rounded-pill ${fillClassName}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

export function DashboardCards({
  roomCounts,
  monthlyRevenue,
  receivedRevenue,
  revenuePeriod,
  utilityReadings,
  utilityPeriod,
}: DashboardStats) {
  const totalRooms = roomStatusOrder.reduce((total, status) => total + roomCounts[status], 0);
  const occupancy = totalRooms > 0 ? roomCounts.occupied / totalRooms : 0;
  const receivedRatio = monthlyRevenue > 0 ? receivedRevenue / monthlyRevenue : 0;
  const utilityRatio = totalRooms > 0 ? utilityReadings / totalRooms : 0;
  const missingRevenue = Math.max(0, monthlyRevenue - receivedRevenue);
  const cardClass = 'flex min-h-44 min-w-0 flex-col gap-4 rounded-lg border border-border-subtle bg-surface-card p-4 shadow-soft-xs';
  const headingClass = 'text-sm font-semibold uppercase text-text-secondary';
  const detailLinkClass = 'rounded-xs text-sm font-semibold text-brand-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

  return (
    <section aria-label="Chỉ số vận hành" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
      <article className={cardClass}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={headingClass}>Tỷ lệ lấp đầy</h2>
          <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-success-soft text-secondary-700" aria-hidden="true">
            <HomeIcon />
          </span>
        </div>
        <div className="mt-auto space-y-2">
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <strong className="font-heading text-3xl tabular-nums">{percentFormatter.format(occupancy)}</strong>
            <span className="text-sm text-text-secondary">
              {countFormatter.format(roomCounts.occupied)} / {countFormatter.format(totalRooms)} phòng
            </span>
          </p>
          <MetricProgress label="Tỷ lệ phòng đang thuê" value={occupancy} fillClassName="bg-secondary-500" />
        </div>
      </article>

      <article className={cardClass}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={headingClass}>Trạng thái phòng</h2>
          <Link to={ROUTES.LANDLORD_PROPERTIES} className={`shrink-0 ${detailLinkClass}`}>Chi tiết</Link>
        </div>
        <dl className="grid grid-cols-2 gap-2">
          {roomStatusOrder.map((status) => (
            <div key={status} className={`flex flex-wrap items-baseline justify-between gap-x-2 rounded-sm border px-2.5 py-2 ${roomStatuses[status].className}`}>
              <dt className="text-xs font-medium">{roomStatuses[status].label}</dt>
              <dd className="font-heading text-lg font-bold tabular-nums">{countFormatter.format(roomCounts[status])}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-auto text-xs text-text-secondary">Tổng số phòng: {countFormatter.format(totalRooms)}</p>
      </article>

      <article className={cardClass}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={headingClass}>Doanh thu tháng</h2>
          <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-brand-50 text-brand-600" aria-hidden="true">
            <WalletIcon />
          </span>
        </div>
        <div className="mt-auto space-y-2">
          <p className="text-xs text-text-secondary">{revenuePeriod}</p>
          <p className="font-heading text-2xl font-bold tabular-nums">{currencyFormatter.format(monthlyRevenue)}</p>
          <MetricProgress label="Tỷ lệ doanh thu đã thu" value={receivedRatio} fillClassName="bg-secondary-500" />
          <p className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs font-medium">
            <span className="text-secondary-700">Đã thu {currencyFormatter.format(receivedRevenue)}</span>
            <span className="text-red-700">Còn thiếu {currencyFormatter.format(missingRevenue)}</span>
          </p>
        </div>
      </article>

      <article className={cardClass}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={headingClass}>Chỉ số điện nước</h2>
          <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-info-soft text-sky-700" aria-hidden="true">
            <ZapIcon />
          </span>
        </div>
        <div className="mt-auto space-y-2">
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <strong className="font-heading text-3xl tabular-nums">{countFormatter.format(utilityReadings)}</strong>
            <span className="text-sm text-text-secondary">/ {countFormatter.format(totalRooms)} phòng đã chốt</span>
          </p>
          <MetricProgress label="Tỷ lệ phòng đã chốt chỉ số" value={utilityRatio} fillClassName="bg-brand-500" />
          <p className="text-xs text-text-secondary">Kỳ {utilityPeriod}</p>
        </div>
      </article>
    </section>
  );
}
