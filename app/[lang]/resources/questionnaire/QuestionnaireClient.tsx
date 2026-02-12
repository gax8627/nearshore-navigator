"use client";

import React from 'react';
import { useLanguage } from "@/app/context/LanguageContext";
import { DownloadPDFButton } from "@/components/DownloadPDFButton";
import { Printer } from "lucide-react";

export default function QuestionnaireClient() {
    const { t } = useLanguage();

    return (
        <div className="bg-white min-h-screen text-gray-900 print:bg-white print:text-black">
            {/* Control Panel - Hidden when printing */}
            <div className="bg-gray-100 dark:bg-gray-800 p-8 max-w-4xl mx-auto mt-8 rounded-xl print:hidden shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{t('questionnaire.title')}</h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                           {t('questionnaire.intro')}
                        </p>
                        
                        <button 
                            onClick={() => window.print()}
                            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:underline mb-4"
                        >
                            <Printer className="w-5 h-5" />
                            Click here to Print / Save as PDF
                        </button>
                    </div>
                    
                    <DownloadPDFButton />
                </div>
            </div>

            <main className="max-w-[210mm] mx-auto p-[10mm] print:p-0">
                {/* Branded Header */}
                <header className="flex justify-between items-center border-b-4 border-primary-600 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Nearshore Navigator</h1>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Industrial Logistics • Baja California</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-primary-600">{t('questionnaire.title')}</h2>
                        <div className="text-xs text-gray-400 font-mono mt-1">CONFIDENTIAL • {new Date().getFullYear()}</div>
                    </div>
                </header>

                <p className="italic text-gray-600 mb-8 border-l-4 border-gray-200 pl-4 py-2">
                    {t('questionnaire.intro')}
                </p>

                <div className="space-y-10">
                    {/* Section 1 */}
                    <Section title={t('questionnaire.sec1_title')}>
                        <Field number="01" label={t('questionnaire.q1')} />
                        <Field number="02" label={t('questionnaire.q2')} />
                        <Field number="03" label={t('questionnaire.q3')} />
                        <Field number="04" label={t('questionnaire.q4')} />
                        <Field number="05" label={t('questionnaire.q5')} />
                    </Section>

                    {/* Section 2 */}
                    <Section title={t('questionnaire.sec2_title')}>
                        <Field number="06" label={t('questionnaire.q6')} />
                        <Field number="07" label={t('questionnaire.q7')} />
                        <Field number="08" label={t('questionnaire.q8')} />
                        <Field number="09" label={t('questionnaire.q9')} />
                        <Field number="10" label={t('questionnaire.q10')} />
                        <Field number="11" label={t('questionnaire.q11')} />
                        <Field number="12" label={t('questionnaire.q12')} lines={3} />
                    </Section>

                    {/* Section 3 */}
                    <Section title={t('questionnaire.sec3_title')} className="break-before-page pt-8">
                        <Field number="13" label={t('questionnaire.q13')} />
                        <Field number="14" label={t('questionnaire.q14')} />
                        <Field number="15" label={t('questionnaire.q15')} />
                        <Field number="16" label={t('questionnaire.q16')} />
                        <Field number="17" label={t('questionnaire.q17')} />
                        <Field number="18" label={t('questionnaire.q18')} lines={2} />
                    </Section>

                    {/* Section 4 */}
                    <Section title={t('questionnaire.sec4_title')}>
                        <Field number="19" label={t('questionnaire.q19')} />
                        <Field number="20" label={t('questionnaire.q20')} />
                        <Field number="21" label={t('questionnaire.q21')} />
                        <Field number="22" label={t('questionnaire.q22')} />
                        <Field number="23" label={t('questionnaire.q23')} />
                    </Section>

                    {/* Section 5 */}
                    <Section title={t('questionnaire.sec5_title')}>
                        <Field number="24" label={t('questionnaire.q24')} />
                        <Field number="25" label={t('questionnaire.q25')} />
                        <Field number="26" label={t('questionnaire.q26')} />
                        <Field number="27" label={t('questionnaire.q27')} />
                        <Field number="28" label={t('questionnaire.q28')} />
                        <Field number="29" label={t('questionnaire.q29')} />
                        <Field number="30" label={t('questionnaire.q30')} />
                        <Field number="31" label={t('questionnaire.q31')} />
                    </Section>

                    {/* Section 6 */}
                    <Section title={t('questionnaire.sec6_title')} className="break-before-page pt-8">
                        <Field number="32" label={t('questionnaire.q32')} />
                        <Field number="33" label={t('questionnaire.q33')} />
                        <Field number="34" label={t('questionnaire.q34')} />
                        <Field number="35" label={t('questionnaire.q35')} />
                        <Field number="36" label={t('questionnaire.q36')} />
                    </Section>
                </div>

                <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400 flex justify-between">
                    <span>www.nearshorenavigator.com</span>
                    <span>Nearshore Navigator • Strategic Nearshoring Partners</span>
                </footer>
            </main>

            <style jsx global>{`
                @media print {
                    @page { margin: 15mm; }
                    body { 
                        background: white !important; 
                        color: black !important; 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    .print\\:hidden { display: none !important; }
                }
            `}</style>
        </div>
    );
}

function Section({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) {
    return (
        <section className={`break-inside-avoid ${className}`}>
            <h3 className="text-lg font-bold text-white bg-primary-600 px-4 py-2 rounded-sm mb-6 print:bg-primary-600 print:text-white print:mb-4">
                {title}
            </h3>
            <div className="space-y-6 px-2">
                {children}
            </div>
        </section>
    );
}

function Field({ number, label, lines = 1 }: { number: string, label: string, lines?: number }) {
    return (
        <div className="w-full">
            <div className="flex items-baseline mb-1">
                <span className="text-primary-600 font-bold text-sm mr-2 font-mono">{number}.</span>
                <span className="font-semibold text-gray-800 text-sm leading-tight">{label}</span>
            </div>
            <div 
                className="w-full border-b border-gray-300 bg-gray-50/50 print:bg-transparent"
                style={{ height: `${lines * 2.5}rem` }} 
            ></div>
        </div>
    );
}
