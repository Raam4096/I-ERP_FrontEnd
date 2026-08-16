import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader/PageHeader";
import { ROUTES } from "@/constants/routes";

interface ModulePlaceholderProps {
  title: string;
  module: string;
}

export const ModulePlaceholder = ({ title, module }: ModulePlaceholderProps) => {
  const navigate = useNavigate();

  return (
    <Stack gap={2}>
      <PageHeader
        eyebrow={module.toUpperCase()}
        title={title}
        description="This module is registered in navigation so the shell can scale. Transaction screens will reuse the same table, form and permission primitives."
      />
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The current objective is the platform foundation, Dashboard, Leads and GenericPage — not a
            full ERP catalog.
          </Typography>
          <Button variant="contained" onClick={() => navigate(ROUTES.dashboard)}>
            Return to dashboard
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};
