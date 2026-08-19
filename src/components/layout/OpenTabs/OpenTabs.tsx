import { useTabs } from '../../../context/TabsContext';
import { useNavigate } from 'react-router-dom';
import { X, LayoutTemplate } from 'lucide-react';
import './OpenTabs.css';

export function OpenTabs() {
    const { tabs, activeTab, closeTab, closeAll } = useTabs();
    const navigate = useNavigate();

    if (tabs.length === 0) return null;

    return (
        <div className="open-tabs-container">
            <div className="tabs-scroll-area">
                {tabs.map((tab) => (
                    <div
                        key={tab.path}
                        className={`tab-item ${activeTab === tab.path ? 'active' : ''}`}
                        onClick={() => navigate(tab.path)}
                        title={tab.title}
                    >
                        {tab.icon && <tab.icon size={14} className="tab-icon" />}
                        <span className="tab-title">{tab.title || 'صفحة جديدة'}</span>
                        <button
                            className="tab-close-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeTab(tab.path);
                            }}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            {tabs.length > 1 && (
                <button className="close-all-btn" onClick={closeAll} title="إغلاق الكل">
                    <LayoutTemplate size={16} />
                    <X size={12} className="close-icon-small" />
                </button>
            )}
        </div>
    );
}
