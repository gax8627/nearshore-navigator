"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our translations based on the structure we expect.
// Using 'any' for the translations object temporarily to allow for flexibility with the loaded JSON.
// In a stricter setup, we would infer this from the JSON schema.
type Translations = any;

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'ko' | 'it' | 'pt' | 'ru';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    loading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, lang }: { children: ReactNode, lang?: Language }) => {
    const [language, setLanguage] = useState<Language>(lang || 'en');
    const [translations, setTranslations] = useState<Translations>({});
    const [loading, setLoading] = useState<boolean>(true);

    // Update language when lang prop changes (from URL params)
    useEffect(() => {
        if (lang && lang !== language) {
            handleSetLanguage(lang);
        }
    }, [lang]);

    // Function to load translation files dynamically
    const loadTranslations = async (lang: Language) => {
        setLoading(true);
        try {
            const localeData = await import(`../i18n/locales/${lang}.json`);
            setTranslations(localeData.default || localeData);
        } catch (error) {
            console.error(`Failed to load translations for ${lang}`, error);
            // If loading fails, fallback to English
            if (lang !== 'en') {
                const enData = await import(`../i18n/locales/en.json`);
                setTranslations(enData.default || enData);
            }
        } finally {
            setLoading(false);
        }
    };

    // Initial load and language detection (only if lang prop is not provided)
    useEffect(() => {
        const detectLanguage = async () => {
            if (lang) {
                await loadTranslations(lang);
                return;
            }

            let targetLang: Language = 'en';

            // 1. Check localStorage first
            const storedLang = localStorage.getItem('app_lang') as Language;
            if (storedLang) {
                targetLang = storedLang;
            } else {
                // 2. IP Geolocation as primary fallback
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
                    } else if (country === 'FR') {
                        targetLang = 'fr';
                    } else if (country === 'DE') {
                        targetLang = 'de';
                    } else if (country === 'JP') {
                        targetLang = 'ja';
                    } else if (country === 'CN') {
                        targetLang = 'zh';
                    } else if (country === 'KR') {
                        targetLang = 'ko';
                    }
                } catch (error) {
                    console.warn('Geolocation failed, falling back to browser language:', error);
                    const browserLang = navigator.language.split('-')[0].toLowerCase() as Language;
                    targetLang = browserLang;
                }
            }

            setLanguage(targetLang);
            await loadTranslations(targetLang);
        };

        detectLanguage();
    }, [lang]);

    const handleSetLanguage = async (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('app_lang', lang);
        await loadTranslations(lang);
    };

    const t = (path: string): string => {
        if (loading || !translations) return ""; // Return empty or a loading placeholder
        
        const keys = path.split('.');
        let current: any = translations;

        for (const key of keys) {
            if (current === undefined || current[key] === undefined) {
                // console.warn(`Translation key missing: ${path} for language ${language}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
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
