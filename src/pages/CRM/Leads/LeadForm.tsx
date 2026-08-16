import { Button, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { FieldGrid, SelectField, TextFieldControl } from "@/components/forms/fields";
import { FormSection } from "@/components/forms/FormSection";
import type { LeadStatus } from "@/constants/statuses";
import type { LeadDraft } from "@/models/lead/lead";
import { isBlank, isValidEmail } from "@/utils/validators/required";
import {
  leadAssigneeOptions,
  leadIndustryOptions,
  leadProjectOptions,
  leadRevenueOptions,
  leadSizeOptions,
  leadSourceOptions,
  leadStatusOptions,
  leadSubsidiaryOptions,
} from "./leadOptions";

interface LeadFormProps {
  value: LeadDraft;
  submitting?: boolean;
  onChange: (value: LeadDraft) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const LeadForm = ({ value, submitting, onChange, onSubmit, onCancel }: LeadFormProps) => {
  const [attempted, setAttempted] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof LeadDraft, string>> = {};
    if (isBlank(value.company)) next.company = "Company name is required.";
    if (isBlank(value.contactPerson)) next.contactPerson = "Contact person is required.";
    if (isBlank(value.phone)) next.phone = "Phone number is required.";
    if (isBlank(value.email) || !isValidEmail(value.email)) next.email = "A valid email is required.";
    if (isBlank(value.address)) next.address = "Address is required.";
    return next;
  }, [value]);

  const patch = (key: keyof LeadDraft, next: string) => onChange({ ...value, [key]: next });

  return (
    <Stack gap={2} component="form" onSubmit={(event) => event.preventDefault()}>
      <FormSection title="Primary Information" description="Capture the essential lead details.">
        <FieldGrid>
          <TextFieldControl
            name="company"
            label="Company Name"
            required
            value={value.company}
            onChange={(next) => patch("company", next)}
            error={attempted ? errors.company : undefined}
          />
          <TextFieldControl
            name="contactPerson"
            label="Contact Person"
            required
            value={value.contactPerson}
            onChange={(next) => patch("contactPerson", next)}
            error={attempted ? errors.contactPerson : undefined}
          />
          <TextFieldControl
            name="phone"
            label="Phone Number"
            required
            type="tel"
            value={value.phone}
            onChange={(next) => patch("phone", next)}
            error={attempted ? errors.phone : undefined}
          />
          <TextFieldControl
            name="email"
            label="Email"
            required
            type="email"
            value={value.email}
            onChange={(next) => patch("email", next)}
            error={attempted ? errors.email : undefined}
          />
          <SelectField
            name="industry"
            label="Industry"
            value={value.industry}
            onChange={(next) => patch("industry", next)}
            options={leadIndustryOptions}
          />
          <SelectField
            name="projectType"
            label="Project Type"
            value={value.projectType}
            onChange={(next) => patch("projectType", next)}
            options={leadProjectOptions}
          />
          <SelectField
            name="leadSource"
            label="Lead Source"
            value={value.leadSource}
            onChange={(next) => patch("leadSource", next)}
            options={leadSourceOptions}
          />
          <SelectField
            name="status"
            label="Status"
            value={value.status}
            onChange={(next) => patch("status", next as LeadStatus)}
            options={leadStatusOptions}
          />
          <SelectField
            name="assignedTo"
            label="Assigned To"
            value={value.assignedTo}
            onChange={(next) => patch("assignedTo", next)}
            options={leadAssigneeOptions}
          />
          <TextFieldControl
            name="website"
            label="Website"
            type="url"
            value={value.website}
            onChange={(next) => patch("website", next)}
          />
          <SelectField
            name="companySize"
            label="Company Size"
            value={value.companySize}
            onChange={(next) => patch("companySize", next)}
            options={leadSizeOptions}
          />
          <SelectField
            name="annualRevenue"
            label="Annual Revenue"
            value={value.annualRevenue}
            onChange={(next) => patch("annualRevenue", next)}
            options={leadRevenueOptions}
          />
        </FieldGrid>
        <TextFieldControl
          name="address"
          label="Address"
          required
          multiline
          minRows={3}
          value={value.address}
          onChange={(next) => patch("address", next)}
          error={attempted ? errors.address : undefined}
        />
      </FormSection>

      <FormSection title="Classification" description="Map the lead to the correct subsidiary.">
        <SelectField
          name="subsidiary"
          label="Subsidiary"
          value={value.subsidiary}
          onChange={(next) => patch("subsidiary", next)}
          options={leadSubsidiaryOptions}
        />
      </FormSection>

      <FormSection title="Additional Information" description="Capture context, scope and notes.">
        <TextFieldControl
          name="notes"
          label="Notes"
          multiline
          minRows={4}
          value={value.notes}
          onChange={(next) => patch("notes", next)}
        />
      </FormSection>

      <Stack direction="row" justifyContent="flex-end" gap={1}>
        <Button variant="outlined" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={submitting}
          onClick={() => {
            setAttempted(true);
            if (Object.keys(errors).length === 0) {
              onSubmit();
            }
          }}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};
