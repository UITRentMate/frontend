import React from 'react';
import { Wrench } from 'lucide-react';
import { livingBook as book, tenantFeatures } from '../services/mockData';
import { eyebrow, wrap } from '../constants';
import { LandingBadge, LandingFeatureList, LandingPanel } from './LandingShared';

export const TransparencySection: React.FC = () => (
  <section className="border-y border-border-subtle bg-canvas py-16">
    <div className={`${wrap} grid items-start gap-12 lg:grid-cols-2`}>
      <div>
        <p className={eyebrow}>Minh bạch sinh hoạt</p>
        <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-text-primary">
          Thông tin thuê trọ rõ ràng, dễ theo dõi
        </h2>
        <p className="mt-4 leading-7 text-text-secondary">
          Mọi dữ liệu từ hợp đồng, hóa đơn đến thông số dịch vụ đều được lưu trữ trực quan, loại bỏ phiền hà và bất đồng phát sinh giữa người thuê và chủ nhà.
        </p>
        <LandingFeatureList items={tenantFeatures} />
      </div>

      <LandingPanel>
        <div className="flex items-start justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <h3 className="font-heading font-bold text-text-primary">{book.title}</h3>
            <p className="text-sm text-text-muted">{book.subtitle}</p>
          </div>
          <span className="rounded-xs border border-border-subtle bg-canvas px-2.5 py-1 font-mono text-sm font-semibold text-brand-500">
            {book.roomCode}
          </span>
        </div>
        <div className="mt-5 rounded-md border border-border-subtle bg-canvas p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">{book.period}</p>
              <p className="font-mono text-2xl font-semibold text-text-primary">{book.total}</p>
            </div>
            <LandingBadge tone="green">{book.status}</LandingBadge>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-border-subtle pt-4 text-sm">
            {book.lines.map(({ label, value, highlight }) => (
              <div key={label}>
                <dt className="text-text-muted">{label}</dt>
                <dd className={`mt-1 font-mono font-semibold ${highlight ? 'text-brand-500' : 'text-text-primary'}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 text-warning" aria-hidden="true" />
            <div>
              <p className="font-semibold text-text-primary">{book.ticket.title}</p>
              <p className="text-sm text-text-muted">{book.ticket.note}</p>
            </div>
          </div>
          <LandingBadge tone="amber">{book.ticket.status}</LandingBadge>
        </div>
      </LandingPanel>
    </div>
  </section>
);

export default TransparencySection;
