/**
 * Permission keys follow module.resource.action.
 * Frontend gates are UX only — the API remains the authorization source of truth.
 */
export const PERMISSIONS = {
  dashboard: { view: "dashboard.view" },
  crm: {
    leads: {
      view: "crm.leads.view",
      create: "crm.leads.create",
      update: "crm.leads.update",
      delete: "crm.leads.delete",
      print: "crm.leads.print",
    },
  },
  sales: {
    quotation: {
      view: "sales.quotation.view",
      create: "sales.quotation.create",
      approve: "sales.quotation.approve",
    },
  },
  finance: {
    ledger: { view: "finance.ledger.view" },
  },
  admin: {
    users: { manage: "admin.users.manage" },
    metadata: { manage: "admin.metadata.manage" },
  },
} as const;

export type PermissionKey = string;
