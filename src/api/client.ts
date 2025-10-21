import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getItem, setItem, removeItem } from '../utils/storage';

// Create axios instance
const client: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.tearide.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
client.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      const token = await getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post('/auth/refresh', {
            refreshToken,
          });

          const { accessToken } = response.data;
          await setItem('auth_token', accessToken);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return client(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        await removeItem('auth_token');
        await removeItem('refresh_token');
        // Navigate to login screen
      }
    }

    return Promise.reject(error);
  }
);

export default client;
