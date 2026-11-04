import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';

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
                <Link to={ROUTES.SECONDHAND} className="hover:text-brand-500 transition-colors">
                  Trao đổi đồ cũ (0đ)
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ROOMS} className="hover:text-brand-500 transition-colors">
                  Tìm bạn ở ghép
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              Hỗ trợ sinh viên
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <a href="#rules" className="hover:text-brand-500 transition-colors">
                  Quy chế hoạt động
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-brand-500 transition-colors">
                  Cẩm nang an toàn thuê trọ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-500 transition-colors">
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary mb-3">
              Đồ án môn học
            </h4>
            <p className="text-xs text-text-muted leading-relaxed mb-2">
              SE100 — Nhóm 15
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              Trường ĐH Công nghệ Thông tin (UIT) — ĐHQG-HCM
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 RentMate. Phát triển vì cộng đồng sinh viên UIT & ĐHQG-HCM.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">
              Bảo mật
            </a>
            <a href="#terms" className="hover:underline">
              Điều khoản
            </a>
            <a href="#contact" className="hover:underline">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
