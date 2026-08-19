import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
    LogOut,
    ChevronDown,
    ChevronLeft,
    X
} from 'lucide-react';
import './Sidebar.css';
import { navItems, type NavItem } from '../../../config/navigation';

interface SidebarProps {
    collapsed: boolean;
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
    onExpandSidebar?: () => void;
}

export function Sidebar({ collapsed, mobileOpen = false, onCloseMobile, onExpandSidebar }: SidebarProps) {
    const { logout } = useAuth();
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState<string[]>(['/settings']);

    const toggleMenu = (path: string) => {
        setOpenMenus(prev =>
            prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
        );
    };

    // معالجة النقر على عنصر له قائمة فرعية عندما يكون الشريط مطوياً
    const handleCollapsedParentClick = (path: string) => {
        // فتح الشريط الجانبي
        if (onExpandSidebar) {
            onExpandSidebar();
        }
        // فتح القائمة الفرعية
        if (!openMenus.includes(path)) {
            setOpenMenus(prev => [...prev, path]);
        }
    };

    const isParentActive = (item: NavItem) => {
        if (location.pathname === item.to) return true;
        if (item.children) {
            return item.children.some(child => location.pathname.startsWith(child.to));
        }
        return false;
    };

    const handleLinkClick = () => {
        // Close sidebar only on mobile
        if (window.innerWidth <= 768 && onCloseMobile) {
            onCloseMobile();
        }
    };

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                {!collapsed && <span className="logo-text">YamkSoft</span>}
                {collapsed && <span className="logo-mini">YS</span>}
                {mobileOpen && onCloseMobile && (
                    <button className="mobile-close-btn" onClick={onCloseMobile} title="إغلاق">
                        <X size={24} />
                    </button>
                )}
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isOpen = openMenus.includes(item.to);
                        const active = isParentActive(item);

                        // Special handling for Settings to match Image 2 hierarchy
                        const isSettings = item.to === '/settings';

                        return (
                            <li key={item.to} className={`${hasChildren ? 'has-submenu' : ''} ${active ? 'active-parent' : ''}`}>
                                {hasChildren && !collapsed ? (
                                    <>
                                        <button
                                            className={`nav-link ${active ? 'active' : ''}`}
                                            onClick={() => toggleMenu(item.to)}
                                        >
                                            <item.icon className="nav-icon" size={20} />
                                            <span className="nav-label">{item.label}</span>
                                            <span className="submenu-arrow">
                                                {isOpen ? <ChevronDown size={14} /> : <ChevronLeft size={14} />}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <ul className={`submenu ${isSettings ? 'settings-tree' : ''}`}>
                                                {isSettings ? (
                                                    <SettingsHierarchy item={item} onLinkClick={handleLinkClick} />
                                                ) : (
                                                    item.children?.map(child => (
                                                        <li key={child.to}>
                                                            <NavLink
                                                                to={child.to}
                                                                className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                                                                onClick={handleLinkClick}
                                                            >
                                                                {child.label}
                                                            </NavLink>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        )}
                                    </>
                                ) : hasChildren && collapsed ? (
                                    <button
                                        className={`nav-link ${active ? 'active' : ''}`}
                                        onClick={() => handleCollapsedParentClick(item.to)}
                                        title={item.label}
                                    >
                                        <item.icon className="nav-icon" size={20} />
                                    </button>
                                ) : (
                                    <NavLink
                                        to={item.to}
                                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                        title={collapsed ? item.label : ''}
                                        onClick={handleLinkClick}
                                    >
                                        <item.icon className="nav-icon" size={20} />
                                        {!collapsed && <span className="nav-label">{item.label}</span>}
                                    </NavLink>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="nav-link logout-btn" onClick={logout} title="تسجيل الخروج">
                    <LogOut className="nav-icon" size={20} />
                    {!collapsed && <span className="nav-label">خروج</span>}
                </button>
            </div>
        </aside>
    );
}

// Hierarchical settings tree
function SettingsHierarchy({ item, onLinkClick }: { item: NavItem, onLinkClick: () => void }) {
    const groups = [
        { label: 'عامة', paths: ['/settings/general'] },
        { label: 'الإدارة العامة', paths: ['/settings/roles', '/settings/users', '/settings/permissions'] },
        { label: 'إشعارات النظام', paths: ['/settings/notifications/logs', '/settings/notifications/templates', '/settings/notifications/settings'] },
        { label: 'الأمان', paths: ['/settings/audit-logs'] },
    ];

    return (
        <div className="settings-nav-tree">
            {groups.map(group => (
                <div key={group.label} className="settings-nav-group">
                    <div className="group-header">{group.label}</div>
                    <ul className="group-items">
                        {group.paths.map(path => {
                            const child = item.children?.find(c => c.to === path);
                            if (!child) return null;
                            return (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                                        onClick={onLinkClick}
                                    >
                                        {child.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
