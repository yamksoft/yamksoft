export interface UserDto {
    id: number;
    username: string;
    fullName: string;
    email?: string;
    phone?: string;
    role: string;
    roleId?: number;
    isActive: boolean;
    lastLoginAt?: string;
    createdAt: string;
    permissions?: string[];
}

export interface CreateUserDto {
    username: string;
    password?: string;
    fullName: string;
    email?: string;
    phone?: string;
    role: string;
    roleId?: number;
    isActive: boolean;
}

export interface RoleDto {
    id: number;
    name: string;
    description?: string;
    isSystemRole: boolean;
    permissions: string[];
}

export interface AuditLogDto {
    id: number;
    tableName: string;
    recordId: number;
    action: string;
    oldValues?: string;
    newValues?: string;
    changedBy: number;
    changedByName: string;
    changedAt: string;
    actionAr: string;
}
