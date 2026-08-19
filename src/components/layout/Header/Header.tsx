import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import {
    Menu, Moon, Sun, Bell, PanelLeft, PanelTop,
    Users, Shield, Settings, History
} from 'lucide-react';
import './Header.css';

interface HeaderProps {
    onToggleSidebar: () => void;
    sidebarCollapsed: boolean;
}

export function Header({ onToggleSidebar }: HeaderProps) {
    const { user } = useAuth();
    const { theme, toggleTheme, navMode, toggleNavMode } = useTheme();
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-left">
                {navMode === 'sidebar' && (
                    <button className="btn-icon" onClick={onToggleSidebar} title="القائمة">
                        <Menu size={24} />
                    </button>
                )}

                <div className="quick-actions-toolbar">
                    <div className="action-group">
                        <button className="header-action-btn info" title="إدارة المستخدمين" onClick={() => navigate('/settings/users')}>
                            <Users size={18} />
                        </button>
                        <button className="header-action-btn success" title="إدارة الأدوار" onClick={() => navigate('/settings/roles')}>
                            <Shield size={18} />
                        </button>
                        <button className="header-action-btn purple" title="إعدادات YamkSoft" onClick={() => navigate('/settings/general')}>
                            <Settings size={18} />
                        </button>
                        <button className="header-action-btn warning" title="سجل التدقيق" onClick={() => navigate('/settings/audit-logs')}>
                            <History size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="header-right">
                <button
                    className="btn-icon nav-mode-toggle"
                    onClick={toggleNavMode}
                    title={navMode === 'sidebar' ? 'تفعيل شريط Ribbon' : 'تفعيل القائمة الجانبية'}
                >
                    {navMode === 'sidebar' ? <PanelTop size={20} /> : <PanelLeft size={20} />}
                </button>

                <button
                    className="btn-icon theme-toggle"
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <button className="btn-icon notification-btn" title="الإشعارات">
                    <Bell size={20} />
                    <span className="badge-dot"></span>
                </button>

                <div className="user-profile">
                    <div className="user-avatar">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.fullName || 'المستخدم'}</span>
                        <span className="user-role">{user?.roleName || 'مسؤول النظام'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
