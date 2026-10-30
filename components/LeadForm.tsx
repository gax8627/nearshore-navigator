"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { Turnstile } from '@marsidev/react-turnstile';

interface LeadFormProps {
    title?: string;
    subtitle?: string;
    source?: string;
    className?: string;
}

export function LeadForm({ title, subtitle, source, className }: LeadFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cfToken, setCfToken] = useState<string>("");
    const { t } = useLanguage();

    const formTitle = title || t('form.title');
    const formSubtitle = subtitle || t('form.subtitle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!cfToken) {
            setError("Please complete the security check.");
            setLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const getSessionVal = (key: string) => {
            try { return typeof window !== 'undefined' ? (sessionStorage.getItem(key) || '') : ''; } catch { return ''; }
        };
        
        const data = {
            ...Object.fromEntries(formData.entries()),
            source: source || 'website_contact_form',
            utmSource: searchParams?.get('utm_source') || getSessionVal('nn_utm_source'),
            utmMedium: searchParams?.get('utm_medium') || getSessionVal('nn_utm_medium'),
            utmCampaign: searchParams?.get('utm_campaign') || getSessionVal('nn_utm_campaign'),
            utmContent: searchParams?.get('utm_content') || getSessionVal('nn_utm_content'),
            utmTerm: searchParams?.get('utm_term') || getSessionVal('nn_utm_term'),
            cfToken 
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'generate_lead', {
                        event_category: 'engagement',
                        event_label: source || 'website_contact_form'
                    });
                }
                setSubmitted(true);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center bg-green-50/50 dark:bg-green-900/20 border-primary-200 dark:border-primary-800"
            >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400 text-2xl">
                    ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('form.success_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('form.success_message')}</p>
            </motion.div>
        );
    }

    return (
        <div className={`glass-card p-5 sm:p-8 md:p-12 overflow-hidden ${className} border-white/40 dark:border-white/5`}>
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field - hidden from users */}
                <div className="sr-only" aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
                    <input 
                        type="text" 
                        name="honeypot" 
                        tabIndex={-1} 
                        aria-hidden="true" 
                        autoComplete="off" 
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.name')}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 text-base md:text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.name_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.company')}</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        className="w-full px-4 py-3 text-base md:text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.company_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.email')}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 text-base md:text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.email_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.phone')}</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 text-base md:text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.phone_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.message')}</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={3}
                        required
                        className="w-full px-4 py-3 text-base md:text-sm rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.message_placeholder')}
                    ></textarea>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 space-y-1.5"
                    >
                        <p className="font-semibold">{error}</p>
                        <p className="text-[11px] text-gray-600 dark:text-gray-300">
                            Having trouble? Reach out directly via <a href="mailto:denisse@nearshorenavigator.com" className="font-bold underline text-primary-600 dark:text-primary-400">denisse@nearshorenavigator.com</a> or <a href="https://calendly.com/denisse-nearshorenavigator/30min" target="_blank" rel="noopener noreferrer" className="font-bold underline text-primary-600 dark:text-primary-400">book directly on her calendar</a>.
                        </p>
                    </motion.div>
                )}

                <div className="flex justify-center my-4 max-w-full overflow-hidden scale-90 sm:scale-100">
                    <Turnstile 
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                        onSuccess={setCfToken}
                    />
                </div>

                <Button 
                    variant="primary" 
                    className="w-full mt-2" 
                    size="lg"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Sending...
                        </span>
                    ) : (
                        t('form.submit')
                    )}
                </Button>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    We'll respond within 24 hours. Your details are never shared or sold.
                </p>

                <div className="pt-2 text-center border-t border-gray-100 dark:border-gray-800">
                    <a
                        href="https://calendly.com/denisse-nearshorenavigator/30min?utm_source=lead_form_footer&utm_campaign=direct_booking"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                        onClick={() => {
                            if (typeof window !== 'undefined' && (window as any).gtag) {
                                (window as any).gtag('event', 'click_calendly', {
                                    event_category: 'lead_generation',
                                    event_label: 'lead_form_alternative_booking'
                                });
                            }
                        }}
                    >
                        <span>Prefer to pick a time right now? Schedule with Denisse Martinez</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            </form>
        </div>
    );
}
