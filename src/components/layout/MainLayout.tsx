import React from 'react';
import { HeaderNavigation } from './HeaderNavigation';
import { FooterSection } from './FooterSection';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <HeaderNavigation />
      <div className="flex-1 flex flex-col">{children}</div>
      <FooterSection />
    </div>
  );
};

export default MainLayout;
