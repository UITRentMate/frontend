import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { EyeIcon, EyeOffIcon, AlertCircleIcon, SpinnerIcon } from '@/components/ui/icons';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '@/hooks/useAuth';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import AuthBanner from './AuthBanner';
import type { RentMateLoginProps } from '../types';

export const RentMateLogin: React.FC<RentMateLoginProps> = ({ onSuccess, className = '' }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const loginMutation = useLogin();

  // State management bám sát yêu cầu kỹ thuật: không hardcode credentials
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Loading state kết hợp từ mutation
  const isLoading = loginMutation.isPending;

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation cơ bản phía client
    if (!email.trim()) {
      setErrorMessage('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu tài khoản.');
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        email: email.trim(),
        password,
        rememberMe,
      });

      // Cập nhật AuthContext toàn cục
      setUser(response.user);

      // Phân quyền điều hướng theo Use Case UC-02
      let targetRoute: string = ROUTES.ROOMS;
      if (response.user.role === 'admin') {
        targetRoute = '/admin/dashboard';
      } else if (response.user.role === 'landlord') {
        targetRoute = '/landlord/properties';
      } else {
        targetRoute = ROUTES.ROOMS;
      }

      if (onSuccess) {
        onSuccess(targetRoute);
      } else {
        navigate(targetRoute);
      }
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error
          ? err.message
          : 'Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!';
      setErrorMessage(errMessage);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-white text-[#091540] ${className}`}>
      {/* A. Top Header */}
      <AuthHeader />

      {/* B. Main Content: 2 Cột */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* 1. Cột trái: Form Đăng nhập & Footer chân trang bên trái */}
        <div className="flex flex-col justify-between h-full min-h-[calc(100vh-4rem)] lg:min-h-0">
          <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16">
            <div className="max-w-md w-full space-y-6">
              {/* Khối tiêu đề */}
              <div>
                <h1 className="text-3xl font-bold text-[#091540] tracking-tight font-heading">
                  Đăng nhập
                </h1>
                <p className="text-sm text-[#6E7DB4] mt-1 font-sans">
                  Chào mừng bạn quay lại RentMate.
                </p>
              </div>

              {/* Thông báo lỗi bảo mật dạng Alert mỏng viền đỏ nếu có */}
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50/80 border border-red-200 text-xs text-red-700 animate-in fade-in duration-200"
                >
                  <div className="text-red-500 shrink-0 mt-0.5">
                    <AlertCircleIcon className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1 leading-relaxed">
                    <span className="font-semibold block">Đăng nhập không thành công:</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Trường Email */}
                <div>
                  <label htmlFor="login-email" className="text-sm font-medium text-[#091540] mb-1.5 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#D8ECFA] text-sm text-[#091540] placeholder:text-[#6E7DB4]/60 focus:outline-none focus:border-[#1B2CC1] focus:ring-2 focus:ring-[#1B2CC1]/20 transition disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Trường Mật khẩu */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className="text-sm font-medium text-[#091540] block">
                      Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <Link
                      to="#"
                      className="text-xs font-medium text-[#6E7DB4] hover:text-[#1B2CC1] transition"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="••••••••••••••••"
                      className="w-full px-4 py-2.5 pr-11 rounded-lg border border-[#D8ECFA] text-sm text-[#091540] placeholder:text-[#6E7DB4]/60 focus:outline-none focus:border-[#1B2CC1] focus:ring-2 focus:ring-[#1B2CC1]/20 transition disabled:bg-slate-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1 transition"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-4 h-4 text-slate-500" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Hàng ghi nhớ (Remember me) */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    disabled={isLoading}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#1B2CC1] focus:ring-[#1B2CC1]/30 accent-[#1B2CC1] cursor-pointer"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-[#091540] select-none cursor-pointer"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                {/* Nút hành động chính */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#1B2CC1] hover:bg-[#16239A] active:bg-[#101A74] text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <SpinnerIcon className="w-4 h-4 animate-spin text-white" />
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </button>

                {/* Liên kết phụ bên dưới nút */}
                <div className="text-center pt-2">
                  <p className="text-sm text-slate-600">
                    Chưa có tài khoản?{' '}
                    <Link
                      to={ROUTES.REGISTER}
                      className="text-[#1B2CC1] font-semibold hover:underline transition"
                    >
                      Đăng ký ngay
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Footer chân trang nằm trọn vẹn ở đáy cột bên trái */}
          <AuthFooter />
        </div>

        {/* 2. Cột phải: Visual Showcase Banner tràn full màn hình xuống tận đáy */}
        <div className="hidden lg:block h-full">
          <AuthBanner className="h-full" />
        </div>
      </main>
    </div>
  );
};

export default RentMateLogin;
