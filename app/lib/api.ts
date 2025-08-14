import { getAuthToken } from "~/lib/auth";

export async function apiFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers || {});
  const token = getAuthToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.set("content-type", headers.get("content-type") || "application/json");

  const res = await fetch(input, { ...init, headers });
  const data = await res.json().catch(() => undefined);
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || "Request failed";
    const err = new Error(message) as Error & { status?: number; data?: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
