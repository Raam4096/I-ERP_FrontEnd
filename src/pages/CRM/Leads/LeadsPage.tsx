import AddIcon from "@mui/icons-material/Add";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, IconButton, LinearProgress, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { HighValueLeadCard } from "@/components/cards/HighValueLeadCard/HighValueLeadCard";
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
import { resolveAiNextAction, resolveLeadConfidence } from "@/models/lead/lead";
import type { KpiMetric } from "@/models/dashboard/dashboard";
import { toastShown } from "@/redux/features/ui/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getErrorMessage } from "@/utils/errorHandling/getErrorMessage";
import { isBlank, isValidEmail } from "@/utils/validators/required";
import { InlineSelectField, InlineTextField } from "./InlineLeadField";
import { leadSourceOptions, leadStatusOptions } from "./leadOptions";
import { deleteLead, getAllMockLeads, getLeadKpis, listLeads, saveLead } from "./leadsApi";

const buildKpis = (items: Lead[]): KpiMetric[] => {
  const snapshot = getLeadKpis(items);
  return [
    { id: "total", label: "Total Leads", value: String(snapshot.total), icon: "people", trendPercent: 24, trendLabel: "+24%" },
    { id: "qualified", label: "Qualified", value: String(snapshot.qualified), icon: "check", trendPercent: 8, trendLabel: "+8%" },
    {
      id: "score",
      label: "Avg Lead Score",
      value: snapshot.averageScore.toFixed(1),
      icon: "trend",
      trendPercent: 8,
      trendLabel: "+8pts",
    },
  ];
};

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
  const [menuAnchor, setMenuAnchor] = useState<{ element: HTMLElement; row: Lead } | null>(null);

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
      setKpis(buildKpis(getAllMockLeads()));
    } catch (cause) {
      setError(getErrorMessage(cause));
    } finally {
      setLoading(false);
    }
  }, [query, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const featuredLead = getAllMockLeads()
    .filter((lead) => lead.leadScore >= 80)
    .sort((left, right) => right.leadScore - left.leadScore)[0];

  const patchDraft = (key: keyof Lead, value: string | number) => {
    setDraft((current) => {
      if (!current) {
        return current;
      }
      const next = { ...current, [key]: value };
      if (key === "leadScore" || key === "status") {
        next.confidence = resolveLeadConfidence(Number(next.leadScore), next.status);
        next.aiNextAction = resolveAiNextAction(Number(next.leadScore));
      }
      return next;
    });
  };

  const beginInlineEdit = (row: Lead) => {
    setEditingId(row.id);
    setDraft({ ...row });
    setMenuAnchor(null);
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
      setKpis(buildKpis(getAllMockLeads()));
    } catch (cause) {
      dispatch(toastShown({ message: getErrorMessage(cause), severity: "error" }));
    } finally {
      setSaving(false);
    }
  };

  const announceAction = useCallback(
    (action: string, lead: Lead) => {
      dispatch(toastShown({ message: `${action} queued for ${lead.leadName}.`, severity: "info" }));
    },
    [dispatch],
  );

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      { accessorKey: "leadId", header: "Lead ID", size: 104, minSize: 88 },
      {
        accessorKey: "leadName",
        header: "Lead Name",
        size: 140,
        minSize: 96,
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
        size: 148,
        minSize: 96,
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
        accessorKey: "leadSource",
        header: "Lead Source",
        size: 120,
        minSize: 96,
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
        size: 96,
        minSize: 80,
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
        id: "confidence",
        header: "Confidence",
        size: 148,
        minSize: 120,
        accessorFn: (row) => row.confidence ?? resolveLeadConfidence(row.leadScore, row.status),
        cell: ({ getValue }) => {
          const value = Number(getValue());
          return (
            <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ minWidth: 36 }}>
                {value}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                  flex: 1,
                  height: 4,
                  "& .MuiLinearProgress-bar": {
                    bgcolor: value >= 80 ? "success.main" : "warning.main",
                  },
                }}
              />
            </Stack>
          );
        },
      },
      {
        id: "aiNextAction",
        header: "AI Next Action",
        size: 188,
        minSize: 160,
        accessorFn: (row) => row.aiNextAction ?? resolveAiNextAction(row.leadScore),
        cell: ({ row, getValue }) => (
          <Button
            size="small"
            variant="outlined"
            startIcon={<BoltIcon fontSize="small" />}
            onClick={() => announceAction(String(getValue()), row.original)}
            sx={{
              borderColor: "primary.main",
              color: "primary.light",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            {String(getValue())}
          </Button>
        ),
      },
    ],
    [announceAction, draft, editingId],
  );

  return (
    <Stack gap={2.25}>
      <PageHeader
        eyebrow="Terminal > CRM & Customer Engagement"
        title="Lead Management"
        uppercase
        actions={
          <Stack direction="row" gap={1} alignItems="center">
            <PermissionGate permission={PERMISSIONS.crm.leads.create}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(ROUTES.crm.leadNew)}
                sx={{
                  letterSpacing: "0.08em",
                  boxShadow: (theme) => `0 0 22px ${alpha(theme.palette.primary.main, 0.45)}`,
                }}
              >
                NEW LEAD
              </Button>
            </PermissionGate>
            <Tooltip title="Worklist settings">
              <IconButton
                aria-label="Worklist settings"
                onClick={() => navigate(ROUTES.settings)}
                sx={{ width: 40, height: 40, border: 1, borderColor: "divider", borderRadius: 1.5 }}
              >
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        }
      />

      <Stack
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {kpis.map((metric) => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </Stack>

      {featuredLead ? (
        <HighValueLeadCard
          leadName={featuredLead.leadName}
          leadScore={featuredLead.leadScore}
          onStart={() => announceAction("START ENGAGEMENT", featuredLead)}
        />
      ) : null}

      <DataTable
        columns={columns}
        data={rows}
        total={total}
        page={tableState.query.page}
        pageSize={tableState.query.pageSize}
        search={tableState.search}
        sorting={sorting}
        loading={loading}
        error={error}
        variant="cards"
        paginationStyle="count"
        revealActionsOnHover={false}
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
            <Tooltip title="Row actions">
              <IconButton
                aria-label={`Actions for ${row.leadId}`}
                size="small"
                onClick={(event: MouseEvent<HTMLElement>) => setMenuAnchor({ element: event.currentTarget, row })}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
      />

      <Menu
        anchorEl={menuAnchor?.element}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            if (menuAnchor) {
              navigate(ROUTES.crm.leadView(menuAnchor.row.id));
            }
          }}
        >
          <VisibilityOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          View
        </MenuItem>
        <PermissionGate permission={PERMISSIONS.crm.leads.update}>
          <MenuItem
            onClick={() => {
              if (menuAnchor) {
                beginInlineEdit(menuAnchor.row);
              }
            }}
          >
            <EditOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            Edit inline
          </MenuItem>
        </PermissionGate>
        <PermissionGate permission={PERMISSIONS.crm.leads.print}>
          <MenuItem
            onClick={() => {
              setMenuAnchor(null);
              dispatch(toastShown({ message: "Print engine is reserved for a later phase.", severity: "info" }));
            }}
          >
            <PrintOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
            Print
          </MenuItem>
        </PermissionGate>
        <PermissionGate permission={PERMISSIONS.crm.leads.delete}>
          <MenuItem
            onClick={() => {
              if (menuAnchor) {
                setPendingDelete(menuAnchor.row);
                setMenuAnchor(null);
              }
            }}
          >
            <DeleteOutlineIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </PermissionGate>
      </Menu>

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
