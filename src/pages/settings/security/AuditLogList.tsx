import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { securityService } from '../../../api/services/security.service';
import { PageHeader } from '../../../components/common/PageHeader/PageHeader';
import { DataTable } from '../../../components/common/DataTable';
import { formatDateTime } from '../../../utils/formatters';
import { Search } from 'lucide-react';
import type { AuditLogDto } from '../../../types/security.types';
import type { Column } from '../../../components/common/DataTable/DataTable';

export function AuditLogList() {
    const [params, setParams] = useState({
        page: 1,
        pageSize: 50,
        tableName: '',
        action: '',
        from: '',
        to: ''
    });

    const { data, isLoading } = useQuery({
        queryKey: ['audit-logs', params],
        queryFn: () => securityService.getAuditLogs(params),
    });

    const { data: tables } = useQuery({
        queryKey: ['audit-tables'],
        queryFn: securityService.getAuditTables,
    });

    const columns: Column<AuditLogDto>[] = [
        { key: 'changedAt', header: 'التاريخ والوقت', width: 180, render: (val) => formatDateTime(String(val)) },
        { key: 'changedByName', header: 'المستخدم', width: 150 },
        {
            key: 'actionAr',
            header: 'العملية',
            width: 100,
            render: (val, row) => {
                const action = row.action?.toLowerCase();
                let statusClass = 'pending';
                if (action === 'create') statusClass = 'active';
                if (action === 'delete') statusClass = 'inactive';
                if (action === 'update') statusClass = 'info';

                return (
                    <span className={`status-badge ${statusClass}`}>
                        {String(val)}
                    </span>
                );
            }
        },
        { key: 'tableName', header: 'الجدول/الكائن', width: 150 },
        { key: 'recordId', header: 'معرف السجل', width: 100 },
        {
            key: 'details',
            header: 'التفاصيل',
            render: (_, row) => (
                <div className="text-xs max-w-md truncate">
                    {row.newValues ? `تغيير في: ${Object.keys(JSON.parse(row.newValues)).join(', ')}` : 'حذف سجل'}
                </div>
            )
        }
    ];

    return (
        <div className="page-container">
            <PageHeader
                title="سجل العمليات (Audit Logs)"
                subtitle="تتبع كافة التغييرات التي تمت على البيانات من مَن ومتى"
            />

            <div className="toolbar-filter bg-surface p-4 rounded-lg shadow-sm mb-4 flex gap-4 items-end">
                <div className="form-group">
                    <label className="text-xs">من تاريخ</label>
                    <input type="date" className="form-input" value={params.from} onChange={e => setParams({ ...params, from: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="text-xs">إلى تاريخ</label>
                    <input type="date" className="form-input" value={params.to} onChange={e => setParams({ ...params, to: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="text-xs">الجدول</label>
                    <select className="form-select" value={params.tableName} onChange={e => setParams({ ...params, tableName: e.target.value })}>
                        <option value="">كافة الجداول</option>
                        {tables?.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label className="text-xs">العملية</label>
                    <select className="form-select" value={params.action} onChange={e => setParams({ ...params, action: e.target.value })}>
                        <option value="">كافة العمليات</option>
                        <option value="Create">إضافة</option>
                        <option value="Update">تعديل</option>
                        <option value="Delete">حذف</option>
                    </select>
                </div>
                <button className="btn btn-primary h-10 px-6 flex items-center gap-2" title="تحديث">
                    <Search className="w-4 h-4" />
                    بحث
                </button>
            </div>

            <DataTable
                columns={columns}
                data={data?.data || []}
                isLoading={isLoading}
                emptyMessage="لا توجد سجلات مطابقة للبحث"
            />

            <div className="pagination-info mt-4 text-sm text-secondary flex justify-between items-center bg-tertiary/30 p-3 rounded-lg">
                <span>إجمالي السجلات: {data?.total || 0}</span>
                <div className="flex items-center gap-3">
                    <button
                        disabled={params.page === 1}
                        onClick={() => setParams({ ...params, page: params.page - 1 })}
                        className="btn btn-secondary btn-sm"
                    >السابق</button>
                    <span className="font-bold">صفحة {params.page}</span>
                    <button
                        disabled={(data?.total || 0) <= params.page * params.pageSize}
                        onClick={() => setParams({ ...params, page: params.page + 1 })}
                        className="btn btn-secondary btn-sm"
                    >التالي</button>
                </div>
            </div>
        </div>
    );
}
