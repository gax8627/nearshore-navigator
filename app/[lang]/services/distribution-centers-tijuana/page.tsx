"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2, Truck, Globe, Clock, DollarSign, Package } from "lucide-react";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function DistributionPage() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const benefits = [
        { icon: <Clock className="w-6 h-6" />, title: t('distributionPage.sameDayTitle'), desc: t('distributionPage.sameDayDesc') },
        { icon: <DollarSign className="w-6 h-6" />, title: t('distributionPage.section321Title'), desc: t('distributionPage.section321Desc') },
        { icon: <Globe className="w-6 h-6" />, title: t('distributionPage.portsTitle'), desc: t('distributionPage.portsDesc') },
        { icon: <Truck className="w-6 h-6" />, title: t('distributionPage.transloadingTitle'), desc: t('distributionPage.transloadingDesc') },
    ];

    const services = [
        t('distributionPage.crossDocking'),
        t('distributionPage.ecommerce'),
        t('distributionPage.inventoryManagement'),
        t('distributionPage.pickPackShip'),
        t('distributionPage.returnsProcessing'),
        t('distributionPage.lastMile'),
        t('distributionPage.customsBrokerage'),
        t('distributionPage.coldChain'),
    ];

    const stats = [
        { value: "2", label: t('distributionPage.statsBorderCrossings') },
        { value: "4hrs", label: t('distributionPage.statsToLA') },
        { value: "40M", label: t('distributionPage.statsCAConsumers') },
        { value: "$0", label: t('distributionPage.statsDuty') },
    ];

    return (
        <div ref={containerRef} className="pb-20 overflow-hidden">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
                        alt="Distribution center with trucks and loading docks in Baja California"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/60" />
                </motion.div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Package className="w-4 h-4" />
                        {t('distributionPage.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('distributionPage.heroTitle')} <span className="text-blue-300">{t('distributionPage.heroTitleHighlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        {t('distributionPage.heroSubtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 -mt-24 relative z-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass-card p-6 text-center">
                            <p className="text-3xl md:text-4xl font-bold text-primary-500">{stat.value}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Benefits Grid */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('distributionPage.whyTijuanaTitle')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefits.map((benefit) => (
                                    <div key={benefit.title} className="glass-card p-6">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Strategic Location */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('distributionPage.strategicTitle')}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {t('distributionPage.strategicText1')}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('distributionPage.strategicText2')}
                                </p>
                            </div>
                            <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1200"
                                    alt="Cross-border logistics at Otay Mesa"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </section>

                        {/* Services List */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('distributionPage.availableServicesTitle')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <div key={service} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('distributionPage.faqTitle')}</h3>
                            <div className="space-y-4">
                                {[
                                    { q: t('distributionPage.faq1Question'), a: t('distributionPage.faq1Answer') },
                                    { q: t('distributionPage.faq2Question'), a: t('distributionPage.faq2Answer') },
                                    { q: t('distributionPage.faq3Question'), a: t('distributionPage.faq3Answer') },
                                    { q: "What is 'Section 321' fulfillment?", a: "Section 321 allows US-bound shipments valued under $800 to enter duty-free. By fulfilling from Tijuana, you can save massively on tariffs while maintaining US domestic shipping speeds." },
                                    { q: "Do you handle Reverse Logistics (Returns)?", a: "Yes. Returns can be consolidated in Tijuana, inspected, and either restocked, refurbished, or disposed of, often at a fraction of the cost of handling returns in the US." },
                                    { q: "How fast is shipping to California?", a: "We are 20 minutes from the border. Shipments can cross in the morning and be injected into USPS/UPS/FedEx hubs in San Diego by the afternoon for same-day or next-day delivery to California/West Coast." },
                                    { q: "Do you offer bonded warehousing?", a: "Yes. Bonded warehouses allow you to store goods in Mexico without paying import duties/taxes for up to 18 months, paying only when they leave the facility." },
                                    { q: "Can you handle perishables (Cold Chain)?", a: "Yes, we have access to cold-storage facilities suitable for food, medical, and aerospace chemical storage, with backup power generators." },
                                    { q: "What is Cross-Docking?", a: "Cross-docking involves unloading materials from an incoming truck and loading them directly onto outbound trucks, with little or no storage in between. This speeds up the supply chain." },
                                    { q: "Is inventory visible in real-time?", a: "Absolutley. Our WMS (Warehouse Management System) provides real-time visibility into stock levels, inbound shipments, and order status via a secure web portal." }
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
                                title={t('distributionPage.formTitle')}
                                subtitle={t('distributionPage.formSubtitle')}
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
