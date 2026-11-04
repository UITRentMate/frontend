import type { User, AuthTokens, UserRole } from '../../../types';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponseData {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: 'tenant' | 'landlord';
}

export interface RegisterResponseData {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DemoAccount {
  role: UserRole;
  label: string;
  badge: string;
  email: string;
  password: string;
  description: string;
  targetRoute: string;
}
