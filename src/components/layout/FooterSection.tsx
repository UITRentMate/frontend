import React from 'react';
import { Home, ShieldCheck, FileCheck } from 'lucide-react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-10">
        {/* Main Grid: 5 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-200">
          {/* Brand Info (Cols 1-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-xs">
                <Home className="w-3.5 h-3.5" />
              </div>
              <span className="text-lg font-bold text-blue-700 tracking-tight">
                RentMate
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Nền tảng công nghệ tìm phòng trọ, quản lý hợp đồng điện tử và kết nối bạn cùng phòng đáng tin cậy tại Việt Nam.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium px-2.5 py-1 rounded-sm">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Minh bạch pháp lý</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-medium px-2.5 py-1 rounded-sm">
                <FileCheck className="w-3 h-3 text-blue-600" />
                <span>Hợp đồng số hóa</span>
              </span>
            </div>
          </div>

          {/* Col 3: Khám phá */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Khám phá
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-slate-500">
              <li>
                <a href="#student-rooms" className="hover:text-blue-700 transition-colors">
                  Phòng trọ sinh viên
                </a>
              </li>
              <li>
                <a href="#mini-apartments" className="hover:text-blue-700 transition-colors">
                  Căn hộ dịch vụ mini
                </a>
              </li>
              <li>
                <a href="#roommates" className="hover:text-blue-700 transition-colors">
                  Tìm bạn ở ghép
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-700 transition-colors">
                  Bảng giá dịch vụ quản lý
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Chính sách & Quy định */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Chính sách & Quy định
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-slate-500">
              <li>
                <a href="#privacy" className="hover:text-blue-700 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-700 transition-colors">
                  Điều khoản thuê & đặt cọc
                </a>
              </li>
              <li>
                <a href="#verification-rules" className="hover:text-blue-700 transition-colors">
                  Quy chuẩn xác minh nhà trọ
                </a>
              </li>
              <li>
                <a href="#dispute" className="hover:text-blue-700 transition-colors">
                  Giải quyết tranh chấp hợp đồng
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Hỗ trợ khách hàng */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
              Hỗ trợ khách hàng
            </h3>
            <div className="flex flex-col gap-1.5 text-xs text-slate-500">
              <p>
                Hotline:{' '}
                <strong className="text-slate-900 font-bold">1900 6868</strong>
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:hotro@rentmate.vn"
                  className="text-blue-700 font-medium hover:underline"
                >
                  hotro@rentmate.vn
                </a>
              </p>
              <p className="leading-relaxed text-[11px] text-slate-400 mt-1">
                Giờ làm việc: 8:00 - 21:00 (Thứ 2 - CN)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2026 RentMate Vietnam. Toàn bộ bản quyền được bảo lưu.</p>
          <p className="text-slate-400 text-[11px]">
            Hệ thống số hóa phòng trọ và định danh người thuê toàn diện.
          </p>
        </div>
      </div>
    </footer>
  );
};
