import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../api/services/dashboard.service';

export function useDashboard() {
    const {
        data: stats,
        isLoading: isStatsLoading,
        error: statsError
    } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: dashboardService.getStats,
        refetchInterval: 60000,
    });

    const {
        data: notifications,
        isLoading: isNotificationsLoading
    } = useQuery({
        queryKey: ['dashboard-notifications'],
        queryFn: dashboardService.getNotifications,
        refetchInterval: 30000,
    });

    return {
        stats,
        notifications,
        isLoading: isStatsLoading || isNotificationsLoading,
        error: statsError
    };
}
