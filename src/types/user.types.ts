import type { ReactNode } from 'react';

export type UserRole = 'student' | 'tenant' | 'landlord' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  university?: string;
  dormitory?: string;
  phoneNumber?: string;
  isVerifiedStudent?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
