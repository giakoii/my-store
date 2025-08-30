import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { SessionResponse } from '@/types';

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
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch {
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

  const login = async () => {
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
