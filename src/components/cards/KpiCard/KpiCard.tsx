import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { KpiIconKey, KpiMetric } from "@/models/dashboard/dashboard";

interface KpiCardProps {
  metric: KpiMetric;
}

const kpiIcons: Record<KpiIconKey, typeof PeopleAltOutlinedIcon> = {
  people: PeopleAltOutlinedIcon,
  check: CheckCircleOutlineIcon,
  trend: TrendingUpIcon,
};

export const KpiCard = ({ metric }: KpiCardProps) => {
  const trend = metric.trendPercent;
  const isPositive = (trend ?? 0) >= 0;
  const trendColor =
    metric.tone === "error" || (!metric.tone && !isPositive)
      ? "error.main"
      : metric.tone === "warning"
        ? "warning.main"
        : "success.main";
  const Icon = metric.icon ? kpiIcons[metric.icon] : null;
  const badgeLabel =
    metric.trendLabel ??
    (trend !== undefined ? `${isPositive ? "+" : ""}${trend.toFixed(1)}%` : undefined);

  if (Icon) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 1.5,
                bgcolor: "chrome.hover",
                color: "primary.light",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon fontSize="small" />
            </Box>
            {badgeLabel ? (
              <Chip
                size="small"
                icon={<NorthEastIcon sx={{ fontSize: 14 }} />}
                label={badgeLabel}
                sx={{
                  bgcolor: "success.main",
                  color: "primary.contrastText",
                  "& .MuiChip-icon": { color: "inherit" },
                }}
              />
            ) : null}
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
            {metric.label.toUpperCase()}
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5 }}>
            {metric.value}
          </Typography>
        </CardContent>
      </Card>
    );
  }

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
                {badgeLabel}
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
};
