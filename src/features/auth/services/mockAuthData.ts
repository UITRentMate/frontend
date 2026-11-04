import type { DemoAccount, LoginCredentials, LoginResponseData } from '../types/auth.types';

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
    targetRoute: '/admin/dashboard',
  },
  {
    role: 'landlord',
    label: 'Chủ nhà trọ',
    badge: 'Chủ trọ',
    email: 'landlord@rentmate.vn',
    password: 'Password@123',
    description: 'Đăng tin phòng trọ, quản lý hợp đồng và xem lịch hẹn',
    targetRoute: '/landlord/properties',
  },
  {
    role: 'tenant',
    label: 'Sinh viên / Cư dân',
    badge: 'Sinh viên',
    email: 'hoangminh.hcm@gmail.com',
    password: 'Password@123',
    description: 'Tìm kiếm phòng trọ, KTX, trao đổi và pass đồ dùng học tập',
    targetRoute: '/rooms',
  },
];

export function authenticateMockUser(credentials: LoginCredentials): LoginResponseData {
  const normalizedEmail = credentials.email.trim().toLowerCase();
  
  // Kiểm tra danh sách demo accounts
  const matched = DEMO_ACCOUNTS.find(
    (acc) =>
      acc.email.toLowerCase() === normalizedEmail &&
      acc.password === credentials.password
  );

  // Nếu nhập đúng 1 trong các tài khoản demo
  if (matched) {
    return {
      user: {
        id: `user-${matched.role}-001`,
        name: matched.role === 'admin' 
          ? 'Quản Trị Viên Hệ Thống' 
          : matched.role === 'landlord' 
          ? 'Nguyễn Văn Chủ Trọ (Làng ĐH)' 
          : 'Lê Hoàng Minh (ĐH Bách Khoa TP.HCM)',
        email: matched.email,
        role: matched.role,
        university: matched.role === 'tenant' ? 'Đại học Quốc gia TP.HCM' : undefined,
        dormitory: matched.role === 'tenant' ? 'KTX Khu B - Tòa BA2' : undefined,
        phoneNumber: '0909123456',
        isVerifiedStudent: matched.role === 'tenant',
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

  // Cho phép đăng nhập sinh viên nếu có mật khẩu >= 6 ký tự và định dạng email hợp lệ
  if (
    normalizedEmail.includes('@') &&
    credentials.password.length >= 6 &&
    !normalizedEmail.includes('wrong')
  ) {
    const isEdu = normalizedEmail.endsWith('.edu.vn');
    return {
      user: {
        id: `user-tenant-${Date.now()}`,
        name: normalizedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: normalizedEmail,
        role: 'tenant',
        university: isEdu ? 'Đại học Bách Khoa TP.HCM' : 'Đại học Quốc gia TP.HCM',
        isVerifiedStudent: isEdu,
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
