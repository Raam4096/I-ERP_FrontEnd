import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import type { NavigationGroup, NavigationItem } from "./navigationConfig";

interface SidebarItemProps {
  item: NavigationItem;
  collapsed: boolean;
}

const isPathActive = (pathname: string, path?: string): boolean => {
  if (!path) {
    return false;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};

export const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
  const location = useLocation();
  const { can } = usePermissions();
  const groups = item.groups
    ?.map((group) => ({
      ...group,
      items: group.items.filter((child) => can(child.permission)),
    }))
    .filter((group) => group.items.length > 0);
  const childItems = (groups ? groups.flatMap((group) => group.items) : item.children)?.filter((child) =>
    can(child.permission),
  ) ?? [];
  const hasChildren = childItems.length > 0;
  const childActive = childItems.some((child) => isPathActive(location.pathname, child.path));
  const selfActive = isPathActive(location.pathname, item.path);
  const [open, setOpen] = useState(childActive);

  useEffect(() => {
    if (childActive) {
      setOpen(true);
    }
  }, [childActive]);

  if (!can(item.permission)) {
    return null;
  }

  if (hasChildren && !item.path) {
    return (
      <Box>
        <Tooltip title={collapsed ? item.label : ""} placement="right">
          <ListItemButton onClick={() => setOpen((current) => !current)} sx={parentButtonSx(collapsed)}>
            <ListItemIcon sx={iconSx(false)}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            {!collapsed ? (
              <>
                <ListItemText primary={item.label} primaryTypographyProps={parentLabelProps} />
                {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </>
            ) : null}
          </ListItemButton>
        </Tooltip>
        <Collapse in={open && !collapsed} timeout="auto" unmountOnExit>
          {groups ? (
            groups.map((group) => <SidebarGroup key={group.label} group={group} pathname={location.pathname} />)
          ) : (
            <List disablePadding>
              {childItems.map((child) => (
                <ChildLink key={child.path} label={child.label} path={child.path} pathname={location.pathname} />
              ))}
            </List>
          )}
        </Collapse>
      </Box>
    );
  }

  return (
    <Tooltip title={collapsed ? item.label : ""} placement="right">
      <ListItemButton component={NavLink} to={item.path ?? "/"} sx={leafButtonSx(selfActive, collapsed)}>
        <ListItemIcon sx={iconSx(selfActive)}>
          <item.icon fontSize="small" />
        </ListItemIcon>
        {!collapsed ? <ListItemText primary={item.label} primaryTypographyProps={parentLabelProps} /> : null}
      </ListItemButton>
    </Tooltip>
  );
};

const SidebarGroup = ({ group, pathname }: { group: NavigationGroup; pathname: string }) => (
  <Box sx={{ mb: 0.5 }}>
    <Typography
      variant="caption"
      sx={{
        display: "block",
        px: 3,
        pt: 1.25,
        pb: 0.5,
        color: "chrome.sidebarMuted",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        opacity: 0.72,
      }}
    >
      {group.label}
    </Typography>
    <List disablePadding>
      {group.items.map((child) => (
        <ChildLink key={child.path} label={child.label} path={child.path} pathname={pathname} />
      ))}
    </List>
  </Box>
);

const ChildLink = ({ label, path, pathname }: { label: string; path: string; pathname: string }) => {
  const active = isPathActive(pathname, path);
  return (
    <ListItemButton component={NavLink} to={path} selected={active} sx={childButtonSx(active)}>
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          mr: 1.25,
          flexShrink: 0,
          bgcolor: active ? "primary.main" : "transparent",
          boxShadow: (theme) => (active ? `0 0 8px ${alpha(theme.palette.primary.main, 0.85)}` : "none"),
        }}
      />
      <ListItemText primary={label} primaryTypographyProps={childLabelProps} />
    </ListItemButton>
  );
};

const parentLabelProps = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const childLabelProps = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
};

const parentButtonSx = (collapsed: boolean) => ({
  mx: 1,
  mb: 0.25,
  minHeight: 42,
  borderRadius: 1.5,
  justifyContent: collapsed ? "center" : "flex-start",
  color: "chrome.sidebarMuted",
  bgcolor: "transparent",
  "&:hover": {
    bgcolor: "chrome.sidebarHover",
  },
});

const leafButtonSx = (active: boolean, collapsed: boolean) => ({
  mx: 1,
  mb: 0.4,
  minHeight: 40,
  borderRadius: 2,
  justifyContent: collapsed ? "center" : "flex-start",
  color: active ? "primary.light" : "chrome.sidebarMuted",
  bgcolor: (theme: Theme) => (active ? alpha(theme.palette.primary.main, 0.16) : "transparent"),
  "&:hover": {
    bgcolor: (theme: Theme) => (active ? alpha(theme.palette.primary.main, 0.22) : theme.palette.chrome.sidebarHover),
  },
  "&.Mui-selected": {
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
    color: "primary.light",
  },
});

const childButtonSx = (active: boolean) => ({
  mx: 1.25,
  mb: 0.35,
  minHeight: 34,
  borderRadius: 2,
  pl: 1.5,
  color: active ? "primary.light" : "chrome.sidebarMuted",
  bgcolor: (theme: Theme) => (active ? alpha(theme.palette.primary.main, 0.16) : "transparent"),
  "&:hover": {
    bgcolor: (theme: Theme) => (active ? alpha(theme.palette.primary.main, 0.22) : theme.palette.chrome.sidebarHover),
  },
  "&.Mui-selected": {
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.16),
    color: "primary.light",
    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.22),
    },
  },
});

const iconSx = (active: boolean) => ({
  minWidth: 32,
  color: active ? "primary.light" : "chrome.sidebarMuted",
});
