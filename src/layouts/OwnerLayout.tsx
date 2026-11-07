import { Link, NavLink, Outlet } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Building2Icon, ExternalLinkIcon, LayoutDashboardIcon, UserIcon } from '@/components/ui/icons';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/paths';
import type { OwnerLayoutProps } from '@/types';

const ownerNavigation = [
  {
    label: 'Điều hướng chính',
    links: [{ to: ROUTES.LANDLORD_DASHBOARD, label: 'Tổng quan', Icon: LayoutDashboardIcon }],
  },
  {
    label: 'Bất động sản',
    links: [{ to: ROUTES.LANDLORD_PROPERTIES, label: 'Khu trọ & Phòng trọ', Icon: Building2Icon }],
  },
  {
    label: 'Khám phá',
    links: [{ to: ROUTES.ROOMS, label: 'Sàn tin phòng trọ', Icon: ExternalLinkIcon }],
  },
];

export function OwnerLayout({ children, title = 'Quản lý nhà trọ', className = '' }: OwnerLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className={`min-h-screen bg-canvas text-text-primary lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)] ${className}`}>
      <aside className="flex flex-col gap-3 border-b border-border-subtle bg-surface-card p-3 sm:px-5 lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:border-b-0 lg:border-r lg:py-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-brand-500 text-white" aria-hidden="true">
              <Building2Icon />
            </span>
            <span className="font-heading text-lg font-bold">RentMate</span>
          </Link>
          <Badge variant="info">Cổng Chủ trọ</Badge>
        </div>
        <nav aria-label="Điều hướng chủ trọ" className="flex flex-wrap gap-1.5 lg:mt-4 lg:flex-col lg:gap-6">
          {ownerNavigation.map(({ label, links }) => (
            <div key={label}>
              <p className="hidden px-2.5 pb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary lg:block">
                {label}
              </p>
              <ul>
                {links.map(({ to, label: linkLabel, Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end
                      className={({ isActive }) =>
                        `flex min-h-11 items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                          isActive
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-text-secondary hover:bg-canvas hover:text-brand-700'
                        }`
                      }
                    >
                      <span className="shrink-0" aria-hidden="true"><Icon className="size-[18px]" size={18} /></span>
                      {linkLabel}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {user && (
          <div className="mt-auto hidden items-center gap-2.5 rounded-lg border border-border-subtle bg-canvas p-3 lg:flex">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white" aria-hidden="true">
              <UserIcon className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold" title={user.name}>{user.name}</p>
              <p className="text-xs text-text-secondary">Chủ trọ</p>
            </div>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="border-b border-border-subtle bg-surface-card shadow-soft-xs lg:sticky lg:top-0 lg:z-10">
          <div className="mx-auto flex min-h-16 max-w-[100rem] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 xl:px-7">
            <div className="min-w-0">
              <p className="text-sm font-bold sm:text-base">Xin chào, {user?.name ?? 'Chủ trọ'}</p>
              <p className="text-xs text-text-secondary">{title}</p>
            </div>
            {user && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={logout}
                className="min-h-10 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Đăng xuất
              </Button>
            )}
          </div>
        </header>
        <main className="mx-auto w-full max-w-[100rem] flex-1 px-4 py-5 sm:px-6 xl:px-7 xl:py-6">
          {children ?? <Outlet />}
        </main>
        <footer className="px-4 py-4 text-center text-xs text-text-secondary">
          © 2026 RentMate — Cổng quản lý dành cho chủ trọ
        </footer>
      </div>
    </div>
  );
}

export default OwnerLayout;
