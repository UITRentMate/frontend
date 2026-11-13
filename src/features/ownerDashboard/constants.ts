import type { RoomStatus } from './types';

export const dashboardSections = {
  appointments: 'lich-don-khach',
  reconciliation: 'doi-soat-ngan-hang',
  roomMap: 'so-do-phong',
} as const;

export const roomStatuses: Record<RoomStatus, { label: string; className: string }> = {
  vacant: { label: 'Trống', className: 'border-success-border bg-success-soft text-secondary-700' },
  reserved: { label: 'Giữ chỗ', className: 'border-warning-border bg-warning-soft text-amber-800' },
  occupied: { label: 'Đang thuê', className: 'border-brand-100 bg-brand-50 text-brand-700' },
  maintenance: { label: 'Bảo trì', className: 'border-danger-border bg-danger-soft text-red-700' },
};
