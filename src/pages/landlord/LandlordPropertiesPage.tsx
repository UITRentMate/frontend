import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../routes/paths';

export const LandlordPropertiesPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="bg-white border border-border-subtle rounded-xl p-8 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-600 text-xs font-semibold border border-brand-200">
            <span>🏠</span>
            <span>Cổng Quản Lý Cho Chủ Nhà Trọ</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Đăng xuất
          </Button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
          Danh Sách Bất Động Sản & Phòng Cho Thuê
        </h1>
        <p className="text-sm text-text-muted">
          Xin chào <span className="font-semibold text-text-primary">{user?.name || 'Chủ trọ'}</span> ({user?.email}). Dưới đây là danh sách các phòng trọ bạn đang quản lý trên RentMate.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-lg bg-[#F2F8FF] border border-[#D8ECFA]">
            <span className="text-xs text-text-muted">Tổng số phòng trọ</span>
            <div className="text-2xl font-bold text-brand-500 font-heading mt-1">8</div>
          </div>
          <div className="p-4 rounded-lg bg-[#F2F8FF] border border-[#D8ECFA]">
            <span className="text-xs text-text-muted">Đang cho thuê</span>
            <div className="text-2xl font-bold text-secondary-500 font-heading mt-1">6</div>
          </div>
          <div className="p-4 rounded-lg bg-[#F2F8FF] border border-[#D8ECFA]">
            <span className="text-xs text-text-muted">Phòng còn trống</span>
            <div className="text-2xl font-bold text-warning font-heading mt-1">2</div>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Link to={ROUTES.ROOMS}>
            <Button variant="primary" size="sm">
              Khám phá phòng trọ sinh viên
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

export default LandlordPropertiesPage;
