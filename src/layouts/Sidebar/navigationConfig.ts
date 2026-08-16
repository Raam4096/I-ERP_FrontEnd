import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { PERMISSIONS } from "@/constants/permissions";
import { ROUTES } from "@/constants/routes";

export interface NavigationChild {
  label: string;
  path: string;
  permission?: string;
}

export interface NavigationItem {
  label: string;
  path?: string;
  icon: SvgIconComponent;
  permission?: string;
  children?: NavigationChild[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: ROUTES.dashboard,
    icon: DashboardOutlinedIcon,
    permission: PERMISSIONS.dashboard.view,
  },
  {
    label: "AI Assistant",
    path: ROUTES.aiAssistant,
    icon: AutoAwesomeOutlinedIcon,
  },
  {
    label: "CRM",
    icon: GroupsOutlinedIcon,
    children: [
      { label: "Leads", path: ROUTES.crm.leads, permission: PERMISSIONS.crm.leads.view },
      { label: "Opportunities", path: ROUTES.crm.opportunities },
    ],
  },
  {
    label: "Sales",
    icon: ShoppingCartOutlinedIcon,
    children: [
      { label: "Quotations", path: ROUTES.sales.quotations },
      { label: "Orders", path: ROUTES.sales.orders },
      { label: "Invoices", path: ROUTES.sales.invoices },
    ],
  },
  {
    label: "Purchase",
    icon: LocalMallOutlinedIcon,
    children: [
      { label: "Orders", path: ROUTES.purchase.orders },
      { label: "Invoices", path: ROUTES.purchase.invoices },
    ],
  },
  {
    label: "Inventory",
    icon: Inventory2OutlinedIcon,
    children: [
      { label: "Items", path: ROUTES.inventory.items },
      { label: "Warehouses", path: ROUTES.inventory.warehouses },
    ],
  },
  {
    label: "Finance",
    icon: AccountTreeOutlinedIcon,
    children: [{ label: "General Ledger", path: ROUTES.finance.ledger }],
  },
  {
    label: "HR",
    icon: PeopleAltOutlinedIcon,
    children: [{ label: "Employees", path: ROUTES.hr.employees }],
  },
  {
    label: "Projects",
    path: ROUTES.projects.root,
    icon: WorkOutlineOutlinedIcon,
  },
  {
    label: "Workflow",
    icon: HubOutlinedIcon,
    children: [{ label: "Inbox", path: ROUTES.workflow.inbox }],
  },
  {
    label: "Reports",
    path: ROUTES.reports.root,
    icon: SpaceDashboardOutlinedIcon,
  },
  {
    label: "Administration",
    icon: AdminPanelSettingsOutlinedIcon,
    children: [
      { label: "Users", path: ROUTES.administration.users },
      { label: "Roles", path: ROUTES.administration.roles },
    ],
  },
  {
    label: "Masters",
    icon: StorageOutlinedIcon,
    children: [{ label: "Customers", path: ROUTES.masters.customers }],
  },
  {
    label: "Settings",
    path: ROUTES.settings,
    icon: SettingsOutlinedIcon,
  },
];
