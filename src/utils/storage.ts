const TOKEN_KEY = 'yamksoft_token';
const REFRESH_TOKEN_KEY = 'yamksoft_refresh_token';
const TENANT_ID_KEY = 'yamksoft_tenant_id';
const USER_KEY = 'yamksoft_user';
const THEME_KEY = 'yamksoft_theme';

// Token
export const getStoredToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Refresh Token
export const getStoredRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setStoredRefreshToken = (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// Tenant ID
export const getStoredTenantId = (): string | null => {
    return localStorage.getItem(TENANT_ID_KEY);
};

export const setStoredTenantId = (tenantId: string): void => {
    localStorage.setItem(TENANT_ID_KEY, tenantId);
};

// User
export const getStoredUser = <T>(): T | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const setStoredUser = <T>(user: T): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Theme
export const getStoredTheme = (): 'light' | 'dark' => {
    const theme = localStorage.getItem(THEME_KEY);
    return (theme as 'light' | 'dark') || 'light';
};

export const setStoredTheme = (theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme);
};

// Navigation Mode
const NAV_MODE_KEY = 'yamksoft_nav_mode';

export const getStoredNavMode = (): 'sidebar' | 'ribbon' => {
    const mode = localStorage.getItem(NAV_MODE_KEY);
    return (mode as 'sidebar' | 'ribbon') || 'sidebar';
};

export const setStoredNavMode = (mode: 'sidebar' | 'ribbon'): void => {
    localStorage.setItem(NAV_MODE_KEY, mode);
};

// Clear Auth
export const clearAuth = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

// Clear All
export const clearStorage = (): void => {
    localStorage.clear();
};
