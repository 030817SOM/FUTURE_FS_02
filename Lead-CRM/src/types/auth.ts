export type Role = "admin" | "agent";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  role: Role;
}

export interface AuthSession {
  user: UserProfile;
  token: string;
}
