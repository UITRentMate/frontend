import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Eye, MapPin } from 'lucide-react';

import { ROUTES } from '@/routes/paths';

import type { LandingRoomCardProps } from '../types';

export const LandingRoomCard: React.FC<LandingRoomCardProps> = ({ room }) => (
  <article className="flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-white shadow-soft-sm transition duration-250 hover:-translate-y-0.5 hover:shadow-soft-md">
    <div className="relative">
      <img src={room.image} alt={room.title} className="aspect-[16/10] w-full object-cover" />
      <span className="absolute left-3 top-3 rounded-xs bg-white px-2.5 py-1 text-xs font-semibold text-text-primary shadow-soft-xs">
        {room.tag}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="text-brand-500">
          <span className="text-xl font-bold">{room.price} ₫</span>
          <span className="text-sm text-text-muted">/tháng</span>
        </p>
        <span className="rounded-xs border border-border-subtle px-2 py-0.5 font-mono text-xs text-text-secondary">
          {room.area}
        </span>
      </div>
      <h3 className="mt-3 font-heading font-semibold text-text-primary">{room.title}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        {room.address}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {room.amenities.map((item) => (
          <li key={item} className="rounded-xs border border-border-subtle bg-canvas px-2.5 py-1 text-xs text-text-secondary">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-5">
        <Link
          to={generatePath(ROUTES.ROOM_DETAIL, { id: String(room.id) })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-subtle py-2.5 text-sm font-semibold text-brand-500 hover:bg-brand-50"
        >
          Xem phòng chi tiết <Eye className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </article>
);

export default LandingRoomCard;
