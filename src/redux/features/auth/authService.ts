import { API_ENDPOINTS, USE_MOCK, http, unwrapData } from "@/configurations/api";
import { mockLatency } from "@/configurations/api/delay";
import { NormalizedApiError } from "@/models/common/api";
import type { LoginRequest, LoginResponse } from "@/models/auth/auth";
import { ERROR_CODES } from "@/constants/errorCodes";
import { DEMO_LOGIN, demoLoginResponse } from "@/pages/Auth/auth.mock";

const MOCK_SESSION_KEY = "ierp.mock-session";

export const persistMockSession = (active: boolean): void => {
  if (active) {
    sessionStorage.setItem(MOCK_SESSION_KEY, "1");
    return;
  }
  sessionStorage.removeItem(MOCK_SESSION_KEY);
};

export const hasMockSession = (): boolean => sessionStorage.getItem(MOCK_SESSION_KEY) === "1";

export const loginRequest = async (payload: LoginRequest): Promise<LoginResponse> => {
  if (USE_MOCK) {
    await mockLatency();
    const valid =
      payload.email.trim().toLowerCase() === DEMO_LOGIN.email &&
      payload.password === DEMO_LOGIN.password;

    if (!valid) {
      throw new NormalizedApiError(ERROR_CODES.UNAUTHORIZED, "Invalid email or password.", 401);
    }

    persistMockSession(true);
    return demoLoginResponse;
  }

  const response = await http.post(API_ENDPOINTS.auth.login, payload);
  return unwrapData<LoginResponse>(response.data);
};

export const refreshSessionRequest = async (): Promise<LoginResponse> => {
  if (USE_MOCK) {
    await mockLatency(120);
    if (!hasMockSession()) {
      throw new NormalizedApiError(ERROR_CODES.UNAUTHORIZED, "No session to restore.", 401);
    }
    return demoLoginResponse;
  }

  const response = await http.post(API_ENDPOINTS.auth.refresh);
  return unwrapData<LoginResponse>(response.data);
};

export const logoutRequest = async (): Promise<void> => {
  if (USE_MOCK) {
    persistMockSession(false);
    return;
  }

  await http.post(API_ENDPOINTS.auth.logout);
};
