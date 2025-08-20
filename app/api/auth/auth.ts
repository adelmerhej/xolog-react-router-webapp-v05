/* eslint-disable @typescript-eslint/no-unused-vars */

import { defaultUser } from '~/utils/default-user';
import { setAuthToken, setAuthUser } from '~/lib/auth';

export async function signIn(identifier: string, password: string) {
  try {
    // Prefer Vite env var; fall back to relative path if not set
  const rawBase = (import.meta as any).env?.VITE_API_URL as string | undefined;
  const baseUrl = (rawBase || 'http://localhost:5055').replace(/\/$/, '');
  
  // Use app resource route so SSR server can proxy to backend and avoid CORS
  const url = `/api/v1/auth/login`;

    // Try multiple payload shapes to match backend expectations
    const payloads: Array<Record<string, unknown>> = [
      { identifier, password },
      identifier.includes('@') ? { email: identifier, password } : { username: identifier, password },
    ];

    let lastError: any = null;
    for (const body of payloads) {
      try {
  const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Include credentials in case the backend sets an HttpOnly session cookie
          credentials: 'include',
          body: JSON.stringify(body),
        });

        const data = await response
          .json()
          .catch(() => ({} as any));

        if (!response.ok) {
          lastError = new Error(data?.message || response.statusText || 'Login failed');
          continue;
        }

        // Extract token in a tolerant way
        const token = (data?.token || data?.accessToken || data?.jwt || data?.data?.token) as string | undefined;
        const userObj = data?.user || data?.data?.user || {};
        const username = userObj?.username || userObj?.fullName || (identifier.includes('@') ? identifier.split('@')[0] : identifier);
        const role = (userObj?.role || data?.role || 'user') as 'admin' | 'user' | 'customer';
        const avatarUrl = userObj?.avatarUrl || '';
        if (token) setAuthToken(token);

        const user = { email: identifier, username, token, role, avatarUrl };
        setAuthUser(user as any);
        return { isOk: true, data: user } as const;
      } catch (err) {
        lastError = err;
      }
    }

    // If all attempts failed
    return {
      isOk: false,
      message: (lastError as any)?.message || 'Authentication failed',
    } as const;
  } catch {
    return {
      isOk: false,
      message: 'Authentication failed',
    };
  }
}
export async function signOut() {
  try {
    // Send request
    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to sign out',
    };
  }
}

export async function getUser() {
  try {
    // Send request

    return {
      isOk: true,
      data: defaultUser,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email: string, password: string) {
  try {
    // Send request
    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to create account',
    };
  }
}

export async function changePassword(email: string, recoveryCode?: string) {
  try {
    // Send request
    return {
      isOk: true,
      data: { email },
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to change password',
    };
  }
}

export async function resetPassword(email: string) {
  try {
    // Send request
    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to reset password',
    };
  }
}
