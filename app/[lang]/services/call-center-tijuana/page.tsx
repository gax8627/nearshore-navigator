"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { Headset, Users, Clock, DollarSign, Globe, CheckCircle2 } from "lucide-react";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CallCenterPage() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const benefits = [
        { icon: <DollarSign className="w-6 h-6" />, title: t('callCenterPage.costSavingsTitle'), desc: t('callCenterPage.costSavingsDesc') },
        { icon: <Users className="w-6 h-6" />, title: t('callCenterPage.agentsTitle'), desc: t('callCenterPage.agentsDesc') },
        { icon: <Clock className="w-6 h-6" />, title: t('callCenterPage.timezoneTitle'), desc: t('callCenterPage.timezoneDesc') },
        { icon: <Globe className="w-6 h-6" />, title: t('callCenterPage.cultureTitle'), desc: t('callCenterPage.cultureDesc') },
    ];

    const services = [
        t('callCenterPage.inboundSupport'),
        t('callCenterPage.outboundSales'),
        t('callCenterPage.techSupport'),
        t('callCenterPage.backOffice'),
        t('callCenterPage.chatEmail'),
        t('callCenterPage.bilingual'),
    ];

    return (
        <div ref={containerRef} className="pb-20 overflow-hidden">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=2000"
                        alt="Call center agents providing customer support"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/70" />
                </motion.div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Headset className="w-4 h-4" />
                        {t('callCenterPage.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('callCenterPage.heroTitle')} <span className="text-green-300">{t('callCenterPage.heroTitleHighlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        {t('callCenterPage.heroSubtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Benefits Grid */}
                        <section className="-mt-24 relative z-20">
                            <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-md">{t('callCenterPage.whyTijuanaTitle')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefits.map((benefit) => (
                                    <div key={benefit.title} className="glass-card p-6">
                                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Services List */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('callCenterPage.servicesTitle')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <div key={service} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('callCenterPage.glanceTitle')}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">50K+</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('callCenterPage.bilingualAgents')}</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">40-60%</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('callCenterPage.costSavings')}</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">PST</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('callCenterPage.timeZone')}</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">85%+</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('callCenterPage.agentRetention')}</p>
                                </div>
                            </div>
                        </section>

                         {/* FAQ Section */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Call Center Solutions FAQ</h3>
                             <div className="space-y-4">
                                {[
                                    { q: "How much can I save by outsourcing to Tijuana?", a: "You can expect to save 40-60% on fully loaded labor costs compared to the US, while maintaining similar time zones and cultural alignment." },
                                    { q: "Are the agents truly bilingual?", a: "Yes. Tijuana has the largest population of English-speaking agents in Latin America, many of whom are bicultural 'pochos' spread across the border, ensuring near-native accent neutrality." },
                                    { q: "What is the turnover rate compared to other regions?", a: "While call centers notoriously have high turnover, Tijuana averages 5-10% monthly turnover, which is significantly lower than the 15-20% often seen in US centers." },
                                    { q: "Do you offer omnichannel support (Chat/Email)?", a: "Yes. Our centers are equipped for voice, email, live chat, and social media moderation support." },
                                    { q: "Is the technology infrastructure reliable?", a: "Tijuana's contact centers are interconnected with the same fiber backbone as San Diego. We guarantee 99.99% uptime with redundant ISP connections." },
                                    { q: "Can we start with a small team?", a: "Yes. We offer pilot programs starting with as few as 5 seats to prove the concept before scaling." },
                                    { q: "How long does it take to launch?", a: "Typically, we can recruit, train, and go live within 4-6 weeks from contract signing." },
                                    { q: "Is data security handled properly?", a: "Yes. Our partner facilities are PCI-DSS and HIPAA compliant, with strict physical and digital security protocols (clean desk policy, biometric access, etc.)." },
                                    { q: "What industries do you serve?", a: "We have deep experience in Tech Support, Healthcare (Patient scheduling), E-commerce (Customer Service), and Financial Services (Collections)." },
                                    { q: "Do you provide dedicated or shared agents?", a: "We primarily focus on Dedicated Agents who are trained specifically on your brand and SOPs, ensuring higher quality than shared pools." }
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
                                title={t('callCenterPage.formTitle')}
                                subtitle={t('callCenterPage.formSubtitle')}
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
