import { Navigate, Outlet } from "react-router-dom";
import { LoadingState } from "@/components/common/LoadingState/LoadingState";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export const GuestRoute = () => {
  const { status, isAuthenticated } = useAuth();

  if (status === "idle" || status === "hydrating") {
    return <LoadingState label="Checking session…" minHeight={480} />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};
