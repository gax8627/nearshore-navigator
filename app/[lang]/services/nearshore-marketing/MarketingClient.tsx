'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import { Linkedin, Database, PenTool, Mail, Search, Share2, ArrowRight, CheckCircle2, Users, Lightbulb, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LeadForm } from '@/components/LeadForm';

export default function MarketingClient() {
    const { t, language } = useLanguage();

    const services = [
        {
            icon: <Linkedin className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.linkedinTitle') || 'LinkedIn Outreach Campaigns',
            desc: t('marketingPage.linkedinDesc') || 'Targeted outreach to decision-makers in your industry. We identify, connect, and nurture prospects through personalized LinkedIn campaigns that generate real conversations.',
            tag: 'Most Popular'
        },
        {
            icon: <Database className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.crmTitle') || 'CRM Audit & Setup',
            desc: t('marketingPage.crmDesc') || 'Stop losing leads in spreadsheets. I audit your current CRM process, set up automated lead routing, scoring, and follow-up sequences so nothing falls through the cracks.',
        },
        {
            icon: <PenTool className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.contentTitle') || 'Industry Content Creation',
            desc: t('marketingPage.contentDesc') || 'Monthly blog posts, case studies, and LinkedIn articles tailored to your industry. Position your company as a thought leader that engineers and buyers trust.',
        },
        {
            icon: <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.emailTitle') || 'Email Campaigns',
            desc: t('marketingPage.emailDesc') || 'Custom-designed email sequences that nurture prospects from first touch to booked meeting. AI-powered personalization at scale with transparent deliverability tracking.',
        },
        {
            icon: <Search className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.seoTitle') || 'SEO Audit & Optimization',
            desc: t('marketingPage.seoDesc') || 'Comprehensive technical SEO audit, keyword strategy, and on-page optimization. Get found by buyers actively searching for your services on Google.',
        },
        {
            icon: <Share2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: t('marketingPage.socialTitle') || 'Social Media Management',
            desc: t('marketingPage.socialDesc') || 'Consistent, professional social media presence across LinkedIn, Instagram, and Facebook. Showcase your capabilities with engaging posts and short-form video content.',
        },
    ];

    const steps = [
        {
            icon: <Lightbulb className="w-6 h-6 text-white" />,
            number: '01',
            title: t('marketingPage.step1Title') || 'Pick Your Services',
            desc: t('marketingPage.step1Desc') || 'Choose the specific marketing services your business needs right now. No bundles, no commitments — just what moves the needle.',
        },
        {
            icon: <Users className="w-6 h-6 text-white" />,
            number: '02',
            title: t('marketingPage.step2Title') || 'I Embed With Your Team',
            desc: t('marketingPage.step2Desc') || 'I work alongside your people as your part-time marketing director — weekly strategy calls, hands-on execution, and full transparency.',
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-white" />,
            number: '03',
            title: t('marketingPage.step3Title') || 'See Real Results',
            desc: t('marketingPage.step3Desc') || 'Live reporting on every campaign. You see exactly what\'s working, what\'s not, and where every dollar goes. No black boxes.',
        },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <main className="flex-grow pt-[104px] dark:bg-gray-950">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nearshorenavigator.com/en" },
                        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://nearshorenavigator.com/en/services" },
                        { "@type": "ListItem", "position": 3, "name": "Nearshore Marketing Services", "item": "https://nearshorenavigator.com/en/services/nearshore-marketing" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Nearshore Marketing Services",
                    "provider": { "@type": "Organization", "name": "Nearshore Navigator", "url": "https://nearshorenavigator.com" },
                    "serviceType": "B2B Marketing & Lead Generation",
                    "areaServed": { "@type": "Country", "name": "United States" },
                    "description": "Specialized B2B marketing services for companies expanding to Mexico: ICP research, outbound campaigns, content marketing, and nearshore positioning strategy.",
                    "offers": { "@type": "Offer", "url": "https://nearshorenavigator.com/en/services/nearshore-marketing" }
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        { "@type": "Question", "name": "What marketing services do you offer for nearshore companies?", "acceptedAnswer": { "@type": "Answer", "text": "We offer ICP (Ideal Customer Profile) research, targeted outbound email campaigns, LinkedIn outreach, content creation for nearshore audiences, SEO for Mexico-US manufacturing keywords, and full marketing strategy for companies expanding operations to Baja California." } },
                        { "@type": "Question", "name": "How long until we see results from nearshore marketing campaigns?", "acceptedAnswer": { "@type": "Answer", "text": "Outbound campaigns typically generate first conversations within 2-4 weeks. SEO and content marketing compound over 3-6 months. Our clients typically see a full pipeline within 90 days of launch." } },
                        { "@type": "Question", "name": "Do you specialize in any specific industries?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We specialize in manufacturing, logistics, electronics, medical devices, and business process outsourcing (BPO) — the core industries driving nearshore expansion to Mexico." } }
                    ]
                }) }}
            />
            {/* Hero Section — Fractional CMO Positioning */}
            <section className="relative bg-teal-900 border-b border-teal-800 text-white overflow-hidden py-24">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/hero/marketing_hero.png"
                        alt="Denisse Martinez — Fractional Marketing Consultant"
                        fill
                        className="object-cover object-center opacity-40 mix-blend-luminosity"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-teal-900/80 to-black/90 z-10" />
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
                            <span className="flex h-2 w-2 rounded-full bg-teal-400"></span>
                            <span className="text-sm font-medium text-teal-100">{t('marketingPage.badge') || 'Fractional Marketing Consultant'}</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            {t('marketingPage.heroTitle') || 'Your Fractional'}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                                {t('marketingPage.heroTitleHighlight') || 'Marketing Director'}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-teal-100/90 mb-10 leading-relaxed max-w-2xl">
                            {t('marketingPage.heroSubtitle') || 'I work alongside your team as your part-time marketing director — bringing the strategy, tools, and execution that manufacturers need to grow. Pick exactly the services you need, nothing more.'}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#services" className="bg-teal-500 hover:bg-teal-400 text-white font-semibold py-4 px-8 rounded-lg shadow-lg shadow-teal-500/30 transition-all flex justify-center items-center group">
                                {t('marketingPage.heroCta') || 'See Services'}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#contact" className="border border-teal-400/40 hover:border-teal-400/80 text-teal-100 font-semibold py-4 px-8 rounded-lg transition-all flex justify-center items-center backdrop-blur-sm">
                                {t('marketingPage.heroCtaSecondary') || 'Book a Free 15-Min Call'}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* À La Carte Services Grid */}
            <section id="services" className="py-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 scroll-mt-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('marketingPage.servicesTitle') || 'À La Carte Marketing Services'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {t('marketingPage.servicesSubtitle') || 'Choose exactly what your business needs right now. Start with one service, add more as you grow.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, idx) => (
                            <motion.div 
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.08 } }
                                }}
                                className="group relative bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-teal-300 dark:hover:border-teal-800 transition-all hover:shadow-lg hover:shadow-teal-500/5"
                            >
                                {'tag' in service && service.tag && (
                                    <span className="absolute top-4 right-4 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-semibold px-3 py-1 rounded-full border border-teal-500/20">
                                        {service.tag}
                                    </span>
                                )}
                                <div className="bg-white dark:bg-gray-900 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-teal-100 dark:border-teal-900/30 mb-6 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works — Consultant Model */}
            <section className="py-24 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('marketingPage.howTitle') || 'How It Works'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {t('marketingPage.howSubtitle') || 'No long-term contracts. No bloated retainers. Just the marketing help you actually need.'}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.15 } }
                                }}
                                className="text-center"
                            >
                                <div className="relative mx-auto mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
                                        {step.icon}
                                    </div>
                                    <span className="absolute -top-2 -right-2 bg-gray-900 dark:bg-gray-700 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Builder */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="mt-20 bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t('marketingPage.whyDenisseTitle') || 'Why Work With a Fractional Marketing Director?'}
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>{t('marketingPage.whyPoint1') || 'Senior marketing leadership without the $200K+ salary'}</span>
                                    </li>
                                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>{t('marketingPage.whyPoint2') || 'Someone who understands manufacturing, not just marketing buzzwords'}</span>
                                    </li>
                                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>{t('marketingPage.whyPoint3') || 'Bilingual (English/Spanish) — seamless communication across borders'}</span>
                                    </li>
                                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>{t('marketingPage.whyPoint4') || 'Scale up or down anytime — no long-term contracts required'}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-shrink-0">
                                <Link href="#contact" className="bg-gray-900 hover:bg-gray-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center group">
                                    {t('marketingPage.whyCta') || 'Schedule a Free Consultation'}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="py-24 bg-white dark:bg-gray-900 scroll-mt-20 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('marketingPage.formTitle') || 'Let\'s Talk About Your Marketing'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('marketingPage.formSubtitle') || 'Book a free 15-minute call. No pitch, no pressure — just an honest conversation about what\'s working and what\'s not.'}
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <LeadForm source="marketing_consultant_page" className="" />
                    </div>
                </div>
            </section>
        </main>
    );
}
