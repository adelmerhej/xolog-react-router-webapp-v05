import type { ActionFunctionArgs } from 'react-router';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method.toUpperCase() !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const rawBase = (import.meta as any).env?.VITE_API_URL as string | undefined;
    const envBase = (process as any)?.env?.VITE_API_URL as string | undefined;
    const baseUrl = (rawBase || envBase || 'http://myaccount.xolog.com:5055').replace(/\/$/, '');
    const url = `${baseUrl}/api/v1/auth/login`;

    const body = await request.text();
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    });

    const text = await upstream.text();
    const headers = new Headers();
    const ct = upstream.headers.get('content-type') || 'application/json';
    headers.set('content-type', ct);
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) headers.append('set-cookie', setCookie);

    return new Response(text, { status: upstream.status, headers });
  } catch (err: any) {
    const message = err?.message || 'Upstream auth failed';
    return new Response(JSON.stringify({ message }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export default function NotFound() {
  return null;
}
