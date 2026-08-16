import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

interface HighValueLeadCardProps {
  leadName: string;
  leadScore: number;
  onStart: () => void;
}

export const HighValueLeadCard = ({ leadName, leadScore, onStart }: HighValueLeadCardProps) => (
  <Card sx={{ height: "100%", borderRadius: 2.5 }}>
    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1.5} sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "chrome.hover",
            color: "primary.light",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <TrendingUpIcon fontSize="small" />
        </Box>
        <Stack alignItems="flex-end" gap={0.5}>
          <Typography variant="caption" sx={{ color: "primary.light", letterSpacing: "0.12em", fontWeight: 800 }}>
            AGENTIC RECOMMENDATION
          </Typography>
          <Typography variant="caption" sx={{ color: "error.main", letterSpacing: "0.1em", fontWeight: 800 }}>
            PRIORITY: HIGH
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="h4" sx={{ letterSpacing: "0.06em", textTransform: "uppercase", mb: 1 }}>
        High-value lead detected
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Lead score above 80 detected. Neural engagement recommended for immediate outreach.
      </Typography>
      <Button
        fullWidth
        variant="contained"
        aria-label={`Start engagement for ${leadName} (${leadScore})`}
        onClick={onStart}
        sx={{
          letterSpacing: "0.1em",
          boxShadow: (theme) => `0 0 22px ${alpha(theme.palette.primary.main, 0.45)}`,
        }}
      >
        START ENGAGEMENT
      </Button>
    </CardContent>
  </Card>
);
