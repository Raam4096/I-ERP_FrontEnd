import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingState } from "@/components/common/LoadingState/LoadingState";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = () => {
  const { status, isAuthenticated } = useAuth();
  const location = useLocation();

  if (status === "idle" || status === "hydrating") {
    return <LoadingState label="Restoring secure session…" minHeight={480} />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
