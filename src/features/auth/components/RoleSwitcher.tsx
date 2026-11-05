import React from 'react';
import { UserIcon, HomeIcon } from '@/components/ui/icons';
import type { RoleSwitcherProps } from '../types';

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  selectedRole,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      aria-label="Chọn vai trò tài khoản"
      className={`grid grid-cols-2 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl my-6 select-none ${className}`}
    >
      {/* Tab Người thuê */}
      <button
        type="button"
        role="tab"
        aria-selected={selectedRole === 'tenant'}
        onClick={() => onChange('tenant')}
        className={`py-2 px-3 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
          selectedRole === 'tenant'
            ? 'bg-[#1B2CC1] text-white shadow-sm font-semibold hover:bg-[#16239A]'
            : 'text-[#6E7DB4] hover:text-[#1B2CC1] hover:bg-[#1B2CC1]/10'
        }`}
      >
        <UserIcon
          className={`w-4 h-4 transition-colors ${
            selectedRole === 'tenant' ? 'text-white' : 'text-current'
          }`}
        />
        <span>Người thuê</span>
      </button>

      {/* Tab Chủ trọ */}
      <button
        type="button"
        role="tab"
        aria-selected={selectedRole === 'landlord'}
        onClick={() => onChange('landlord')}
        className={`py-2 px-3 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
          selectedRole === 'landlord'
            ? 'bg-[#1B2CC1] text-white shadow-sm font-semibold hover:bg-[#16239A]'
            : 'text-[#6E7DB4] hover:text-[#1B2CC1] hover:bg-[#1B2CC1]/10'
        }`}
      >
        <HomeIcon
          className={`w-4 h-4 transition-colors ${
            selectedRole === 'landlord' ? 'text-white' : 'text-current'
          }`}
        />
        <span>Chủ trọ</span>
      </button>
    </div>
  );
};

export default RoleSwitcher;
