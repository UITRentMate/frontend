import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/home/HomePage';
import RoomsPage from '../pages/rooms/RoomsPage';
import RoomDetailPage from '../pages/rooms/RoomDetailPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import LandlordPropertiesPage from '../pages/landlord/LandlordPropertiesPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import { ROUTES } from './paths';

export const router = createBrowserRouter([
  // 1. Tuyến đường Đăng nhập (Toàn màn hình, độc lập với MainLayout)
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
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
        element: <ProtectedRoute />,
        children: [
          {
            path: 'landlord/properties',
            element: <LandlordPropertiesPage />,
          },
        ],
      },

      // Tuyến bảo vệ dành riêng cho Quản trị viên (Admin Routes)
      {
        element: <AdminRoute />,
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
