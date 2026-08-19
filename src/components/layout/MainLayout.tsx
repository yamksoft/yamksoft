import { useState, useEffect, type ReactNode } from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import { StatusBar } from './StatusBar/StatusBar';
import { OpenTabs } from './OpenTabs/OpenTabs';
import { RibbonNav } from './RibbonNav/RibbonNav';
import { useTheme } from '../../context/ThemeContext';
import './MainLayout.css';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { navMode } = useTheme();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        if (navMode === 'ribbon') return; // No sidebar toggle in ribbon mode

        if (isMobile) {
            setMobileMenuOpen((prev) => !prev);
        } else {
            setSidebarCollapsed((prev) => !prev);
        }
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // توسيع الشريط الجانبي عند النقر على عنصر له قائمة فرعية
    const expandSidebar = () => {
        if (navMode === 'ribbon') return;

        if (isMobile) {
            setMobileMenuOpen(true);
        } else {
            setSidebarCollapsed(false);
        }
    };

    return (
        <div className={`main-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${navMode === 'ribbon' ? 'ribbon-mode' : ''}`}>
            <div
                className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={closeMobileMenu}
            />

            {navMode === 'sidebar' && (
                <Sidebar
                    collapsed={sidebarCollapsed}
                    mobileOpen={mobileMenuOpen}
                    onCloseMobile={closeMobileMenu}
                    onExpandSidebar={expandSidebar}
                />
            )}

            <div className="main-content">
                <Header onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
                {navMode === 'ribbon' && <RibbonNav />}
                <OpenTabs />
                <main className="page-content">
                    {children}
                </main>
                <StatusBar />
            </div>
        </div>
    );
}

