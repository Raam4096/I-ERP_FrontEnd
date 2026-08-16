import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { SearchInput } from "@/components/common/SearchInput/SearchInput";

interface DataTableToolbarProps {
  title?: string;
  subtitle?: string;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: ReactNode;
  extras?: ReactNode;
}

export const DataTableToolbar = ({
  title,
  subtitle,
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  extras,
}: DataTableToolbarProps) => (
  <Stack
    direction={{ xs: "column", md: "row" }}
    justifyContent="space-between"
    alignItems={{ xs: "stretch", md: "center" }}
    gap={1.5}
    sx={{ mb: 2 }}
  >
    <BoxCopy title={title} subtitle={subtitle} />
    <Box sx={{ flex: 1, maxWidth: { md: 360 } }}>
      <SearchInput value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
    </Box>
    <Stack direction="row" gap={1} alignItems="center" sx={{ ml: { md: "auto" } }}>
      {filters}
      {extras}
    </Stack>
  </Stack>
);

const BoxCopy = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  if (!title && !subtitle) {
    return null;
  }

  return (
    <Stack>
      {title ? <Typography variant="h3">{title}</Typography> : null}
      {subtitle ? (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
  );
};
