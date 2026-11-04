import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/paths';
import { Building2Icon } from '../../../components/ui/icons';
import type { AuthHeaderProps } from '../types';

export const AuthHeader: React.FC<AuthHeaderProps> = ({ className = '' }) => {
  return (
    <header className={`h-16 px-8 md:px-12 flex items-center justify-between border-b border-[#F1F5F9] bg-white select-none ${className}`}>
      {/* Cụm bên trái: Logo & Slogan */}
      <div className="flex items-center">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group transition">
          <div className="text-[#1B2CC1] group-hover:scale-105 transition-transform">
            <Building2Icon className="w-6 h-6 text-[#1B2CC1]" />
          </div>
          <span className="font-heading font-bold text-lg text-[#091540] tracking-tight">
            Rent<span className="text-[#1B2CC1]">Mate</span>
          </span>
        </Link>

        {/* Đường vạch ngăn cách dọc */}
        <div className="h-4 w-[1px] bg-slate-300 mx-3" />

        {/* Slogan */}
        <span className="text-xs md:text-sm text-[#6E7DB4] font-normal truncate">
          Cổng xác thực cư dân & chủ trọ
        </span>
      </div>

      {/* Cụm bên phải: Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to={ROUTES.HOME}
          className="text-sm font-medium text-[#6E7DB4] hover:text-[#091540] transition hidden sm:inline-block"
        >
          Hỗ trợ & Điều khoản
        </Link>
        <Link
          to={ROUTES.REGISTER}
          className="text-sm font-semibold text-[#1B2CC1] hover:underline transition"
        >
          Tạo tài khoản mới
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
