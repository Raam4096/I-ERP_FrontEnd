import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { persistThemeMode, selectUi, themeModeToggled } from "@/redux/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector(selectUi);
  const nextMode = themeMode === "dark" ? "light" : "dark";
  const label = nextMode === "light" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        onClick={() => {
          persistThemeMode(nextMode);
          dispatch(themeModeToggled());
        }}
        sx={{
          width: 40,
          height: 40,
          border: 1,
          borderColor: "divider",
          borderRadius: 1.5,
        }}
      >
        {themeMode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};
