import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-border-subtle shadow-soft-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-soft-sm group-hover:bg-brand-600 transition-colors">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-heading font-extrabold tracking-tight text-brand-500 leading-none">
              Rent<span className="text-secondary-500">Mate</span>
            </span>
            <span className="text-[10px] text-text-muted font-medium tracking-wide">Campus Community</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to={ROUTES.HOME}
            className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
              isActive(ROUTES.HOME)
                ? 'text-brand-500 bg-brand-50 font-semibold'
                : 'text-text-primary hover:text-brand-500 hover:bg-surface-muted/50'
            }`}
          >
            Trang chủ
          </Link>
          <Link
            to={ROUTES.ROOMS}
            className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
              isActive(ROUTES.ROOMS)
                ? 'text-brand-500 bg-brand-50 font-semibold'
                : 'text-text-primary hover:text-brand-500 hover:bg-surface-muted/50'
            }`}
          >
            Phòng trọ & KTX
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link
              to="/admin/dashboard"
              className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                isActive('/admin/dashboard')
                  ? 'text-purple-700 bg-purple-50 font-semibold'
                  : 'text-purple-600 hover:bg-purple-50/60'
              }`}
            >
              🛡️ Quản trị
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5">
              {user.role === 'landlord' && (
                <Link
                  to={ROUTES.LANDLORD_DASHBOARD}
                  className="rounded-sm px-2 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  Cổng Chủ trọ
                </Link>
              )}
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col text-left hidden sm:flex">
                  <span className="text-xs font-semibold text-text-primary truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-text-muted capitalize">
                    {user.role}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-xs text-text-muted hover:text-danger"
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <>
              <Link to={ROUTES.ROOMS}>
                <Button variant="eco" size="sm" className="hidden sm:inline-flex">
                  + Đăng tin KTX / Phòng
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" size="sm">
                  Đăng nhập
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
