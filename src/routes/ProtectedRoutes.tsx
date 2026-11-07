import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from './paths';
import type { ProtectedRouteProps } from '@/types';

export const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = ROUTES.LOGIN,
  requiredRole,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-text-muted">Đang kiểm tra phiên đăng nhập...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.ROOMS} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

// Alias hỗ trợ cả dạng số ít (ProtectedRoute) và số nhiều (ProtectedRoutes)
export const ProtectedRoute = ProtectedRoutes;

export default ProtectedRoutes;
