import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Search } from 'lucide-react';
import { ROUTES } from '@/routes/paths';
import { btnOutline, btnPrimary } from '../constants';

export const FinalCta: React.FC = () => (
  <section className="bg-white px-4 py-20">
    <div className="mx-auto max-w-3xl rounded-lg border border-border-subtle bg-canvas px-6 py-14 text-center">
      <h2 className="font-heading text-3xl font-bold text-text-primary">Bắt đầu tìm nơi ở phù hợp với bạn</h2>
      <p className="mx-auto mt-3 max-w-md text-text-secondary">
        Khám phá phòng trọ và sử dụng các công cụ hỗ trợ thuê trọ cùng RentMate ngay hôm nay.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to={ROUTES.ROOMS} className={btnPrimary}>
          Tìm phòng trọ <Search className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link to={ROUTES.REGISTER} className={btnOutline}>
          Đăng ký tài khoản
        </Link>
      </div>
      <p className="mt-7 inline-flex items-center gap-2 text-sm text-text-muted">
        <BadgeCheck className="h-5 w-5 text-secondary-500" aria-hidden="true" />
        Bảo vệ quyền lợi đôi bên • Minh bạch tiền phòng & số điện nước
      </p>
    </div>
  </section>
);

export default FinalCta;
