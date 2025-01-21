import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import superAdminModuleViewSlice from "./utils/superAdminModuleViewSlice";
import  slideBarSlice  from "./utils/slidebarSlice";
import rolesSlice from './utils/rolesSlice';
import transportSlice from './utils/transportSlice';
import { authSlice } from "./apis/authApi";
export const store = configureStore({
  reducer: {
    slidebar: slideBarSlice,
    superAdminView: superAdminModuleViewSlice,
    roles: rolesSlice,
    transports: transportSlice,
    [authSlice.reducerPath]: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
    ),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;