import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../routes/paths';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="bg-white border border-border-subtle rounded-xl p-8 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
            <span>🛡️</span>
            <span>Cổng Quản Trị Hệ Thống RentMate</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Đăng xuất
          </Button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
          Bảng Điều Khiển Quản Trị (Admin Dashboard)
        </h1>
        <p className="text-sm text-text-muted">
          Chào mừng <span className="font-semibold text-text-primary">{user?.name || 'Admin'}</span> ({user?.email}) đã đăng nhập thành công vào hệ thống quản lý.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-lg bg-[#F2F8FF] border border-[#D8ECFA]">
            <span className="text-xs text-text-muted">Phòng trọ chờ duyệt</span>
            <div className="text-2xl font-bold text-brand-500 font-heading mt-1">12</div>
          </div>
          <div className="p-4 rounded-lg bg-[#F2F8FF] border border-[#D8ECFA]">
            <span className="text-xs text-text-muted">Báo cáo vi phạm</span>
            <div className="text-2xl font-bold text-warning font-heading mt-1">3</div>
          </div>
          <div className="p-4 rounded-lg bg-[#F2F8FF] border border-[#D8ECFA]">
            <span className="text-xs text-text-muted">Tài khoản sinh viên</span>
            <div className="text-2xl font-bold text-secondary-500 font-heading mt-1">1,248</div>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Link to={ROUTES.ROOMS}>
            <Button variant="primary" size="sm">
              Xem danh sách phòng trọ
            </Button>
          </Link>
          <Link to={ROUTES.HOME}>
            <Button variant="secondary" size="sm">
              Về Trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
