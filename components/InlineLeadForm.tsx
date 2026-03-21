"use client";

import React, { useState } from 'react';
import { Button } from "./Button";
import { Send, CheckCircle2, Building2, Mail, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export const InlineLeadForm = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Reusing the lead-magnet API which handles Brevo/Email
            const res = await fetch('/api/lead-magnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    source: 'Homepage_Inline_Form',
                    pdfRequested: 'General_Industrial_Inquiry'
                }),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{t('inlineForm.success')}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{t('inlineForm.successDesc')}</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="form"
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10"
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{t('inlineForm.title')}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{t('inlineForm.subtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    required
                                    type="text" 
                                    placeholder={t('inlineForm.name')}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    required
                                    type="email" 
                                    placeholder={t('inlineForm.email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="h-full py-4 rounded-xl shadow-lg shadow-primary-500/20"
                            >
                                {status === 'submitting' ? t('inlineForm.processing') : t('inlineForm.submit')}
                                <Send className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                        
                        {status === 'error' && (
                            <p className="text-red-500 text-sm mt-4 text-center">{t('inlineForm.error')}</p>
                        )}
                        
                        <div className="mt-6 flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-green-500 rounded-full" />
                                {t('inlineForm.nda')}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-green-500 rounded-full" />
                                {t('inlineForm.response')}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-green-500 rounded-full" />
                                {t('inlineForm.expert')}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
