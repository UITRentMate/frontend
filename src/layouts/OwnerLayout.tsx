import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { HomeIcon } from '@/components/ui/icons';
import type { OwnerLayoutProps } from '@/types';

export const OwnerLayout: React.FC<OwnerLayoutProps> = ({
  children,
  title = 'Kênh Quản Lý Nhà Trọ & Bất Động Sản',
  className = '',
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className={`min-h-screen flex flex-col bg-canvas text-text-primary ${className}`}>
      {/* Top Header dành riêng cho Chủ trọ */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-border-subtle shadow-soft-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-soft-sm group-hover:bg-brand-600 transition-colors">
                R
              </div>
              <span className="text-xl font-heading font-extrabold tracking-tight text-brand-500 leading-none">
                Rent<span className="text-secondary-500">Mate</span>
              </span>
            </Link>

            <div className="h-5 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-1.5">
              <Badge variant="campus">Cổng Chủ Trọ</Badge>
            </div>
          </div>

          {/* Navigation Links cho Chủ trọ */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/landlord/properties"
              className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/landlord/properties')
                  ? 'text-brand-500 bg-brand-50 font-semibold'
                  : 'text-text-primary hover:text-brand-500 hover:bg-surface-muted/50'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Nhà trọ của tôi</span>
            </Link>
            <Link
              to={ROUTES.ROOMS}
              className="px-3 py-1.5 rounded-sm text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-muted/50 transition-colors"
            >
              Xem sàn tin KTX
            </Link>
          </nav>

          {/* Profile & Logout */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-secondary-500 text-white font-bold text-xs flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-text-primary truncate max-w-[120px] hidden sm:inline">
                  {user.name}
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-xs text-text-muted hover:text-danger"
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Sub-header Banner */}
      <div className="bg-white border-b border-border-subtle py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-heading font-bold text-text-primary">{title}</h1>
          <Link to={ROUTES.CREATE_ROOM}>
            <Button variant="primary" size="sm">
              + Đăng tin phòng mới
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-border-subtle py-6 text-center text-xs text-text-muted">
        <p>© 2026 RentMate — Cổng quản trị dành riêng cho đối tác Chủ nhà trọ & Quản lý KTX.</p>
      </footer>
    </div>
  );
};

export default OwnerLayout;
