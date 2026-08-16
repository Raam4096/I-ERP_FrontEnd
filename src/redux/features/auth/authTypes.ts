import type { AuthUser } from "@/models/auth/auth";

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  status: "idle" | "hydrating" | "authenticated" | "unauthenticated";
  error: string | null;
}
