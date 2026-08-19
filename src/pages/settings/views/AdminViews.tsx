import React from 'react';
import { UserList } from '../users/UserList';
import { RoleManagement } from '../users/RoleManagement';
import { Users, Shield } from 'lucide-react';

export const UsersView: React.FC = () => (
    <div className="view-container animate-fade-in">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">إدارة المستخدمين</h2>
                <p className="text-sm text-secondary">إضافة وتعديل المستخدمين وإدارة وصولهم للمنصة</p>
            </div>
        </div>
        <UserList />
    </div>
);

export const RolesView: React.FC = () => (
    <div className="view-container animate-fade-in">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <Shield className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">الأدوار والصلاحيات</h2>
                <p className="text-sm text-secondary">إدارة أدوار المستخدمين (Admin, User, Auditor) والصلاحيات المرتبطة بكل دور</p>
            </div>
        </div>
        <RoleManagement />
    </div>
);
