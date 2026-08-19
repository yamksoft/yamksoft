import {
    LayoutDashboard,
    Users,
    Settings,
    Bell,
    Shield,
    History,
    LayoutTemplate
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
    to: string;
    icon: LucideIcon;
    label: string;
    children?: { to: string; label: string }[];
}

export const navItems: NavItem[] = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'لوحة المعلومات' },
    { to: '/settings/users', icon: Users, label: 'المستخدمون' },
    { to: '/settings/roles', icon: Shield, label: 'الأدوار' },
    { to: '/settings/notifications/logs', icon: Bell, label: 'الإشعارات' },
    { to: '/settings/audit-logs', icon: History, label: 'سجل التدقيق' },
    {
        to: '/settings',
        icon: Settings,
        label: 'الإعدادات',
        children: [
            { to: '/settings/general', label: 'الإعدادات العامة' },
            { to: '/settings/roles', label: 'إدارة الأدوار' },
            { to: '/settings/users', label: 'إدارة المستخدمين' },
            { to: '/settings/permissions', label: 'الصلاحيات' },
            { to: '/settings/notifications/logs', label: 'سجل الإشعارات' },
            { to: '/settings/notifications/templates', label: 'قوالب الإشعارات' },
            { to: '/settings/notifications/settings', label: 'إعدادات الإرسال' },
            { to: '/settings/audit-logs', label: 'سجل التدقيق' },
        ]
    },
    { to: '/settings/notifications/templates', icon: LayoutTemplate, label: 'القوالب' },
];

export const findNavItem = (path: string): NavItem | undefined => {
    for (const item of navItems) {
        if (item.to === path) return item;
        if (item.children) {
            const child = item.children.find(c => c.to === path);
            if (child) return { ...child, icon: item.icon }; // Use parent icon for child if no specific icon
        }
    }
    return undefined;
};
