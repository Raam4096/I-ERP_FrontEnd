import { API_ENDPOINTS, USE_MOCK, http, unwrapData } from "@/configurations/api";
import { mockLatency } from "@/configurations/api/delay";
import { ERROR_CODES } from "@/constants/errorCodes";
import type { ApiPaginatedSuccess, ListQuery } from "@/models/common/api";
import { NormalizedApiError } from "@/models/common/api";
import type { Lead, LeadDraft } from "@/models/lead/lead";
import { leadRecords } from "./leads.mock";

let localLeads = [...leadRecords];

const applyListQuery = (items: Lead[], query: ListQuery): ApiPaginatedSuccess<Lead> => {
  const search = query.search?.trim().toLowerCase() ?? "";
  const status = String(query.status ?? "");
  const filtered = items.filter((lead) => {
    const matchesSearch =
      !search ||
      [lead.leadId, lead.leadName, lead.company, lead.email, lead.assignedTo, lead.status]
        .join(" ")
        .toLowerCase()
        .includes(search);
    const matchesStatus = !status || lead.status === status;
    return matchesSearch && matchesStatus;
  });

  const sortBy = query.sortBy as keyof Lead | undefined;
  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) {
      return 0;
    }
    const left = String(a[sortBy] ?? "");
    const right = String(b[sortBy] ?? "");
    const result = left.localeCompare(right, undefined, { numeric: true });
    return query.sortDir === "desc" ? -result : result;
  });

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;
  const start = (page - 1) * pageSize;
  const data = sorted.slice(start, start + pageSize);

  return {
    success: true,
    data,
    pagination: {
      page,
      pageSize,
      total: sorted.length,
      totalPages: Math.max(1, Math.ceil(sorted.length / pageSize)),
    },
  };
};

export const listLeads = async (query: ListQuery): Promise<ApiPaginatedSuccess<Lead>> => {
  if (USE_MOCK) {
    await mockLatency();
    return applyListQuery(localLeads, query);
  }

  const response = await http.get(API_ENDPOINTS.leads.list, { params: query });
  return response.data as ApiPaginatedSuccess<Lead>;
};

export const getLead = async (id: string): Promise<Lead> => {
  if (USE_MOCK) {
    await mockLatency();
    const match = localLeads.find((lead) => lead.id === id || lead.leadId === id);
    if (!match) {
      throw new NormalizedApiError(ERROR_CODES.NOT_FOUND, "Lead was not found.", 404);
    }
    return match;
  }

  const response = await http.get(API_ENDPOINTS.leads.byId(id));
  return unwrapData<Lead>(response.data);
};

export const createLead = async (draft: LeadDraft): Promise<Lead> => {
  if (USE_MOCK) {
    await mockLatency();
    const nextNumber = 1000 + localLeads.length + 1;
    const created: Lead = {
      id: `ld-${nextNumber}`,
      leadId: `LD-${nextNumber}`,
      leadName: draft.contactPerson,
      company: draft.company,
      email: draft.email,
      phone: draft.phone,
      leadSource: draft.leadSource || "Website",
      status: draft.status,
      leadScore: 40,
      assignedTo: draft.assignedTo || "Unassigned",
      createdDate: new Date().toISOString().slice(0, 10),
      industry: draft.industry,
      projectType: draft.projectType,
      website: draft.website,
      companySize: draft.companySize,
      annualRevenue: draft.annualRevenue,
      address: draft.address,
      subsidiary: draft.subsidiary,
      notes: draft.notes,
    };
    localLeads = [created, ...localLeads];
    return created;
  }

  const response = await http.post(API_ENDPOINTS.leads.list, draft);
  return unwrapData<Lead>(response.data);
};

export const updateLead = async (id: string, draft: LeadDraft): Promise<Lead> => {
  if (USE_MOCK) {
    await mockLatency();
    const index = localLeads.findIndex((lead) => lead.id === id);
    if (index < 0) {
      throw new NormalizedApiError(ERROR_CODES.NOT_FOUND, "Lead was not found.", 404);
    }
    const updated: Lead = {
      ...localLeads[index],
      leadName: draft.contactPerson,
      company: draft.company,
      email: draft.email,
      phone: draft.phone,
      leadSource: draft.leadSource,
      status: draft.status,
      assignedTo: draft.assignedTo,
      industry: draft.industry,
      projectType: draft.projectType,
      website: draft.website,
      companySize: draft.companySize,
      annualRevenue: draft.annualRevenue,
      address: draft.address,
      subsidiary: draft.subsidiary,
      notes: draft.notes,
    };
    localLeads = localLeads.map((lead, leadIndex) => (leadIndex === index ? updated : lead));
    return updated;
  }

  const response = await http.put(API_ENDPOINTS.leads.byId(id), draft);
  return unwrapData<Lead>(response.data);
};

export const saveLead = async (next: Lead): Promise<Lead> => {
  if (USE_MOCK) {
    await mockLatency();
    const index = localLeads.findIndex((lead) => lead.id === next.id);
    if (index < 0) {
      throw new NormalizedApiError(ERROR_CODES.NOT_FOUND, "Lead was not found.", 404);
    }
    localLeads = localLeads.map((lead, leadIndex) => (leadIndex === index ? next : lead));
    return next;
  }

  const response = await http.put(API_ENDPOINTS.leads.byId(next.id), next);
  return unwrapData<Lead>(response.data);
};

export const deleteLead = async (id: string): Promise<void> => {
  if (USE_MOCK) {
    await mockLatency();
    localLeads = localLeads.filter((lead) => lead.id !== id);
    return;
  }

  await http.delete(API_ENDPOINTS.leads.byId(id));
};

export const getLeadKpis = (items: Lead[]) => {
  const qualified = items.filter((lead) => lead.status === "Qualified").length;
  const disqualified = items.filter((lead) => lead.status === "Disqualified").length;
  const average =
    items.length === 0 ? 0 : items.reduce((sum, lead) => sum + lead.leadScore, 0) / items.length;

  return {
    total: items.length,
    qualified,
    disqualified,
    averageScore: Number(average.toFixed(1)),
  };
};

export const getAllMockLeads = (): Lead[] => localLeads;
