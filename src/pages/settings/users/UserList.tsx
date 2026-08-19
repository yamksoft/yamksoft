import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { securityService } from '../../../api/services/security.service';
import { PageHeader } from '../../../components/common/PageHeader/PageHeader';
import { PageToolbar } from '../../../components/common/PageToolbar/PageToolbar';
import { DataTable } from '../../../components/common/DataTable';
import { Modal } from '../../../components/common/Modal';
import { UserForm } from './UserForm';
import { toast } from 'react-hot-toast';
import type { UserDto } from '../../../types/security.types';
import type { Column } from '../../../components/common/DataTable/DataTable';
import { UserCheck, UserX, Edit, Trash2 } from 'lucide-react';

export function UserList() {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDto | undefined>(undefined);

    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: securityService.getUsers,
    });

    const toggleStatusMutation = useMutation({
        mutationFn: (id: number) => securityService.toggleUserStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('تم تحديث حالة المستخدم بنجاح');
        },
        onError: () => toast.error('فشل تحديث حالة المستخدم')
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => securityService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('تم حذف المستخدم بنجاح');
        },
        onError: () => toast.error('فشل حذف المستخدم')
    });

    const handleAdd = () => {
        setSelectedUser(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (user: UserDto) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            deleteMutation.mutate(id);
        }
    };

    const columns: Column<UserDto>[] = [
        { key: 'username', header: 'اسم المستخدم', width: 150 },
        { key: 'fullName', header: 'الاسم الكامل' },
        { key: 'role', header: 'الدور', width: 120 },
        {
            key: 'isActive',
            header: 'الحالة',
            width: 100,
            render: (val) => (
                <span className={`status-badge ${val ? 'active' : 'inactive'}`}>
                    {val ? 'نشط' : 'معطل'}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'إجراءات',
            width: 150,
            render: (_, user) => (
                <div className="flex gap-2">
                    <button className="btn-icon" onClick={() => handleEdit(user)} title="تعديل">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        className="btn-icon"
                        onClick={() => toggleStatusMutation.mutate(user.id)}
                        title={user.isActive ? 'تعطيل' : 'تفعيل'}
                    >
                        {user.isActive ? <UserX className="w-4 h-4 text-orange-500" /> : <UserCheck className="w-4 h-4 text-green-500" />}
                    </button>
                    {!user.role.includes('Admin') && (
                        <button className="btn-icon text-red-500" onClick={() => handleDelete(user.id)} title="حذف">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )
        }
    ];

    const toolbarActions = [
        {
            label: 'إضافة مستخدم',
            icon: 'plus' as const,
            onClick: handleAdd,
            variant: 'primary' as const,
        }
    ];

    const filteredUsers = users?.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="page-container">
            <PageHeader
                title="إدارة المستخدمين"
                subtitle="التحكم في حسابات الوصول والصلاحيات داخل YamkSoft"
            />

            <PageToolbar
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                actions={toolbarActions}
            />

            <DataTable
                columns={columns}
                data={filteredUsers}
                isLoading={isLoading}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
            >
                <UserForm
                    user={selectedUser}
                    onSuccess={() => {
                        setIsModalOpen(false);
                        queryClient.invalidateQueries({ queryKey: ['users'] });
                    }}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
