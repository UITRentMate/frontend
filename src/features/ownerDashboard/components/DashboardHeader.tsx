import * as icons from '@/assets/owner-dashboard';

import { Button } from '@/components/ui/Button';

import type { DashboardHeaderProps } from '../types';

const dashboardDateFormatter = new Intl.DateTimeFormat('vi-VN', {
  weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh',
});

export function DashboardHeader({ date, disabled, onUtilities, healthyMeters }: DashboardHeaderProps) {
  return (
    <header className="dashboard-hero dashboard-surface">
      <div className="dashboard-hero-copy">
        <div className="dashboard-dateline">
          <span className="dashboard-live-badge"><span />Dữ liệu mẫu</span>
          {date && <><span aria-hidden="true">•</span><time dateTime={date}>{dashboardDateFormatter.format(new Date(date))}</time></>}
        </div>
        <h1>Trung tâm vận hành &amp; Giám sát khu trọ</h1>
      </div>
      <div className="dashboard-hero-actions" aria-label="Thao tác nhanh">
        <div className="dashboard-iot" title="Trạng thái IoT mô phỏng trong bản mẫu">
          <img src={icons.iot} alt="" />
          <div><p>Hệ thống IoT</p><strong>{healthyMeters === undefined ? 'Đang tải trạng thái…' : `${healthyMeters}/${healthyMeters} Công tơ ổn định`}</strong></div>
        </div>
        <Button type="button" onClick={onUtilities} disabled={disabled} className="dashboard-ocr-button">
          <img src={icons.ocr} alt="" />Chụp số điện nước (OCR)
        </Button>
      </div>
    </header>
  );
}
