"use client";

import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { Headset, Users, Clock, DollarSign, Globe, CheckCircle2 } from "lucide-react";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CallCenterPage() {
    const { t } = useLanguage();

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
        <div className="pb-20">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=2000"
                        alt="Call center agents providing customer support"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
                </div>
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
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('callCenterPage.whyTijuanaTitle')}</h2>
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
                        <section className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
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
