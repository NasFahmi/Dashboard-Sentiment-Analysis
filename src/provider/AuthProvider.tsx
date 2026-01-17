import { type ReactNode, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useDatasetContextStore } from '@/store/useDatasetContextStore';

// 3. Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    setIsAuthenticated(!!access_token && !!refresh_token);
    setIsLoading(false);
  }, []);

  const login = (acces_token: string, refresh_token: string) => {
    document.cookie = `access_token=${acces_token}; path=/`;
    document.cookie = `refresh_token=${refresh_token}; path=/`;
    localStorage.setItem('access_token', acces_token);
    localStorage.setItem('refresh_token', refresh_token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    useDatasetContextStore.getState().reset();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
