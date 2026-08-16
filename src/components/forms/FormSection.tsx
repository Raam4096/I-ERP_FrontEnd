import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const SectionCopy = ({ title, description }: { title: string; description?: string }) => (
  <Box>
    <Typography variant="h3">{title}</Typography>
    {description ? (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {description}
      </Typography>
    ) : null}
  </Box>
);

export const FormSection = ({
  title,
  description,
  children,
  collapsible = false,
  defaultExpanded = true,
}: FormSectionProps) => {
  if (!collapsible) {
    return (
      <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
        <Box sx={{ mb: 2 }}>
          <SectionCopy title={title} description={description} />
        </Box>
        <Stack gap={2}>{children}</Stack>
      </Paper>
    );
  }

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: "16px !important",
        boxShadow: "none",
        backgroundImage: "none",
        "&:before": { display: "none" },
        "&.Mui-expanded": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: { xs: 2, md: 2.5 },
          py: 1.25,
          minHeight: 64,
          "& .MuiAccordionSummary-content": { my: 1 },
        }}
      >
        <SectionCopy title={title} description={description} />
      </AccordionSummary>
      <AccordionDetails sx={{ px: { xs: 2, md: 2.5 }, pb: { xs: 2, md: 2.5 }, pt: 0 }}>
        <Stack gap={2}>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  );
};
