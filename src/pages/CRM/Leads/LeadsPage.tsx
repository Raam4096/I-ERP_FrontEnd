import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KpiCard } from "@/components/cards/KpiCard/KpiCard";
import { ConfirmDialog } from "@/components/common/ConfirmDialog/ConfirmDialog";
import { FilterPanel } from "@/components/common/FilterPanel/FilterPanel";
import { PermissionGate } from "@/components/common/PermissionGate/PermissionGate";
import { PageHeader } from "@/components/common/PageHeader/PageHeader";
import { StatusChip } from "@/components/common/StatusChip/StatusChip";
import { SelectField } from "@/components/forms/fields";
import { DataTable } from "@/components/tables/DataTable/DataTable";
import { PERMISSIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";
import { LEAD_STATUSES, type LeadStatus } from "@/constants/statuses";
import { useTableState } from "@/hooks/useTableState";
import type { Lead } from "@/models/lead/lead";
import type { KpiMetric } from "@/models/dashboard/dashboard";
import { toastShown } from "@/redux/features/ui/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { formatDate } from "@/utils/formatters";
import { getErrorMessage } from "@/utils/errorHandling/getErrorMessage";
import { isBlank, isValidEmail } from "@/utils/validators/required";
import { InlineSelectField, InlineTextField } from "./InlineLeadField";
import { leadAssigneeOptions, leadSourceOptions, leadStatusOptions } from "./leadOptions";
import { deleteLead, getAllMockLeads, getLeadKpis, listLeads, saveLead } from "./leadsApi";

export const LeadsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tableState = useTableState({ pageSize: 8, sortBy: "createdDate", sortDir: "desc" });
  const [rows, setRows] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Lead | null>(null);
  const [kpis, setKpis] = useState<KpiMetric[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);

  const sorting = useMemo<SortingState>(
    () =>
      tableState.query.sortBy
        ? [{ id: tableState.query.sortBy, desc: tableState.query.sortDir === "desc" }]
        : [],
    [tableState.query.sortBy, tableState.query.sortDir],
  );

  const query = tableState.query;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listLeads({
        ...query,
        status: statusFilter || undefined,
      });
      setRows(result.data);
      setTotal(result.pagination.total);
      const snapshot = getLeadKpis(getAllMockLeads());
      setKpis([
        { id: "total", label: "Total Leads", value: String(snapshot.total), hint: "Active local dataset" },
        { id: "qualified", label: "Qualified Leads", value: String(snapshot.qualified), hint: "Status = Qualified" },
        {
          id: "disqualified",
          label: "Disqualified Leads",
          value: String(snapshot.disqualified),
          hint: "Status = Disqualified",
        },
        {
          id: "score",
          label: "Average Lead Score",
          value: snapshot.averageScore.toFixed(1),
          hint: "Across all leads",
        },
      ]);
    } catch (cause) {
      setError(getErrorMessage(cause));
    } finally {
      setLoading(false);
    }
  }, [query, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const patchDraft = (key: keyof Lead, value: string | number) => {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  };

  const beginInlineEdit = (row: Lead) => {
    setEditingId(row.id);
    setDraft({ ...row });
  };

  const cancelInlineEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const commitInlineEdit = async () => {
    if (!draft) {
      return;
    }
    if (isBlank(draft.leadName) || isBlank(draft.company) || isBlank(draft.phone) || !isValidEmail(draft.email)) {
      dispatch(
        toastShown({
          message: "Name, company, phone and a valid email are required.",
          severity: "warning",
        }),
      );
      return;
    }

    setSaving(true);
    try {
      const saved = await saveLead(draft);
      setRows((current) => current.map((row) => (row.id === saved.id ? saved : row)));
      cancelInlineEdit();
      dispatch(toastShown({ message: `${saved.leadId} updated.`, severity: "success" }));
      const snapshot = getLeadKpis(getAllMockLeads());
      setKpis((current) =>
        current.map((metric) => {
          if (metric.id === "qualified") return { ...metric, value: String(snapshot.qualified) };
          if (metric.id === "disqualified") return { ...metric, value: String(snapshot.disqualified) };
          if (metric.id === "score") return { ...metric, value: snapshot.averageScore.toFixed(1) };
          return metric;
        }),
      );
    } catch (cause) {
      dispatch(toastShown({ message: getErrorMessage(cause), severity: "error" }));
    } finally {
      setSaving(false);
    }
  };

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      { accessorKey: "leadId", header: "Lead ID", size: 96, minSize: 80 },
      {
        accessorKey: "leadName",
        header: "Lead Name",
        size: 132,
        minSize: 88,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineTextField
              ariaLabel="Lead name"
              value={draft.leadName}
              onChange={(value) => patchDraft("leadName", value)}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "company",
        header: "Company",
        size: 140,
        minSize: 88,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineTextField
              ariaLabel="Company"
              value={draft.company}
              onChange={(value) => patchDraft("company", value)}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 168,
        minSize: 110,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineTextField
              ariaLabel="Email"
              type="email"
              value={draft.email}
              onChange={(value) => patchDraft("email", value)}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 128,
        minSize: 96,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineTextField
              ariaLabel="Phone"
              type="tel"
              value={draft.phone}
              onChange={(value) => patchDraft("phone", value)}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "leadSource",
        header: "Lead Source",
        size: 112,
        minSize: 88,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineSelectField
              ariaLabel="Lead source"
              value={draft.leadSource}
              onChange={(value) => patchDraft("leadSource", value)}
              options={leadSourceOptions}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 120,
        minSize: 96,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineSelectField
              ariaLabel="Status"
              value={draft.status}
              onChange={(value) => patchDraft("status", value as LeadStatus)}
              options={leadStatusOptions}
            />
          ) : (
            <StatusChip label={String(getValue())} />
          ),
      },
      {
        accessorKey: "leadScore",
        header: "Lead Score",
        size: 88,
        minSize: 72,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineTextField
              ariaLabel="Lead score"
              type="number"
              value={String(draft.leadScore)}
              onChange={(value) => patchDraft("leadScore", Number(value) || 0)}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "assignedTo",
        header: "Assigned To",
        size: 128,
        minSize: 88,
        cell: ({ row, getValue }) =>
          editingId === row.original.id && draft ? (
            <InlineSelectField
              ariaLabel="Assigned to"
              value={draft.assignedTo}
              onChange={(value) => patchDraft("assignedTo", value)}
              options={leadAssigneeOptions}
            />
          ) : (
            String(getValue())
          ),
      },
      {
        accessorKey: "createdDate",
        header: "Created Date",
        size: 120,
        minSize: 96,
        cell: ({ getValue }) => formatDate(String(getValue())),
      },
    ],
    [draft, editingId],
  );

  return (
    <Stack gap={2.25}>
      <PageHeader
        title="Leads"
        description="CRM · operational worklist with role-aware actions and audit-ready documents."
        badge={<StatusChip label="Live" tone="info" />}
        actions={
          <PermissionGate permission={PERMISSIONS.crm.leads.create}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(ROUTES.crm.leadNew)}>
              New
            </Button>
          </PermissionGate>
        }
      />

      <Stack
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", xl: "repeat(4, minmax(0, 1fr))" },
        }}
      >
        {kpis.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </Stack>

      <DataTable
        title="Leads Worklist"
        subtitle="Track, qualify and process incoming CRM leads."
        columns={columns}
        data={rows}
        total={total}
        page={tableState.query.page}
        pageSize={tableState.query.pageSize}
        search={tableState.search}
        sorting={sorting}
        loading={loading}
        error={error}
        enableSelection
        revealActionsOnHover
        alwaysRevealActions={(row) => row.id === editingId}
        searchPlaceholder="Search records..."
        onSearchChange={tableState.setSearch}
        onPageChange={tableState.setPage}
        onRetry={() => void load()}
        getRowId={(row) => row.id}
        onSortingChange={(updater) => {
          const next = typeof updater === "function" ? updater(sorting) : updater;
          const first = next[0];
          tableState.setSort(first?.id, first ? (first.desc ? "desc" : "asc") : undefined);
        }}
        filters={
          <FilterPanel
            onClear={() => {
              setStatusFilter("");
              tableState.setPage(1);
            }}
          >
            <SelectField
              name="status"
              label="Status"
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                tableState.setPage(1);
              }}
              options={[
                { value: "", label: "All statuses" },
                ...Object.values(LEAD_STATUSES).map((value) => ({ value, label: value })),
              ]}
            />
          </FilterPanel>
        }
        rowActions={(row) =>
          editingId === row.id ? (
            <Stack direction="row">
              <Tooltip title="Save">
                <IconButton
                  aria-label={`Save ${row.leadId}`}
                  size="small"
                  color="primary"
                  disabled={saving}
                  onClick={() => void commitInlineEdit()}
                >
                  <CheckIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton aria-label="Cancel inline edit" size="small" disabled={saving} onClick={cancelInlineEdit}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : (
            <Stack direction="row">
              <Tooltip title="View">
                <IconButton
                  aria-label={`View ${row.leadId}`}
                  size="small"
                  onClick={() => navigate(ROUTES.crm.leadView(row.id))}
                >
                  <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <PermissionGate permission={PERMISSIONS.crm.leads.update}>
                <Tooltip title="Edit inline">
                  <IconButton aria-label={`Edit ${row.leadId}`} size="small" onClick={() => beginInlineEdit(row)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </PermissionGate>
              <PermissionGate permission={PERMISSIONS.crm.leads.delete}>
                <Tooltip title="Delete">
                  <IconButton aria-label={`Delete ${row.leadId}`} size="small" onClick={() => setPendingDelete(row)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </PermissionGate>
              <PermissionGate permission={PERMISSIONS.crm.leads.print}>
                <Tooltip title="Print">
                  <IconButton
                    aria-label={`Print ${row.leadId}`}
                    size="small"
                    onClick={() =>
                      dispatch(toastShown({ message: "Print engine is reserved for a later phase.", severity: "info" }))
                    }
                  >
                    <PrintOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </PermissionGate>
            </Stack>
          )
        }
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete lead"
        description={`Delete ${pendingDelete?.leadId} (${pendingDelete?.leadName})? This is a soft operational delete in the worklist.`}
        confirmLabel="Delete"
        tone="error"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (!pendingDelete) {
            return;
          }
          void deleteLead(pendingDelete.id)
            .then(() => {
              dispatch(toastShown({ message: `${pendingDelete.leadId} deleted.`, severity: "success" }));
              setPendingDelete(null);
              if (editingId === pendingDelete.id) {
                cancelInlineEdit();
              }
              void load();
            })
            .catch((cause) => {
              dispatch(toastShown({ message: getErrorMessage(cause), severity: "error" }));
            });
        }}
      />
    </Stack>
  );
};
