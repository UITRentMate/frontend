import React, { useState } from 'react';
import { useRooms } from '../../features/rooms/hooks/useRooms';
import RoomCard from '../../features/rooms/components/RoomCard';
import RoomFilterBar from '../../features/rooms/components/RoomFilterBar';
import Button from '../../components/ui/Button';
import type { RoomFilterParams } from '../../features/rooms/types/room.types';

export const RoomsPage: React.FC = () => {
  const [filters, setFilters] = useState<RoomFilterParams>({});
  const { data: rooms, isLoading, isError } = useRooms(filters);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
            Khám phá Phòng trọ & KTX Sinh viên
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Tổng hợp danh sách phòng trọ giá rẻ, uy tín xung quanh các làng đại học
          </p>
        </div>
        <Button variant="primary" size="md">
          + Đăng bài tìm phòng / cho thuê
        </Button>
      </div>

      {/* Filter Component */}
      <RoomFilterBar filters={filters} onFilterChange={setFilters} />

      {/* Grid */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-lg p-4 border border-border-subtle animate-pulse space-y-3">
              <div className="aspect-4/3 bg-surface-muted rounded-md" />
              <div className="h-4 bg-surface-muted rounded w-2/3" />
              <div className="h-3 bg-surface-muted rounded w-1/3" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="p-8 text-center bg-white rounded-lg border border-danger-border text-danger">
          Không thể tải dữ liệu phòng trọ. Vui lòng kiểm tra lại kết nối mạng.
        </div>
      )}

      {!isLoading && !isError && rooms && rooms.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      {!isLoading && !isError && (!rooms || rooms.length === 0) && (
        <div className="p-16 text-center bg-white rounded-lg border border-border-subtle text-text-muted space-y-3">
          <span className="text-4xl block">📦</span>
          <h3 className="text-base font-semibold text-text-primary">Không có kết quả</h3>
          <p className="text-xs">Hãy thử đổi khu vực campus hoặc từ khóa tìm kiếm khác.</p>
          <Button variant="outline" size="sm" onClick={() => setFilters({})}>
            Đặt lại bộ lọc
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
