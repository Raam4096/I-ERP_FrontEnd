import { Stack, Typography } from "@mui/material";
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
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={1}
      alignItems={{ sm: "center" }}
      sx={{ width: { xs: "100%", md: "auto" }, minWidth: { md: 280 }, maxWidth: { md: 460 } }}
    >
      <SearchInput value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
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
