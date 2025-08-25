// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { User, SessionResponse } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<SessionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getSession();
          if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            // Token không hợp lệ, xóa và logout
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (userData: User) => {
    // Sau khi login thành công, lấy thông tin session
    if (authService.isAuthenticated()) {
      const response = await authService.getSession();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      }
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshSession = async () => {
    if (authService.isAuthenticated()) {
      const response = await authService.getSession();
      if (response.success && response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
        return true;
      }
    }
    return false;
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshSession,
  };
}
