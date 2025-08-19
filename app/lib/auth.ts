const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function setAuthToken(token: string) {
  try {
    if (typeof window !== "undefined") {
      // Persist in localStorage for client-side fetches
      localStorage.setItem(TOKEN_KEY, token);

      // Also set a cookie so server-side loaders can read it
      // Note: Can't set HttpOnly from the client. SameSite=Lax to allow same-site navigations.
      const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${secure}`;
    }
  } catch {}
}

export function getAuthToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearAuthToken() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      // Clear cookie
      document.cookie = `${TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
    }
  } catch {}
}

export type StoredUser = {
  email: string;
  username: string;
  avatarUrl: string;
  role: 'admin' | 'user' | 'customer';
  token?: string;
};

export function setAuthUser(user: StoredUser) {
  try {
    if (typeof window !== "undefined") localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
}

export function getAuthUser(): StoredUser | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  try {
    if (typeof window !== "undefined") localStorage.removeItem(USER_KEY);
  } catch {}
}
