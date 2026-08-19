import axiosInstance from '../axiosInstance';
import type { UserDto, CreateUserDto, RoleDto, AuditLogDto } from '../../types/security.types';
import type { PermissionGroupDto } from '../../types/settings.types';

export const securityService = {
    // Users
    getUsers: () => axiosInstance.get<UserDto[]>('/api/users').then(res => res.data),
    getUser: (id: number) => axiosInstance.get<UserDto>(`/api/users/${id}`).then(res => res.data),
    createUser: (data: CreateUserDto) => axiosInstance.post<UserDto>('/api/users', data).then(res => res.data),
    updateUser: (id: number, data: CreateUserDto) => axiosInstance.put<UserDto>(`/api/users/${id}`, data).then(res => res.data),
    deleteUser: (id: number) => axiosInstance.delete(`/api/users/${id}`),
    toggleUserStatus: (id: number) => axiosInstance.post(`/api/users/${id}/toggle-status`),

    // Roles
    getRoles: () => axiosInstance.get<RoleDto[]>('/api/roles').then(res => res.data),
    getRole: (id: number) => axiosInstance.get<RoleDto>(`/api/roles/${id}`).then(res => res.data),
    createRole: (data: RoleDto) => axiosInstance.post<RoleDto>('/api/roles', data).then(res => res.data),
    updateRole: (id: number, data: RoleDto) => axiosInstance.put<RoleDto>(`/api/roles/${id}`, data).then(res => res.data),
    deleteRole: (id: number) => axiosInstance.delete(`/api/roles/${id}`),

    // Audit Logs
    getAuditLogs: (params: Record<string, string | number>) =>
        axiosInstance.get<AuditLogDto[]>('/api/auditlogs', { params }).then(res => ({
            data: res.data,
            total: parseInt(res.headers['x-total-count'] || '0')
        })),
    getAuditTables: () => axiosInstance.get<string[]>('/api/auditlogs/tables').then(res => res.data),

    // Permissions
    getPermissions: () => axiosInstance.get<PermissionGroupDto[]>('/api/permissions').then(res => res.data),
    updateRolePermissions: (roleId: number, permissions: string[]) =>
        axiosInstance.put(`/api/roles/${roleId}/permissions`, { permissions }).then(res => res.data)
};
