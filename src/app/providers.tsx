import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { store } from "@/redux/store";
import { AppToaster } from "./AppToaster";
import { ThemeBridge } from "./ThemeBridge";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <Provider store={store}>
    <ThemeBridge>
      <BrowserRouter>
        {children}
        <AppToaster />
      </BrowserRouter>
    </ThemeBridge>
  </Provider>
);
