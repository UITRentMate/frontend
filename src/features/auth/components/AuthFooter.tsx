import React from 'react';
import { Link } from 'react-router-dom';
import type { AuthFooterProps } from '../types';

export const AuthFooter: React.FC<AuthFooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={`h-14 px-6 lg:px-16 flex items-center justify-between border-t border-[#F1F5F9] text-xs text-[#6E7DB4] bg-white select-none ${className}`}
    >
      {/* Cụm bên trái: Bản quyền */}
      <div>
        <span>© 2026 RentMate Inc.</span>
      </div>

      {/* Cụm bên phải: Quy chế • Bảo mật • Liên hệ căn phải bên phần Đăng nhập */}
      <div className="flex items-center gap-3">
        <Link to="#" className="hover:text-[#091540] transition">
          Quy chế
        </Link>
        <span className="text-slate-300">•</span>
        <Link to="#" className="hover:text-[#091540] transition">
          Bảo mật
        </Link>
        <span className="text-slate-300">•</span>
        <Link to="#" className="hover:text-[#091540] transition">
          Liên hệ
        </Link>
      </div>
    </footer>
  );
};

export default AuthFooter;
