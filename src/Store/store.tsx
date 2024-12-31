import { configureStore } from "@reduxjs/toolkit";
import superAdminModuleViewSlice from "./utils/superAdminModuleViewSlice";
import  slideBarSlice  from "./utils/slidebarSlice";
import { authSlice } from "./apis/authApi";
export const store = configureStore({
  reducer: {
    slidebar: slideBarSlice,
    superAdminView: superAdminModuleViewSlice,
    [authSlice.reducerPath]: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
    ),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;