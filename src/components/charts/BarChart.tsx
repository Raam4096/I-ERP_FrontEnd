import { Box, Stack, Typography } from "@mui/material";
import type { ChartPoint } from "@/models/dashboard/dashboard";

interface BarChartProps {
  points: ChartPoint[];
  legend?: string;
}

export const BarChart = ({ points, legend = "ACTUAL" }: BarChartProps) => {
  const max = Math.max(...points.map((point) => point.actual), 1);

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1.5 }}>
        <Typography variant="caption" color="primary.light">
          {legend}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="flex-end" gap={1.25} sx={{ height: 220 }}>
        {points.map((point) => (
          <Stack key={point.label} alignItems="center" sx={{ flex: 1, minWidth: 0 }} gap={1}>
            <Box
              sx={(theme) => ({
                width: "100%",
                maxWidth: 36,
                height: `${Math.max(8, (point.actual / max) * 100)}%`,
                borderRadius: "8px 8px 4px 4px",
                bgcolor: "primary.main",
                backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              })}
            />
            <Typography variant="caption" color="text.secondary">
              {point.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
