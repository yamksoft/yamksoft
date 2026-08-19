import { useAuth } from '../context/AuthContext';
import { type UserDto } from '../types/auth.types';

export function usePermissions() {
    const { user } = useAuth();

    const hasPermission = (permission: string): boolean => {
        if (!user || !user.permissions) return false;
        return user.permissions.includes(permission);
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        if (!user || !user.permissions) return false;
        return permissions.some(p => user.permissions?.includes(p));
    };

    const hasAllPermissions = (permissions: string[]): boolean => {
        if (!user || !user.permissions) return false;
        return permissions.every(p => user.permissions?.includes(p));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        permissions: user?.permissions || [],
    };
}

export function checkUserPermission(user: UserDto | null, permission: string): boolean {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
}
