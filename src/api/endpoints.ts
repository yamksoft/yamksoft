export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },

    DASHBOARD: {
        STATS: '/api/dashboard/platform-stats',
        NOTIFICATIONS: '/api/notifications',
    },

    SETTINGS: {
        COMPANY: '/api/settings/company',
        SYSTEM: '/api/settings/system',
    },

    USERS: {
        LIST: '/api/users',
        ROLES: '/api/roles',
        PERMISSIONS: '/api/permissions',
    },

    NOTIFICATIONS: '/api/notifications',
} as const;
