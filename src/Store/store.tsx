// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import superAdminModuleViewSlice from './utils/superAdminModuleViewSlice';
import adminModuleViewSlice from './utils/adminModuleViewSlice';
import directorModuleViewSlice from './utils/directorModuleViewSlice';
import slideBarSlice from './utils/slidebarSlice';
import rolesSlice from './utils/rolesSlice';
import transportSlice from './utils/transportSlice';
import { authSlice } from './apis/authApi';
import { transportApi } from './apis/transportApi';  // Импортируем новый transportApi

export const store = configureStore({
  reducer: {
    slidebar: slideBarSlice,
    superAdminView: superAdminModuleViewSlice,
    adminView: adminModuleViewSlice,
    directorView: directorModuleViewSlice,
    roles: rolesSlice,
    transports: transportSlice,
    [authSlice.reducerPath]: authSlice.reducer,
    [transportApi.reducerPath]: transportApi.reducer,  // Добавляем transportApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      transportApi.middleware,  // Добавляем middleware для transportApi
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
