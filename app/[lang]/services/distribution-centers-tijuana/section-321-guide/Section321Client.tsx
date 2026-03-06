"use client";

import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, TrendingUp, ShieldCheck } from "lucide-react";

interface Props {
    dict: Record<string, any>;
}

export default function Section321Client({ dict }: Props) {
    const t = (key: string) => {
        const parts = key.split('.');
        let val: any = dict;
        for (const p of parts) val = val?.[p];
        return val ?? key;
    };

    return (
        <div className="pb-20 overflow-hidden">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nearshorenavigator.com/en" },
                        { "@type": "ListItem", "position": 2, "name": "Distribution Centers", "item": "https://nearshorenavigator.com/en/services/distribution-centers-tijuana" },
                        { "@type": "ListItem", "position": 3, "name": "Section 321 Guide", "item": "https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide" }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    "name": "How to Set Up Section 321 Distribution from a Tijuana Distribution Center",
                    "description": "Step-by-step guide to establishing compliant Section 321 de minimis cross-border distribution operations using Tijuana as a nearshore fulfillment hub.",
                    "totalTime": "P90D",
                    "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "5000" },
                    "step": [
                        {
                            "@type": "HowToStep",
                            "position": 1,
                            "name": "Assess product eligibility",
                            "text": "Confirm your goods qualify under Section 321: shipments must be valued at $800 or less per recipient per day. Excluded categories include alcohol, tobacco, and textiles with quota restrictions."
                        },
                        {
                            "@type": "HowToStep",
                            "position": 2,
                            "name": "Select a Tijuana distribution center",
                            "text": "Choose a Class A warehouse in Tijuana near the Otay Mesa commercial crossing. Look for bonded warehouse status, 24/7 operations, and integrated customs brokerage partnerships."
                        },
                        {
                            "@type": "HowToStep",
                            "position": 3,
                            "name": "Establish customs brokerage",
                            "text": "Partner with a licensed US Customs broker at the Otay Mesa port of entry. Pre-file Section 321 entry summaries electronically through CBP's Automated Broker Interface (ABI) for same-day clearance."
                        },
                        {
                            "@type": "HowToStep",
                            "position": 4,
                            "name": "Configure inventory and WMS",
                            "text": "Integrate your Warehouse Management System (WMS) with cross-border carrier manifests. Set up order routing rules to ensure individual order values stay at or below the $800 threshold."
                        },
                        {
                            "@type": "HowToStep",
                            "position": 5,
                            "name": "Launch and optimize",
                            "text": "Begin with a pilot batch of shipments to test customs clearance times (typically 2-4 hours at Otay Mesa). Scale once compliance processes are confirmed and transit SLAs are established."
                        }
                    ]
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        { "@type": "Question", "name": "What is Section 321 de minimis?", "acceptedAnswer": { "@type": "Answer", "text": "Section 321 of the Tariff Act allows duty-free and tax-free import of goods valued at $800 or less per person per day into the US. Companies use Tijuana distribution centers to fulfill US e-commerce orders under this threshold, legally eliminating import duties." } },
                        { "@type": "Question", "name": "Is Section 321 still valid after the 2025 executive order?", "acceptedAnswer": { "@type": "Answer", "text": "The August 2025 executive order suspended de minimis for goods from China and Hong Kong. However, Section 321 remains valid for goods manufactured in or substantially transformed in Mexico and other non-affected countries." } },
                        { "@type": "Question", "name": "What types of products work best for Section 321 from Tijuana?", "acceptedAnswer": { "@type": "Answer", "text": "Consumer electronics, apparel, home goods, beauty products, and other e-commerce items priced under $800 per unit are ideal. High-volume, low-unit-value SKUs benefit most from the duty elimination." } },
                        { "@type": "Question", "name": "How long does customs clearance take at Otay Mesa?", "acceptedAnswer": { "@type": "Answer", "text": "With pre-filed electronic entry summaries through CBP's ABI system, Section 321 shipments typically clear customs at Otay Mesa within 2-4 hours. Nearshore Navigator's partner brokers maintain dedicated Section 321 lanes." } }
                    ]
                }) }}
            />
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
                                source="section_321_guide" // Added source
                            />
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
