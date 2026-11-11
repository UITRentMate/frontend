import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import type { OwnerLayoutProps } from '@/types';

import { XIcon } from '@/components/ui/icons';

import { OwnerSidebar, OwnerTopbar } from '@/features/ownerDashboard/components/OwnerChrome';

import '@/styles/ownerDashboard.css';

export function OwnerLayout({ children, className = '' }: OwnerLayoutProps) {
  const menuRef = useRef<HTMLDialogElement>(null);
  const closeMenu = () => menuRef.current?.close();

  return (
    <div className={`owner-shell ${className}`}>
      <aside className="owner-sidebar"><OwnerSidebar /></aside>
      <dialog ref={menuRef} className="owner-mobile-dialog" aria-label="Điều hướng chủ trọ" onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="owner-mobile-sidebar"><button type="button" onClick={closeMenu} className="owner-mobile-close" aria-label="Đóng điều hướng"><XIcon size={20} /></button><OwnerSidebar onNavigate={closeMenu} /></div>
      </dialog>
      <div className="owner-main">
        <OwnerTopbar onMenuToggle={() => menuRef.current?.showModal()} />
        <main className="owner-content">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}

export default OwnerLayout;
