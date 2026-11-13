import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import * as icons from '@/assets/owner-dashboard';
import { ROUTES } from '@/routes/paths';

import { useAuth } from '@/hooks/useAuth';

import { dashboardSections } from '../constants';
import { useOwnerDashboard } from '../hooks/useOwnerDashboard';
import type { OwnerChromeProps } from '../types';
import { DashboardDialogShell } from './DashboardDialogs';

const navigationGroups = [
  { label: 'Bất động sản', links: [{ label: 'Khu trọ & Phòng trọ', icon: icons.properties, to: ROUTES.LANDLORD_PROPERTIES }] },
  { label: 'Khách thuê & Hợp đồng', links: [
    { label: 'Lịch hẹn & Yêu cầu', icon: icons.appointments, to: `${ROUTES.LANDLORD_DASHBOARD}?action=appointments`, badge: true },
    { label: 'Hợp đồng thuê', icon: icons.contracts },
    { label: 'Cư dân & Tạm trú', icon: icons.residents },
  ] },
  { label: 'Tài chính & Vận hành', links: [
    { label: 'Điện nước & Hóa đơn', icon: icons.invoices, to: `${ROUTES.LANDLORD_DASHBOARD}?action=utilities` },
    { label: 'Sổ công nợ', icon: icons.debt, to: `${ROUTES.LANDLORD_DASHBOARD}?action=ledger` },
    { label: 'Báo cáo sự cố', icon: icons.incidents, to: `${ROUTES.LANDLORD_DASHBOARD}?task=urgent-incidents`, alert: true },
  ] },
];

export function OwnerSidebar({ onNavigate }: OwnerChromeProps) {
  const { user, logout } = useAuth();
  const { data } = useOwnerDashboard();
  const [unavailableModule, setUnavailableModule] = useState('');
  const appointmentCount = data?.summary.appointments.length ?? 0;

  return (
    <>
      <div className="owner-brand"><Link to={ROUTES.HOME}><span className="owner-logo"><img src={icons.logo} alt="" /></span>RentMate</Link><span className="owner-brand-badge">Cổng Chủ trọ</span></div>
      <button type="button" className="owner-assistant" onClick={() => setUnavailableModule('Trợ lý AI RentMate')}><img src={icons.assistant} alt="" /><span>Trợ lý AI RentMate</span><i className="owner-status-dot" /></button>
      <nav className="owner-nav" aria-label="Điều hướng chủ trọ">
        <NavLink to={ROUTES.LANDLORD_DASHBOARD} end className="owner-nav-link" onClick={onNavigate}><img src={icons.dashboard} alt="" /><span>Tổng quan</span></NavLink>
        {navigationGroups.map((group) => (
          <div key={group.label} className="owner-nav-group"><h2>{group.label}</h2>
            {group.links.map((item) => item.to ? (
              <Link key={item.label} to={item.to} className="owner-nav-link" onClick={onNavigate}>
                <img src={item.icon} alt="" /><span>{item.label}</span>
                {'badge' in item && <span className="owner-nav-badge">{appointmentCount}</span>}
                {'alert' in item && <i className="owner-status-dot bg-danger" />}
              </Link>
            ) : <button key={item.label} type="button" className="owner-nav-link" onClick={() => setUnavailableModule(item.label)}><img src={item.icon} alt="" /><span>{item.label}</span></button>)}
          </div>
        ))}
      </nav>
      <div className="owner-user">
        <span className="owner-user-avatar"><img src={icons.avatar} alt="" /></span>
        <div className="owner-user-copy"><p><span title={user?.name}>{user?.name ?? 'Chủ trọ'}</span><img src={icons.verified} alt="" /></p><small>Cổng quản lý Chủ trọ</small></div>
        <button type="button" onClick={logout} aria-label="Đăng xuất"><img src={icons.logout} alt="" /></button>
      </div>
      {unavailableModule && <DashboardDialogShell title={unavailableModule} isPending={false} onClose={() => setUnavailableModule('')}><p className="text-sm text-text-secondary">Tính năng này đang được chuẩn bị. Bạn có thể tiếp tục quản lý lịch hẹn, điện nước và phiếu thu trên trang Tổng quan.</p></DashboardDialogShell>}
    </>
  );
}

export function OwnerTopbar({ onMenuToggle }: OwnerChromeProps) {
  const { user } = useAuth();
  const { data } = useOwnerDashboard();
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const receiptCount = data?.summary.receipts.length ?? 0;
  const appointments = data?.summary.appointments.filter((item) => item.status !== 'completed') ?? [];
  const matchingRooms = search.trim() ? data?.summary.property.rooms.filter((room) => `${room.code} ${room.detail}`.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi'))) ?? [] : [];

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === 'Escape') { setSearch(''); document.querySelectorAll<HTMLDetailsElement>('.owner-topbar details[open]').forEach((element) => { element.open = false; }); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className="owner-topbar">
      <button type="button" onClick={onMenuToggle} className="owner-mobile-toggle" aria-label="Mở điều hướng"><span aria-hidden="true">☰</span></button>
      <div className="owner-greeting"><strong>Xin chào, {user?.name ?? 'Chủ trọ'}! 👋</strong><p>Hôm nay có {receiptCount} lượt thu tiền và {appointments.length} lịch hẹn mới</p></div>
      <details className="owner-property-menu"><summary className="owner-topbar-action"><img src={icons.propertiesFilter} alt="" /><span>Tất cả khu trọ</span><img src={icons.chevronDown} alt="" /></summary><div className="owner-dropdown"><p>Cơ sở đang xem: {data?.summary.property.name ?? 'Đang tải…'}</p><Link to={ROUTES.LANDLORD_PROPERTIES}>Quản lý khu trọ &amp; phòng</Link></div></details>
      <div className="owner-search">
        <img src={icons.search} alt="" /><input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm phòng, cư dân, hợp đồng…" aria-label="Tìm phòng hoặc cư dân trong cơ sở" /><kbd>Ctrl K</kbd>
        {search.trim() && <div className="owner-dropdown" aria-label="Kết quả tìm kiếm">{matchingRooms.length ? matchingRooms.map((room) => <Link key={room.code} onClick={() => setSearch('')} to={`${ROUTES.LANDLORD_DASHBOARD}?room=${encodeURIComponent(room.code)}`}>{room.code} · {room.detail}</Link>) : <p>Không tìm thấy phòng hoặc cư dân phù hợp trong cơ sở.</p>}</div>}
      </div>
      <details><summary className="owner-topbar-action owner-task-trigger" aria-label="Tạo tác vụ"><img src={icons.aiTask} alt="" /><span>Tạo tác vụ AI</span></summary><div className="owner-dropdown"><Link to={`${ROUTES.LANDLORD_DASHBOARD}?action=createAppointment`}>Thêm lịch hẹn</Link><Link to={`${ROUTES.LANDLORD_DASHBOARD}?action=utilities`}>Ghi điện nước</Link><Link to={`${ROUTES.LANDLORD_DASHBOARD}?action=createReceipt`}>Tạo phiếu thu</Link><p>Các thao tác hiện tại được thực hiện thủ công.</p></div></details>
      <details><summary className="owner-topbar-action owner-notification" aria-label={`${receiptCount} biên lai chờ duyệt`}><img src={icons.notification} alt="" />{receiptCount > 0 && <span>{receiptCount}</span>}</summary><div className="owner-dropdown"><p>{receiptCount} biên lai đang chờ đối soát.</p><Link to={`${ROUTES.LANDLORD_DASHBOARD}#${dashboardSections.reconciliation}`}>Xem đối soát ngân hàng</Link></div></details>
      <Link to={ROUTES.PROFILE} className="owner-profile" aria-label="Hồ sơ của tôi"><img src={icons.profile} alt="" /></Link>
    </header>
  );
}
