import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import OwnerLayout from '@/layouts/OwnerLayout';
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
