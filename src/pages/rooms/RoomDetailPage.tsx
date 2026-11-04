import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRoom } from '../../features/rooms/hooks/useRooms';
import CampusSafetyAlert from '../../features/rooms/components/CampusSafetyAlert';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ROUTES } from '../../routes/paths';

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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link to={ROUTES.HOME} className="hover:text-brand-500">Trang chủ</Link>
        <span>/</span>
        <Link to={ROUTES.ROOMS} className="hover:text-brand-500">Phòng trọ</Link>
        <span>/</span>
        <span className="text-text-primary font-medium truncate max-w-xs">{room.title}</span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Images & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery image */}
          <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-border-subtle shadow-soft-sm bg-surface-muted">
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {room.tradeTag === 'trade' && <Badge variant="trade">Đổi đồ</Badge>}
              {room.tradeTag === 'pass' && <Badge variant="pass">Pass gấp</Badge>}
              {room.tradeTag === 'free' && <Badge variant="free">Tặng 0đ</Badge>}
              {room.conditionBadge && <Badge variant="condition">{room.conditionBadge}</Badge>}
            </div>
          </div>

          {/* Title & Info */}
          <div className="bg-white p-6 rounded-lg border border-border-subtle shadow-soft-xs space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-2xl font-bold font-heading text-brand-500">
                {room.price === 0 ? 'Tặng 0đ' : `${room.price.toLocaleString('vi-VN')} đ/tháng`}
              </span>
              <span className="text-sm font-semibold text-text-muted bg-surface-muted px-3 py-1 rounded-sm">
                Diện tích: {room.area} m²
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-heading font-bold text-text-primary">
              {room.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span>📍 Địa chỉ:</span>
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

          {/* Safety Reminder */}
          <CampusSafetyAlert />
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
                <p className="text-xs text-text-muted">{room.author.university}</p>
                {room.author.isVerifiedStudent && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-secondary-600 font-medium mt-0.5">
                    ✓ Đã xác minh sinh viên
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Button variant="primary" size="md" className="w-full">
                💬 Nhắn tin trao đổi ngay
              </Button>
              <Button variant="eco" size="md" className="w-full">
                🤝 Gửi đề xuất đổi đồ / cọc
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
