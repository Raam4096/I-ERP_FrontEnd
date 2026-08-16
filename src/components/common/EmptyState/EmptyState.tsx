import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  title = "No records found",
  description = "Adjust filters or create a new record to populate this worklist.",
  action,
}: EmptyStateProps) => (
  <Stack alignItems="center" justifyContent="center" sx={{ py: 8, px: 2, textAlign: "center" }} gap={1.25}>
    <InboxOutlinedIcon sx={{ fontSize: 36, color: "text.secondary" }} />
    <Typography variant="h3">{title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
      {description}
    </Typography>
    {action}
  </Stack>
);
