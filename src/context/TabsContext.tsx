/* eslint-disable react-refresh/only-export-components, react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findNavItem } from '../config/navigation';
import type { LucideIcon } from 'lucide-react';

export interface Tab {
    path: string;
    title: string;
    icon?: LucideIcon;
}

interface TabsContextType {
    tabs: Tab[];
    activeTab: string;
    closeTab: (path: string) => void;
    closeAll: () => void;
    addTab: (tab: Tab) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const activeTab = location.pathname;

    const addTab = (tab: Tab) => {
        setTabs(prev => {
            if (prev.some(t => t.path === tab.path)) return prev;
            return [...prev, tab];
        });
    };

    useEffect(() => {
        const navItem = findNavItem(location.pathname);
        if (navItem) {
            setTabs(prev => {
                if (prev.some(t => t.path === navItem.to)) return prev;
                return [...prev, {
                    path: navItem.to,
                    title: navItem.label,
                    icon: navItem.icon
                }];
            });
        }
    }, [location.pathname]);

    const closeTab = (path: string) => {
        setTabs(prev => {
            const newTabs = prev.filter(t => t.path !== path);

            // If we closed the active tab, navigate to the last remaining tab or dashboard
            if (path === activeTab) {
                if (newTabs.length > 0) {
                    navigate(newTabs[newTabs.length - 1].path);
                } else {
                    navigate('/dashboard');
                }
            }
            return newTabs;
        });
    };

    const closeAll = () => {
        setTabs([]);
        navigate('/dashboard');
    };

    return (
        <TabsContext.Provider value={{ tabs, activeTab, closeTab, closeAll, addTab }}>
            {children}
        </TabsContext.Provider>
    );
}

export function useTabs() {
    const context = useContext(TabsContext);
    if (context === undefined) {
        throw new Error('useTabs must be used within a TabsProvider');
    }
    return context;
}
