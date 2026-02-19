"use client";

import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import { ClipboardCheck, Target, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getCFERates, CFERate } from "@/lib/cfe-service";

export default function AssessmentPage() {
    const { t } = useLanguage();
    const [cfeRates, setCfeRates] = useState<CFERate[]>([]);

    useEffect(() => {
        getCFERates().then(setCfeRates);
    }, []);

    const factors = [
        { icon: <Target className="w-6 h-6" />, title: "Operational Fit", desc: "We evaluate your space, power, and labor requirements against current Baja market availability." },
        { 
            icon: <BarChart3 className="w-6 h-6" />, 
            title: "Cost Modeling", 
            desc: t('assessment.costModelingDesc'),
            extra: cfeRates.length > 0 && (
                <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                        <Zap className="w-3 h-3" /> {t('assessment.liveData')}
                    </div>
                    <div className="space-y-1">
                        {cfeRates.map((r, idx) => (
                            <div key={idx} className="flex justify-between text-xs">
                                <span className="text-gray-500 dark:text-gray-400">{r.category.split(' ')[0]}</span>
                                <span className="font-mono font-bold text-gray-900 dark:text-white">${r.rate} {r.currency}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        { icon: <ClipboardCheck className="w-6 h-6" />, title: "Risk Assessment", desc: "Identifying potential regulatory, logistics, or infrastructure bottlenecks for your specific industry." },
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Compliance Audit", desc: "Ensuring your business model aligns with IMMEX, Section 321, or other applicable Mexican trade laws." }
    ];

    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
                        alt="Manufacturing Cost Analysis"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/40 z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40 z-[1]" />
                </div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary-500/20 backdrop-blur-md px-4 py-2 rounded-full text-primary-200 text-sm font-bold mb-6 border border-primary-500/30">
                            <ClipboardCheck className="w-4 h-4" />
                            Complimentary Market Evaluation
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Baja California <span className="text-primary-400">Site Assessment</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                            Stop guessing about Mexico. Get a data-backed evaluation of how your manufacturing or logistics operation will perform in Baja California.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">What your assessment covers:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {factors.map((factor, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 border border-gray-100 dark:border-gray-800"
                                >
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                                        {factor.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{factor.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{factor.desc}</p>
                                    {factor.extra}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <LeadForm
                            title={t('form.title')}
                            subtitle={t('form.subtitle')}
                            source="site_assessment"
                            className="shadow-2xl border border-primary-500/10"
                        />
                    </motion.div>
                </div>

                {/* Founder Context */}
                <FounderBlock />
            </div>
        </div>
    );
}
