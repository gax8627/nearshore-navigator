"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../utils/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const detectLanguage = () => {
            // 1. Check localStorage first (user preference takes priority)
            const storedLang = localStorage.getItem('app_lang') as Language;
            if (storedLang && (storedLang === 'en' || storedLang === 'es')) {
                setLanguage(storedLang);
                return;
            }

            // 2. Check browser language (privacy-friendly, no external API)
            const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || 'en';
            const primaryLang = browserLang.split('-')[0].toLowerCase();

            // Spanish-speaking regions
            if (primaryLang === 'es') {
                setLanguage('es');
                return;
            }

            // 3. Check if browser region suggests Spanish
            const browserRegion = browserLang.split('-')[1]?.toUpperCase();
            const spanishSpeakingRegions = ['MX', 'ES', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'];

            if (browserRegion && spanishSpeakingRegions.includes(browserRegion)) {
                setLanguage('es');
                return;
            }

            // 4. Default to English
            setLanguage('en');
        };

        detectLanguage();
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('app_lang', lang);
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = translations[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key missing: ${path} for language ${language}`);
                return path;
            }
            current = current[key];
        }

        return current;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
