import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Popover, Stack } from "@mui/material";
import { useState, type ReactNode } from "react";

interface FilterPanelProps {
  children: ReactNode;
  onClear?: () => void;
}

export const FilterPanel = ({ children, onClear }: FilterPanelProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        Filter
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack sx={{ p: 2, minWidth: 260 }} gap={1.5}>
          {children}
          {onClear ? (
            <Button size="small" onClick={onClear}>
              Clear filters
            </Button>
          ) : null}
        </Stack>
      </Popover>
    </>
  );
};
