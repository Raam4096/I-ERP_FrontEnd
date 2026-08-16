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
  confidence?: number;
  aiNextAction?: string;
  industry?: string;
  projectType?: string;
  website?: string;
  companySize?: string;
  annualRevenue?: string;
  address?: string;
  subsidiary?: string;
  notes?: string;
  followUpDate?: string;
  followUpType?: string;
  followUpNotes?: string;
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
  followUpDate: string;
  followUpType: string;
  followUpNotes: string;
}

export const resolveLeadConfidence = (score: number, status: LeadStatus): number =>
  Math.min(99, Math.max(20, score + (status === "Qualified" ? 4 : status === "Disqualified" ? -8 : 0)));

export const formatLeadDisplayId = (leadId: string): string => {
  const digits = leadId.replace(/\D/g, "").slice(-3);
  return `LID-${digits.padStart(3, "0")}`;
};

export const resolveAiNextAction = (score: number): string => {
  if (score >= 80) {
    return "START ENGAGEMENT";
  }
  if (score >= 60) {
    return "SCHEDULE DEMO";
  }
  return "INITIAL OUTREACH";
};

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
  followUpDate: "",
  followUpType: "",
  followUpNotes: "",
});
