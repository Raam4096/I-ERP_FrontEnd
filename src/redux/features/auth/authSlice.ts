import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/models/auth/auth";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionHydrating: (state) => {
      state.status = "hydrating";
      state.error = null;
    },
    sessionEstablished: (
      state,
      action: PayloadAction<{ user: AuthUser; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = "authenticated";
      state.error = null;
    },
    accessTokenUpdated: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    sessionFailed: (state, action: PayloadAction<string | null>) => {
      state.user = null;
      state.accessToken = null;
      state.status = "unauthenticated";
      state.error = action.payload;
    },
    sessionCleared: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = "unauthenticated";
      state.error = null;
    },
  },
});

export const {
  sessionHydrating,
  sessionEstablished,
  accessTokenUpdated,
  sessionFailed,
  sessionCleared,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
