import { useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navItems, type NavItem } from '../../../config/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './RibbonNav.css';

export function RibbonNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);

    const activeTab = useMemo(() => {
        const currentPath = location.pathname;
        const parent = navItems.find(item =>
            item.to === currentPath ||
            (item.children && item.children.some(c => currentPath.startsWith(c.to)))
        );

        return parent?.to || '/dashboard';
    }, [location.pathname]);

    const handleTabClick = (item: NavItem) => {
        if (!expanded) setExpanded(true);

        navigate(item.children?.[0]?.to || item.to);
    };

    const activeItem = navItems.find(item => item.to === activeTab);

    return (
        <div className={`ribbon-container ${!expanded ? 'collapsed' : ''}`}>
            <div className="ribbon-tabs-header">
                <div className="ribbon-tabs-list">
                    {navItems.map(item => (
                        <button
                            key={item.to}
                            className={`ribbon-tab ${activeTab === item.to ? 'active' : ''}`}
                            onClick={() => handleTabClick(item)}
                        >
                            {item.icon && <item.icon size={16} />}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
                <button
                    className="ribbon-collapse-btn"
                    onClick={() => setExpanded(!expanded)}
                    title={expanded ? 'طي الشريط' : 'توسيع الشريط'}
                >
                    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
            </div>

            {expanded && activeItem && activeItem.children && (
                <div className="ribbon-content">
                    <div className="ribbon-group">
                        <div className="ribbon-group-title">العمليات</div>
                        <div className="ribbon-buttons">
                            {activeItem.children.map(child => (
                                <NavLink
                                    key={child.to}
                                    to={child.to}
                                    className={({ isActive }) => `ribbon-button ${isActive ? 'active' : ''}`}
                                >
                                    {/* Helper to find icon - normally would be in child definition, but we use parent icon or generic */}
                                    <div className="ribbon-icon-wrapper">
                                        {activeItem.icon && <activeItem.icon size={18} />}
                                    </div>
                                    <span className="ribbon-button-label">{child.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
