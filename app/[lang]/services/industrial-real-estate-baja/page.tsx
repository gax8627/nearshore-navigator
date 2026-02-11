"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2, Warehouse } from "lucide-react";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function IndustrialRealEstatePage() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const features = [
        t('realEstatePage.classA'),
        t('realEstatePage.builtToSuit'),
        t('realEstatePage.landForDev'),
        t('realEstatePage.flexibleLease'),
        t('realEstatePage.crossDocking'),
        t('realEstatePage.otayProximity'),
    ];

    const specs = [
        { label: t('realEstatePage.clearHeight'), value: "24' - 36'" },
        { label: t('realEstatePage.dockDoors'), value: "1 per 10k sqft" },
        { label: t('realEstatePage.floorLoad'), value: "6-8 inches reinforced" },
        { label: t('realEstatePage.power'), value: "KVA based on needs" },
    ];

    return (
        <div ref={containerRef} className="pb-20 overflow-hidden">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2000"
                        alt="Baja California Warehouse"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/60" />
                </motion.div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Warehouse className="w-4 h-4 text-primary-400" />
                        70+ Class A Industrial Parks
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('realEstatePage.heroTitle')} <span className="text-primary-500">{t('realEstatePage.heroTitleHighlight')}</span></h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Access over 75 million square feet of industrial inventory in Mexico's most critical border manufacturing hub.
                    </p>
                </div>
            </section>

            {/* Strategy Section (New) */}
            <section className="container mx-auto px-4 -mt-24 relative z-20 mb-12">
                <div className="bg-gradient-to-br from-blue-900 to-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-white/10 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                    
                    <div className="relative z-10">
                        <div className="max-w-3xl mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('realEstatePage.strategyTitle')}</h2>
                            <p className="text-xl text-gray-300">{t('realEstatePage.strategySubtitle')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="glass-card bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-primary-400 mb-3">{t('realEstatePage.utilityTitle')}</h3>
                                <p className="text-gray-300 text-sm">{t('realEstatePage.utilityDesc')}</p>
                            </div>
                            <div className="glass-card bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-primary-400 mb-3">{t('realEstatePage.comparativeTitle')}</h3>
                                <p className="text-gray-300 text-sm">{t('realEstatePage.comparativeDesc')}</p>
                            </div>
                            <div className="glass-card bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold text-primary-400 mb-3">{t('realEstatePage.tenantTitle')}</h3>
                                <p className="text-gray-300 text-sm">{t('realEstatePage.tenantDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-glass border border-white/20 dark:border-gray-800">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('realEstatePage.premiumTitle')}</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {t('realEstatePage.premiumText1')}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('realEstatePage.premiumText2')}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('realEstatePage.specsTitle')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {specs.map((spec) => (
                                    <div key={spec.label} className="flex justify-between items-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">{spec.label}</span>
                                        <span className="text-gray-900 dark:text-white font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('realEstatePage.whyTijuanaTitle')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {features.map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-primary-500 w-5 h-5 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('realEstatePage.faqTitle')}</h3>
                            <div className="space-y-4">
                                {[
                                    { q: t('realEstatePage.faq1Question'), a: t('realEstatePage.faq1Answer') },
                                    { q: t('realEstatePage.faq2Question'), a: t('realEstatePage.faq2Answer') },
                                    { q: "What are the average lease rates for Class A industrial space in Baja?", a: "Lease rates for Class A industrial space in Baja California typically range from $0.75 to $0.85 USD per square foot per month, depending on location and amenities. Tighter markets like Tijuana may see premiums, while developing areas offer more competitive sizing." },
                                    { q: "Can foreigners buy industrial land in Baja California?", a: "Yes, foreigners can acquire land in Mexico's restricted zone (border/coast) through a 'Fideicomiso' (Bank Trust). This grants you all ownership rights, including the ability to lease, sell, or build on the property." },
                                    { q: "How long does a 'Build-to-Suit' project take?", a: "A typical Build-to-Suit (BTS) project in Baja California takes between 8 to 12 months from groundbreaking to occupancy. This timeline includes permitting, construction, and utility connections." },
                                    { q: "What is the difference between Shell and Turnkey leases?", a: "A 'Shell' lease provides the basic building structure (walls, roof, floor), leaving tenant improvements (offices, HVAC, lighting) to you. A 'Turnkey' lease includes all specified improvements, ready for immediate operation." },
                                    { q: "Are Triple Net (NNN) leases common in Mexico?", a: "Yes, most industrial leases in Mexico are Triple Net (NNN), meaning the tenant pays for property taxes, insurance, and maintenance in addition to the base rent." },
                                    { q: "What utilities are available in Baja industrial parks?", a: "Major industrial parks offer high-voltage power (KVA rights), natural gas, fiber-optic internet, and treated water/sewage systems designed for high-volume manufacturing operations." },
                                    { q: "How close are these parks to the US border?", a: "Most Class A parks in Tijuana and Mexicali are located within 20-30 minutes of commercial border crossings (Otay Mesa, Calexico East), minimizing logistics transit time." },
                                    { q: "Do you offer property management services?", a: "We partner with top-tier facility management firms to handle maintenance, security, and compliance, allowing you to focus entirely on your manufacturing operations." }
                                ].map((faq, i) => (
                                    <details key={i} className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700 open:bg-white/60 dark:open:bg-gray-800/60 transition-colors">
                                        <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                            {faq.q}
                                            <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                            {faq.a}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <LeadForm
                                title={t('realEstatePage.formTitle')}
                                subtitle={t('realEstatePage.formSubtitle')}
                                className="shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Founder Block */}
            <FounderBlock />
        </div>
    );
}
