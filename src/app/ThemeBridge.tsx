import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, type ReactNode } from "react";
import { selectUi } from "@/redux/features/ui/uiSlice";
import { useAppSelector } from "@/redux/hooks";
import { createAppTheme } from "@/theme";

interface ThemeBridgeProps {
  children: ReactNode;
}

export const ThemeBridge = ({ children }: ThemeBridgeProps) => {
  const { themeMode } = useAppSelector(selectUi);
  const theme = useMemo(() => createAppTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
