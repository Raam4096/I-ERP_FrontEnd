import { Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const FormSection = ({ title, description, children }: FormSectionProps) => (
  <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h3">{title}</Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      ) : null}
    </Box>
    <Stack gap={2}>{children}</Stack>
  </Paper>
);
