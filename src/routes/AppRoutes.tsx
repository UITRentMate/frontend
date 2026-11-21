import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/ui';
import MainLayout from '@/layouts/MainLayout';
import OwnerLayout from '@/layouts/OwnerLayout';

import AdminRoutes from './AdminRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import { ROUTES } from './paths';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const RoomsPage = lazy(() => import('@/pages/rooms/RoomsPage'));
const RoomDetailPage = lazy(() => import('@/pages/rooms/RoomDetailPage'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const LandlordDashboardPage = lazy(() =>
  import('@/pages/landlord/LandlordDashboardPage').then((module) => ({
    default: module.LandlordDashboardPage,
  })),
);
const LandlordPropertiesPage = lazy(() => import('@/pages/landlord/LandlordPropertiesPage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

const routeFallback = <Loading message="Đang tải trang..." fullScreen />;

export const router = createBrowserRouter([
  // 1. Tuyến đường Đăng nhập & Đăng ký (Toàn màn hình, độc lập với MainLayout)
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={routeFallback}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <Suspense fallback={routeFallback}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoutes requiredRole="landlord" />,
    children: [
      {
        element: <OwnerLayout />,
        children: [
          {
            path: ROUTES.LANDLORD_DASHBOARD,
            element: (
              <Suspense fallback={routeFallback}>
                <LandlordDashboardPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.LANDLORD_PROPERTIES,
            element: (
              <Suspense fallback={routeFallback}>
                <LandlordPropertiesPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // 2. Các tuyến đường giao diện chính sử dụng MainLayout (Navbar + Footer)
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      // Tuyến công khai (Public Routes)
      {
        index: true,
        element: (
          <Suspense fallback={routeFallback}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'rooms',
        element: (
          <Suspense fallback={routeFallback}>
            <RoomsPage />
          </Suspense>
        ),
      },
      {
        path: 'rooms/:id',
        element: (
          <Suspense fallback={routeFallback}>
            <RoomDetailPage />
          </Suspense>
        ),
      },

      // Tuyến bảo vệ dành riêng cho Quản trị viên (Admin Routes)
      {
        element: <AdminRoutes />,
        children: [
          {
            path: 'admin/dashboard',
            element: (
              <Suspense fallback={routeFallback}>
                <AdminDashboardPage />
              </Suspense>
            ),
          },
        ],
      },

      // Tuyến 404 Not Found
      {
        path: '*',
        element: (
          <Suspense fallback={routeFallback}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
