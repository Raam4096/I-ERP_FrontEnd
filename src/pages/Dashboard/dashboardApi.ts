import { API_ENDPOINTS, USE_MOCK, http, unwrapData } from "@/configurations/api";
import { mockLatency } from "@/configurations/api/delay";
import type { DashboardSnapshot } from "@/models/dashboard/dashboard";
import { dashboardSnapshot } from "./dashboard.mock";

export const getDashboardSnapshot = async (): Promise<DashboardSnapshot> => {
  if (USE_MOCK) {
    await mockLatency();
    return dashboardSnapshot;
  }

  const response = await http.get(API_ENDPOINTS.dashboard.snapshot);
  return unwrapData<DashboardSnapshot>(response.data);
};
