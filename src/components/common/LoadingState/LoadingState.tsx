import { Box, CircularProgress, Stack, Typography } from "@mui/material";

interface LoadingStateProps {
  label?: string;
  minHeight?: number;
}

export const LoadingState = ({ label = "Loading records…", minHeight = 240 }: LoadingStateProps) => (
  <Stack alignItems="center" justifyContent="center" sx={{ minHeight, width: "100%" }} gap={1.5}>
    <CircularProgress size={28} />
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
  </Stack>
);

export const BlockSkeleton = ({ height = 88 }: { height?: number }) => (
  <Box
    sx={{
      height,
      borderRadius: 2,
      border: 1,
      borderColor: "divider",
      bgcolor: "background.paper",
      opacity: 0.7,
    }}
  />
);
