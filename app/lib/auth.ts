const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function setAuthToken(token: string) {
  try {
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
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
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

export type StoredUser = {
  email: string;
  name: string;
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
