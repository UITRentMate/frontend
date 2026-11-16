import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/routes/paths';
import { ownerFeatures, ownerSummary as owner } from '../services/mockData';
import { btnPrimary, eyebrow, wrap } from '../constants';
import { LandingBadge, LandingFeatureList, LandingPanel } from './LandingShared';

export const OwnerSection: React.FC = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]`}>
      <div>
        <p className={eyebrow}>Dành cho chủ nhà & người quản lý</p>
        <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary">
          Quản lý phòng trọ gọn gàng hơn mỗi ngày
        </h2>
        <p className="mt-4 leading-7 text-text-secondary">
          Tập trung danh sách phòng, người thuê và tác vụ vận hành trên cùng một nền tảng. Thay thế hoàn toàn sổ sách ghi tay và nhầm lẫn khi chốt điện nước định kỳ.
        </p>
        <LandingFeatureList items={ownerFeatures} twoColumns />
        <Link to={ROUTES.LANDLORD_DASHBOARD} className={`${btnPrimary} mt-8`}>
          Khám phá dành cho chủ trọ <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <LandingPanel>
        <div className="flex items-start justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <h3 className="font-heading font-bold text-text-primary">{owner.name}</h3>
            <p className="text-sm text-text-muted">{owner.address}</p>
          </div>
          <LandingBadge tone="green">{owner.occupancy}</LandingBadge>
        </div>
        <div className="mt-5 rounded-md border border-border-subtle p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Tổng thu dự kiến tháng:</span>
            <span className="font-mono text-lg font-semibold text-brand-500">{owner.expected}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-pill bg-surface-muted">
            <div className="h-full w-3/4 rounded-pill bg-brand-500" />
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-text-muted">{owner.collectedLabel}</span>
            <span className="font-mono font-semibold text-text-primary">{owner.collected}</span>
          </div>
        </div>
        <div className="mt-4 rounded-md bg-canvas p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-700">Chốt số điện nước đầu tháng</h4>
          <ul className="mt-2 text-sm">
            {owner.meters.map(({ room, status, done }) => (
              <li key={room} className="flex justify-between gap-3 border-b border-border-subtle py-2.5 last:border-0">
                <span className="font-medium text-text-primary">{room}</span>
                <span className={`font-mono text-xs ${done ? 'text-secondary-700' : 'text-warning'}`}>{status}</span>
              </li>
            ))}
          </ul>
        </div>
      </LandingPanel>
    </div>
  </section>
);

export default OwnerSection;
