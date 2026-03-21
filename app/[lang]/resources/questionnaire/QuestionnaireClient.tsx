"use client";

import React, { useState } from 'react';
import { useLanguage } from "@/app/context/LanguageContext";
import { DownloadPDFButton } from "@/components/DownloadPDFButton";
import { Printer, ChevronRight, ChevronLeft, ArrowRight, ArrowLeft, CheckCircle2, ClipboardCheck, Mail, Building2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";

type QuestionType = 'mcq' | 'text' | 'yesno';

interface QConfig {
    type: QuestionType;
    options?: string[];
}

const QUESTION_CONFIG: Record<string, QConfig> = {
    // Section 1
    q1: { type: 'mcq', options: ['< 5,000 sqft', '5k - 20k sqft', '20k - 50k sqft', '50k+ sqft'] },
    q2: { type: 'mcq', options: ['Electronics', 'Medical Devices', 'Aerospace', 'Apparel / Textiles', 'Consumer Goods', 'Other'] },
    q3: { type: 'mcq', options: ['Standard Pallets', 'Bulk', 'Bags', 'Parcels / Packages', 'Other'] },
    q4: { type: 'text' },
    q5: { type: 'text' },
    // Section 2
    q6: { type: 'text' },
    q7: { type: 'yesno' },
    q8: { type: 'mcq', options: ['1 Level (No Stacking)', '2 Levels', '3+ Levels'] },
    q9: { type: 'mcq', options: ['< 100', '100 - 500', '500 - 1000', '1000+'] },
    q10: { type: 'mcq', options: ['1-5', '5-20', '20-50', '50+'] },
    q11: { type: 'mcq', options: ['Virtual Transfers', 'Home Extension (Import/Export)', 'Both'] },
    q12: { type: 'text' },
    // Section 3
    q13: { type: 'mcq', options: ['EDI', 'API', 'Email / CSV', 'Other'] },
    q14: { type: 'mcq', options: ['SAP', 'Oracle', 'NetSuite', 'Shopify', 'Custom / Other'] },
    q15: { type: 'mcq', options: ['Real-time', 'Hourly', 'Daily', 'Weekly'] },
    q16: { type: 'mcq', options: ['AS2', 'FTP / SFTP', 'API / HTTPS', 'Email'] },
    q17: { type: 'mcq', options: ['EDI ANSI X12', 'CSV / Flat File', 'XML / JSON', 'Other'] },
    q18: { type: 'text' },
    // Section 4
    q19: { type: 'mcq', options: ['1-10', '10-50', '50-100', '100+'] },
    q20: { type: 'mcq', options: ['< 100', '100 - 500', '500 - 1000', '1000+'] },
    q21: { type: 'mcq', options: ['1-5', '5-10', '10-20', '20+'] },
    q22: { type: 'text' },
    q23: { type: 'mcq', options: ['< 100', '100 - 500', '500 - 1000', '1000+'] },
    // Section 5
    q24: { type: 'yesno' },
    q28: { type: 'yesno' },
    q25: { type: 'text' }, q26: { type: 'text' }, q27: { type: 'text' }, q29: { type: 'text' }, q30: { type: 'text' }, q31: { type: 'text' },
    // Section 6
    q32: { type: 'mcq', options: ['< $100k', '$100k - $500k', '$500k - $1M', '$1M+'] },
    q33: { type: 'mcq', options: ['Yes', 'No', 'Need Quote'] },
    q34: { type: 'mcq', options: ['Month-to-Month', '1 Year', '3 Years', '5+ Years'] },
    q35: { type: 'mcq', options: ['Yes (Need Quote)', 'No (Have my own)'] },
    q36: { type: 'text' },
};

export default function QuestionnaireClient() {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const totalSteps = 8; // Intro + 6 Sections + Lead Capture

    const nextStep = () => {
        setStep((s) => Math.min(s + 1, totalSteps));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const prevStep = () => {
        setStep((s) => Math.max(s - 1, 0));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmitLead = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/lead-magnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    company: formData.company,
                    pdfRequested: '3PL_Questionnaire_Result',
                    data: formData
                }),
            });

            if (response.ok) {
                setIsSuccess(true);
                setStep(8);
            }
        } catch (error) {
            console.error("Lead capture failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = (step / (totalSteps - 1)) * 100;

    const renderField = (qId: string) => {
        const config = QUESTION_CONFIG[qId] || { type: 'text' };
        
        return (
            <div key={qId} className="space-y-4 py-4 border-b border-gray-100 last:border-0">
                <label className="block text-base md:text-lg font-bold text-slate-800">
                    {t(`questionnaire.${qId}`)}
                </label>
                
                {config.type === 'text' && (
                    <textarea 
                        value={formData[qId] || ''}
                        onChange={(e) => handleInputChange(qId, e.target.value)}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:bg-white transition-all min-h-[100px]"
                        placeholder="..."
                    />
                )}

                {config.type === 'yesno' && (
                    <div className="flex gap-3">
                        {['Yes', 'No'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => handleInputChange(qId, opt)}
                                className={`flex-1 py-4 px-6 rounded-xl font-bold border-2 transition-all ${
                                    formData[qId] === opt 
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm' 
                                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                {config.type === 'mcq' && config.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {config.options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => handleInputChange(qId, opt)}
                                className={`text-left py-4 px-5 rounded-xl font-bold border-2 transition-all ${
                                    formData[qId] === opt 
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm shadow-primary-100' 
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{opt}</span>
                                    {formData[qId] === opt && <CheckCircle2 className="w-5 h-5 text-primary-600" />}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-slate-100 min-h-screen text-gray-900 pb-20 font-sans">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-2 bg-slate-200 z-50 print:hidden">
                <motion.div 
                    className="h-full bg-primary-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            </div>

            <main className="max-w-3xl mx-auto px-4 pt-12">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div 
                            key="step-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-slate-200"
                        >
                            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <ClipboardCheck className="w-12 h-12 text-primary-600" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">{t('questionnaire.title')}</h1>
                            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {t('questionnaire.intro')}
                            </p>
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-10 text-left rounded-r-xl shadow-sm">
                                <p className="text-sm md:text-base text-amber-900 font-medium leading-relaxed">
                                    <strong>Immediate Action Required:</strong> Most industrial parks in Baja have &lt;3% vacancy. Completing this scoping tool allows us to bypass waitlists by presenting a ready-to-move operational brief to developers.
                                </p>
                            </div>
                            <div>
                                <Button onClick={nextStep} className="px-10 py-5 text-lg md:text-xl rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                                    Begin Scoping
                                    <ChevronRight className="ml-2 w-6 h-6" />
                                </Button>
                                <p className="text-sm text-slate-400 mt-6 font-medium">Takes roughly 3-5 minutes • 36 Data Points</p>
                            </div>
                        </motion.div>
                    )}

                    {[1, 2, 3, 4, 5, 6].includes(step) && (
                        <motion.div 
                            key={`step-${step}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-10"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 pb-6 border-b border-slate-100">
                                <div>
                                    <span className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-2 block">Step {step} of 6</span>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                                        {t(`questionnaire.sec${step}_title`)}
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {getQuestionsForStep(step).map((qId) => renderField(qId))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-between gap-4">
                                <Button variant="secondary" onClick={prevStep} className="group flex items-center justify-center w-full md:w-auto py-4 px-8 rounded-xl text-lg font-bold bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-600">
                                    <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                    Back
                                </Button>
                                <Button onClick={nextStep} className="group flex items-center justify-center w-full md:w-auto py-4 px-10 rounded-xl text-lg font-bold shadow-lg shadow-primary-200 hover:shadow-xl hover:-translate-y-0.5 transition-all text-white">
                                    {step === 6 ? 'Review & Submit' : 'Continue'}
                                    <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 7 && (
                        <motion.div 
                            key="step-7"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-primary-50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-5 -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="text-center mb-10 relative z-10">
                                <div className="inline-block p-4 bg-primary-100 rounded-full mb-6 ring-8 ring-primary-50">
                                    <Mail className="w-10 h-10 text-primary-600" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Assessment Ready</h2>
                                <p className="text-lg text-slate-600 max-w-md mx-auto">Where should we deliver your finalized Operational Summary and 3PL matching profile?</p>
                            </div>

                            <form onSubmit={handleSubmitLead} className="space-y-5 max-w-md mx-auto relative z-10">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your Name</label>
                                    <div className="relative">
                                        <input 
                                            required
                                            type="text"
                                            value={formData.name || ''}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:bg-white transition-all text-lg font-medium"
                                            placeholder="John Doe"
                                        />
                                        <Building2 className="absolute left-4 top-4.5 w-5 h-5 text-slate-400" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Business Email</label>
                                    <div className="relative">
                                        <input 
                                            required
                                            type="email"
                                            value={formData.email || ''}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:bg-white transition-all text-lg font-medium"
                                            placeholder="john@company.com"
                                        />
                                        <Mail className="absolute left-4 top-4.5 w-5 h-5 text-slate-400" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Company</label>
                                    <input 
                                        type="text"
                                        value={formData.company || ''}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-primary-500 focus:bg-white transition-all text-lg font-medium"
                                        placeholder="Manufacturing Co."
                                    />
                                </div>

                                <Button 
                                    className="w-full py-5 text-xl font-extrabold mt-8 rounded-2xl shadow-xl shadow-primary-200 hover:shadow-2xl hover:-translate-y-1 transition-all" 
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Unlock Full Assessment'}
                                    <Send className="ml-3 w-5 h-5" />
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === 8 && (
                        <motion.div 
                            key="step-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl shadow-xl p-8 md:p-14 text-center border border-slate-200"
                        >
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">Success!</h2>
                            <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed">
                                Your operational summary has been generated and securely transmitted to our Baja California team. We will review your specs and notify you of any immediate capacity matches.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                <DownloadPDFButton />
                                <div className="flex flex-col justify-center gap-3">
                                     <button 
                                        onClick={() => window.print()}
                                        className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-all"
                                    >
                                        <Printer className="w-5 h-5" />
                                        Print / Save Backup
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <style jsx global>{`
                @media print {
                    .print\\:hidden { display: none !important; }
                    body { background: white !important; }
                    main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; border: none !important; box-shadow: none !important; }
                }
            `}</style>
        </div>
    );
}

function getQuestionsForStep(step: number): string[] {
    switch(step) {
        case 1: return ['q1', 'q2', 'q3', 'q4', 'q5']; 
        case 2: return ['q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12']; 
        case 3: return ['q13', 'q14', 'q15', 'q16', 'q17', 'q18']; 
        case 4: return ['q19', 'q20', 'q21', 'q22', 'q23']; 
        case 5: return ['q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31']; 
        case 6: return ['q32', 'q33', 'q34', 'q35', 'q36']; 
        default: return [];
    }
}
