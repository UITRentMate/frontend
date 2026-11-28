import React from 'react';

import shieldIcon from '@/assets/deposit-payment/7e0f0.svg';
import sslIcon from '@/assets/deposit-payment/6caa9.svg';
import sessionClockIcon from '@/assets/deposit-payment/5c426.svg';
import cardLockIcon from '@/assets/deposit-payment/412dd.svg';

import type { SecurityNoticeCardProps } from '../types';

export const SecurityNoticeCard: React.FC<SecurityNoticeCardProps> = ({
  sessionMinutes = 15,
}) => {
  return (
    <section
      aria-labelledby="security-notice-heading"
      className="w-full bg-surface-card border border-brand-200 rounded-lg p-5 flex flex-col gap-2.5 shadow-soft-xs"
    >
      <div className="flex items-center gap-2">
        <img src={shieldIcon} alt="" aria-hidden="true" className="shrink-0" />
        <h2
          id="security-notice-heading"
          className="text-sm font-heading font-bold text-brand-500"
        >
          Lưu ý thanh toán bảo mật
        </h2>
      </div>

      <ul className="flex flex-col gap-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <li className="flex items-start gap-2.5">
          <img src={sslIcon} alt="" aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>
            Hệ thống chuyển hướng trực tiếp đến cổng thanh toán bảo mật tiêu chuẩn mã hóa SSL
            256-bit.
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <img src={sessionClockIcon} alt="" aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>
            Vui lòng hoàn tất giao dịch trong vòng <strong>{sessionMinutes} phút</strong> tại giao
            diện cổng thanh toán để tránh hủy phiên giữ phòng.
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <img src={cardLockIcon} alt="" aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>
            RentMate <strong>tuyệt đối không lưu trữ</strong> thông tin thẻ, tài khoản ngân hàng,
            mật khẩu hay mã OTP của bạn.
          </span>
        </li>
      </ul>
    </section>
  );
};

export default SecurityNoticeCard;
