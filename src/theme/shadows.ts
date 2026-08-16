import type { Shadows } from "@mui/material/styles";

const none = "none";
const soft = "0 10px 30px rgba(0, 0, 0, 0.28)";
const raised = "0 16px 40px rgba(0, 0, 0, 0.38)";

/**
 * ERP chrome stays almost flat. Elevation is reserved for overlays so
 * cards do not compete with the dense operational layout.
 */
export const shadows = [
  none,
  soft,
  soft,
  soft,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
  raised,
] as Shadows;
