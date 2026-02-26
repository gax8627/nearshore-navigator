'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { Database, Bot, PenTool, BarChart3, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';

export default function MarketingClient() {
    const { t, language } = useLanguage();

    const features = [
        {
            icon: <Database className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.crmTitle') || 'Automated CRM Routing',
            desc: t('marketingPage.crmDesc') || 'Stop manually entering data. Every inbound lead is automatically structured, scored, and synced to your database.'
        },
        {
            icon: <Bot className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.aiTitle') || 'AI Lead Enrichment',
            desc: t('marketingPage.aiDesc') || 'Our system researches every incoming domain instantly, attaching company size and industry data before you even make a call.'
        },
        {
            icon: <PenTool className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.contentTitle') || 'Autonomous Content Engine',
            desc: t('marketingPage.contentDesc') || 'Publish a blog, and our AI instantly drafts 3 targeted LinkedIn posts for your review. Complete social authority on autopilot.'
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.reportingTitle') || 'Transparent Reporting',
            desc: t('marketingPage.reportingDesc') || 'Live dashboards showing your active pipeline value, new lead velocity, and agent performance.'
        },
    ];

    const timeline = [
        {
            day: '30',
            title: t('marketingPage.day30Title') || 'Day 30: Foundation',
            desc: t('marketingPage.day30Desc') || 'CRM audit, lead capture standardization, and initial AI enrichment agents deployed.'
        },
        {
            day: '60',
            title: t('marketingPage.day60Title') || 'Day 60: Authority',
            desc: t('marketingPage.day60Desc') || 'LinkedIn automation live, lead magnet funnels active, and content approval queues established.'
        },
        {
            day: '90',
            title: t('marketingPage.day90Title') || 'Day 90: Scale',
            desc: t('marketingPage.day90Desc') || 'Live marketing dashboards, full pipeline visibility, and iterative campaign optimization.'
        }
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <main className="flex-grow pt-[104px] dark:bg-gray-950">
            {/* Hero Section */}
            <section className="relative bg-teal-900 border-b border-teal-800 text-white overflow-hidden py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-900 to-black/80 z-10" />
                    {/* Abstract background pattern representing data/automation */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="container relative z-20 mx-auto px-6 max-w-6xl">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center space-x-2 bg-teal-800/50 rounded-full px-4 py-1.5 mb-6 border border-teal-700/50 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                            <span className="text-sm font-medium text-teal-100">{t('marketingPage.badge') || 'Marketing Operations & Growth'}</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            {t('marketingPage.heroTitle') || 'Nearshore Marketing'}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                                {t('marketingPage.heroTitleHighlight') || 'OS'}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-teal-100/90 mb-10 leading-relaxed max-w-2xl">
                            {t('marketingPage.heroSubtitle') || 'A complete B2B growth system installed directly into your business. We build the engine that captures demand, enriches leads, and scales your authority with AI.'}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#contact" className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-4 px-8 rounded-lg shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center group">
                                Deploy Your OS
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Features Section */}
            <section className="py-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('marketingPage.whyMarketingTitle') || 'Why Nearshore Marketing OS?'}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } }
                                }}
                                className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-900 transition-colors"
                            >
                                <div className="bg-white dark:bg-gray-900 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-teal-100 dark:border-teal-900/30 mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                        
                        {/* Timeline Graphic */}
                        <div className="w-full md:w-1/2 space-y-8 relative">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                {t('marketingPage.timelineTitle') || '30/60/90 Day Implementation'}
                            </h2>
                            <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-gray-200 dark:to-gray-800"></div>
                            
                            {timeline.map((step, idx) => (
                                <div key={idx} className="relative pl-24 pr-4">
                                    <div className="absolute left-0 top-0 mt-1 w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-2 border-teal-500 flex flex-col items-center justify-center shadow-md z-10">
                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Day</span>
                                        <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{step.day}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pt-3">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pricing/Value Card */}
                        <div className="w-full md:w-1/2">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-teal-100 dark:border-teal-900 border-t-4 border-t-teal-500 sticky top-32">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t('marketingPage.pricingTitle') || 'Straightforward Retainer'}
                                </h3>
                                <div className="text-4xl font-extrabold text-teal-600 dark:text-teal-400 mb-4 mt-6">
                                    $3,450 <span className="text-lg text-gray-500 font-medium">/ month</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
                                    {t('marketingPage.pricingDesc') || 'No hidden fees. Includes all software architecture, AI agent deployment, and ongoing optimization.'}
                                </p>
                                
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                        <span>Unlimited AI Contact Enrichment</span>
                                    </li>
                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                        <span>Automated LinkedIn Content Pipeline</span>
                                    </li>
                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                        <span>Lead Magnet Design & Distribution</span>
                                    </li>
                                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                        <span>Live Marketing ROI Dashboards</span>
                                    </li>
                                </ul>

                                <Link href="#contact" className="block w-full text-center bg-gray-900 hover:bg-gray-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    Schedule a Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="py-24 bg-white dark:bg-gray-900 scroll-mt-20 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('marketingPage.formTitle') || 'Deploy Your Marketing OS'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('marketingPage.formSubtitle') || 'Book a discovery call to see if the Nearshore Marketing OS is the right fit for your growth goals.'}
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <LeadForm source="marketing_os_page" className="" />
                    </div>
                </div>
            </section>
        </main>
    );
}
