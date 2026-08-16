import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TenantState {
  tenantId: string | null;
  tenantName: string;
  nodeLabel: string;
}

const initialState: TenantState = {
  tenantId: null,
  tenantName: "i-ERP",
  nodeLabel: "SECURE NODE 401",
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    tenantLoaded: (state, action: PayloadAction<Partial<TenantState>>) => {
      Object.assign(state, action.payload);
    },
    tenantCleared: () => initialState,
  },
});

export const { tenantLoaded, tenantCleared } = tenantSlice.actions;
export const tenantReducer = tenantSlice.reducer;
export const selectTenant = (state: { tenant: TenantState }) => state.tenant;
