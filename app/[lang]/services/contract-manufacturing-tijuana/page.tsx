"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { Factory, Shield, Award, Users } from "lucide-react";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContractManufacturingPage() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const industries = [
        {
            name: t('contractPage.medicalDevices'),
            img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
            desc: t('contractPage.medicalDesc'),
            certifications: ["ISO 13485", "FDA Registered", "Clean Room"],
        },
        {
            name: t('contractPage.electronics'),
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            desc: t('contractPage.electronicsDesc'),
            certifications: ["IPC-A-610", "ISO 9001", "RoHS"],
        },
        {
            name: t('contractPage.aerospace'),
            img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
            desc: t('contractPage.aerospaceDesc'),
            certifications: ["AS9100D", "NADCAP", "ITAR"],
        },
        {
            name: t('contractPage.automotive'),
            img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800",
            desc: t('contractPage.automotiveDesc'),
            certifications: ["IATF 16949", "ISO 14001", "VDA 6.3"],
        },
    ];

    const benefits = [
        { icon: <Factory className="w-6 h-6" />, title: t('contractPage.establishedTitle'), desc: t('contractPage.establishedDesc') },
        { icon: <Shield className="w-6 h-6" />, title: t('contractPage.ipTitle'), desc: t('contractPage.ipDesc') },
        { icon: <Award className="w-6 h-6" />, title: t('contractPage.certifiedTitle'), desc: t('contractPage.certifiedDesc') },
        { icon: <Users className="w-6 h-6" />, title: t('contractPage.workforceTitle'), desc: t('contractPage.workforceDesc') },
    ];

    const process = [
        { step: "01", title: t('contractPage.step1Title'), desc: t('contractPage.step1Desc') },
        { step: "02", title: t('contractPage.step2Title'), desc: t('contractPage.step2Desc') },
        { step: "03", title: t('contractPage.step3Title'), desc: t('contractPage.step3Desc') },
        { step: "04", title: t('contractPage.step4Title'), desc: t('contractPage.step4Desc') },
    ];

    return (
        <div ref={containerRef} className="pb-20 overflow-hidden">
            {/* Hero */}
            <section className="bg-gray-900 py-24 text-center text-white relative overflow-hidden h-[60vh] flex items-center justify-center">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
                </motion.div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Factory className="w-4 h-4" />
                        {t('contractPage.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('contractPage.heroTitle')} <span className="text-primary-400">{t('contractPage.heroTitleHighlight')}</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {t('contractPage.heroSubtitle')}
                    </p>
                </div>
            </section>

            {/* Matchmaking Strategy (New) */}
            <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
                     <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('contractPage.strategyTitle')}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">{t('contractPage.strategySubtitle')}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">{t('contractPage.capabilityTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('contractPage.capabilityDesc')}</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">{t('contractPage.roadmapTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('contractPage.roadmapDesc')}</p>
                        </div>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                            <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-3">{t('contractPage.safeguardsTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{t('contractPage.safeguardsDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Benefits Grid */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('contractPage.whyContractTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="glass-card p-6 text-center">
                                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{t('contractPage.industriesTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {industries.map((ind) => (
                            <div key={ind.name} className="glass-card overflow-hidden group flex flex-col md:flex-row">
                                <div className="h-48 md:h-auto md:w-48 relative overflow-hidden flex-shrink-0">
                                    <Image src={ind.img} alt={ind.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ind.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{ind.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {ind.certifications.map((cert) => (
                                            <span key={cert} className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process */}
                <section className="mb-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{t('contractPage.processTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {process.map((item, i) => (
                            <div key={item.step} className="text-center relative">
                                {i < process.length - 1 && (
                                    <div className="hidden md:block absolute top-6 left-[60%] right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
                                )}
                                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-20">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contractPage.faqTitle')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                {t('contractPage.faq1Question')}
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                {t('contractPage.faq1Answer')}
                            </p>
                        </details>
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                {t('contractPage.faq2Question')}
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                {t('contractPage.faq2Answer')}
                            </p>
                        </details>
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                {t('contractPage.faq3Question')}
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                {t('contractPage.faq3Answer')}
                            </p>
                        </details>
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                {t('contractPage.faq4Question')}
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                {t('contractPage.faq4Answer')}
                            </p>
                        </details>
                    </div>
                </section>

                {/* CTA */}
                <div className="max-w-4xl mx-auto">
                    <LeadForm
                        title={t('contractPage.formTitle')}
                        subtitle={t('contractPage.formSubtitle')}
                        className="shadow-2xl"
                    />
                </div>
            </div>

            {/* Founder Block */}
            <FounderBlock />
        </div>
    );
}
