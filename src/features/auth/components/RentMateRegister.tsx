import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  SpinnerIcon,
} from '@/components/ui/icons';
import { useRegister } from '../hooks/useRegister';
import RegisterSubHeader from './RegisterSubHeader';
import RoleSwitcher from './RoleSwitcher';
import PasswordCriteria from './PasswordCriteria';
import RegisterBanner from './RegisterBanner';
import AuthFooter from './AuthFooter';
import type { RentMateRegisterProps } from '../types';

export const RentMateRegister: React.FC<RentMateRegisterProps> = ({
  onSuccess,
  className = '',
}) => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  // State quản lý form bám sát yêu cầu kỹ thuật: không hardcode credentials
  const [role, setRole] = useState<'tenant' | 'landlord'>('tenant');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isLoading = registerMutation.isPending;

  // Real-time password criteria
  const hasMinLength = password.length >= 8;
  const hasLetterAndNumber = /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasLetterAndNumber;
  const isConfirmMatching = confirmPassword ? password === confirmPassword : true;

  // Xử lý gửi biểu mẫu
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (!hasMinLength) {
      setErrorMessage('Mật khẩu phải có độ dài tối thiểu 8 ký tự.');
      return;
    }
    if (!hasLetterAndNumber) {
      setErrorMessage('Mật khẩu phải chứa cả chữ cái và chữ số.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    try {
      const response = await registerMutation.mutateAsync({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        role,
      });

      const landlordNote =
        role === 'landlord'
          ? ' (Tài khoản Chủ trọ sẽ được kích hoạt hồ sơ xác minh sau khi đăng nhập)'
          : '';
      setSuccessMessage(`${response.message}${landlordNote}`);

      // Chuyển hướng sau khi thông báo thành công
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(ROUTES.LOGIN);
        }
      }, 1500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Đăng ký tài khoản không thành công. Vui lòng kiểm tra lại thông tin!';
      setErrorMessage(msg);
    }
  };

  return (
    <div
      className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-[#091540] ${className}`}
    >
      {/* 1. Cột trái: Form Đăng Ký & Điều Hướng */}
      <div className="flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-20 min-h-screen overflow-y-auto">
        {/* A. Top Sub-Header */}
        <RegisterSubHeader />

        {/* B. Khối Form Trung Tâm */}
        <div className="max-w-md w-full mx-auto my-auto py-6">
          {/* Tiêu đề khối */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#091540] font-heading tracking-tight">
              Tạo tài khoản RentMate
            </h1>
            <p className="text-sm text-[#6E7DB4] mt-1.5 font-sans">
              Bắt đầu hành trình tìm nơi ở phù hợp với bạn.
            </p>
          </div>

          {/* Bộ chuyển đổi vai trò (Role Switcher) */}
          <RoleSwitcher selectedRole={role} onChange={setRole} />

          {/* Thông báo Alert Thành công */}
          {successMessage && (
            <div
              role="status"
              className="mb-5 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5 animate-fadeIn"
            >
              <CheckCircle2Icon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {/* Thông báo Alert Lỗi bảo mật mỏng */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5 animate-fadeIn"
            >
              <AlertCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMessage}</div>
            </div>
          )}

          {/* Biểu mẫu đăng ký */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Trường Họ và tên */}
            <div>
              <label
                htmlFor="register-fullname"
                className="text-sm font-medium text-[#091540] mb-1.5 block"
              >
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                id="register-fullname"
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2.5 rounded-lg border border-[#D8ECFA] text-sm text-[#091540] placeholder:text-[#9FA8CD] focus:outline-none focus:border-[#1B2CC1] focus:ring-2 focus:ring-[#1B2CC1]/15 transition"
              />
            </div>

            {/* Trường Email */}
            <div>
              <label
                htmlFor="register-email"
                className="text-sm font-medium text-[#091540] mb-1.5 block"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="register-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-[#D8ECFA] text-sm text-[#091540] placeholder:text-[#9FA8CD] focus:outline-none focus:border-[#1B2CC1] focus:ring-2 focus:ring-[#1B2CC1]/15 transition"
              />
            </div>

            {/* Trường Mật khẩu */}
            <div>
              <label
                htmlFor="register-password"
                className="text-sm font-medium text-[#091540] mb-1.5 block"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tạo mật khẩu"
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-[#D8ECFA] text-sm text-[#091540] placeholder:text-[#9FA8CD] focus:outline-none focus:border-[#1B2CC1] focus:ring-2 focus:ring-[#1B2CC1]/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>

              {/* Danh sách điều kiện mật khẩu (Password Criteria Checklist) */}
              <PasswordCriteria
                hasMinLength={hasMinLength}
                hasLetterAndNumber={hasLetterAndNumber}
              />
            </div>

            {/* Trường Xác nhận mật khẩu */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="text-sm font-medium text-[#091540] mb-1.5 block"
              >
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm text-[#091540] placeholder:text-[#9FA8CD] focus:outline-none focus:ring-2 transition ${
                    !isConfirmMatching && confirmPassword
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#D8ECFA] focus:border-[#1B2CC1] focus:ring-[#1B2CC1]/15'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ẩn xác nhận mật khẩu' : 'Hiện xác nhận mật khẩu'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Cảnh báo mật khẩu không khớp */}
              {!isConfirmMatching && confirmPassword && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  Mật khẩu xác nhận không trùng khớp.
                </p>
              )}
            </div>

            {/* Nút Đăng ký */}
            <button
              type="submit"
              disabled={isLoading || (password.length > 0 && !isPasswordValid)}
              className="w-full py-3 bg-[#1B2CC1] hover:bg-[#16239A] active:bg-[#101A74] text-white font-medium text-sm rounded-lg shadow-sm transition-all duration-200 mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-4 h-4 animate-spin text-white" />
                  <span>Đang tạo tài khoản...</span>
                </>
              ) : (
                <span>Đăng ký</span>
              )}
            </button>

            {/* Hàng liên kết chuyển về Đăng nhập */}
            <div className="text-center pt-3">
              <p className="text-sm text-slate-600">
                Đã có tài khoản?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="text-[#1B2CC1] font-semibold hover:underline cursor-pointer transition"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Chân trang Cột trái */}
        <AuthFooter className="border-t-0 px-0 lg:px-0 pt-4" />
      </div>

      {/* 2. Cột phải: Visual Showcase Banner */}
      <div className="hidden lg:block relative h-full w-full overflow-hidden">
        <RegisterBanner />
      </div>
    </div>
  );
};

export default RentMateRegister;
