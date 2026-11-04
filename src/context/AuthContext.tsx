import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokenStorage } from '../utils/tokenStorage';
import type { User, AuthContextValue, AuthProviderProps } from '../types';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Khởi tạo trạng thái phiên đăng nhập từ tokenStorage khi mount
    const storedUser = tokenStorage.getUser<User>();
    const token = tokenStorage.getAccessToken();

    if (storedUser && token) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    tokenStorage.clearAuth();
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
