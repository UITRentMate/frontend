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
