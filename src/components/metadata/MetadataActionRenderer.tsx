import { Button, Stack } from "@mui/material";
import type { MetadataAction } from "@/models/metadata/metadata";

interface MetadataActionRendererProps {
  actions: MetadataAction[];
  loading?: boolean;
  onAction: (action: MetadataAction) => void;
}

export const MetadataActionRenderer = ({
  actions,
  loading,
  onAction,
}: MetadataActionRendererProps) => (
  <Stack direction="row" justifyContent="flex-end" gap={1}>
    {actions.map((action) => (
      <Button
        key={action.actionKey}
        variant={action.variant ?? "contained"}
        disabled={loading}
        onClick={() => onAction(action)}
      >
        {action.label}
      </Button>
    ))}
  </Stack>
);
