import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/routes/paths';
import { featuredRooms } from '../services/mockData';
import { eyebrow, wrap } from '../constants';
import { LandingRoomCard } from './LandingRoomCard';

export const FeaturedRooms: React.FC = () => (
  <section className="border-y border-border-subtle bg-canvas py-16">
    <div className={wrap}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>Danh sách chọn lọc</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary">Khám phá phòng trọ phù hợp</h2>
          <p className="mt-2 text-text-secondary">
            Xem nhanh mức giá, khu vực và tiện ích xác thực trước khi tìm hiểu chi tiết.
          </p>
        </div>
        <Link to={ROUTES.ROOMS} className="inline-flex items-center gap-1.5 font-semibold text-brand-500 hover:text-brand-600">
          Xem tất cả phòng trọ <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredRooms.map((room) => (
          <LandingRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedRooms;
