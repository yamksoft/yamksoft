import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ar } from '../locales/ar';
import { en } from '../locales/en';

type Language = 'ar' | 'en';

type Translations = typeof ar;

interface LanguageContextType {
    language: Language;
    t: Translations;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem('yamksoft_lang');
        return (stored === 'ar' || stored === 'en') ? stored : 'ar';
    });

    useEffect(() => {
        localStorage.setItem('yamksoft_lang', language);
        const dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = language === 'ar' ? ar : en;
    const dir = language === 'ar' ? 'rtl' : 'ltr';

    const value: LanguageContextType = {
        language,
        t,
        toggleLanguage,
        setLanguage,
        dir
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
