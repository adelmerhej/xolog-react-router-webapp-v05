import Sidebar from '~/components/ui/Sidebar';
import RequireAuth from '~/components/auth/RequireAuth';
import { Outlet } from 'react-router';

export default function ProtectedLayout() {
  return (
    <RequireAuth>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  );
}
