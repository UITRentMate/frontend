import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from './paths';
import type { RouteGuardProps } from '@/types';

export const AdminRoutes: React.FC<RouteGuardProps> = ({
  children,
  redirectPath = ROUTES.LOGIN,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-text-muted">Đang xác thực quyền quản trị...</span>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, chuyển về trang Login
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  // Nếu đã đăng nhập nhưng không phải Admin, chặn truy cập và chuyển về trang phòng
  if (user.role !== 'admin') {
    return <Navigate to={ROUTES.ROOMS} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

// Alias hỗ trợ cả dạng số ít (AdminRoute) và số nhiều (AdminRoutes)
export const AdminRoute = AdminRoutes;

export default AdminRoutes;
