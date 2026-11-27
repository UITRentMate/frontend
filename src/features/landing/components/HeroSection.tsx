import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/routes/paths';
import { heroImage } from '@/assets/landing';
import { heroStats } from '../services/mockData';
import { btnOutline, btnPrimary, wrap } from '../constants';

export const HeroSection: React.FC = () => (
  <section className={`${wrap} grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20`}>
    <div>
      <h1 className="font-heading text-4xl font-bold leading-tight text-text-primary md:text-[44px] md:leading-[1.2]">
        Tìm chỗ ở phù hợp. An tâm trong từng bước thuê trọ.
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-text-secondary">
        Khám phá phòng trọ, tìm người ở ghép phù hợp và quản lý thông tin thuê trọ trên cùng một nền tảng chuẩn mực và minh bạch.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to={ROUTES.ROOMS} className={btnPrimary}>
          Tìm phòng trọ <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a href="#cach-hoat-dong" className={btnOutline}>
          Khám phá cách hoạt động
        </a>
      </div>
      <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border-subtle pt-6">
        {heroStats.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs text-text-muted">{label}</dt>
            <dd className="mt-1 text-[15px] font-bold text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
    {/* Ảnh tạm cắt từ Figma (đã dính thanh giá) - thay bằng ảnh gốc khi có asset. */}
    <img
      src={heroImage}
      alt="Phòng studio thực tế tại TP. Hồ Chí Minh"
      className="w-full rounded-lg border border-border-subtle object-cover shadow-soft-sm"
    />
  </section>
);

export default HeroSection;
