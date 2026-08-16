import { selectGrantedPermissions } from "@/redux/features/permissions/permissionSlice";
import { useAppSelector } from "@/redux/hooks";
import { hasPermission } from "@/utils/permissions/hasPermission";

export const usePermissions = () => {
  const granted = useAppSelector(selectGrantedPermissions);

  return {
    granted,
    can: (permission?: string | string[]) => hasPermission(granted, permission),
  };
};
