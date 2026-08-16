export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  roleName: string;
  initials: string;
  tenantId: string;
}

export interface AuthTokens {
  accessToken: string;
  expiresInSeconds: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  expiresInSeconds: number;
  roles: string[];
  permissions: string[];
}
