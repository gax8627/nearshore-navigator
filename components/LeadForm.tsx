"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

interface LeadFormProps {
    title?: string;
    subtitle?: string;
    className?: string;
}

export function LeadForm({ title, subtitle, className }: LeadFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const { t } = useLanguage();

    const formTitle = title || t('form.title');
    const formSubtitle = subtitle || t('form.subtitle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => setSubmitted(true), 1000);
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
        <div className={`glass-card p-8 ${className}`}>
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formTitle}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.name')}</label>
                    <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.name_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.company')}</label>
                    <input
                        type="text"
                        id="company"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.company_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.email')}</label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.email_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.phone')}</label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.phone_placeholder')}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('form.message')}</label>
                    <textarea
                        id="message"
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none transition-all"
                        placeholder={t('form.message_placeholder')}
                    ></textarea>
                </div>

                <Button variant="primary" className="w-full mt-2" size="lg">
                    {t('form.submit')}
                </Button>
            </form>
        </div>
    );
}
