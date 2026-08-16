import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "@/theme";

export interface ToastState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export interface UiState {
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  themeMode: ThemeMode;
  toast: ToastState;
}

export const THEME_STORAGE_KEY = "ierp.theme-mode";

const readStoredThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "dark";
  }
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
};

export const persistThemeMode = (mode: ThemeMode): void => {
  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
};

const initialState: UiState = {
  sidebarCollapsed: false,
  mobileNavOpen: false,
  themeMode: readStoredThemeMode(),
  toast: {
    open: false,
    message: "",
    severity: "info",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    sidebarToggled: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    mobileNavOpened: (state, action: PayloadAction<boolean>) => {
      state.mobileNavOpen = action.payload;
    },
    toastShown: (state, action: PayloadAction<Omit<ToastState, "open">>) => {
      state.toast = { ...action.payload, open: true };
    },
    toastHidden: (state) => {
      state.toast.open = false;
    },
    themeModeToggled: (state) => {
      state.themeMode = state.themeMode === "dark" ? "light" : "dark";
    },
  },
});

export const { sidebarToggled, mobileNavOpened, toastShown, toastHidden, themeModeToggled } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;
export const selectUi = (state: { ui: UiState }) => state.ui;
