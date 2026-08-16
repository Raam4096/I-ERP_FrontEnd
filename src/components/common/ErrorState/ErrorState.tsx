import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, Stack, Typography } from "@mui/material";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Unable to load this screen",
  message,
  onRetry,
}: ErrorStateProps) => (
  <Stack alignItems="center" justifyContent="center" sx={{ py: 8, px: 2, textAlign: "center" }} gap={1.25}>
    <ErrorOutlineIcon color="error" sx={{ fontSize: 36 }} />
    <Typography variant="h3">{title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 460 }}>
      {message}
    </Typography>
    {onRetry ? (
      <Button variant="outlined" onClick={onRetry}>
        Retry
      </Button>
    ) : null}
  </Stack>
);
