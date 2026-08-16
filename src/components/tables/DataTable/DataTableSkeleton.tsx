import { Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface DataTableSkeletonProps {
  columns: number;
  rows?: number;
}

export const DataTableSkeleton = ({ columns, rows = 6 }: DataTableSkeletonProps) => (
  <Table>
    <TableHead>
      <TableRow>
        {Array.from({ length: columns }).map((_, index) => (
          <TableCell key={index}>
            <Skeleton width="70%" />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((__, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const KpiSkeletonRow = () => (
  <Stack direction={{ xs: "column", md: "row" }} gap={1.5}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Skeleton key={index} variant="rounded" height={104} sx={{ flex: 1, borderRadius: 2 }} />
    ))}
  </Stack>
);
