import React from 'react';
import type { AuthBannerProps } from '../types';

export const AuthBanner: React.FC<AuthBannerProps> = ({
  headline = 'Tìm phòng phù hợp. Quản lý thuê trọ dễ dàng.',
  subtext = 'RentMate kết nối người thuê và chủ trọ, đồng thời giúp thông tin thuê trọ rõ ràng và dễ theo dõi.',
  imageUrl = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85',
  className = '',
}) => {
  return (
    <div className={`relative hidden lg:block w-full h-full overflow-hidden bg-slate-900 ${className}`}>
      {/* Ảnh chụp chất lượng cao góc căn hộ / phòng trọ hiện đại */}
      <img
        src={imageUrl}
        alt="RentMate Modern Living Room"
        className="w-full h-full object-cover object-center"
      />

      {/* Lớp phủ Gradient tối ở đáy ảnh */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#091540]/95 via-[#091540]/40 to-transparent" />

      {/* Thẻ thông điệp đặt ở góc dưới cùng bên trái */}
      <div className="absolute bottom-0 left-0 right-0 p-10 xl:p-14 text-white max-w-xl space-y-3 select-none">
        <h2 className="text-2xl lg:text-3xl font-bold leading-snug font-heading text-white">
          {headline}
        </h2>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default AuthBanner;
