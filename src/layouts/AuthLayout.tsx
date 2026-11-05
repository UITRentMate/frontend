import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from '@/features/auth/components/AuthHeader';
import AuthFooter from '@/features/auth/components/AuthFooter';
import AuthBanner from '@/features/auth/components/AuthBanner';
import type { AuthLayoutProps } from '@/types';

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  headline,
  subtext,
  imageUrl,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-white text-text-primary ${className}`}>
      {/* Top Header */}
      <AuthHeader />

      {/* Main Grid: 2 Cột */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Cột trái: Form & Footer */}
        <div className="flex flex-col justify-between h-full min-h-[calc(100vh-4rem)] lg:min-h-0">
          <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16">
            {children || <Outlet />}
          </div>
          <AuthFooter />
        </div>

        {/* Cột phải: Visual Banner */}
        <div className="hidden lg:block h-full">
          <AuthBanner
            headline={headline}
            subtext={subtext}
            imageUrl={imageUrl}
            className="h-full"
          />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
