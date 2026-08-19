/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type UserDto, type LoginRequest, type RegisterRequest } from '../types/auth.types';
import { authService } from '../api/services/auth.service';
import {
    getStoredToken,
    getStoredUser,
    clearAuth,
} from '../utils/storage';

interface AuthContextType {
    user: UserDto | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = getStoredToken();
            if (token) {
                const storedUser = getStoredUser<UserDto>();
                if (storedUser) {
                    setUser(storedUser);
                }
                try {
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                } catch {
                    clearAuth();
                    setUser(null);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (data: LoginRequest) => {
        const response = await authService.login(data);
        setUser(response.user);
    };

    const register = async (data: RegisterRequest) => {
        await authService.register(data);
        // Do not setUser here anymore, as we require email verification first
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch {
            clearAuth();
            setUser(null);
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
