import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { useAuth } from '@/hooks/useAuth';
import { btnPrimarySm, wrap } from '../constants';
import { LandingLogo } from './LandingShared';

// Mục "Ghép người ở ghép" tạm trỏ ROUTES.ROOMS vì paths.ts chưa có route ghép người.
const navLinks = [
  { label: 'Tìm phòng', to: ROUTES.ROOMS },
  { label: 'Ghép người ở ghép', to: ROUTES.ROOMS },
  { label: 'Dành cho chủ trọ', to: ROUTES.LANDLORD_DASHBOARD },
];

export const LandingHeader: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/90 shadow-soft-xs backdrop-blur-md">
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        <div className="flex items-center gap-10">
          <LandingLogo showTagline />
          <nav className="hidden gap-7 text-[15px] font-medium text-text-secondary md:flex" aria-label="Điều hướng chính">
            {navLinks.map(({ label, to }) => (
              <Link key={label} to={to} className="transition-colors hover:text-brand-500">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to={ROUTES.PROFILE} className={btnPrimarySm}>
              Tài khoản
            </Link>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="text-[15px] font-semibold text-text-primary hover:text-brand-500">
                Đăng nhập
              </Link>
              <Link to={ROUTES.REGISTER} className={btnPrimarySm}>
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
