import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import type { NavigationItem } from "./navigationConfig";

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
  const childItems = item.children?.filter((child) => can(child.permission)) ?? [];
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
          <ListItemButton
            onClick={() => setOpen((current) => !current)}
            selected={childActive}
            sx={navButtonSx(childActive, collapsed)}
          >
            <ListItemIcon sx={iconSx(childActive)}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            {!collapsed ? (
              <>
                <ListItemText primary={item.label} primaryTypographyProps={labelProps} />
                {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </>
            ) : null}
          </ListItemButton>
        </Tooltip>
        <Collapse in={open && !collapsed} timeout="auto" unmountOnExit>
          <List disablePadding>
            {childItems.map((child) => {
              const active = isPathActive(location.pathname, child.path);
              return (
                <ListItemButton
                  key={child.path}
                  component={NavLink}
                  to={child.path}
                  selected={active}
                  sx={{ ...navButtonSx(active, false), pl: 6, minHeight: 36 }}
                >
                  <ListItemText primary={child.label} primaryTypographyProps={labelProps} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </Box>
    );
  }

  return (
    <Tooltip title={collapsed ? item.label : ""} placement="right">
      <ListItemButton
        component={NavLink}
        to={item.path ?? "/"}
        selected={selfActive}
        sx={navButtonSx(selfActive, collapsed)}
      >
        <ListItemIcon sx={iconSx(selfActive)}>
          <item.icon fontSize="small" />
        </ListItemIcon>
        {!collapsed ? <ListItemText primary={item.label} primaryTypographyProps={labelProps} /> : null}
      </ListItemButton>
    </Tooltip>
  );
};

const labelProps = {
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
};

const navButtonSx = (active: boolean, collapsed: boolean) => ({
  mx: 1,
  mb: 0.4,
  minHeight: 40,
  borderRadius: 1.5,
  justifyContent: collapsed ? "center" : "flex-start",
  color: active ? "primary.contrastText" : "chrome.sidebarMuted",
  bgcolor: active ? "primary.main" : "transparent",
  "&:hover": {
    bgcolor: active ? "primary.dark" : "chrome.sidebarHover",
  },
  "&.Mui-selected": {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
});

const iconSx = (active: boolean) => ({
  minWidth: 32,
  color: active ? "primary.contrastText" : "chrome.sidebarMuted",
});
