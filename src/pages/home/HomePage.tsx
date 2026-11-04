import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRooms } from '../../features/rooms/hooks/useRooms';
import RoomCard from '../../features/rooms/components/RoomCard';
import RoomFilterBar from '../../features/rooms/components/RoomFilterBar';
import CampusSafetyAlert from '../../features/rooms/components/CampusSafetyAlert';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../routes/paths';
import type { RoomFilterParams } from '../../features/rooms/types/room.types';

export const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<RoomFilterParams>({});
  const { data: rooms, isLoading, isError } = useRooms(filters);

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <section className="rounded-xl p-8 sm:p-12 border border-border-subtle bg-gradient-to-b from-[#F2F8FF] to-[#EEF0FF] shadow-soft-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-600 rounded-pill text-xs font-semibold border border-brand-200">
            <span>🎓</span>
            <span>Cộng đồng sinh viên Đại học Quốc gia & TP.HCM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-text-primary tracking-tight leading-tight">
            Dọn KTX, thuê phòng & <span className="text-brand-500">trao đổi đồ cũ</span>
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Tìm phòng trọ sinh viên gần khuôn viên trường, bạn ở ghép KTX và pass giáo trình, đồ gia dụng uy tín không lo lừa đảo.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to={ROUTES.ROOMS}>
              <Button variant="primary" size="lg">
                Tìm phòng ngay
              </Button>
            </Link>
            <Link to={ROUTES.SECONDHAND}>
              <Button variant="eco" size="lg">
                Góc đồ 0đ & Đổi đồ
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden lg:block absolute -right-6 -bottom-8 w-80 h-80 bg-brand-200/40 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Campus Safety Reminder */}
      <CampusSafetyAlert />

      {/* Filter Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Phòng trọ & KTX nổi bật
          </h2>
          <Link
            to={ROUTES.ROOMS}
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            Xem tất cả phòng →
          </Link>
        </div>

        <RoomFilterBar filters={filters} onFilterChange={setFilters} />

        {/* Content State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-border-subtle animate-pulse space-y-3">
                <div className="aspect-4/3 bg-surface-muted rounded-md" />
                <div className="h-4 bg-surface-muted rounded w-3/4" />
                <div className="h-3 bg-surface-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-8 text-center bg-white rounded-lg border border-danger-border text-danger">
            Có lỗi xảy ra khi tải danh sách phòng. Vui lòng thử lại sau.
          </div>
        )}

        {!isLoading && !isError && rooms && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}

        {!isLoading && !isError && (!rooms || rooms.length === 0) && (
          <div className="p-12 text-center bg-white rounded-lg border border-border-subtle text-text-muted space-y-2">
            <span className="text-3xl block">🔍</span>
            <p className="text-sm font-medium">Không tìm thấy phòng trọ nào phù hợp với bộ lọc.</p>
            <Button variant="ghost" size="sm" onClick={() => setFilters({})}>
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
