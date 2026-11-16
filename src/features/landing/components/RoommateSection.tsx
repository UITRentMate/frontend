import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, MessageSquareText, UserSearch } from 'lucide-react';
import { ROUTES } from '@/routes/paths';
import { roommateCriteria, roommateProfile as profile } from '../services/mockData';
import { btnPrimary, eyebrow, wrap } from '../constants';
import { LandingFeatureList, LandingPanel } from './LandingShared';

export const RoommateSection: React.FC = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
      <div>
        <p className={eyebrow}>Ghép phòng thông minh</p>
        <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-text-primary md:text-[40px] md:leading-[1.25]">
          Tìm người ở ghép, hợp từ nếp sống đến ngân sách
        </h2>
        <p className="mt-5 max-w-[34rem] text-lg leading-8 text-text-secondary">
          Khám phá người ở ghép dựa trên các tiêu chí minh bạch và tính xác thực cá nhân, loại bỏ sự trừu tượng hay cam kết suông.
        </p>
        <LandingFeatureList items={roommateCriteria} />
        <Link to={ROUTES.ROOMS} className={`${btnPrimary} mt-8`}>
          Khám phá tính năng ghép người ở ghép <UserSearch className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      <LandingPanel className="md:p-9">
        <header className="flex items-center gap-4 border-b border-border-subtle pb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-brand-200 bg-brand-50 text-xl font-bold text-brand-500">
            {profile.initials}
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-text-primary">{profile.name}</h3>
            <p className="text-sm text-text-muted">{profile.meta}</p>
          </div>
        </header>

        <dl className="mt-6 rounded-md border border-border-subtle bg-canvas px-5">
          {profile.rows.map(({ label, value, highlight }) => (
            <div key={label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border-subtle py-3 last:border-b-0">
              <dt className="text-[15px] text-text-muted">{label}</dt>
              <dd className={`text-[15px] ${highlight ? 'font-semibold text-brand-500' : 'font-medium text-text-primary'}`}>
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-700">
          Thói quen sinh hoạt công khai:
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2.5">
          {profile.habits.map(({ icon: Icon, text }) => (
            <li key={text} className="inline-flex items-center gap-2 rounded-sm border border-brand-200 bg-canvas px-3.5 py-2 text-sm text-text-primary">
              <Icon className="h-4 w-4 text-brand-700" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-5">
          <p className="inline-flex items-center gap-2 text-sm text-text-muted">
            <BadgeCheck className="h-5 w-5 text-secondary-500" aria-hidden="true" />
            Đã xác minh căn cước & thẻ SV
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-5 py-3 text-[15px] font-semibold text-brand-500 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:shadow-focus"
          >
            Gửi lời mời trao đổi <MessageSquareText className="h-5 w-5" aria-hidden="true" />
          </button>
        </footer>
      </LandingPanel>
    </div>
  </section>
);

export default RoommateSection;
