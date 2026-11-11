import { Link } from 'react-router-dom';

import * as icons from '@/assets/owner-dashboard';
import { ROUTES } from '@/routes/paths';

import { roomStatuses } from '../constants';
import { countFormatter } from '../formatters';
import type { DashboardCardsProps, MetricProgressProps, RoomStatus } from '../types';

const roomStatusOrder: readonly RoomStatus[] = ['vacant', 'reserved', 'occupied', 'maintenance'];
const percentFormatter = new Intl.NumberFormat('vi-VN', { style: 'percent' });
const millions = (value: number) => `${Number((value / 1_000_000).toFixed(1))}M`;

function MetricProgress({ label, value, fillClassName, remainderClassName = 'bg-canvas' }: MetricProgressProps) {
  const percent = Math.round(Math.max(0, Math.min(value, 1)) * 100);
  return (
    <div aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} role="progressbar" className={`dashboard-progress ${remainderClassName}`}>
      <div className={`h-full rounded-pill ${fillClassName}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

export function DashboardCards({ roomCounts, monthlyRevenue, receivedRevenue, revenuePeriod, utilityReadings, utilityPeriod, propertyLabel, onUtilities }: DashboardCardsProps) {
  const totalRooms = roomStatusOrder.reduce((total, status) => total + roomCounts[status], 0);
  const occupancy = totalRooms > 0 ? roomCounts.occupied / totalRooms : 0;
  const missingRevenue = Math.max(0, monthlyRevenue - receivedRevenue);

  return (
    <section aria-label="Chỉ số vận hành" className="dashboard-four-columns dashboard-metrics">
      <article className="dashboard-metric dashboard-surface">
        <header><h2>Tỷ lệ lấp đầy</h2><span className="dashboard-metric-icon bg-success-soft"><img src={icons.occupancy} alt="" /></span></header>
        <div className="dashboard-occupancy-value">
          <p className="dashboard-metric-value"><strong>{percentFormatter.format(occupancy)}</strong><span>({roomCounts.occupied} / {totalRooms} phòng)</span></p>
          <MetricProgress label="Tỷ lệ phòng đang thuê" value={occupancy} fillClassName="bg-secondary-500" />
        </div>
      </article>
      <article className="dashboard-metric dashboard-surface">
        <header><h2>Trạng thái<br />phòng</h2><Link to={ROUTES.LANDLORD_PROPERTIES} className="dashboard-detail-link">Chi tiết<img src={icons.chevronRight} alt="" /></Link></header>
        <dl className="dashboard-room-counts">
          {roomStatusOrder.map((status) => <div key={status} className={`dashboard-status-${status}`}><dt>{roomStatuses[status].label}</dt><dd>{countFormatter.format(roomCounts[status])}</dd></div>)}
        </dl>
        <p className="dashboard-caption">Cơ sở: {propertyLabel}</p>
      </article>
      <article className="dashboard-metric dashboard-surface">
        <header><h2 title={revenuePeriod}>Doanh thu tháng này</h2><span className="dashboard-metric-icon bg-brand-50"><img src={icons.revenue} alt="" /></span></header>
        <div className="dashboard-revenue-value">
          <p className="dashboard-metric-value"><strong>{countFormatter.format(monthlyRevenue)}</strong><span>đ</span></p>
          <MetricProgress label="Tỷ lệ doanh thu đã thu" value={monthlyRevenue > 0 ? receivedRevenue / monthlyRevenue : 0} fillClassName="bg-secondary-500" remainderClassName="bg-danger" />
          <p className="dashboard-revenue-legend"><span>Đã thu: {millions(receivedRevenue)}</span><span>Còn thiếu: {millions(missingRevenue)}</span></p>
        </div>
      </article>
      <article id="dashboard-utilities" className="dashboard-metric dashboard-surface">
        <header><h2>Chỉ số điện nước kỳ này</h2><span className="dashboard-metric-icon bg-info-soft"><img src={icons.utilities} alt="" /></span></header>
        <div className="dashboard-utilities-value">
          <p className="dashboard-metric-value"><strong>{countFormatter.format(utilityReadings)}</strong><span>/ {totalRooms} phòng đã chốt</span></p>
          <MetricProgress label="Tỷ lệ phòng đã chốt chỉ số" value={totalRooms > 0 ? utilityReadings / totalRooms : 0} fillClassName="bg-brand-500" />
          <div className="dashboard-utility-footer"><span className="dashboard-caption">Kỳ: {utilityPeriod}</span><button type="button" onClick={onUtilities} className="dashboard-detail-link">Ghi số (OCR)<img src={icons.arrowRight} alt="" /></button></div>
        </div>
      </article>
    </section>
  );
}
