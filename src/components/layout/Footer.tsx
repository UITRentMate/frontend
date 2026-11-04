import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-border-subtle mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-sm bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <span className="text-lg font-heading font-bold text-brand-500">RentMate</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Nền tảng tìm phòng trọ, KTX & trao đổi đồ cũ an toàn, tiết kiệm dành riêng cho cộng đồng sinh viên.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              Khám phá
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <Link to={ROUTES.ROOMS} className="hover:text-brand-500 transition-colors">
                  Phòng trọ gần trường
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ROOMS} className="hover:text-brand-500 transition-colors">
                  KTX & Căn hộ ghép
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SECONDHAND} className="hover:text-brand-500 transition-colors">
                  Tặng đồ 0đ & Giáo trình
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus areas */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              Khu vực Campus
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>KTX Khu A - ĐHQG TP.HCM</li>
              <li>KTX Khu B - ĐHQG TP.HCM</li>
              <li>Khu vực Bách Khoa / Sư Phạm Kỹ Thuật</li>
              <li>Khu đô thị Đại học Quốc gia</li>
            </ul>
          </div>

          {/* Safety & Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              An toàn & Trợ giúp
            </h4>
            <p className="text-xs text-text-muted leading-relaxed mb-2">
              Ưu tiên gặp gỡ trực tiếp tại sảnh KTX hoặc canteen trường để kiểm tra phòng và trao đổi đồ an toàn.
            </p>
            <span className="inline-block px-2.5 py-1 bg-secondary-50 text-secondary-600 rounded-pill text-[11px] font-medium border border-secondary-200">
              Verified Campus Trust
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2">
          <p>© {new Date().getFullYear()} RentMate - Đồ án môn học Nhóm 15.</p>
          <p className="flex items-center gap-1">
            Xây dựng với <span className="text-brand-500">React 19</span> & <span className="text-secondary-500">Tailwind v4</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
