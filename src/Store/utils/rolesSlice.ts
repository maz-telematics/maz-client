// src/redux/rolesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRoles } from './rolesActions';

interface Role {
  organizationName: string;

  directors: number;
  managers: number;
  manufactorers: number;
  
  superadmins: number;
  admins: number;
  operators: number;
}

interface RolesState {
  roles: Role[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  roles: [],
  isLoading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.roles = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRoles.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || 'Ошибка при загрузке ролей';
        state.isLoading = false;
      });
  },
});

export default rolesSlice.reducer;
