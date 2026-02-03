"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ShelterServicesPage() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="pb-20 overflow-hidden">
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000"
                        alt="Team Strategy"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/70" />
                </motion.div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('shelterPage.heroTitle')} <span className="text-green-300">{t('shelterPage.heroTitleHighlight')}</span></h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        {t('shelterPage.heroSubtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Strategy Section (New) */}
                <div className="mb-20">
                    <div className="bg-primary-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">{t('shelterPage.strategyTitle')}</h2>
                                <p className="text-lg text-primary-100 mb-8">{t('shelterPage.strategySubtitle')}</p>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-2 h-full min-h-[40px] bg-primary-500 rounded-full" />
                                        <div>
                                            <h3 className="font-bold text-lg">{t('shelterPage.modelFitTitle')}</h3>
                                            <p className="text-sm text-gray-300">{t('shelterPage.modelFitDesc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-2 h-full min-h-[40px] bg-primary-500 rounded-full" />
                                        <div>
                                            <h3 className="font-bold text-lg">{t('shelterPage.inshoringTitle')}</h3>
                                            <p className="text-sm text-gray-300">{t('shelterPage.inshoringDesc')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-2 h-full min-h-[40px] bg-primary-500 rounded-full" />
                                        <div>
                                            <h3 className="font-bold text-lg">{t('shelterPage.complianceTitle')}</h3>
                                            <p className="text-sm text-gray-300">{t('shelterPage.complianceDesc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-80 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image 
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200" 
                                    alt="Strategic Consulting" 
                                    fill 
                                    className="object-cover" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('shelterPage.whatIsShelterTitle')}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                            {t('shelterPage.whatIsShelterText')}
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('shelterPage.comparisonTitle')}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{t('shelterPage.feature')}</th>
                                        <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20">{t('shelterPage.shelterService')}</th>
                                        <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">{t('shelterPage.standalone')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">{t('shelterPage.startupTime')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 font-bold bg-primary-50/30 dark:bg-primary-900/10">{t('shelterPage.shelter90Days')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">{t('shelterPage.standalone6Months')}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">{t('shelterPage.legalLiability')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">{t('shelterPage.shelterLiability')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">{t('shelterPage.standaloneLiability')}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">{t('shelterPage.hrRecruiting')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">{t('shelterPage.included')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">{t('shelterPage.yourResponsibility')}</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">{t('shelterPage.exitStrategy')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">{t('shelterPage.simpleExit')}</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">{t('shelterPage.complexLiquidation')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                     {/* FAQ Section */}
                    <div className="lg:col-span-2 mt-12">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shelter Services FAQ</h3>
                         <div className="space-y-4">
                                {[
                                    { q: "What exactly is a Shelter Service in Mexico?", a: "A Shelter Service allows foreign companies to manufacture in Mexico without establishing their own legal entity. The Shelter plays the legal role of the manufacturer of record, handling compliance, HR, and taxes, while you control production." },
                                    { q: "How fast can we start operations under a Shelter?", a: "Typically, operations can begin in as little as 90 days. Since the legal entity is already established, you bypass the lengthy incorporation and permitting phase." },
                                    { q: "Do I lose control of my production process?", a: "No. You retain full control over your manufacturing process, quality control, trademarks, and intellectual property. The Shelter only manages the administrative and legal burden." },
                                    { q: "Can we transition out of a Shelter later?", a: "Yes. Most Shelter agreements include a 'Graduation' clause, allowing you to transfer employees and assets to your own Mexican entity once you are ready to stand alone (usually after 1-3 years)." },
                                    { q: "Who hires the employees?", a: "The Shelter hires the employees legally, but you select them. You define the profiles, conduct interviews, and set salaries. We handle the payroll and labor liability." },
                                    { q: "Is my Intellectual Property (IP) safe?", a: "Absolutely. Mexico has strong IP protections under USMCA. Furthermore, since the Shelter does not direct your production, your trade secrets remain strictly within your operational control." },
                                    { q: "What acts does the Shelter handle specifically?", a: "We handle Import/Export (IMMEX) permits, IVA (VAT) certification, Labor contracts, Payroll, Social Security (IMSS), and Environmental health & safety (EHS) compliance." },
                                    { q: "Is a Shelter more expensive than standalone?", a: "Initially, a Shelter has a fee, but it is often cheaper than the overhead of establishing a full legal, HR, and accounting department in Mexico for a small-to-mid-sized operation." },
                                    { q: "Can I use Shelter services for a small operation?", a: "Yes. Shelter services are scalable. We support operations ranging from 15 employees to 500+ employees." },
                                    { q: "Do you provide the facility as well?", a: "We can help you find a facility (Industrial Real Estate), but the lease is typically signed by you or facilitated through us. The facility cost is separate from the Shelter administrative fee." }
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
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <LeadForm
                                title={t('shelterPage.formTitle')}
                                subtitle={t('shelterPage.formSubtitle')}
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
