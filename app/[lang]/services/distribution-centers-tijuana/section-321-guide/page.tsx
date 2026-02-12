import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { motion } from "framer-motion";
import { Shield, Zap, DollarSign, Package, CheckCircle2, AlertTriangle, TrendingUp, ShieldCheck } from "lucide-react";

import { useLanguage } from "@/app/context/LanguageContext";

export default function Section321Guide() {
    const { t } = useLanguage();
    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2000"
                        alt="Logistics in Tijuana"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-orange-600/30 backdrop-blur-md px-4 py-2 rounded-full text-orange-200 text-sm font-bold mb-6 border border-orange-500/30"
                    >
                        <AlertTriangle className="w-4 h-4" />
                        {t('s321.regulatoryAlert')}
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('s321.heroTitle')} <span className="text-blue-400">Distribution Center Guide</span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        {t('s321.heroSubtitle')}
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold mb-6">{t('s321.whatIsTitle')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {t('s321.whatIsDesc')}
                            </p>
                            
                            {/* Alert Box for Aug 2025 Suspension */}
                            <div className="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 mb-12 rounded-r-xl">
                                <h3 className="text-orange-800 dark:text-orange-300 font-bold mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" /> {t('s321.suspensionTitle')}
                                </h3>
                                <p className="text-orange-700 dark:text-orange-400 text-sm italic">
                                    {t('s321.suspensionDesc')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="text-primary-500 mb-4 font-bold text-lg flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" /> {t('s321.pivotTitle')}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('s321.pivotDesc')}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="text-primary-500 mb-4 font-bold text-lg flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5" /> {t('s321.complianceTitle')}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('s321.complianceDesc')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-800">
                            <h2 className="text-2xl font-bold mb-4">{t('s321.whyBajaTitle')}</h2>
                            <ul className="space-y-4">
                                {[
                                    t('s321.whyBaja1'),
                                    t('s321.whyBaja2'),
                                    t('s321.whyBaja3'),
                                    t('s321.whyBaja4')
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">The Section 321 Distribution Process</h2>
                            <div className="space-y-8">
                                {[
                                    { step: 1, title: t('s321.step1Title'), desc: t('s321.step1Desc') },
                                    { step: 2, title: t('s321.step2Title'), desc: t('s321.step2Desc') },
                                    { step: 3, title: t('s321.step3Title'), desc: t('s321.step3Desc') },
                                    { step: 4, title: t('s321.step4Title'), desc: t('s321.step4Desc') }
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 sticky top-24">
                            <LeadForm 
                                title={t('s321.formTitle')} 
                                subtitle={t('s321.formSubtitle')} 
                            />
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
