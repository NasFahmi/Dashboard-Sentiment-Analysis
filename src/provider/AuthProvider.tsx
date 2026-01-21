import { type ReactNode, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useDatasetContextStore } from '@/store/useDatasetContextStore';
import { useLogoutMutation } from '@/hooks/useLogoutMutation';

// 3. Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const logoutmutation = useLogoutMutation();

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
    console.log(`acces token ${localStorage.getItem('access_token')}`);
    console.log(`refresh token ${localStorage.getItem('refresh_token')}`);
    console.log("logout");

    // Execute logout mutation which calls the API
    logoutmutation.mutate(undefined, {
      onSuccess: () => {
        // Only remove tokens after successful API call
        document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        useDatasetContextStore.getState().reset();
        setIsAuthenticated(false);
      },
      onError: () => {
        // Even if API call fails, still clean up local state
        document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        useDatasetContextStore.getState().reset();
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
