import type { AuthSession, UserProfile } from "@/types/auth";

const USE_MOCK = true;
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";
const SESSION_KEY = "crm.auth.session.v1";

/* ------------------------------ Mock users ------------------------------ */

interface MockUser extends UserProfile {
  password: string;
}

const MOCK_USERS_KEY = "crm.auth.mock_users.v1";

function loadMockUsers(): MockUser[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY);
    return raw ? (JSON.parse(raw) as MockUser[]) : [];
  } catch {
    return [];
  }
}

function saveMockUsers(users: MockUser[]) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

const SEED_USERS: MockUser[] = [
  {
    id: "u_admin",
    email: "admin@wanga.crm",
    password: "admin123",
    displayName: "wanga Admin",
    avatarUrl: null,
    role: "admin",
  },
  {
    id: "u_agent",
    email: "agent@wanga.crm",
    password: "agent123",
    displayName: "wanga Agent",
    avatarUrl: null,
    role: "agent",
  },
];

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------ Storage ------------------------------ */

export const sessionStore = {
  get(): AuthSession | null {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  },
  set(s: AuthSession) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  },
  clear() {
    localStorage.removeItem(SESSION_KEY);
  },
};

/* ------------------------------ Real fetcher ------------------------------ */

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const session = sessionStore.get();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
    },
    credentials: "include",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Auth ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/* ------------------------------ API ------------------------------ */

export const authApi = {
  async login(email: string, password: string): Promise<AuthSession> {
    if (!USE_MOCK) {
      const session = await http<AuthSession>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      sessionStore.set(session);
      return session;
    }
    await delay();
    const all = [...SEED_USERS, ...loadMockUsers()];
    const u = all.find(
      (m) => m.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!u || u.password !== password) {
      throw new Error("Invalid email or password");
    }
    const { password: _pw, ...profile } = u;
    const session: AuthSession = {
      user: profile,
      token: `mock.${u.id}.${Date.now()}`,
    };
    sessionStore.set(session);
    return session;
  },

  async signup(input: { email: string; password: string; displayName: string }): Promise<AuthSession> {
    if (!USE_MOCK) {
      const session = await http<AuthSession>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(input),
      });
      sessionStore.set(session);
      return session;
    }
    await delay();
    const email = input.email.trim().toLowerCase();
    if (!email || !input.password || !input.displayName.trim()) {
      throw new Error("All fields are required");
    }
    if (input.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const all = [...SEED_USERS, ...loadMockUsers()];
    if (all.some((m) => m.email.toLowerCase() === email)) {
      throw new Error("An account with this email already exists");
    }
    const newUser: MockUser = {
      id: `u_${Date.now().toString(36)}`,
      email,
      password: input.password,
      displayName: input.displayName.trim(),
      avatarUrl: null,
      role: "agent",
    };
    const stored = loadMockUsers();
    saveMockUsers([...stored, newUser]);
    const { password: _pw, ...profile } = newUser;
    const session: AuthSession = {
      user: profile,
      token: `mock.${newUser.id}.${Date.now()}`,
    };
    sessionStore.set(session);
    return session;
  },

  async logout(): Promise<void> {
    if (!USE_MOCK) {
      try {
        await http<void>("/auth/logout", { method: "POST" });
      } catch {
        /* ignore */
      }
    } else {
      await delay(100);
    }
    sessionStore.clear();
  },

  async me(): Promise<UserProfile | null> {
    if (!USE_MOCK) {
      try {
        const { user } = await http<{ user: UserProfile }>("/auth/me");
        return user;
      } catch {
        sessionStore.clear();
        return null;
      }
    }
    await delay(80);
    return sessionStore.get()?.user ?? null;
  },
};
