/* eslint-disable @typescript-eslint/no-unused-vars */

import { defaultUser } from '~/utils/default-user';
import { setAuthToken, setAuthUser } from '~/lib/auth';

export async function signIn(email: string, password: string) {
  try {
    // Prefer Vite env var; fall back to relative path if not set
    const rawBase = (import.meta as any).env?.VITE_API_URL as string | undefined;

    const baseUrl = rawBase ? rawBase.replace(/\/$/, '') : '';
    const url = baseUrl ? `${baseUrl}/api/v1/auth/login` : `/api/v1/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

  const token = data.token as string | undefined;
  const role = (data.user?.role || data.role || 'admin') as 'admin' | 'user' | 'customer';
  if (token) setAuthToken(token);

    // Build user and persist
    const user = { ...defaultUser, email, token, role };
    setAuthUser(user as any);
    return {
      isOk: true,
      data: user,
    };
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
