import React from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';
import { footerColumns } from '../services/mockData';
import { wrap } from '../constants';
import { LandingLogo } from './LandingShared';

export const LandingFooter: React.FC = () => (
  <footer className="border-t border-border-subtle bg-white">
    <div className={`${wrap} grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]`}>
      <div>
        <LandingLogo />
        <p className="mt-4 max-w-sm text-sm leading-6 text-text-secondary">
          Nền tảng công nghệ quản lý và thuê phòng trọ minh bạch, tiện lợi dành cho sinh viên, chuyên viên trẻ và chủ nhà trọ tại Việt Nam.
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-text-muted">
          <CircleCheck className="h-4 w-4 text-secondary-500" aria-hidden="true" />
          Bảo vệ quyền lợi pháp lý hợp đồng & định mức sinh hoạt
        </p>
      </div>
      {footerColumns.map(({ heading, links }) => (
        <div key={heading}>
          <h3 className="font-heading text-sm font-bold text-text-primary">{heading}</h3>
          <ul className="mt-4 space-y-3 text-sm text-text-secondary">
            {links.map(({ label, to, href }) => (
              <li key={label}>
                {to ? (
                  <Link to={to} className="transition-colors hover:text-brand-500">{label}</Link>
                ) : (
                  <a href={href} className="transition-colors hover:text-brand-500">{label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className={`${wrap} flex flex-wrap justify-between gap-2 border-t border-border-subtle py-6 text-sm text-text-muted`}>
      <p>© 2026 RentMate PropTech Platform. Toàn bộ bản quyền được bảo lưu.</p>
      <p>Hệ sinh thái thuê trọ chuẩn mực & số hóa tại Việt Nam</p>
    </div>
  </footer>
);

export default LandingFooter;
