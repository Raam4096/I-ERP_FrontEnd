import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WifiTetheringOutlinedIcon from "@mui/icons-material/WifiTetheringOutlined";
import {
  AppBar,
  Badge,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { selectTenant } from "@/redux/features/tenant/tenantSlice";
import { ThemeToggle } from "./ThemeToggle";

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  const tenant = useAppSelector(selectTenant);

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar sx={{ gap: 1.5, minHeight: { xs: 64, md: 72 }, px: { xs: 1.5, md: 2.5 }, flexWrap: "wrap" }}>
        <IconButton aria-label="Open navigation" onClick={onMenuClick} sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>

        <TextField
          placeholder="SEARCH RECORDS, DOCUMENTS, PEOPLE..."
          fullWidth
          sx={{
            maxWidth: 720,
            mx: "auto",
            "& .MuiOutlinedInput-root": {
              borderRadius: 999,
              bgcolor: "background.default",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          inputProps={{ "aria-label": "Global search" }}
        />

        <Stack direction="row" alignItems="center" gap={1} sx={{ ml: "auto" }}>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              display: { xs: "none", md: "flex" },
              px: 1.25,
              py: 0.75,
              borderRadius: 999,
              border: 1,
              borderColor: "divider",
              bgcolor: "chrome.input",
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.light" }} />
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main" }} />
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "warning.main" }} />
            <Typography variant="caption" color="text.secondary">
              LIVE NEURAL MONITOR
            </Typography>
          </Stack>

          <ThemeToggle />

          <Tooltip title="Notifications">
            <IconButton
              aria-label="Notifications"
              sx={{
                width: 40,
                height: 40,
                border: 1,
                borderColor: "divider",
                borderRadius: "50%",
              }}
            >
              <Badge color="primary" variant="dot">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Chip
            icon={<WifiTetheringOutlinedIcon />}
            label={`HQ TERMINAL ${tenant.nodeLabel}`}
            variant="outlined"
            sx={{ display: { xs: "none", lg: "inline-flex" }, fontSize: "0.68rem" }}
          />
          <Tooltip title="Settings">
            <IconButton aria-label="Settings">
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
