import { Button, Stack, Typography } from "@mui/material";

interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const DataTablePagination = ({
  page,
  pageSize,
  total,
  onPageChange,
}: DataTablePaginationProps) => {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      gap={1}
      sx={{ pt: 2 }}
    >
      <Typography variant="caption" color="text.secondary">
        SHOWING {start}-{end} OF {total} RECORDS
      </Typography>
      <Stack direction="row" gap={1}>
        <Button variant="outlined" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </Button>
        <Button
          variant="outlined"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
