import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { securityService } from '../../../api/services/security.service';
import { PageHeader } from '../../../components/common/PageHeader/PageHeader';
import { DataTable } from '../../../components/common/DataTable';
import { PageToolbar } from '../../../components/common/PageToolbar/PageToolbar';
import { Modal } from '../../../components/common/Modal';
import { Key, Trash2, ShieldCheck } from 'lucide-react';
import type { RoleDto } from '../../../types/security.types';
import { PermissionMatrix } from './PermissionMatrix';
import type { Column } from '../../../components/common/DataTable/DataTable';

export function RoleManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleDto | undefined>(undefined);

    const { data: roles, isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: securityService.getRoles,
    });

    const columns: Column<RoleDto>[] = [
        { key: 'name', header: 'اسم الدور', width: 150 },
        { key: 'description', header: 'الوصف' },
        {
            key: 'permissions',
            header: 'عدد الصلاحيات',
            width: 120,
            render: (val) => (Array.isArray(val) ? val.length : 0).toString()
        },
        {
            key: 'isSystemRole',
            header: 'نوع الدور',
            width: 120,
            render: (val) => val ? 'نظامي' : 'مخصص'
        },
        {
            key: 'actions',
            header: 'إجراءات',
            width: 120,
            render: (_, role) => (
                <div className="flex gap-2">
                    <button className="btn-icon" onClick={() => { setSelectedRole(role); setIsModalOpen(true); }} title="تعديل الصلاحيات">
                        <Key className="w-4 h-4" />
                    </button>
                    {!role.isSystemRole && (
                        <button className="btn-icon text-red-500" title="حذف">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )
        }
    ];

    const toolbarActions = [
        {
            label: 'إضافة دور جديد',
            icon: 'plus' as const,
            onClick: () => { setSelectedRole(undefined); setIsModalOpen(true); },
            variant: 'primary' as const,
        }
    ];

    return (
        <div className="page-container">
            <PageHeader
                title="إدارة الأدوار والصلاحيات"
                subtitle="تحديد مجموعات الصلاحيات للمستخدمين حسب أدوار المنصة"
            />

            <PageToolbar
                actions={toolbarActions}
            />

            <DataTable
                columns={columns}
                data={roles || []}
                isLoading={isLoading}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedRole ? `تعديل صلاحيات: ${selectedRole.name}` : 'إضافة دور جديد'}
                size="large"
            >
                {selectedRole ? (
                    <PermissionMatrix
                        roleName={selectedRole.name}
                        onSave={(perms) => {
                            console.log('Saving permissions:', perms);
                            setIsModalOpen(false);
                        }}
                        onCancel={() => setIsModalOpen(false)}
                    />
                ) : (
                    <div className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-tertiary text-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-primary">إضافة دور جديد</h3>
                            <p className="text-sm text-secondary">يرجى إدخال اسم الدور أولاً ثم البدء بتخصيص الصلاحيات</p>
                        </div>
                        <div className="max-w-sm mx-auto">
                            <input
                                className="form-input text-center text-lg font-bold py-3 px-4"
                                placeholder="مثلاً: مشرف دعم، مدقق نظام"
                            />
                        </div>
                        <div className="flex justify-center gap-3 mt-6">
                            <button className="btn btn-secondary px-8" onClick={() => setIsModalOpen(false)}>إلغاء</button>
                            <button className="btn btn-primary px-12">إنشاء الدور</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
