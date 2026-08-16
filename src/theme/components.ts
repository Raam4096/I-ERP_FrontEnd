import type { Components, Theme } from "@mui/material/styles";

/**
 * Overrides read from the active palette so dark and light stay visually
 * consistent without copying hex values into each component.
 */
export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      "::-webkit-scrollbar": {
        width: 10,
        height: 10,
      },
      "::-webkit-scrollbar-thumb": {
        background: theme.palette.mode === "dark" ? theme.palette.chrome.hover : theme.palette.divider,
        borderRadius: 999,
      },
    }),
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
        boxShadow: "none",
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 10,
        minHeight: 36,
        paddingInline: 14,
        fontSize: "0.8rem",
      },
      containedPrimary: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }),
      outlined: ({ theme }) => ({
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiInputLabel-shrink": {
          backgroundColor: theme.palette.background.paper,
          paddingInline: 4,
        },
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined",
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: theme.palette.chrome.input,
        "& fieldset": {
          borderColor: theme.palette.divider,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.chrome.borderStrong,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.primary.light,
        },
      }),
      input: {
        fontSize: "0.875rem",
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        fontWeight: 700,
        letterSpacing: "0.04em",
        height: 24,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiTableCell-root": {
          backgroundColor: theme.palette.chrome.input,
          color: theme.palette.text.secondary,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: "10px 12px",
        fontSize: "0.8125rem",
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.palette.chrome.sidebar,
        color: theme.palette.chrome.sidebarText,
        border: `1px solid ${theme.palette.chrome.sidebarBorder}`,
        fontSize: "0.75rem",
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.chrome.sidebar,
        color: theme.palette.chrome.sidebarText,
        borderRight: `1px solid ${theme.palette.chrome.sidebarBorder}`,
      }),
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        backgroundColor: theme.palette.chrome.appbar,
        color: theme.palette.text.primary,
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        backgroundColor: theme.palette.chrome.hover,
      }),
    },
  },
};
