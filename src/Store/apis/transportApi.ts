import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../../services/axiosInstance';

export interface Car {
  id: string;
  model: string;
  yearRelease: string;
  organizationName: string;
  engineType: string;
  isMoving: boolean | null;
  errors: string | null;
  vehicleType: string;
  status: string | null;
  blockType: string | null;
}

// Создаем базовый запрос с использованием axiosInstance
const axiosBaseQuery: BaseQueryFn<AxiosRequestConfig, unknown, unknown> = async ({ url, method, data, params }) => {
  try {
    const response: AxiosResponse = await axiosInstance({
      url,
      method,
      data,
      params,
    });
    return { data: response.data };
  } catch (axiosError) {
    return { error: axiosError }; // Обрабатываем ошибки
  }
};

export const transportApi = createApi({
  reducerPath: 'transportApi',
  baseQuery: axiosBaseQuery, // Используем axiosBaseQuery вместо fetchBaseQuery
  endpoints: (builder) => ({
    // Получение списка транспорта с пагинацией
    getCars: builder.query<Car[], { page: number; size: number }>({
      query: ({ page, size }) => ({
        url: '/transport/list-transport',
        method: 'GET',
        params: { page, size },
      }),
    }),
    // Добавление нового транспорта
    addCar: builder.mutation<void, Car>({
      query: (newCar) => ({
        url: '/transport/create-transport',
        method: 'POST',
        data: newCar,
      }),
    }),
    // Обновление данных о транспорте
    updateCar: builder.mutation<void, Car>({
      query: (updatedCar) => ({
        url: `/transport/${updatedCar.id}`,
        method: 'PATCH',
        data: updatedCar,
      }),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const { useGetCarsQuery, useAddCarMutation, useUpdateCarMutation } = transportApi;
