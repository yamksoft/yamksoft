import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settingsService } from '../../../api/services/settings.service';
import {
    History, Search, Filter,
    ChevronLeft, ChevronRight, Download,
    RotateCcw, Calendar, Table as TableIcon,
    User, Activity
} from 'lucide-react';

export function AuditLogsView() {
    const [page] = useState(1);
    const [filters] = useState({
        fromDate: '',
        toDate: '',
        tableName: '',
        action: ''
    });

    const { isLoading } = useQuery({
        queryKey: ['audit-logs', page, filters],
        queryFn: () => settingsService.getAuditLogs() // Ideally would pass params
    });

    const tableNames = ['Users', 'Roles', 'Permissions', 'Settings', 'Notifications'];
    const actions = ['Create', 'Update', 'Delete', 'Login', 'Export'];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <History className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-base-content">سجلات التدقيق (Audit Logs)</h2>
                        <p className="text-sm text-gray-500">تتبع كافة العمليات والتحركات في النظام</p>
                    </div>
                </div>
                <button className="btn btn-secondary gap-2">
                    <Download className="w-4 h-4" />
                    تصدير التقرير
                </button>
            </div>

            {/* Filters Dashboard */}
            <div className="card p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">من تاريخ</label>
                        <div className="relative">
                            <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="date"
                                className="input input-bordered w-full pr-10 pl-4 text-sm font-semibold"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">إلى تاريخ</label>
                        <div className="relative">
                            <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="date"
                                className="input input-bordered w-full pr-10 pl-4 text-sm font-semibold"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">الجدول</label>
                        <div className="relative">
                            <TableIcon className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select className="select select-bordered w-full pr-10">
                                <option value="">الكل</option>
                                {tableNames.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1">العملية</label>
                        <div className="relative">
                            <Activity className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select className="select select-bordered w-full pr-10">
                                <option value="">الكل</option>
                                {actions.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                        <button className="btn btn-primary btn-icon">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="btn btn-secondary btn-icon">
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
                        <Filter className="w-3.5 h-3.5" />
                        <span>سيتم تطبيق أكثر من 12 معيار تصفية عند البحث المتقدم</span>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="card overflow-hidden">
                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-lg" />
                            <span className="text-sm font-black text-gray-600 animate-pulse tracking-widest italic">جاري جلب السجلات...</span>
                        </div>
                    </div>
                )}

                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">المستخدم</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">الوقت</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">الجدول</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">العملية</th>
                            <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">التفاصيل</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="hover:bg-gray-50/80 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-bold text-base-content">أدمن النظام</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-500">2026-02-05 16:45</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-black">Users</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-lg text-xs font-black">Update</span>
                                </td>
                                <td className="px-6 py-4 max-w-xs transition-all">
                                    <p className="text-xs text-secondary truncate group-hover:whitespace-normal group-hover:text-gray-600 group-hover:line-clamp-2">
                                        تم تحديث صلاحيات المستخدم وإضافة وصول جديد للوحة الإعدادات...
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 underline underline-offset-4 decoration-primary/30">عرض 1-10 من أصل 245 سجل</p>
                    <div className="flex gap-2">
                        <button className="btn btn-secondary btn-icon h-8 w-8">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        {[1, 2, 3].map(p => (
                            <button
                                key={p}
                                className={`btn btn-sm ${p === 1 ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {p}
                            </button>
                        ))}
                        <button className="btn btn-secondary btn-icon h-8 w-8">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
