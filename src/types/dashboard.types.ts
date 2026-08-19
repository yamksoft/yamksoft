export interface DashboardStatsDto {
    totalUsers: number;
    activeUsers: number;
    totalRoles: number;
    totalPermissionGroups: number;
    unreadNotifications: number;
    notificationTemplates: number;
    auditEventsToday: number;
    systemHealthPercentage: number;
}

export interface DashboardNotificationDto {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    isRead: boolean;
    createdAt: string;
    link?: string;
}
