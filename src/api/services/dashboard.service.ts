import axiosInstance from '../axiosInstance';
import {
    type DashboardStatsDto,
    type DashboardNotificationDto
} from '../../types/dashboard.types';

export const dashboardService = {
    getStats: async (): Promise<DashboardStatsDto> => {
        const response = await axiosInstance.get('/api/dashboard/platform-stats');
        return response.data;
    },

    getNotifications: async (): Promise<DashboardNotificationDto[]> => {
        const response = await axiosInstance.get('/api/notifications');
        return response.data;
    },
};
