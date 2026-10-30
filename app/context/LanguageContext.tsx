"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultTranslations from '../i18n/locales/en.json';

type Translations = any;

export type Language = 'en' | 'es' | 'de' | 'ja';

function deepMerge(target: any, source: any): any {
    if (!source) return target;
    const output = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            output[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    loading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, lang }: { children: ReactNode, lang?: Language }) => {
    const [language, setLanguage] = useState<Language>(lang || 'en');
    const [translations, setTranslations] = useState<Translations>(defaultTranslations);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to load translation files dynamically and deep-merge over English base
    const loadTranslations = React.useCallback(async (targetLang: Language) => {
        if (targetLang === 'en') {
            setTranslations(defaultTranslations);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const localeData = await import(`../i18n/locales/${targetLang}.json`);
            setTranslations(deepMerge(defaultTranslations, localeData.default || localeData));
        } catch (error) {
            console.error(`Failed to load translations for ${targetLang}`, error);
            setTranslations(defaultTranslations);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSetLanguage = React.useCallback(async (newLang: Language) => {
        setLanguage(newLang);
        localStorage.setItem('app_lang', newLang);
        await loadTranslations(newLang);
    }, [loadTranslations]);

    // Update language when lang prop changes (from URL params)
    useEffect(() => {
        if (lang && lang !== language) {
            handleSetLanguage(lang);
        }
    }, [lang, language, handleSetLanguage]);

    // Initial load and language detection (only if lang prop is not provided)
    useEffect(() => {
        const detectLanguage = async () => {
            if (lang) {
                await loadTranslations(lang);
                return;
            }

            let targetLang: Language = 'en';

            // 1. Check localStorage first (normalize against supported locales)
            const SUPPORTED: Language[] = ['en', 'es', 'de', 'ja'];
            const storedLang = localStorage.getItem('app_lang') as Language;
            if (storedLang && SUPPORTED.includes(storedLang)) {
                targetLang = storedLang;
            } else {
                // 2. IP Geolocation as primary fallback.
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    const country = data.country_code;

                    const spanishSpeakingCountries = [
                        'MX', 'ES', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU',
                        'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'
                    ];

                    if (spanishSpeakingCountries.includes(country)) {
                        targetLang = 'es';
                    } else if (['DE', 'AT', 'CH'].includes(country)) {
                        targetLang = 'de';
                    } else if (country === 'JP') {
                        targetLang = 'ja';
                    }
                } catch (e) {
                    // Geolocation failed or blocked; default to English
                }
            }

            setLanguage(targetLang);
            await loadTranslations(targetLang);
        };

        detectLanguage();
    }, [lang, loadTranslations]);

    const t = (path: string): string => {
        if (!translations) return "";
        
        const keys = path.split('.');
        let current: any = translations;

        for (const key of keys) {
            if (current === undefined || current[key] === undefined) {
                return "";
            }
            current = current[key];
        }

        return typeof current === 'string' ? current : "";
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, loading }}>
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
