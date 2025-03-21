// import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// interface AxiosInstanceType {
//     get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
//     post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
//     delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
//     patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>; 
//   }
// const apiUrl = import.meta.env.VITE_API_URL;

// const axiosInstance = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     if (user.token) {
//       config.headers!['Authorization'] = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// export default axiosInstance as AxiosInstanceType;

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.token) {
      config.headers!['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


