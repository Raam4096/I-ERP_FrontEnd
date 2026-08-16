import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { StatusChip } from "@/components/common/StatusChip/StatusChip";

interface HighValueLeadCardProps {
  leadName: string;
  leadScore: number;
  onStart: () => void;
}

export const HighValueLeadCard = ({ leadName, leadScore, onStart }: HighValueLeadCardProps) => (
  <Card>
    <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
      <Stack direction="row" alignItems="flex-start" gap={1.5} sx={{ mb: 1.25 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: "chrome.hover",
            color: "primary.light",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <TrendingUpIcon fontSize="small" />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h4" sx={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>
            High-value lead detected
          </Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 0.75 }}>
            <StatusChip label="Agentic recommendation" tone="info" />
            <StatusChip label="Priority high" tone="error" />
          </Stack>
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Lead score above 80 detected{leadName ? ` for ${leadName} (${leadScore})` : ""}. Neural engagement is
        recommended for immediate outreach.
      </Typography>
      <Button fullWidth variant="contained" startIcon={<BoltIcon />} onClick={onStart}>
        START ENGAGEMENT
      </Button>
    </CardContent>
  </Card>
);
