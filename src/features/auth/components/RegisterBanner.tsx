import React from 'react';
import type { RegisterBannerProps } from '../types';

export const RegisterBanner: React.FC<RegisterBannerProps> = ({
  headline = 'Bắt đầu với RentMate',
  subtext = 'Khám phá phòng trọ, kết nối người ở ghép và theo dõi thông tin thuê trọ trên cùng một nền tảng.',
  imageUrl = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
  className = '',
}) => {
  return (
    <aside
      aria-label="Hình ảnh giới thiệu RentMate"
      className={`relative h-full w-full overflow-hidden select-none ${className}`}
    >
      {/* Ảnh chụp căn hộ phong cách Bắc Âu ấm cúng, ngập tràn ánh nắng */}
      <img
        src={imageUrl}
        alt="Không gian phòng trọ và căn hộ dịch vụ RentMate"
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />

      {/* Lớp phủ chuyển màu gradient từ đáy */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#091540]/90 via-[#091540]/35 to-transparent" />

      {/* Nội dung truyền thông ở góc dưới bên trái */}
      <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16 text-white z-10 space-y-3">
        <h2 className="text-3xl xl:text-4xl font-bold font-heading leading-tight tracking-tight text-white drop-shadow-sm">
          {headline}
        </h2>
        <p className="text-sm xl:text-base text-slate-200 leading-relaxed max-w-lg font-sans drop-shadow-sm">
          {subtext}
        </p>
      </div>
    </aside>
  );
};

export default RegisterBanner;
