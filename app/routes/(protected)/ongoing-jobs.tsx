import { useEffect, useState } from 'react';
import { apiFetch } from '~/lib/api';
import RequireAuth from "~/components/auth/RequireAuth";

type Job = {
  id?: string;
  [key: string]: unknown;
};

export default function OngoingJobs() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        // Call your admin report endpoint directly
        const base = (import.meta as any).env?.VITE_API_URL?.replace(/\/$/, '') || 'http://myaccount.xolog.com:5055';
        const data = await apiFetch(`${base}/api/v1/admin/reports/ongoing-jobs`);
        if (!ignore) setJobs(Array.isArray(data) ? data : (data as any)?.items || []);
      } catch (e: any) {
        if (!ignore) setError(e?.message || 'Failed to load');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  if (loading) return <div className="p-6">Loading ongoing jobs…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!jobs || jobs.length === 0) return <div className="p-6">No ongoing jobs.</div>;

  return (
    <RequireAuth>
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Ongoing Jobs</h1>
        <ul className="space-y-2">
          {jobs.map((j, i) => (
            <li key={(j as any).id || i} className="p-3 rounded border bg-white/70 dark:bg-slate-800/60">
              <pre className="text-xs overflow-auto">{JSON.stringify(j, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </main>
    </RequireAuth>
  );
}
