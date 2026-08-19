/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getStoredTheme, setStoredTheme, getStoredNavMode, setStoredNavMode } from '../utils/storage';

type Theme = 'light' | 'dark';
type NavMode = 'sidebar' | 'ribbon';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    navMode: NavMode;
    toggleNavMode: () => void;
    setNavMode: (mode: NavMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());
    const [navMode, setNavModeState] = useState<NavMode>(() => getStoredNavMode());

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        setStoredTheme(theme);
    }, [theme]);

    useEffect(() => {
        setStoredNavMode(navMode);
    }, [navMode]);

    const toggleTheme = () => {
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const toggleNavMode = () => {
        setNavModeState((prev) => (prev === 'sidebar' ? 'ribbon' : 'sidebar'));
    };

    const setNavMode = (mode: NavMode) => {
        setNavModeState(mode);
    };

    const value: ThemeContextType = {
        theme,
        toggleTheme,
        setTheme,
        navMode,
        toggleNavMode,
        setNavMode,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
