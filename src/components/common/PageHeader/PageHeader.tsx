import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  badge?: ReactNode;
  actions?: ReactNode;
}

export const PageHeader = ({ title, description, eyebrow, badge, actions }: PageHeaderProps) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    justifyContent="space-between"
    alignItems={{ xs: "flex-start", sm: "center" }}
    gap={2}
    sx={{ mb: 2.5 }}
  >
    <Box>
      {eyebrow ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
          {eyebrow}
        </Typography>
      ) : null}
      <Stack direction="row" alignItems="center" gap={1.25}>
        <Typography variant="h1">{title}</Typography>
        {badge}
      </Stack>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
          {description}
        </Typography>
      ) : null}
    </Box>
    {actions ? (
      <Stack direction="row" gap={1} flexWrap="wrap">
        {actions}
      </Stack>
    ) : null}
  </Stack>
);
