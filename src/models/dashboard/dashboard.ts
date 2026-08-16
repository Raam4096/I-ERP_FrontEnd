export type KpiIconKey = "people" | "check" | "trend";

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  hint?: string;
  trendPercent?: number;
  trendLabel?: string;
  icon?: KpiIconKey;
  tone?: "default" | "success" | "warning" | "error";
}

export interface ChartPoint {
  label: string;
  actual: number;
}

export interface AuditLogItem {
  id: string;
  party: string;
  amount: string;
  status: "Paid" | "Pending" | "Draft";
}

export interface PendingApproval {
  id: string;
  label: string;
  count: number;
}

export interface IntelligenceItem {
  id: string;
  title: string;
  body: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  role: string;
  action: string;
  occurredAgo: string;
}

export interface AnomalyInsight {
  title: string;
  body: string;
  checks: Array<{ id: string; label: string; done: boolean }>;
}

export interface DashboardSnapshot {
  fiscalPeriod: string;
  kpis: KpiMetric[];
  commercialPerformance: ChartPoint[];
  auditLogs: AuditLogItem[];
  pendingApprovals: PendingApproval[];
  anomaly: AnomalyInsight;
  intelligence: IntelligenceItem[];
  activity: ActivityItem[];
}