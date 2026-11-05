import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Building2Icon, ExternalLinkIcon } from '@/components/ui/icons';
import type { RegisterSubHeaderProps } from '../types';

export const RegisterSubHeader: React.FC<RegisterSubHeaderProps> = ({ className = '' }) => {
  return (
    <header className={`flex items-center justify-between select-none ${className}`}>
      {/* Cụm bên trái: Logo RentMate */}
      <Link to={ROUTES.HOME} className="flex items-center gap-2 group transition">
        <div className="text-[#1B2CC1] group-hover:scale-105 transition-transform">
          <Building2Icon className="w-6 h-6 text-[#1B2CC1]" />
        </div>
        <span className="font-heading font-bold text-lg text-[#091540] tracking-tight">
          Rent<span className="text-[#1B2CC1]">Mate</span>
        </span>
      </Link>

      {/* Cụm bên phải: Link Hỗ trợ kèm icon mở rộng */}
      <Link
        to={ROUTES.HOME}
        className="text-sm font-medium text-[#6E7DB4] hover:text-[#091540] transition flex items-center gap-1.5"
      >
        <span>Hỗ trợ</span>
        <ExternalLinkIcon className="w-3.5 h-3.5 text-[#6E7DB4]" />
      </Link>
    </header>
  );
};

export default RegisterSubHeader;
