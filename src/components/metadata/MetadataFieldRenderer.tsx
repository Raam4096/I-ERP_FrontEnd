import { Box } from "@mui/material";
import type { MetadataField } from "@/models/metadata/metadata";
import { fieldRendererMap } from "./fieldRendererMap";

interface MetadataFieldRendererProps {
  field: MetadataField;
  value: string | number | boolean;
  error?: string;
  denied?: boolean;
  onChange: (value: string | number | boolean) => void;
}

export const MetadataFieldRenderer = ({
  field,
  value,
  error,
  denied,
  onChange,
}: MetadataFieldRendererProps) => {
  if (!field.visible || denied) {
    return null;
  }

  const Renderer = fieldRendererMap[field.controlType] ?? fieldRendererMap.text;
  const span = Math.min(12, Math.max(3, field.width));

  return (
    <Box
      sx={{
        gridColumn: {
          xs: "span 12",
          md: `span ${span}`,
        },
      }}
    >
      <Renderer field={field} value={value} error={error} onChange={onChange} />
    </Box>
  );
};
