import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getAuthToken } from '~/lib/auth';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    const callback = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?callbackUrl=${callback}`} replace />;
  }

  return <>{children}</>;
}
