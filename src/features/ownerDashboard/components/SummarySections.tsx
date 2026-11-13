import { Link } from 'react-router-dom';

import * as icons from '@/assets/owner-dashboard';
import { ROUTES } from '@/routes/paths';

import { Button } from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

import { dashboardSections, roomStatuses } from '../constants';
import { countFormatter } from '../formatters';
import type { SummarySectionsProps } from '../types';

const receiptImages = { vcb: icons.receiptVcb, mb: icons.receiptMb, techcom: icons.receiptTechcom };
const displayTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = Number(hours);
  return { time: `${String(hour % 12 || 12).padStart(2, '0')}:${minutes}`, period: hour < 12 ? 'AM' : 'PM' };
};

export function SummarySections({ appointments, receipts, property, isPending, onRescheduleAppointment, onReconcileReceipt, onSelectRoom, onCreateAppointment, onOpenAppointment, onCreateReceipt, onViewAppointments }: SummarySectionsProps) {
  return (
    <section aria-labelledby="dashboard-summary-title" className="dashboard-section">
      <div className="dashboard-section-heading">
        <div><img src={icons.operations} alt="" /><h2 id="dashboard-summary-title">Nghiệp vụ vận hành tại chỗ</h2><span className="dashboard-sync-badge">Đồng bộ trực tiếp</span></div>
        <span className="dashboard-section-note">Dữ liệu của phiên hiện tại</span>
      </div>
      <div className="dashboard-panels">
        <section id={dashboardSections.appointments} tabIndex={-1} aria-labelledby="dashboard-appointments-title" className="dashboard-panel dashboard-surface">
          <header className="dashboard-panel-heading">
            <img src={icons.calendar} alt="" />
            <div><h3 id="dashboard-appointments-title">Lịch đón khách hôm nay</h3><p>Theo dõi thực tế tại cơ sở</p></div>
            <Button type="button" size="sm" onClick={onCreateAppointment} disabled={isPending} className="dashboard-add-appointment"><img src={icons.plus} alt="" />Thêm lịch</Button>
          </header>
          {appointments.length === 0 ? <EmptyState title="Chưa có lịch hẹn" /> : (
            <ul className="dashboard-appointment-list">
              {appointments.map((appointment) => {
                const time = displayTime(appointment.time);
                const completed = appointment.status === 'completed';
                const maintenance = appointment.kind === 'maintenance';
                const statusLabel = completed ? 'Hoàn thành' : maintenance ? 'Đã hẹn thợ' : 'Sắp tới';
                return (
                  <li key={appointment.id} className={`dashboard-appointment ${!completed && !maintenance ? 'dashboard-appointment-upcoming' : ''}`}>
                    <div className="dashboard-appointment-main">
                      <button type="button" disabled={isPending || completed} onClick={() => onRescheduleAppointment(appointment.id)} className={`dashboard-time dashboard-time-${completed ? 'completed' : maintenance ? 'maintenance' : 'upcoming'}`} aria-label={`Đổi giờ lịch hẹn ${appointment.title}, ${appointment.time}`}>
                        <time dateTime={appointment.time}>{time.time}<br />{time.period}</time>
                      </button>
                      <button type="button" className="dashboard-appointment-title" onClick={() => onOpenAppointment(appointment.id)} title={appointment.title}>{appointment.title}</button>
                      <span className={`dashboard-appointment-status dashboard-appointment-status-${completed ? 'completed' : maintenance ? 'scheduled' : 'upcoming'}`}>{statusLabel}</span>
                    </div>
                    <div className="dashboard-appointment-footer">
                      <p>{appointment.detail.split(':')[0]}: <strong>{appointment.detail.split(':').slice(1).join(':').trim()}</strong></p>
                      {completed ? <span className="dashboard-appointment-note">{appointment.note}</span> : maintenance ? (
                        <button type="button" onClick={() => onOpenAppointment(appointment.id)} className="dashboard-detail-link">Chi tiết sự cố<img src={icons.externalLink} alt="" /></button>
                      ) : (
                        <div className="dashboard-appointment-actions">
                          <button type="button" className="dashboard-phone" onClick={() => onOpenAppointment(appointment.id)} aria-label={`Liên hệ khách · ${appointment.detail}`}><img src={icons.phone} alt="" /></button>
                          <Button type="button" size="sm" onClick={() => onOpenAppointment(appointment.id)} disabled={isPending} className="dashboard-unlock"><img src={icons.unlock} alt="" />Mở khóa</Button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <button type="button" onClick={onViewAppointments} className="dashboard-panel-footer">Xem toàn bộ lịch hẹn →</button>
        </section>

        <section id={dashboardSections.reconciliation} tabIndex={-1} aria-labelledby="dashboard-reconciliation-title" className="dashboard-panel dashboard-surface">
          <header className="dashboard-panel-heading">
            <img src={icons.bank} alt="" />
            <div><h3 id="dashboard-reconciliation-title">Đối soát ngân hàng</h3><p>{countFormatter.format(receipts.length)} biên lai nộp cọc &amp; tiền phòng</p></div>
          </header>
          {receipts.length === 0 ? <EmptyState title="Chưa có biên lai cần đối soát" /> : (
            <ul className="dashboard-receipt-list">
              {receipts.map((receipt) => (
                <li key={receipt.id} className="dashboard-receipt">
                  {receipt.thumbnail ? (
                    <button type="button" className="dashboard-receipt-image" onClick={() => onReconcileReceipt(receipt.id)} aria-label={`Xem biên lai ${receipt.tenantName}`}><img src={receiptImages[receipt.thumbnail]} alt={`Biên lai ${receipt.tenantName}`} /></button>
                  ) : <span className="dashboard-receipt-placeholder"><img src={icons.bank} alt="" /></span>}
                  <div className="dashboard-receipt-detail">
                    <div><strong title={receipt.tenantName}>{receipt.tenantName}</strong><span className={`dashboard-receipt-room dashboard-receipt-room-${receipt.thumbnail ?? 'vcb'}`}>{receipt.roomCode}</span></div>
                    <p title={receipt.detail}>{receipt.detail}</p>
                  </div>
                  <div className="dashboard-receipt-action">
                    <strong>{countFormatter.format(receipt.amount)} đ</strong>
                    <Button type="button" variant="eco" size="sm" disabled={isPending} onClick={() => onReconcileReceipt(receipt.id)} aria-label={`Duyệt biên lai ${receipt.tenantName}`} className="dashboard-approve"><img src={icons.check} alt="" />Duyệt</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button type="button" onClick={onCreateReceipt} className="dashboard-panel-footer">Vào Sổ quỹ &amp; Thu chi →</button>
        </section>

        <section id={dashboardSections.roomMap} tabIndex={-1} aria-labelledby="dashboard-rooms-title" className="dashboard-panel dashboard-surface">
          <header className="dashboard-panel-heading">
            <img src={icons.dashboard} alt="" />
            <div><h3 id="dashboard-rooms-title">Sơ đồ nhanh cơ sở 1</h3><p>{property.name} ({property.roomCount} phòng)</p></div>
            <Link to={ROUTES.LANDLORD_PROPERTIES} className="dashboard-detail-link">Chi tiết<img src={icons.chevronRight} alt="" /></Link>
          </header>
          {property.rooms.length === 0 ? <EmptyState title="Chưa có thông tin phòng" /> : (
            <ul className="dashboard-room-grid">
              {property.rooms.map((room) => (
                <li key={room.code}>
                  <button type="button" onClick={() => onSelectRoom(room.code)} aria-label={`Xem phòng ${room.code}, ${roomStatuses[room.status].label}`} className={`dashboard-room dashboard-room-${room.isCleaning ? 'cleaning' : room.status}`}>
                    <span className="dashboard-room-heading"><strong>{room.code}</strong>
                      {room.isCleaning ? <img src={icons.roomCleaning} alt="" /> : room.status === 'occupied' ? <span className="dashboard-room-dot" /> : room.status === 'maintenance' ? <img src={icons.roomMaintenance} alt="" /> : room.status === 'reserved' ? <img src={icons.roomViewing} alt="" /> : <span className="dashboard-vacant-badge">Trống</span>}
                    </span>
                    <span className="dashboard-room-detail">{room.detail}</span>
                    <span className="dashboard-room-caption">{room.caption ?? roomStatuses[room.status].label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link to={ROUTES.LANDLORD_PROPERTIES} className="dashboard-panel-footer">Mở sơ đồ phòng tầng 1 - 3 →</Link>
        </section>
      </div>
    </section>
  );
}
