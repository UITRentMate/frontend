import React from 'react';
import { Home, User, ChevronDown } from 'lucide-react';

export const HeaderNavigation: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 h-16 flex items-center justify-between">
        {/* Left: Brand + Nav links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-700/20 group-hover:scale-105 transition-transform">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-blue-700 tracking-tight">
              RentMate
            </span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 h-16">
            <a
              href="#home"
              className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Trang chủ
            </a>
            <a
              href="#rent"
              className="h-full flex items-center text-sm font-semibold text-blue-700 border-b-2 border-blue-700 pt-0.5"
            >
              Thuê phòng
            </a>
            <a
              href="#roommates"
              className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Ghép người ở ghép
            </a>
            <a
              href="#landlords"
              className="h-full flex items-center text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              Dành cho chủ trọ
            </a>
          </nav>
        </div>

        {/* Right: Actions & User Avatar */}
        <div className="flex items-center gap-3">
          <a
            href="#post-room"
            className="px-4 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Đăng tin phòng
          </a>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* User profile dropdown trigger */}
          <button
            type="button"
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
              <User className="w-3.5 h-3.5" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
