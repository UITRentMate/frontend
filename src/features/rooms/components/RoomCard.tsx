import React from 'react';
import { Link } from 'react-router-dom';
import type { RoomCardProps } from '../types';
import Badge from '../../../components/ui/Badge';

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const formatPrice = (price: number) => {
    if (price === 0) return 'Tặng miễn phí 0đ';
    return `${price.toLocaleString('vi-VN')} đ/tháng`;
  };

  return (
    <div className="bg-surface-card border border-border-subtle rounded-lg overflow-hidden shadow-soft-sm card-hover flex flex-col group">
      {/* Thumbnail with Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-muted">
        <img
          src={room.images[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges (Transaction Type) */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {room.tradeTag === 'trade' && <Badge variant="trade">Đổi đồ</Badge>}
          {room.tradeTag === 'pass' && <Badge variant="pass">Pass gấp</Badge>}
          {room.tradeTag === 'free' && <Badge variant="free">Tặng 0đ</Badge>}
        </div>

        {/* Condition Badge (Bottom) */}
        {room.conditionBadge && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <Badge variant="condition">{room.conditionBadge}</Badge>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Price & Area */}
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-base font-bold text-brand-500 font-heading">
              {formatPrice(room.price)}
            </span>
            <span className="text-xs text-text-muted font-medium">
              {room.area} m²
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/rooms/${room.id}`}
            className="text-sm font-semibold text-text-primary hover:text-brand-500 transition-colors line-clamp-2 leading-snug"
          >
            {room.title}
          </Link>
        </div>

        {/* Campus Location & Student Author */}
        <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[13px] text-text-muted">
          <div className="flex items-center gap-1.5 truncate">
            <div className="w-5 h-5 rounded-pill bg-brand-50 text-brand-600 font-bold text-[10px] flex items-center justify-center shrink-0">
              {room.author.name.charAt(0)}
            </div>
            <span className="truncate">{room.author.name}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-brand-600 font-medium text-xs">
            <span>📍</span>
            <span>{room.campusZone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
