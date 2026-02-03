"use client";

import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";
import { ClipboardCheck, Target, BarChart3, ShieldCheck } from "lucide-react";

export default function AssessmentPage() {
    const { t } = useLanguage();

    const factors = [
        { icon: <Target className="w-6 h-6" />, title: "Operational Fit", desc: "We evaluate your space, power, and labor requirements against current Baja market availability." },
        { icon: <BarChart3 className="w-6 h-6" />, title: "Cost Modeling", desc: "Detailed comparison of labor, electricity, and lease rates vs. your current US or Asian operations." },
        { icon: <ClipboardCheck className="w-6 h-6" />, title: "Risk Assessment", desc: "Identifying potential regulatory, logistics, or infrastructure bottlenecks for your specific industry." },
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Compliance Audit", desc: "Ensuring your business model aligns with IMMEX, Section 321, or other applicable Mexican trade laws." }
    ];

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-full text-primary-600 dark:text-primary-400 text-sm font-bold mb-6"
                    >
                        <ClipboardCheck className="w-4 h-4" />
                        Complimentary Market Evaluation
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Baja California <span className="text-primary-500 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-300">Site Assessment</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Stop guessing about Mexico. Get a data-backed evaluation of how your manufacturing or logistics operation will perform in Baja California.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">What your assessment covers:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {factors.map((factor, i) => (
                                <div key={i} className="glass-card p-6 border border-gray-100 dark:border-gray-800">
                                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                                        {factor.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{factor.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{factor.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <LeadForm
                            title={t('form.title')}
                            subtitle={t('form.subtitle')}
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
