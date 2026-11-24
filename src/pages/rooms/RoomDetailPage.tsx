import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MapPinIcon, MessageSquareIcon, FileTextIcon, CalendarIcon } from '@/components/ui/icons';

import { useRoom } from '@/features/rooms/hooks/useRooms';
import { ROUTES } from '@/routes/paths';

export const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: room, isLoading, isError } = useRoom(id || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse space-y-6">
        <div className="h-64 bg-surface-muted rounded-xl" />
        <div className="h-8 bg-surface-muted rounded w-2/3" />
        <div className="h-4 bg-surface-muted rounded w-1/3" />
      </div>
    );
  }

  if (isError || !room) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="text-4xl">🏚️</div>
        <h2 className="text-xl font-heading font-bold text-text-primary">
          Không tìm thấy phòng trọ
        </h2>
        <p className="text-xs text-text-muted">
          Bài đăng có thể đã hết hạn hoặc được gỡ bỏ bởi người đăng.
        </p>
        <Link to={ROUTES.ROOMS}>
          <Button variant="primary" size="sm">
            Quay lại danh sách phòng
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb / Back button */}
      <div>
        <Link
          to={ROUTES.ROOMS}
          className="text-xs font-semibold text-brand-500 hover:text-brand-600 inline-flex items-center gap-1"
        >
          ← Quay lại danh sách phòng
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Room info & details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-80 sm:h-96 rounded-xl overflow-hidden bg-surface-muted border border-border-subtle">
            <img
              src={room.images[0] || 'https://placehold.co/800x600?text=RentMate'}
              alt={room.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="success">Phòng còn trống</Badge>
              <span className="text-xs text-text-muted">
                Diện tích: {room.area} m²
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-heading font-bold text-text-primary">
              {room.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="w-3.5 h-3.5 text-text-muted" />
                <span>Địa chỉ:</span>
              </span>
              <span className="text-text-primary font-medium">{room.specificAddress}</span>
              <span className="text-brand-600 font-semibold">({room.campusZone})</span>
            </div>

            <div className="pt-4 border-t border-border-subtle">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Mô tả chi tiết</h3>
              <p className="text-xs sm:text-sm text-text-primary leading-relaxed whitespace-pre-line">
                {room.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border-subtle">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Tiện nghi</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-2.5 py-1 bg-surface-muted text-text-primary rounded-xs text-xs font-medium"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Author card & actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-border-subtle shadow-soft-sm space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">Người đăng tin</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-pill bg-brand-500 text-white font-bold text-lg flex items-center justify-center">
                {room.author.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">{room.author.name}</h4>
                <p className="text-xs text-text-muted">Chủ phòng trọ</p>
                <span className="inline-flex items-center gap-1 text-[11px] text-secondary-600 font-medium mt-0.5">
                  ✓ Tài khoản đã xác minh
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link to={ROUTES.ROOM_RENTAL_REQUEST.replace(':id', room.id)} className="block w-full">
                <Button variant="primary" size="md" className="w-full inline-flex items-center justify-center gap-2">
                  <FileTextIcon className="w-4 h-4" />
                  <span>Gửi yêu cầu thuê phòng</span>
                </Button>
              </Link>
              <Link to={ROUTES.ROOM_SCHEDULE_TOUR.replace(':id', room.id)} className="block w-full">
                <Button variant="secondary" size="md" className="w-full inline-flex items-center justify-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Đặt lịch xem phòng</span>
                </Button>
              </Link>
              <Button variant="outline" size="md" className="w-full inline-flex items-center justify-center gap-2">
                <MessageSquareIcon className="w-4 h-4" />
                <span>Liên hệ chủ trọ</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
