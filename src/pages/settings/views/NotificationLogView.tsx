import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../../../components/common/DataTable/DataTable';
import { History, Search, Filter } from 'lucide-react';
import { settingsService } from '../../../api/services/settings.service';
import type { NotificationLogDto } from '../../../types/settings.types';
import type { Column } from '../../../components/common/DataTable/DataTable';

export const NotificationLogView: React.FC = () => {
    const { data: logs, isLoading } = useQuery({
        queryKey: ['settings', 'notification-logs'],
        queryFn: settingsService.getNotificationLogs
    });

    const columns: Column<NotificationLogDto>[] = [
        {
            key: 'sentAt',
            header: 'التاريخ / الوقت',
            render: (val) => new Date(String(val)).toLocaleString('ar-SA')
        },
        { key: 'channel', header: 'القناة' },
        { key: 'recipientAddress', header: 'المستلم' },
        { key: 'subject', header: 'الموضوع' },
        {
            key: 'status',
            header: 'الحالة',
            render: (val) => {
                const colors: Record<string, string> = {
                    'Sent': 'badge-success',
                    'Failed': 'badge-error',
                    'Pending': 'badge-warning'
                };
                const status = String(val);
                return <span className={`badge ${colors[status] || 'badge-ghost'}`}>{status}</span>;
            }
        }
    ];

    return (
        <div className="view-container animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <History className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">سجل إشعارات النظام</h2>
                        <p className="text-sm text-secondary">تتبع حالة وصول الرسائل للعملاء والموظفين</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="بحث عن مستلم..." className="input input-bordered input-sm pl-10" />
                    </div>
                    <button className="btn btn-outline btn-sm gap-2">
                        <Filter className="w-4 h-4" />
                        تصفية
                    </button>
                </div>
            </div>

            <div className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden">
                <DataTable
                    columns={columns}
                    data={logs || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};
