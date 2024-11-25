import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Интерфейс для запроса и ответа
interface AxiosInstanceType {
    get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>; // Добавляем delete
    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>; // Добавляем patch
  }
  const apiUrl = import.meta.env.VITE_API_URL;
// Создание axios инстанса
const axiosInstance = axios.create({
  baseURL: apiUrl, // Установите базовый URL API из переменной окружения
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
    // if (user.ti) {
      config.headers!['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Например, перенаправить на страницу логина при ошибке авторизации
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
export default axiosInstance as AxiosInstanceType;