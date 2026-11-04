import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import {
  LoginPage,
  RegisterPage,
  HomePage,
  RoomsPage,
  RoomDetailPage,
  AdminDashboardPage,
  LandlordPropertiesPage,
  NotFoundPage,
} from '@/pages';
import ProtectedRoutes from './ProtectedRoutes';
import AdminRoutes from './AdminRoutes';
import { ROUTES } from './paths';

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
      {
        path: 'secondhand',
        element: <RoomsPage />,
      },

      // Tuyến bảo vệ yêu cầu đăng nhập (Protected Routes)
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: 'landlord/properties',
            element: <LandlordPropertiesPage />,
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
