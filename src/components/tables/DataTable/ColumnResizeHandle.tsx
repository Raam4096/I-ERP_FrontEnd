import { Box } from "@mui/material";
import type { Header } from "@tanstack/react-table";

interface ColumnResizeHandleProps<T> {
  header: Header<T, unknown>;
}

export const ColumnResizeHandle = <T,>({ header }: ColumnResizeHandleProps<T>) => {
  if (!header.column.getCanResize()) {
    return null;
  }

  const resizing = header.column.getIsResizing();

  return (
    <Box
      role="separator"
      aria-orientation="vertical"
      aria-label={`Resize ${String(header.column.columnDef.header ?? header.column.id)} column`}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        width: 10,
        height: "100%",
        cursor: "col-resize",
        userSelect: "none",
        touchAction: "none",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 8,
          bottom: 8,
          right: 3,
          width: 2,
          borderRadius: 999,
          bgcolor: resizing ? "primary.main" : "transparent",
        },
        "&:hover::after": {
          bgcolor: "primary.main",
        },
      }}
    />
  );
};
