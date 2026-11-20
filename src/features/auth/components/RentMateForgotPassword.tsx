// 1. Thư viện bên ngoài (React, Router)
import React, { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

// 2. Cấu hình, hằng số toàn cục (@/)
import { ROUTES } from '@/routes/paths';

// 3. Components & Icons dùng chung (@/components)
import {
  Building2Icon,
  MailIcon,
  SendIcon,
  InfoIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  AlertCircleIcon,
  SpinnerIcon,
  UserIcon,
} from '@/components/ui/icons';

// 4. Hooks nội bộ feature
import { useForgotPassword } from '../hooks/useForgotPassword';

// 5. Types nội bộ feature (Centralized Types)
import type { RentMateForgotPasswordProps } from '../types';

export const RentMateForgotPassword: React.FC<RentMateForgotPasswordProps> = ({
  onSuccess,
  className = '',
}) => {
  const [email, setEmail] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const forgotPasswordMutation = useForgotPassword();
  const isLoading = forgotPasswordMutation.isPending;

  // Xử lý gửi biểu mẫu yêu cầu đặt lại mật khẩu
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();

    // Validation phía Client
    if (!trimmedEmail) {
      setErrorMessage('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Địa chỉ email không đúng định dạng.');
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync({ email: trimmedEmail });
      setSubmittedEmail(trimmedEmail);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.';
      setErrorMessage(message);
    }
  };

  // Cho phép người dùng nhập lại hoặc gửi lại email
  const handleResetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#F2F8FF] font-sans ${className}`}>
      {/* ========================================================================= */}
      {/* A. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <header className="h-16 px-8 md:px-12 flex items-center justify-between border-b border-[#F1F5F9] bg-white select-none">
        {/* Bên trái: Logo RentMate & Khẩu hiệu */}
        <div className="flex items-center">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group transition">
            <div className="text-[#1B2CC1] group-hover:scale-105 transition-transform">
              <Building2Icon className="w-6 h-6 text-[#1B2CC1]" />
            </div>
            <span className="font-heading font-bold text-lg text-[#091540] tracking-tight">
              Rent<span className="text-[#1B2CC1]">Mate</span>
            </span>
          </Link>

          {/* Vạch ngăn cách dọc */}
          <div className="h-4 w-[1px] bg-slate-300 mx-3" />

          {/* Slogan nhận diện */}
          <span className="text-xs md:text-sm text-[#6E7DB4] font-normal truncate">
            Cổng xác thực cư dân &amp; chủ trọ
          </span>
        </div>

        {/* Bên phải: Hỗ trợ & Điều khoản và Nút đại diện người dùng */}
        <div className="flex items-center gap-5">
          <Link
            to={ROUTES.HOME}
            className="text-sm text-[#6E7DB4] hover:text-[#091540] transition hidden sm:inline-block"
          >
            Hỗ trợ &amp; Điều khoản
          </Link>
          <div
            title="Tài khoản RentMate"
            className="w-9 h-9 rounded-full bg-[#091540] text-white flex items-center justify-center shadow-sm select-none"
          >
            <UserIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* B. KHỐI THẺ TRUNG TÂM (FLOATING CARD)                                     */}
      {/* ========================================================================= */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-[95%] md:w-[90%] max-w-[1440px] min-h-[620px] lg:min-h-[680px] mx-auto bg-white rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(9,21,64,0.08)] border border-slate-100/80 grid grid-cols-1 md:grid-cols-2">
          
          {/* CỘT TRÁI: FORM QUÊN MẬT KHẨU HOẶC THÔNG BÁO THÀNH CÔNG */}
          <div className="px-10 sm:px-16 lg:px-20 py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
            {isSubmitted ? (
              /* TRẠNG THÁI GỬI THÀNH CÔNG (SUCCESS STATE) */
              <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center animate-in fade-in duration-300">
                {/* Icon CheckCircle màu Eco Mint */}
                <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center mb-5">
                  <CheckCircleIcon className="w-9 h-9 text-[#10B981]" />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#091540] font-heading mb-3">
                  Kiểm tra hòm thư của bạn
                </h2>

                <p className="text-sm lg:text-base text-[#6E7DB4] leading-relaxed mb-7 max-w-md">
                  Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến{' '}
                  <strong className="text-[#091540] font-semibold break-all">
                    {submittedEmail}
                  </strong>
                  . Vui lòng kiểm tra hộp thư đến hoặc hòm thư rác (Spam).
                </p>

                {/* Hộp gợi ý phụ */}
                <div className="w-full p-4 mb-7 rounded-xl bg-[#F2F8FF] border border-[#D8ECFA] text-xs sm:text-sm text-[#6E7DB4] text-left flex items-start gap-2.5">
                  <InfoIcon className="w-4 h-4 text-[#1B2CC1] shrink-0 mt-0.5" />
                  <span>
                    Không nhận được email? Hãy kiểm tra kỹ hộp thư rác hoặc bấm nút gửi lại phía dưới.
                  </span>
                </div>

                {/* Nút hành động */}
                <div className="w-full space-y-3.5">
                  {import.meta.env.DEV && (
                    <Link
                      to={`${ROUTES.RESET_PASSWORD}?token=demo-reset-token`}
                      className="w-full h-12 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] hover:bg-[#D1FAE5] text-sm lg:text-base font-medium flex items-center justify-center gap-2 transition"
                    >
                      Mở liên kết đặt lại mật khẩu (Dev Demo)
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full h-12 rounded-lg border border-[#1B2CC1] text-[#1B2CC1] hover:bg-[#EEF0FF] text-sm lg:text-base font-medium transition cursor-pointer"
                  >
                    Gửi lại email khác
                  </button>

                  <Link
                    to={ROUTES.LOGIN}
                    className="w-full h-12 rounded-lg bg-[#1B2CC1] hover:bg-[#16239A] text-white text-sm lg:text-base font-medium flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Quay lại đăng nhập
                  </Link>
                </div>
              </div>
            ) : (
              /* BIỂU MẪU NHẬP EMAIL QUÊN MẬT KHẨU */
              <div className="w-full max-w-xl mx-auto">
                {/* 1. Brand Eyebrow */}
                <div className="inline-flex items-center gap-2 select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1B2CC1]" />
                  <span className="text-sm lg:text-base font-bold tracking-tight text-[#091540]">
                    RentMate
                  </span>
                </div>

                {/* 2. Tiêu đề & Mô tả */}
                <h1 className="text-3xl lg:text-4xl font-bold text-[#091540] font-heading mt-6 mb-3">
                  Quên mật khẩu?
                </h1>
                <p className="text-sm lg:text-base text-[#6E7DB4] leading-relaxed mb-9">
                  Nhập email đã đăng ký RentMate. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn.
                </p>

                {/* Alert lỗi nếu có */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 mb-6 animate-in fade-in duration-200"
                  >
                    <AlertCircleIcon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 3. Form Controls */}
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <label
                      htmlFor="forgot-password-email"
                      className="text-sm lg:text-base font-medium text-[#091540] block mb-2"
                    >
                      Email tài khoản <span className="text-red-500">*</span>
                    </label>

                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center pointer-events-none text-[#6E7DB4]">
                        <MailIcon className="w-4 h-4 text-[#6E7DB4]" />
                      </div>
                      <input
                        id="forgot-password-email"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="tenban@example.com"
                        className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#D8ECFA] text-sm lg:text-base text-[#091540] placeholder:text-[#9FA8CD] focus:border-[#1B2CC1] focus:ring-2 focus:ring-[#1B2CC1]/20 outline-none transition disabled:bg-slate-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Ghi chú phụ dưới ô nhập */}
                    <div className="text-xs sm:text-sm text-[#6E7DB4] flex items-center gap-1.5 mt-2.5">
                      <InfoIcon className="w-3.5 h-3.5 text-[#6E7DB4] shrink-0" />
                      <span>Liên kết đặt lại mật khẩu sẽ có thời hạn sử dụng.</span>
                    </div>
                  </div>

                  {/* 4. Nút bấm chính (Submit CTA) */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-lg bg-[#1B2CC1] hover:bg-[#16239A] active:bg-[#101A74] text-white text-sm lg:text-base font-medium flex items-center justify-center gap-2 transition cursor-pointer shadow-sm hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none select-none"
                  >
                    {isLoading ? (
                      <>
                        <SpinnerIcon className="w-4 h-4 animate-spin text-white" />
                        <span>Đang gửi hướng dẫn...</span>
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4 text-white" />
                        <span>Gửi hướng dẫn đặt lại mật khẩu</span>
                      </>
                    )}
                  </button>

                  {/* 5. Nút quay lại (Back link) */}
                  <Link
                    to={ROUTES.LOGIN}
                    className="flex items-center justify-center gap-1.5 text-sm lg:text-base font-medium text-[#091540] hover:text-[#1B2CC1] transition select-none group"
                  >
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Quay lại đăng nhập</span>
                  </Link>
                </form>

                {/* 6. Đường vạch đáy */}
                <div className="border-b border-slate-100 mt-10" />
              </div>
            )}
          </div>

          {/* CỘT PHẢI: VISUAL BANNER */}
          <div className="relative hidden md:block w-full h-full min-h-[620px] lg:min-h-[680px] bg-slate-900 select-none overflow-hidden">
            {/* Ảnh nền studio/phòng trọ ấm cúng */}
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
              alt="RentMate Living Space"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Overlay Gradient từ đậm lên trong suốt */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#091540]/90 via-[#091540]/30 to-transparent" />

            {/* Khối nội dung dưới đáy ảnh */}
            <div className="absolute bottom-12 left-12 right-12 text-white space-y-3">
              {/* Thanh nhấn màu */}
              <div className="w-10 h-1 bg-[#1B2CC1] rounded-full mb-3" />
              <h2 className="text-2xl lg:text-3xl font-bold font-heading text-white">
                Lấy lại quyền truy cập tài khoản
              </h2>
              <p className="text-sm lg:text-base text-slate-200 font-sans leading-relaxed">
                Thực hiện vài bước đơn giản để tiếp tục sử dụng RentMate.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* C. BOTTOM FOOTER                                                          */}
      {/* ========================================================================= */}
      <footer className="py-6 px-8 md:px-12 text-xs text-[#6E7DB4] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <div>
          <span>
            © 2025 RentMate. Nền tảng thuê trọ &amp; quản lý phòng trọ sinh viên, người đi làm tại Việt Nam.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="#" onClick={(e) => e.preventDefault()} className="hover:text-[#091540] transition">
            Quy chế hoạt động
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="#" onClick={(e) => e.preventDefault()} className="hover:text-[#091540] transition">
            Chính sách bảo mật
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="#" onClick={(e) => e.preventDefault()} className="hover:text-[#091540] transition">
            Liên hệ hỗ trợ
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default RentMateForgotPassword;
