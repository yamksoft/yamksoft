import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../../../components/common/DataTable/DataTable';
import { FileEdit, Plus, Eye, Edit2 } from 'lucide-react';
import { settingsService } from '../../../api/services/settings.service';
import type { NotificationTemplateDto } from '../../../types/settings.types';
import type { Column } from '../../../components/common/DataTable/DataTable';

export const TemplateManagementView: React.FC = () => {
    const { data: templates, isLoading } = useQuery({
        queryKey: ['settings', 'notification-templates'],
        queryFn: settingsService.getNotificationTemplates
    });

    const columns: Column<NotificationTemplateDto>[] = [
        { key: 'templateKey', header: 'مفتاح القالب' },
        { key: 'channel', header: 'القناة' },
        { key: 'language', header: 'اللغة' },
        {
            key: 'isActive',
            header: 'الحالة',
            render: (val) => (
                <span className={`badge ${val ? 'badge-success' : 'badge-ghost opacity-50'}`}>
                    {val ? 'نشط' : 'معطل'}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'إجراءات',
            render: () => (
                <div className="flex gap-2">
                    <button className="btn btn-ghost btn-xs p-1" title="معاينة">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="btn btn-ghost btn-xs p-1 text-primary" title="تعديل">
                        <Edit2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="view-container animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <FileEdit className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">قوالب الإشعارات</h2>
                        <p className="text-sm text-secondary">تخصيص نصوص الرسائل والوسوم البرمجية لكل حدث في النظام</p>
                    </div>
                </div>
                <button className="btn btn-primary btn-sm gap-2">
                    <Plus className="w-4 h-4" />
                    إنشاء قالب جديد
                </button>
            </div>

            <div className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden">
                <DataTable
                    columns={columns}
                    data={templates || []}
                    isLoading={isLoading}
                />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit">
                    <Edit2 className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900">وسوم مساعدة (Placeholder Tags)</h4>
                    <p className="text-xs text-blue-700 mt-2 flex gap-4 overflow-x-auto whitespace-nowrap">
                        <code>{'{'}{'{'}UserName{'}'}{'}'}</code>
                        <code>{'{'}{'{'}EventName{'}'}{'}'}</code>
                        <code>{'{'}{'{'}ActionUrl{'}'}{'}'}</code>
                        <code>{'{'}{'{'}SystemDate{'}'}{'}'}</code>
                    </p>
                </div>
            </div>
        </div>
    );
};
