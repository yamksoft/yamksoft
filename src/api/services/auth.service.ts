import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';
import {
    type LoginRequest,
    type LoginResponse,
    type RegisterRequest,
    type RefreshTokenRequest,
    type ForgotPasswordRequest,
    type ResetPasswordRequest,
    type UserDto,
    type VerifyEmailRequest,
} from '../../types/auth.types';
import {
    setStoredToken,
    setStoredRefreshToken,
    setStoredUser,
    clearAuth,
} from '../../utils/storage';

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );

        // Store auth data
        setStoredToken(response.data.token);
        setStoredRefreshToken(response.data.refreshToken);
        setStoredUser(response.data.user);

        return response.data;
    },

    register: async (data: RegisterRequest): Promise<{ message: string }> => {
        // Updated to expect message only, as registration now requires email verification
        const response = await axiosInstance.post<{ message: string }>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );
        return response.data;
    },

    verifyEmail: async (data: VerifyEmailRequest): Promise<{ message: string }> => {
        const response = await axiosInstance.post<{ message: string }>(
            '/auth/verify-email',
            data
        );
        return response.data;
    },

    resendVerification: async (email: string): Promise<{ message: string }> => {
        const response = await axiosInstance.post<{ message: string }>(
            '/auth/resend-verification',
            { email }
        );
        return response.data;
    },

    logout: async (): Promise<void> => {
        try {
            await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            clearAuth();
        }
    },

    refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>(
            API_ENDPOINTS.AUTH.REFRESH,
            { refreshToken } as RefreshTokenRequest
        );

        setStoredToken(response.data.token);
        setStoredRefreshToken(response.data.refreshToken);

        return response.data;
    },

    getCurrentUser: async (): Promise<UserDto> => {
        const response = await axiosInstance.get<UserDto>(API_ENDPOINTS.AUTH.ME);
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
        await axiosInstance.post('/auth/forgot-password', data);
    },

    resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
        await axiosInstance.post('/auth/reset-password', data);
    },
};
