/**
 * Every backend path lives here. Pages and services must not embed URL strings.
 * Resource names follow the process-flow contract: /api/v1/ + plural snake_case.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5080";

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export const API_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    refresh: "/api/v1/auth/refresh",
    logout: "/api/v1/auth/logout",
    me: " /api/v1/auth/me".trim(),
  },
  leads: {
    list: "/api/v1/leads",
    byId: (id: string) => `/api/v1/leads/${id}`,
  },
  dashboard: {
    snapshot: "/api/v1/dashboard/snapshot",
  },
  metadata: {
    screen: (screenCode: string) => `/api/v1/metadata/screens/${screenCode}`,
  },
} as const;

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
