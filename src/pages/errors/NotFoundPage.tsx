import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../routes/paths';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-20 h-20 rounded-pill bg-brand-50 flex items-center justify-center text-3xl mb-2">
        🧭
      </div>
      <h1 className="text-4xl font-heading font-extrabold text-brand-500">404</h1>
      <h2 className="text-xl font-bold text-text-primary">Trang không tồn tại</h2>
      <p className="text-sm text-text-muted max-w-md">
        Đường dẫn bạn truy cập có thể đã bị thay đổi, chuyển dời hoặc không tồn tại trên hệ thống RentMate.
      </p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary" size="md">
          Trở về Trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
