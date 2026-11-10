import { Link } from 'react-router-dom';

import { ROUTES } from '@/routes/paths';

import { Button } from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { ArrowRightIcon, CalendarIcon, LayoutDashboardIcon, WalletIcon } from '@/components/ui/icons';

import { dashboardSections, roomStatuses } from '../constants';
import { countFormatter, currencyFormatter } from '../formatters';
import type { SummarySectionsProps } from '../types';

const appointmentStatuses = {
  completed: { label: 'Hoàn thành', className: 'bg-success-soft text-secondary-700' },
  upcoming: { label: 'Sắp tới', className: 'bg-warning-soft text-amber-800' },
  scheduled: { label: 'Đã hẹn', className: 'bg-brand-50 text-brand-700' },
};

const panelClass = 'flex min-h-96 min-w-0 scroll-mt-24 flex-col gap-3 rounded-lg border border-border-subtle bg-surface-card p-4 shadow-soft-xs sm:p-5';
const rowClass = 'rounded-sm border border-border-subtle bg-canvas p-3';

export function SummarySections({ appointments, receipts, property, isPending, confirmingAppointmentId, onConfirmAppointment, onRescheduleAppointment, onReconcileReceipt, onSelectRoom }: SummarySectionsProps) {
  return (
    <section aria-labelledby="dashboard-summary-title" className="space-y-3">
      <h2 id="dashboard-summary-title" className="text-lg font-bold">Nghiệp vụ vận hành tại chỗ</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4">
        <section id={dashboardSections.appointments} tabIndex={-1} aria-labelledby="dashboard-appointments-title" className={panelClass}>
          <header className="flex items-start gap-2.5 border-b border-border-subtle pb-3">
            <span className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true"><CalendarIcon /></span>
            <div>
              <h3 id="dashboard-appointments-title" className="font-bold">Lịch đón khách</h3>
              <p className="mt-0.5 text-xs text-text-secondary">Lịch hẹn và công việc tại cơ sở</p>
            </div>
          </header>
          {appointments.length === 0 ? (
            <EmptyState title="Chưa có lịch hẹn" />
          ) : (
            <ul className="space-y-2.5">
              {appointments.map((appointment) => {
                const status = appointmentStatuses[appointment.status];

                return (
                  <li key={appointment.id} className={`flex flex-wrap items-start gap-2.5 ${rowClass}`}>
                    <time dateTime={appointment.time} className={`shrink-0 rounded-sm px-2 py-1 text-sm font-bold tabular-nums ${status.className}`}>
                      {appointment.time}
                    </time>
                    <div className="min-w-0 flex-1 basis-28">
                      <p className="text-sm font-semibold">{appointment.title}</p>
                      <p className="mt-1 text-xs text-text-secondary">{appointment.detail}</p>
                      <p className={`mt-2 inline-block rounded-pill px-2 py-0.5 text-xs font-medium ${status.className}`}>
                        {status.label}
                      </p>
                      {appointment.status !== 'completed' && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Button type="button" size="sm" variant="secondary" disabled={isPending} isLoading={confirmingAppointmentId === appointment.id} onClick={() => onConfirmAppointment(appointment.id)} className="min-h-10">Xác nhận đón</Button>
                          <Button type="button" size="sm" variant="ghost" disabled={isPending} onClick={() => onRescheduleAppointment(appointment.id)} className="min-h-10">Đổi giờ</Button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section id={dashboardSections.reconciliation} tabIndex={-1} aria-labelledby="dashboard-reconciliation-title" className={panelClass}>
          <header className="flex items-start gap-2.5 border-b border-border-subtle pb-3">
            <span className="mt-0.5 shrink-0 text-secondary-700" aria-hidden="true"><WalletIcon /></span>
            <div>
              <h3 id="dashboard-reconciliation-title" className="font-bold">Đối soát ngân hàng</h3>
              <p className="mt-0.5 text-xs text-text-secondary">{countFormatter.format(receipts.length)} biên lai chờ đối soát</p>
            </div>
          </header>
          {receipts.length === 0 ? (
            <EmptyState title="Chưa có biên lai cần đối soát" />
          ) : (
            <ul className="space-y-2.5">
              {receipts.map((receipt) => (
                <li key={receipt.id} className={`flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5 ${rowClass}`}>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                      <p className="text-sm font-semibold">{receipt.tenantName}</p>
                      <span className="rounded-xs bg-brand-50 px-1.5 py-0.5 text-xs font-semibold text-brand-700">
                        {receipt.roomCode}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">{receipt.detail}</p>
                  </div>
                  <span className="font-heading text-sm font-bold tabular-nums text-secondary-700">{currencyFormatter.format(receipt.amount)}</span>
                  <Button type="button" size="sm" variant="secondary" disabled={isPending} onClick={() => onReconcileReceipt(receipt.id)} className="mt-1 min-h-10 w-full">Xác nhận đã nhận tiền</Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id={dashboardSections.roomMap} tabIndex={-1} aria-labelledby="dashboard-rooms-title" className={panelClass}>
          <header className="flex items-start gap-2.5 border-b border-border-subtle pb-3">
            <span className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true"><LayoutDashboardIcon /></span>
            <div>
              <h3 id="dashboard-rooms-title" className="font-bold">Sơ đồ nhanh cơ sở</h3>
              <p className="mt-0.5 text-xs text-text-secondary">
                {property.name} · {countFormatter.format(property.roomCount)} phòng
              </p>
            </div>
          </header>
          {property.rooms.length === 0 ? (
            <EmptyState title="Chưa có thông tin phòng" />
          ) : (
            <ul className="grid grid-cols-2 gap-2 min-[420px]:max-sm:grid-cols-3 2xl:grid-cols-3">
              {property.rooms.map((room) => (
                <li key={room.code} className="min-w-0">
                  <button type="button" onClick={() => onSelectRoom(room.code)} disabled={isPending} aria-label={`Xem phòng ${room.code}, ${roomStatuses[room.status].label}`} className={`h-full w-full rounded-sm border p-2.5 text-left transition-shadow hover:shadow-soft-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 ${roomStatuses[room.status].className}`}>
                    <span className="block font-heading text-sm font-bold">{room.code}</span>
                    <span className="mt-1 block text-xs font-semibold">{roomStatuses[room.status].label}</span>
                    <span className="mt-1 block text-xs">{room.detail}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link
            to={ROUTES.LANDLORD_PROPERTIES}
            className="mt-auto flex items-center justify-center gap-2 rounded-sm border border-border-subtle bg-canvas px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            Xem khu trọ và phòng
            <span aria-hidden="true"><ArrowRightIcon /></span>
          </Link>
        </section>
      </div>
    </section>
  );
}
