/* eslint-disable react-refresh/only-export-components */
import type { ComponentType } from "react";
import type { MetadataControlType, MetadataField } from "@/models/metadata/metadata";
import { BooleanField, SelectField, TextFieldControl } from "@/components/forms/fields";

export interface FieldRendererProps {
  field: MetadataField;
  value: string | number | boolean;
  error?: string;
  onChange: (value: string | number | boolean) => void;
}

const TextRenderer = ({ field, value, error, onChange }: FieldRendererProps) => (
  <TextFieldControl
    name={field.fieldKey}
    label={field.label}
    value={String(value ?? "")}
    onChange={onChange}
    required={field.required}
    disabled={field.readOnly}
    error={error}
    multiline={field.controlType === "textarea"}
    minRows={field.controlType === "textarea" ? 3 : undefined}
  />
);

const NumberRenderer = ({ field, value, error, onChange }: FieldRendererProps) => (
  <TextFieldControl
    name={field.fieldKey}
    label={field.label}
    type="number"
    value={String(value ?? "")}
    onChange={(next) => onChange(next === "" ? "" : Number(next))}
    required={field.required}
    disabled={field.readOnly}
    error={error}
  />
);

const DateRenderer = ({ field, value, error, onChange }: FieldRendererProps) => (
  <TextFieldControl
    name={field.fieldKey}
    label={field.label}
    type="date"
    value={String(value ?? "")}
    onChange={onChange}
    required={field.required}
    disabled={field.readOnly}
    error={error}
  />
);

const BooleanRenderer = ({ field, value, onChange }: FieldRendererProps) => (
  <BooleanField
    name={field.fieldKey}
    label={field.label}
    value={Boolean(value)}
    onChange={onChange}
    disabled={field.readOnly}
  />
);

const SelectRenderer = ({ field, value, error, onChange }: FieldRendererProps) => (
  <SelectField
    name={field.fieldKey}
    label={field.label}
    value={String(value ?? "")}
    onChange={onChange}
    required={field.required}
    disabled={field.readOnly}
    error={error}
    options={field.options ?? []}
  />
);

/**
 * Control map stays data-driven so new field types register here instead of
 * growing a switch statement inside GenericPage.
 */
export const fieldRendererMap: Record<MetadataControlType, ComponentType<FieldRendererProps>> = {
  text: TextRenderer,
  number: NumberRenderer,
  date: DateRenderer,
  boolean: BooleanRenderer,
  select: SelectRenderer,
  lookup: SelectRenderer,
  textarea: TextRenderer,
};
