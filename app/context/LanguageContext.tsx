"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our translations based on the structure we expect.
// Using 'any' for the translations object temporarily to allow for flexibility with the loaded JSON.
// In a stricter setup, we would infer this from the JSON schema.
type Translations = any;

export type Language = 'en' | 'es';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    loading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');
    const [translations, setTranslations] = useState<Translations>({});
    const [loading, setLoading] = useState<boolean>(true);

    // Function to load translation files dynamically
    const loadTranslations = async (lang: Language) => {
        setLoading(true);
        try {
            const localeData = await import(`../i18n/locales/${lang}.json`);
            setTranslations(localeData.default || localeData);
        } catch (error) {
            console.error(`Failed to load translations for ${lang}`, error);
            // Fallback to English if loading fails? Or keep current state.
            // For now, let's just log.
        } finally {
            setLoading(false);
        }
    };

    // Initial load and language detection
    useEffect(() => {
        const detectLanguage = async () => {
            let targetLang: Language = 'en';

            // 1. Check localStorage first
            const storedLang = localStorage.getItem('app_lang') as Language;
            if (storedLang && (storedLang === 'en' || storedLang === 'es')) {
                targetLang = storedLang;
            } else {
                // 2. Browser detection
                const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || 'en';
                const primaryLang = browserLang.split('-')[0].toLowerCase();

                if (primaryLang === 'es') {
                    targetLang = 'es';
                }
                // (Additional region logic can remain here if needed from previous implementation)
            }

            setLanguage(targetLang);
            await loadTranslations(targetLang);
        };

        detectLanguage();
    }, []);

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
