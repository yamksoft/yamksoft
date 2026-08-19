import { useState } from 'react';
import {
    Search,
    CheckCircle2, AlertCircle, Save,
    ShieldAlert, ChevronDown,
    ChevronUp, Settings
} from 'lucide-react';
import type { PermissionGroupDto } from '../../../types/settings.types';

interface PermissionMatrixProps {
    roleName: string;
    onSave: (permissions: string[]) => void;
    onCancel: () => void;
}

export function PermissionMatrix({ roleName, onSave, onCancel }: PermissionMatrixProps) {
    const [searchText, setSearchText] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['Users', 'Roles']);

    const permissionGroups: PermissionGroupDto[] = [
        {
            key: 'Users',
            displayName: 'إدارة المستخدمين',
            permissions: [
                { key: 'users_view', displayName: 'عرض المستخدمين', module: 'Users', description: 'السماح باستعراض حسابات المستخدمين', isSelected: true },
                { key: 'users_create', displayName: 'إضافة مستخدم', module: 'Users', description: 'السماح بإنشاء حسابات جديدة', isSelected: true },
                { key: 'users_edit', displayName: 'تعديل مستخدم', module: 'Users', description: 'السماح بتعديل بيانات الحسابات', isSelected: false },
                { key: 'users_disable', displayName: 'تعطيل مستخدم', module: 'Users', description: 'السماح بتعطيل أو تفعيل الحسابات', isSelected: false },
            ]
        },
        {
            key: 'Roles',
            displayName: 'إدارة الأدوار والصلاحيات',
            permissions: [
                { key: 'roles_view', displayName: 'عرض الأدوار', module: 'Roles', description: 'السماح بعرض الأدوار المعرفة', isSelected: true },
                { key: 'roles_manage', displayName: 'إدارة الأدوار', module: 'Roles', description: 'السماح بإضافة وتعديل الأدوار', isSelected: false },
                { key: 'permissions_manage', displayName: 'إدارة الصلاحيات', module: 'Roles', description: 'السماح بتعديل صلاحيات الأدوار', isSelected: false },
            ]
        },
        {
            key: 'Platform',
            displayName: 'إدارة المنصة',
            permissions: [
                { key: 'settings_manage', displayName: 'إعدادات YamkSoft', module: 'Platform', description: 'السماح بتعديل الإعدادات العامة', isSelected: true },
                { key: 'notifications_manage', displayName: 'إدارة الإشعارات', module: 'Platform', description: 'السماح بتعديل القوالب وإعدادات الإرسال', isSelected: false },
                { key: 'audit_view', displayName: 'عرض سجل التدقيق', module: 'Platform', description: 'السماح باستعراض أحداث التدقيق', isSelected: false },
            ]
        }
    ];

    const toggleGroup = (key: string) => {
        setExpandedGroups(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    return (
        <div className="flex flex-col h-[70vh]">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <div>
                        <h3 className="font-black text-gray-800">مصفوفة الصلاحيات: {roleName}</h3>
                        <p className="text-[10px] font-bold text-gray-400">تحكم دقيق في وصول الوظائف للوحدات البرمجية</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-xs font-black text-primary hover:bg-primary/5 rounded-lg transition-all">تحديد الكل</button>
                    <button className="px-4 py-2 text-xs font-black text-gray-400 hover:bg-gray-50 rounded-lg transition-all">إلغاء الكل</button>
                </div>
            </div>

            <div className="p-4 bg-white border-b border-gray-100">
                <div className="relative">
                    <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="ابحث عن صلاحية معينة (مثل: إضافة، تعديل، حذف)..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pr-10 pl-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {permissionGroups.map((group) => (
                    <div key={group.key} className="space-y-3">
                        <button
                            onClick={() => toggleGroup(group.key)}
                            className="w-full flex items-center justify-between py-2 border-b border-gray-100 group"
                        >
                            <div className="flex items-center gap-3">
                                <Settings className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                <span className="font-black text-gray-700 text-sm">{group.displayName}</span>
                                <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                                    {group.permissions.length} عنصر
                                </span>
                            </div>
                            {expandedGroups.includes(group.key) ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>

                        {expandedGroups.includes(group.key) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-2">
                                {group.permissions.map((perm) => (
                                    <div
                                        key={perm.key}
                                        className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer group ${perm.isSelected ? 'border-primary/20 bg-primary/5' : 'border-gray-50 hover:border-gray-100'}`}
                                    >
                                        <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${perm.isSelected ? 'bg-primary border-primary text-white' : 'border-gray-200 group-hover:border-primary/50'}`}>
                                            {perm.isSelected && <CheckCircle2 className="w-3 h-3" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-xs text-gray-800">{perm.displayName}</div>
                                            <p className="text-[9px] text-gray-400 leading-relaxed mt-0.5">
                                                {perm.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">تحتاج للمراجعة قبل الاعتماد</span>
                </div>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-all">إلغاء</button>
                    <button onClick={() => onSave([])} className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all">
                        <Save className="w-4 h-4" />
                        حفظ الصلاحيات
                    </button>
                </div>
            </div>
        </div>
    );
}
