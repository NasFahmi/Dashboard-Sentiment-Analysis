// ProtectedRoute.tsx
import { Navigate } from 'react-router';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { JSX } from 'react';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;