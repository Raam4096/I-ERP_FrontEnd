import { PERMISSIONS } from "@/constants/permissions";
import type { AuthUser, LoginResponse } from "@/models/auth/auth";

export const DEMO_LOGIN = {
  email: "aarav.mehta@ierp.local",
  password: "Demo@Ierp2026",
};

export const demoUser: AuthUser = {
  id: "usr-aarav-mehta",
  email: DEMO_LOGIN.email,
  displayName: "Aarav Mehta",
  roleName: "Operations Controller",
  initials: "AM",
  tenantId: "tenant-hq-401",
};

export const demoLoginResponse: LoginResponse = {
  user: demoUser,
  accessToken: "mock-access-token",
  expiresInSeconds: 15 * 60,
  roles: ["Operations Controller", "Sales Manager"],
  permissions: [
    "*",
    PERMISSIONS.dashboard.view,
    PERMISSIONS.crm.leads.view,
    PERMISSIONS.crm.leads.create,
    PERMISSIONS.crm.leads.update,
    PERMISSIONS.crm.leads.delete,
    PERMISSIONS.crm.leads.print,
  ],
};
