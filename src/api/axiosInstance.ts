import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getStoredToken, getStoredTenantId, clearAuth } from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getStoredToken();
        const tenantId = getStoredTenantId();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (tenantId) {
            config.headers['X-Tenant-ID'] = tenantId;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            clearAuth();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
