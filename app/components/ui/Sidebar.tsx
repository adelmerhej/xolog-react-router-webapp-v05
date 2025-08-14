import { Link, useLocation } from 'react-router';
import { getNavigationForRole } from '~/utils/app-navigation';
import { getAuthUser } from '~/lib/auth';

export default function Sidebar() {
  const location = useLocation();
  const role = getAuthUser()?.role || 'user';
  const groups = getNavigationForRole(role as any);

  return (
    <aside className="w-64 shrink-0 border-r bg-white/80 dark:bg-slate-900/40 backdrop-blur">
      <div className="p-4 text-lg font-semibold">XOLOG</div>
      <nav className="p-2 space-y-4">
        {groups.map((g) => (
          <div key={g.text}>
            <div className="px-2 py-1 text-xs uppercase tracking-wide text-slate-500">{g.text}</div>
            <ul className="mt-1 space-y-1">
              {g.items?.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={
                        'block px-3 py-2 rounded hover:bg-sky-50 dark:hover:bg-slate-800 ' +
                        (active ? 'bg-sky-100 text-sky-700 dark:bg-slate-800' : '')
                      }
                    >
                      {item.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
