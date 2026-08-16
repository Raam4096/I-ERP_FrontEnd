import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PermissionState {
  roles: string[];
  permissions: string[];
  deniedFields: string[];
}

const initialState: PermissionState = {
  roles: [],
  permissions: [],
  deniedFields: [],
};

const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    permissionsLoaded: (state, action: PayloadAction<Partial<PermissionState>>) => {
      state.roles = action.payload.roles ?? state.roles;
      state.permissions = action.payload.permissions ?? state.permissions;
      state.deniedFields = action.payload.deniedFields ?? state.deniedFields;
    },
    permissionsCleared: () => initialState,
  },
});

export const { permissionsLoaded, permissionsCleared } = permissionSlice.actions;
export const permissionReducer = permissionSlice.reducer;
export const selectPermissions = (state: { permissions: PermissionState }) => state.permissions;
export const selectGrantedPermissions = (state: { permissions: PermissionState }) =>
  state.permissions.permissions;
