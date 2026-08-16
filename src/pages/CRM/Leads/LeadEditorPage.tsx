import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorState } from "@/components/common/ErrorState/ErrorState";
import { LoadingState } from "@/components/common/LoadingState/LoadingState";
import { PageHeader } from "@/components/common/PageHeader/PageHeader";
import { ROUTES } from "@/constants/routes";
import { emptyLeadDraft, type LeadDraft } from "@/models/lead/lead";
import { toastShown } from "@/redux/features/ui/uiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getErrorMessage } from "@/utils/errorHandling/getErrorMessage";
import { LeadForm } from "./LeadForm";
import { createLead, getLead, updateLead } from "./leadsApi";

interface LeadEditorPageProps {
  mode: "create" | "edit";
}

export const LeadEditorPage = ({ mode }: LeadEditorPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState<LeadDraft>(emptyLeadDraft());
  const [loading, setLoading] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "edit" || !id) {
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const lead = await getLead(id);
        setDraft({
          company: lead.company,
          contactPerson: lead.leadName,
          phone: lead.phone,
          email: lead.email,
          industry: lead.industry ?? "",
          projectType: lead.projectType ?? "",
          leadSource: lead.leadSource,
          status: lead.status,
          assignedTo: lead.assignedTo,
          website: lead.website ?? "",
          companySize: lead.companySize ?? "",
          annualRevenue: lead.annualRevenue ?? "",
          address: lead.address ?? "",
          subsidiary: lead.subsidiary ?? "",
          notes: lead.notes ?? "",
        });
      } catch (cause) {
        setError(getErrorMessage(cause));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id, mode]);

  const save = async () => {
    setSubmitting(true);
    try {
      const saved = mode === "create" ? await createLead(draft) : await updateLead(id ?? "", draft);
      dispatch(toastShown({ message: `${saved.leadId} saved.`, severity: "success" }));
      navigate(ROUTES.crm.leads);
    } catch (cause) {
      dispatch(toastShown({ message: getErrorMessage(cause), severity: "error" }));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState label="Loading lead…" />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => navigate(ROUTES.crm.leads)} />;
  }

  return (
    <>
      <PageHeader
        eyebrow="TERMINAL · CRM & CUSTOMER ENGAGEMENT"
        title={mode === "create" ? "Contact Information" : "Edit Lead"}
        description={
          mode === "create"
            ? "Create a CRM lead with role-aware capture fields."
            : "Update an existing lead without leaving the operational worklist pattern."
        }
      />
      <LeadForm
        value={draft}
        submitting={submitting}
        onChange={setDraft}
        onSubmit={() => void save()}
        onCancel={() => navigate(ROUTES.crm.leads)}
      />
    </>
  );
};
