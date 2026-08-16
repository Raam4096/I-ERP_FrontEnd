import SouthEastIcon from "@mui/icons-material/SouthEast";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { KpiMetric } from "@/models/dashboard/dashboard";

interface KpiCardProps {
  metric: KpiMetric;
}

export const KpiCard = ({ metric }: KpiCardProps) => {
  const trend = metric.trendPercent;
  const isPositive = (trend ?? 0) >= 0;
  const trendColor =
    metric.tone === "error" || (!metric.tone && !isPositive)
      ? "error.main"
      : metric.tone === "warning"
        ? "warning.main"
        : "success.main";

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Typography variant="caption" color="text.secondary">
          {metric.label.toUpperCase()}
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 1 }}>
          {metric.value}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
          {metric.hint ? (
            <Typography variant="body2" color="text.secondary">
              {metric.hint}
            </Typography>
          ) : (
            <Box />
          )}
          {trend !== undefined ? (
            <Stack direction="row" alignItems="center" gap={0.5} sx={{ color: trendColor }}>
              {isPositive ? <NorthEastIcon sx={{ fontSize: 16 }} /> : <SouthEastIcon sx={{ fontSize: 16 }} />}
              <Typography variant="subtitle2" sx={{ color: "inherit" }}>
                {isPositive ? "+" : ""}
                {trend.toFixed(1)}%
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
};
