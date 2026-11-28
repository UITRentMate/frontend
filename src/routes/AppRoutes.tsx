import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import OwnerLayout from '@/layouts/OwnerLayout';
import { Loading } from '@/components/ui/Loading';
import {
  LoginPage,
  RegisterPage,
  HomePage,
  RoomsPage,
  RoomDetailPage,
  AdminDashboardPage,
  LandlordDashboardPage,
  LandlordPropertiesPage,
  NotFoundPage,
} from '@/pages';
import ProtectedRoutes from './ProtectedRoutes';
import AdminRoutes from './AdminRoutes';
import { ROUTES } from './paths';

const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const RentalRequestPage = lazy(() => import('@/pages/rental-request/RentalRequestPage'));
const ScheduleTourPage = lazy(() => import('@/pages/schedule-tour/ScheduleTourPage'));
const BookingConfirmationPage = lazy(
  () => import('@/pages/booking-confirmation/BookingConfirmationPage')
);

const authRouteFallback = <Loading message="Đang tải trang..." fullScreen />;

export const router = createBrowserRouter([
  // 1. Tuyến đường Đăng nhập & Đăng ký (Toàn màn hình, độc lập với MainLayout)
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <Suspense fallback={authRouteFallback}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: (
      <Suspense fallback={authRouteFallback}>
        <ResetPasswordPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoutes requiredRole="landlord" />,
    children: [
      {
        element: <OwnerLayout />,
        children: [
          { path: ROUTES.LANDLORD_DASHBOARD, element: <LandlordDashboardPage /> },
          { path: ROUTES.LANDLORD_PROPERTIES, element: <LandlordPropertiesPage /> },
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
        element: <HomePage />,
      },
      {
        path: 'rooms',
        element: <RoomsPage />,
      },
      {
        path: 'rooms/:id',
        element: <RoomDetailPage />,
      },

      // Tuyến bảo vệ yêu cầu đăng nhập (Protected Routes)
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'profile',
            element: (
              <Suspense fallback={<Loading message="Đang tải trang..." fullScreen />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: 'rental-request',
            element: (
              <Suspense fallback={<Loading message="Đang tải trang..." fullScreen />}>
                <RentalRequestPage />
              </Suspense>
            ),
          },
          {
            path: 'rooms/:id/rental-request',
            element: (
              <Suspense fallback={<Loading message="Đang tải trang..." fullScreen />}>
                <RentalRequestPage />
              </Suspense>
            ),
          },
          {
            path: 'schedule-tour',
            element: (
              <Suspense fallback={<Loading message="Đang tải trang..." fullScreen />}>
                <ScheduleTourPage />
              </Suspense>
            ),
          },
          {
            path: 'rooms/:id/schedule-tour',
            element: (
              <Suspense fallback={<Loading message="Đang tải trang..." fullScreen />}>
                <ScheduleTourPage />
              </Suspense>
            ),
          },
          {
            path: 'rooms/:id/booking-confirmation',
            element: (
              <Suspense fallback={<Loading message="Đang tải trang..." fullScreen />}>
                <BookingConfirmationPage />
              </Suspense>
            ),
          },
        ],
      },

      // Tuyến bảo vệ dành riêng cho Quản trị viên (Admin Routes)
      {
        element: <AdminRoutes />,
        children: [
          {
            path: 'admin/dashboard',
            element: <AdminDashboardPage />,
          },
        ],
      },

      // Tuyến 404 Not Found
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
