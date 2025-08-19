import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import AppLayout from "~/components/layout/Layout";

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "An unexpected error occurred.";
  let status = 500;
  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 401) {
      message = "You are not authorized to view this page. Please contact support.";
    } else if (status === 404) {
      message = "Page not found.";
    } else {
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <AppLayout>
      <main className="p-6">
        <div className="text-red-600 font-semibold text-lg mb-2">Error</div>
        <div className="text-red-500">{message}</div>
        {/* {status === 401 && (
          <div className="mt-4">
            <a href="/login" className="text-blue-600 underline">Go to Login</a>
          </div>
        )} */}
      </main>
    </AppLayout>
  );
}

type Job = {
  id?: string;
  [key: string]: unknown;
};

export async function loader({ request }: { request: Request }) {
  const base =
    (import.meta as any).env?.VITE_API_URL?.replace(/\/$/, '') ||
    (process.env as any)?.VITE_API_URL?.replace(/\/$/, '') ||
    'http://myaccount.xolog.com:5055';

  // Get token from cookies (works on server and client navigations)
  let cookie = request.headers.get("cookie");
  if (!cookie && typeof document !== 'undefined') {
    cookie = document.cookie || '';
  }
  
  let token: string | null = null;
  if (cookie) {
    const parts = cookie.split(/;\s*/);
    for (const p of parts) {
      const [k, ...rest] = p.split('=');
      if (k === 'authToken') {
        token = decodeURIComponent(rest.join('='));
        break;
      }
    }
  }
  // Avoid logging token values in production; only note presence
  console.log("Using token:", token ? "present" : "null");

  if (!token) {
    throw new Response("Not authorized, no token", { status: 401 });
  }
  
  
  // Pass token to backend API
  const res = await fetch(`${base}/api/v1/clients/to-be-loaded`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Response("Failed to fetch jobs", { status: res.status });
  }

  const data = await res.json();
  // Normalize to array to match component expectations
  const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : Array.isArray(data?.data) ? data.data : [];
  return items as unknown;
}

export default function TobeLoaded() {
  const raw = useLoaderData() as any;
  const jobs: Job[] = Array.isArray(raw)
    ? raw
    : Array.isArray(raw?.items)
    ? raw.items
    : Array.isArray(raw?.data)
    ? raw.data
    : [];

  return (
    <AppLayout>
      <main className="p-6">
  {!jobs || jobs.length === 0 ? (
          <div>No jobs to be loaded.</div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4">Jobs to be Loaded</h1>
            <ul className="space-y-2">
              {jobs.map((j, i) => (
                <li key={j.id || i} className="p-3 rounded border bg-white/70 dark:bg-slate-800/60">
                  <pre className="text-xs overflow-auto">{JSON.stringify(j, null, 2)}</pre>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </AppLayout>
  );
}
