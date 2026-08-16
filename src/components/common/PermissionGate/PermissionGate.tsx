import type { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";

interface PermissionGateProps {
  permission?: string | string[];
  fallback?: ReactNode;
  children: ReactNode;
}

export const PermissionGate = ({ permission, fallback = null, children }: PermissionGateProps) => {
  const { can } = usePermissions();
  return can(permission) ? <>{children}</> : <>{fallback}</>;
};
