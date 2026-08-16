import type { LeadStatus } from "@/constants/statuses";

export interface Lead {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  phone: string;
  leadSource: string;
  status: LeadStatus;
  leadScore: number;
  assignedTo: string;
  createdDate: string;
  industry?: string;
  projectType?: string;
  website?: string;
  companySize?: string;
  annualRevenue?: string;
  address?: string;
  subsidiary?: string;
  notes?: string;
}

export interface LeadDraft {
  company: string;
  contactPerson: string;
  phone: string;
  email: string;
  industry: string;
  projectType: string;
  leadSource: string;
  status: LeadStatus;
  assignedTo: string;
  website: string;
  companySize: string;
  annualRevenue: string;
  address: string;
  subsidiary: string;
  notes: string;
}

export const emptyLeadDraft = (): LeadDraft => ({
  company: "",
  contactPerson: "",
  phone: "",
  email: "",
  industry: "",
  projectType: "",
  leadSource: "",
  status: "New",
  assignedTo: "",
  website: "",
  companySize: "",
  annualRevenue: "",
  address: "",
  subsidiary: "",
  notes: "",
});
