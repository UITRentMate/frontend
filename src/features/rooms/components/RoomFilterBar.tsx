import React from 'react';
import type { RoomFilterBarProps } from '../types';

const CAMPUS_ZONES = ['Tất cả', 'KTX Khu A', 'KTX Khu B', 'Linh Trung', 'Khu Công Nghệ Cao'];

export const RoomFilterBar: React.FC<RoomFilterBarProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleZoneClick = (zone: string) => {
    onFilterChange({
      ...filters,
      campusZone: zone === 'Tất cả' ? undefined : zone,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value || undefined,
    });
  };

  const handleEcoToggle = () => {
    onFilterChange({
      ...filters,
      isEcoTrade: !filters.isEcoTrade ? true : undefined,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-border-subtle shadow-soft-xs space-y-3">
      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
          🔍
        </span>
        <input
          type="text"
          placeholder="Tìm phòng theo tên đường, KTX, trường đại học..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 text-sm bg-white rounded-sm text-text-primary placeholder:text-text-disabled border border-border-subtle focus:border-brand-500 focus:ring-3 focus:ring-brand-500/20 outline-none transition-all"
        />
      </div>

      {/* Campus Quick Chips & Eco Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-text-muted font-medium mr-1">Campus:</span>
          {CAMPUS_ZONES.map((zone) => {
            const isSelected = (!filters.campusZone && zone === 'Tất cả') || filters.campusZone === zone;
            return (
              <button
                key={zone}
                type="button"
                onClick={() => handleZoneClick(zone)}
                className={`px-3 py-1 rounded-pill text-xs font-medium transition-all select-none ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-soft-xs'
                    : 'bg-surface-muted text-text-primary hover:bg-brand-50 hover:text-brand-600'
                }`}
              >
                {zone}
              </button>
            );
          })}
        </div>

        {/* Eco / Barter Filter */}
        <button
          type="button"
          onClick={handleEcoToggle}
          className={`px-3 py-1 rounded-pill text-xs font-semibold flex items-center gap-1 transition-all select-none ${
            filters.isEcoTrade
              ? 'bg-secondary-500 text-white shadow-soft-xs'
              : 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100 border border-secondary-200'
          }`}
        >
          <span>🌱</span>
          <span>Chỉ xem Đổi đồ / Tặng 0đ</span>
        </button>
      </div>
    </div>
  );
};

export default RoomFilterBar;
