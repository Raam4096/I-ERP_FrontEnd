import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, IconButton, List, Stack, Tooltip, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { navigationItems } from "./navigationConfig";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  collapsed: boolean;
  onSignOut: () => void;
}

export const Sidebar = ({ collapsed, onSignOut }: SidebarProps) => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "chrome.sidebar",
        color: "chrome.sidebarText",
        borderRight: 1,
        borderColor: "chrome.sidebarBorder",
      }}
    >
      <Stack direction="row" alignItems="center" gap={1.25} sx={{ px: collapsed ? 1.25 : 2, py: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.5,
            border: 1,
            borderColor: "chrome.sidebarBorder",
            display: "grid",
            placeItems: "center",
            color: "primary.light",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          i
        </Box>
        {!collapsed ? (
          <Box>
            <Typography variant="subtitle2" sx={{ letterSpacing: "0.14em", color: "chrome.sidebarText" }}>
              I-ERP
            </Typography>
            <Typography variant="caption" sx={{ color: "chrome.sidebarMuted" }}>
              INTELLIGENT
            </Typography>
          </Box>
        ) : null}
      </Stack>

      <List sx={{ flex: 1, overflowY: "auto", py: 0.5 }}>
        {navigationItems.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </List>

      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          p: collapsed ? 1.25 : 1.75,
          borderTop: 1,
          borderColor: "chrome.sidebarBorder",
        }}
      >
        <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main", fontSize: 13 }}>
          {user?.initials ?? "AM"}
        </Avatar>
        {!collapsed ? (
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle2" noWrap sx={{ color: "chrome.sidebarText" }}>
              {user?.displayName ?? "Aarav Mehta"}
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: "chrome.sidebarMuted" }}>
              {user?.roleName ?? "Operations Controller"}
            </Typography>
          </Box>
        ) : null}
        <Tooltip title="Sign out">
          <IconButton aria-label="Sign out" size="small" onClick={onSignOut} sx={{ color: "chrome.sidebarMuted" }}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};
