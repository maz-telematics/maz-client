// src/redux/rolesActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';
import { AxiosError } from 'axios';

export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async (_, { rejectWithValue }) => {
      try {
        // Отправляем GET-запрос через Axios
        const response = await axiosInstance.get('/main/roles'); 
        // Возвращаем данные из ответа
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError; // Уточняем тип ошибки
        // Возвращаем сообщение об ошибке
        return rejectWithValue(axiosError.message || 'Неизвестная ошибка');
      }
    }
  );