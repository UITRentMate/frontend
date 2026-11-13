import React from 'react';
import { useOwnerDashboard } from '@/features/ownerDashboard';
import { useAuth } from '@/hooks/useAuth';

export const LandlordPropertiesPage: React.FC = () => {
  const { user } = useAuth();
  const { data } = useOwnerDashboard();
  const roomCounts = data?.stats.roomCounts;

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-5 sm:p-8 shadow-soft-sm space-y-4">
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
        Danh Sách Bất Động Sản & Phòng Cho Thuê
      </h1>
      <p className="text-sm text-text-secondary">
        Xin chào <span className="font-semibold text-text-primary">{user?.name || 'Chủ trọ'}</span> ({user?.email}). Dưới đây là danh sách các phòng trọ bạn đang quản lý trên RentMate.
      </p>

      {roomCounts && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-lg bg-canvas border border-border-subtle">
            <span className="text-xs text-text-secondary">Tổng số phòng trọ</span>
            <div className="text-2xl font-bold text-brand-500 font-heading mt-1">
              {Object.values(roomCounts).reduce((total, count) => total + count, 0)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-canvas border border-border-subtle">
            <span className="text-xs text-text-secondary">Đang cho thuê</span>
            <div className="text-2xl font-bold text-secondary-700 font-heading mt-1">{roomCounts.occupied}</div>
          </div>
          <div className="p-4 rounded-lg bg-canvas border border-border-subtle">
            <span className="text-xs text-text-secondary">Phòng còn trống</span>
            <div className="text-2xl font-bold text-amber-800 font-heading mt-1">{roomCounts.vacant}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordPropertiesPage;
