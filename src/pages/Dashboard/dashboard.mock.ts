import type { DashboardSnapshot } from "@/models/dashboard/dashboard";

export const dashboardSnapshot: DashboardSnapshot = {
  fiscalPeriod: "Q3 FY 2024",
  kpis: [
    {
      id: "revenue",
      label: "Revenue",
      value: "$1,245,000.00",
      trendPercent: 12.4,
      tone: "success",
    },
    {
      id: "expenses",
      label: "Expenses",
      value: "$785,200.00",
      trendPercent: -8.2,
      tone: "error",
    },
    {
      id: "net-profit",
      label: "Net Profit",
      value: "$459,800.00",
      trendPercent: 15.6,
      tone: "success",
    },
    {
      id: "cash",
      label: "Cash Balance",
      value: "$312,450.00",
      trendPercent: 4.2,
      tone: "success",
    },
  ],
  commercialPerformance: [
    { label: "Jan", actual: 62 },
    { label: "Feb", actual: 74 },
    { label: "Mar", actual: 58 },
    { label: "Apr", actual: 81 },
    { label: "May", actual: 69 },
    { label: "Jun", actual: 88 },
    { label: "Jul", actual: 76 },
    { label: "Aug", actual: 93 },
  ],
  auditLogs: [
    { id: "aud-1", party: "ASTRA STRUCTURES", amount: "$154,200", status: "Paid" },
    { id: "aud-2", party: "STEELWORKS INT", amount: "$82,000", status: "Pending" },
    { id: "aud-3", party: "HORIZON LOGISTICS", amount: "$12,000", status: "Draft" },
  ],
  pendingApprovals: [{ id: "apr-1", label: "Sales Approvals", count: 1 }],
  anomaly: {
    title: "Market Anomaly Detection",
    body: "Autonomous data stream analysis indicates a 12.4% price surge for raw steel. Immediate hedging recommended.",
    checks: [
      { id: "c1", label: "Market Volatility Analysis", done: true },
      { id: "c2", label: "Risk Mitigation Strategy", done: true },
      { id: "c3", label: "Execution Approval", done: false },
    ],
  },
  intelligence: [
    {
      id: "intel-1",
      title: "Liquidity Forecast",
      body: "Predicts a 12% increase in Q3 liquidity if receivables cycle compresses by four days.",
    },
    {
      id: "intel-2",
      title: "Risk Exposure",
      body: "High sensitivity detected in raw material pricing. Steel and logistics remain the primary drivers.",
    },
    {
      id: "intel-3",
      title: "Operational Pulse",
      body: "Overall efficiency is up 8.4% against the previous fiscal period.",
    },
  ],
  activity: [
    {
      id: "act-1",
      actor: "Sarah Kong",
      role: "Sales",
      action: "Drafted quotation QT-4432 ($154.2K)",
      occurredAgo: "2m ago",
    },
    {
      id: "act-2",
      actor: "AI Engine",
      role: "Autonomous",
      action: "Verified vendor compliance V002 (PASS)",
      occurredAgo: "8m ago",
    },
    {
      id: "act-3",
      actor: "M. Ahmed",
      role: "Finance",
      action: "Posted cash application CA-8891",
      occurredAgo: "21m ago",
    },
  ],
};
