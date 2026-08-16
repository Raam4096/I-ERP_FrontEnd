import { Box } from "@mui/material";
import type { MetadataSection } from "@/models/metadata/metadata";
import { FormSection } from "@/components/forms/FormSection";
import { MetadataFieldRenderer } from "./MetadataFieldRenderer";

interface MetadataSectionRendererProps {
  section: MetadataSection;
  values: Record<string, string | number | boolean>;
  errors: Record<string, string>;
  deniedFields: string[];
  onChange: (fieldKey: string, value: string | number | boolean) => void;
}

export const MetadataSectionRenderer = ({
  section,
  values,
  errors,
  deniedFields,
  onChange,
}: MetadataSectionRendererProps) => {
  const fields = [...section.fields].sort((left, right) => left.displayOrder - right.displayOrder);

  return (
    <FormSection title={section.title} description={section.description}>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        }}
      >
        {fields.map((field) => (
          <MetadataFieldRenderer
            key={field.fieldKey}
            field={field}
            value={values[field.fieldKey] ?? ""}
            error={errors[field.fieldKey]}
            denied={deniedFields.includes(field.fieldKey)}
            onChange={(value) => onChange(field.fieldKey, value)}
          />
        ))}
      </Box>
    </FormSection>
  );
};
