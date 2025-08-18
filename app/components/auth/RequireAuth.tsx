import { type ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getAuthToken } from '~/lib/auth';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Defer reading localStorage until after mount to prevent SSR hydration mismatch
  useEffect(() => {
    setToken(getAuthToken());
    setReady(true);
  }, []);

  if (ready && !token) {
    const callback = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?callbackUrl=${callback}`} replace />;
  }

  // While not ready on server/client initial render, keep markup stable
  if (!ready) return null;

  return <>{children}</>;
}
