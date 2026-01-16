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
        const detectLanguage = async () => {
            // 1. Check localStorage first
            const storedLang = localStorage.getItem('app_lang') as Language;
            if (storedLang) {
                setLanguage(storedLang);
                return;
            }

            // 2. Check IP Location
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const spanishSpeakingCountries = ['MX', 'ES', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'];

                if (spanishSpeakingCountries.includes(data.country_code)) {
                    setLanguage('es');
                } else {
                    // 3. Fallback to browser language if IP check fails or isn't decisive
                    const browserLang = navigator.language.split('-')[0];
                    if (browserLang === 'es') {
                        setLanguage('es');
                    }
                }
            } catch (error) {
                console.warn('Failed to detect location, defaulting to English', error);
            }
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
