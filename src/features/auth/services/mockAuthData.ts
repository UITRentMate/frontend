import { ROUTES } from '@/routes/paths';
import {
  hasPasswordNumberOrSpecial,
  hasValidPasswordLength,
  isValidEmail,
  PASSWORD_MAX_LENGTH,
} from '@/utils';

import type {
  DemoAccount,
  LoginCredentials,
  LoginResponseData,
  RegisterCredentials,
  RegisterResponseData,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from '../types/auth.types';

export const delay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: 'admin',
    label: 'Quản trị viên',
    badge: 'Admin',
    email: 'admin@rentmate.edu.vn',
    password: 'Password@123',
    description: 'Toàn quyền kiểm duyệt phòng trọ, quản lý báo cáo vi phạm',
    targetRoute: ROUTES.ADMIN_DASHBOARD,
  },
  {
    role: 'landlord',
    label: 'Chủ nhà trọ',
    badge: 'Chủ trọ',
    email: 'landlord@rentmate.vn',
    password: 'Password@123',
    description: 'Đăng tin phòng trọ, quản lý hợp đồng và xem lịch hẹn',
    targetRoute: ROUTES.LANDLORD_DASHBOARD,
  },
  {
    role: 'tenant',
    label: 'Sinh viên / Cư dân',
    badge: 'Người thuê',
    email: 'hoangminh.hcm@gmail.com',
    password: 'Password@123',
    description: 'Tìm kiếm và thuê phòng trọ, ký túc xá sinh viên',
    targetRoute: ROUTES.ROOMS,
  },
];

export function authenticateMockUser(credentials: LoginCredentials): LoginResponseData {
  const normalizedEmail = credentials.email.trim().toLowerCase();
  
  // Kiểm tra danh sách demo accounts
  const matched = DEMO_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail
  );

  // Nếu nhập đúng 1 trong các tài khoản demo
  if (matched && matched.password === credentials.password) {
    return {
      user: {
        id: `user-${matched.role}-001`,
        name: matched.role === 'admin' 
          ? 'Quản Trị Viên Hệ Thống' 
          : matched.role === 'landlord' 
          ? 'Nguyễn Văn Chủ Trọ (Làng ĐH)' 
          : 'Lê Hoàng Minh',
        email: matched.email,
        role: matched.role,
        phoneNumber: '0909123456',
        avatarUrl: matched.role === 'tenant' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : undefined,
      },
      tokens: {
        accessToken: `rentmate_mock_jwt_${matched.role}_${Date.now()}`,
        refreshToken: `rentmate_mock_refresh_${matched.role}_${Date.now()}`,
      },
    };
  }

  // Chỉ dùng phiên sinh viên mẫu cho email nằm ngoài danh sách demo.
  if (
    !matched &&
    normalizedEmail.includes('@') &&
    credentials.password.length >= 6 &&
    !normalizedEmail.includes('wrong')
  ) {
    return {
      user: {
        id: `user-tenant-${Date.now()}`,
        name: normalizedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: normalizedEmail,
        role: 'tenant',
      },
      tokens: {
        accessToken: `rentmate_mock_jwt_tenant_${Date.now()}`,
        refreshToken: `rentmate_mock_refresh_tenant_${Date.now()}`,
      },
    };
  }

  // Ném lỗi 401 khi tài khoản/mật khẩu sai
  throw new Error('Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!');
}

/**
 * Mô phỏng API Đăng ký tài khoản (Register) với kiểm tra hợp lệ
 */
export async function registerMockUser(
  credentials: RegisterCredentials
): Promise<RegisterResponseData> {
  await delay(600);

  const normalizedEmail = credentials.email.trim().toLowerCase();

  // Kiểm tra nếu email đã tồn tại trong danh sách tài khoản mẫu
  const isExisting = DEMO_ACCOUNTS.some(
    (acc) => acc.email.toLowerCase() === normalizedEmail
  );
  if (isExisting) {
    throw new Error('Địa chỉ email này đã được sử dụng. Vui lòng chọn email khác hoặc Đăng nhập.');
  }

  // Kiểm tra định dạng cơ bản
  if (!credentials.fullName.trim()) {
    throw new Error('Vui lòng nhập họ và tên của bạn.');
  }
  if (!normalizedEmail.includes('@')) {
    throw new Error('Địa chỉ email không đúng định dạng.');
  }
  if (credentials.password.length < 8) {
    throw new Error('Mật khẩu phải chứa tối thiểu 8 ký tự.');
  }
  if (!/[a-zA-Z]/.test(credentials.password) || !/[0-9]/.test(credentials.password)) {
    throw new Error('Mật khẩu phải bao gồm cả chữ cái và số.');
  }

  const role = credentials.role;

  return {
    user: {
      id: `user-${role}-${Date.now()}`,
      name: credentials.fullName.trim(),
      email: normalizedEmail,
      role,
    },
    tokens: {
      accessToken: `rentmate_jwt_${role}_${Date.now()}`,
      refreshToken: `rentmate_refresh_${role}_${Date.now()}`,
    },
    message: 'Tài khoản của bạn đã được đăng ký thành công! Hãy đăng nhập để bắt đầu trải nghiệm.',
  };
}

/**
 * Giả lập API Quên mật khẩu (Forgot Password) với độ trễ 600ms
 */
export async function forgotPasswordMock(
  payload: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  await delay(600);

  const normalizedEmail = payload.email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error('Vui lòng nhập địa chỉ email của bạn.');
  }

  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Địa chỉ email không đúng định dạng.');
  }

  return {
    success: true,
    message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến hoặc hòm thư rác (Spam).',
  };
}

/**
 * Giả lập API Đặt lại mật khẩu (Reset Password) với độ trễ 600ms
 */
export async function resetPasswordMock(
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
  await delay(600);

  const normalizedToken = payload.token.trim().toLowerCase();
  if (!normalizedToken || normalizedToken === 'expired' || normalizedToken === 'invalid') {
    const tokenError = new Error(
      'Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại email.'
    );
    tokenError.name = 'ResetTokenError';
    throw tokenError;
  }

  if (payload.newPassword.length > PASSWORD_MAX_LENGTH) {
    throw new Error('Mật khẩu mới không được vượt quá 128 ký tự.');
  }

  if (!hasValidPasswordLength(payload.newPassword)) {
    throw new Error('Mật khẩu mới phải có tối thiểu 8 ký tự (không tính khoảng trắng thừa).');
  }

  if (!hasPasswordNumberOrSpecial(payload.newPassword)) {
    throw new Error('Mật khẩu mới phải chứa ít nhất một chữ số hoặc ký tự đặc biệt.');
  }

  if (payload.newPassword !== payload.confirmPassword) {
    throw new Error('Mật khẩu xác nhận không khớp với mật khẩu mới.');
  }

  return {
    success: true,
    message: 'Mật khẩu của bạn đã được cập nhật thành công.',
  };
}
