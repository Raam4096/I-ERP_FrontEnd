import { useEffect } from "react";
import { bindHttpAuth, hydrateSession } from "./session";
import { AppRoutes } from "./routes";

bindHttpAuth();

export const App = () => {
  useEffect(() => {
    void hydrateSession();
  }, []);

  return <AppRoutes />;
};
