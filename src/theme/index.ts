import { createTheme } from "@mui/material/styles";
import { components } from "./components";
import { darkPalette, lightPalette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

export { colorTokens } from "./palette";
export type ThemeMode = "light" | "dark";

export const createAppTheme = (mode: ThemeMode) =>
  createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    typography,
    shadows,
    components,
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
  });
