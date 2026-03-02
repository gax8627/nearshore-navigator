"use client";

import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { FounderBlock } from "@/components/FounderBlock";
import { CheckCircle2, MapPin, Factory, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { CaseStudies } from "@/components/CaseStudies";

export default function AboutClient() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const geoRef = useRef(null);
  const { scrollYProgress: geoScrollY } = useScroll({
    target: geoRef,
    offset: ["start end", "end start"]
  });
  const geoY = useTransform(geoScrollY, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={containerRef} className="pb-20 overflow-hidden">
        {/* Parallax Hero */}
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0 h-[125%] -top-[12.5%]">
                <Image
                    src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=2560"
                    alt="Industrial Strategic Advisory and Nearshoring in Baja California - Nearshore Navigator"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
            </motion.div>
            
            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary-500/20 backdrop-blur-md text-primary-200 border border-primary-500/30 text-sm font-bold tracking-wider uppercase mb-8">
                        {t('broker.advisorTitle')} | Nearshore Navigator
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                        {t('about.heroTitle1')}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">{t('about.heroTitle2')}</span> {t('about.heroTitle3')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                        {t('about.heroSubtitle')}
                    </p>
                </motion.div>
            </div>
        </div>

        {/* Why It Exists */}
        <section className="py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                            {t('aboutPage.mainHeading')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('aboutPage.mainSub')}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('aboutPage.struggleTitle')}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {t('aboutPage.struggleDesc')}
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">?</span> {t('aboutPage.struggleList1')}
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">?</span> {t('aboutPage.struggleList2')}
                                </li>
                                <li className="flex gap-3 text-gray-600 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">?</span> {t('aboutPage.struggleList3')}
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-primary-50 dark:bg-primary-900/10 p-8 rounded-2xl border border-primary-100 dark:border-primary-900/50"
                        >
                            <h3 className="text-xl font-bold mb-4 text-primary-700 dark:text-primary-400">{t('aboutPage.approachTitle')}</h3>
                            <p className="text-gray-700 dark:text-gray-200 mb-6">
                                {t('aboutPage.approachDesc')}
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-gray-700 dark:text-gray-200">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    {t('aboutPage.approachList1')}
                                </li>
                                <li className="flex gap-3 text-gray-700 dark:text-gray-200">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    {t('aboutPage.approachList2')}
                                </li>
                                <li className="flex gap-3 text-gray-700 dark:text-gray-200">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600" />
                                    {t('aboutPage.approachList3')}
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Tier 2 / High Growth Section (Persona Agent Fix) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 bg-gray-900 text-white p-8 rounded-2xl border border-gray-700 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-primary-500 text-xs px-2 py-1 rounded uppercase tracking-wider">{t('aboutPage.tier2Badge')}</span>
                                {t('aboutPage.tier2Title')}
                            </h3>
                            <p className="text-gray-300 mb-6">
                                {t('aboutPage.tier2Desc')}
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-primary-400 mb-2">{t('aboutPage.trapTitle')}</h4>
                                    <p className="text-sm text-gray-400">{t('aboutPage.trapDesc')}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-400 mb-2">{t('aboutPage.fixTitle')}</h4>
                                    <p className="text-sm text-gray-400">{t('aboutPage.fixDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>

        {/* Leadership Section */}
        <section className="py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/3 flex justify-center"
                    >
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                            <Image 
                                src="/images/denisse-1.jpg" 
                                alt="Denisse Martinez" 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full md:w-2/3"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary-5 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                             {t('aboutPage.leadershipBadge')}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('aboutPage.denisseName')}
                        </h2>
                        <h3 className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-6">
                            {t('aboutPage.denisseTitle')}
                        </h3>
                        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                {t('aboutPage.denisseBio1')}
                            </p>
                            <p>
                                {t('aboutPage.denisseBio2')}
                            </p>
                            <p>
                                {t('aboutPage.denisseBio3')}
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn Profile">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                            <a href={`/${language}/contact`} className="text-primary-600 font-semibold hover:underline">
                                {t('aboutPage.connect')} &rarr;
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* What We Do */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                        {t('aboutPage.toolkitTitle')}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        {t('aboutPage.toolkitDesc')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { 
                            icon: <Factory className="w-7 h-7" />, 
                            title: t('aboutPage.cardRealEstateTitle'), 
                            desc: t('aboutPage.cardRealEstateDesc'),
                            link: `/${language}/services/industrial-real-estate-baja`,
                            cta: t('aboutPage.cardCtaLearnMore'),
                            color: "blue"
                        },
                        { 
                            icon: <Users className="w-7 h-7" />, 
                            title: t('aboutPage.cardContractTitle'), 
                            desc: t('aboutPage.cardContractDesc'),
                            link: `/${language}/services/contract-manufacturing-tijuana`,
                            cta: t('aboutPage.cardCtaLearnMore'),
                            color: "green"
                        },
                        { 
                            icon: <MapPin className="w-7 h-7" />, 
                            title: t('aboutPage.cardSoftLandingTitle'), 
                            desc: t('aboutPage.cardSoftLandingDesc'),
                            link: `/${language}/contact`,
                            cta: t('aboutPage.cardCtaRequest'),
                            color: "purple"
                        }
                    ].map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className={`w-14 h-14 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl flex items-center justify-center text-${item.color}-600 dark:text-${item.color}-400 mb-6`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {item.desc}
                            </p>
                            <Link href={item.link} className={`text-${item.color}-600 font-semibold hover:underline flex items-center gap-2`}>
                                {item.cta} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* How We Work */}
        <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                        {t('aboutPage.processTitle')}
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {[
                        { step: t('aboutPage.step1Title'), desc: t('aboutPage.step1Desc') },
                        { step: t('aboutPage.step2Title'), desc: t('aboutPage.step2Desc') },
                        { step: t('aboutPage.step3Title'), desc: t('aboutPage.step3Desc') },
                        { step: t('aboutPage.step4Title'), desc: t('aboutPage.step4Desc') },
                        { step: t('aboutPage.step5Title'), desc: t('aboutPage.step5Desc') }
                    ].map((item, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xl shrink-0">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.step}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center pt-8 text-xl font-semibold text-primary-600"
                    >
                        {t('aboutPage.controlText')}
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Geography */}
        <section ref={geoRef} className="py-24 bg-gray-900 text-white relative overflow-hidden">
            <motion.div style={{ y: geoY }} className="absolute inset-0 z-0 opacity-40">
                 <Image
                    src="/images/baja-landscape.jpg"
                    alt="Baja California Industrial Infrastructure - Nearshore Navigator Strategic Network"
                    fill
                    className="object-cover"
                    quality={100}
                />
            </motion.div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('aboutPage.bajaTitle')}</h2>
                 <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                    {t('aboutPage.bajaDesc')}
                 </p>
                 <div className="flex justify-center gap-4">
                     <Link href={`/${language}/contact`}>
                        <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">{t('aboutPage.mapBtn')}</Button>
                    </Link>
                 </div>
            </div>
        </section>

        {/* Case Studies */}
        <CaseStudies />

        {/* Final CTA */}
        <section className="py-24 bg-primary-600 text-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('aboutPage.finalTitle')}</h2>
                <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
                    {t('aboutPage.finalDesc')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Link href={`/${language}/contact`}>
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-xl">{t('aboutPage.scheduleBtn')}</Button>
                    </Link>
                    <Link href={`/${language}/contact`}>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">{t('aboutPage.assessmentBtn')}</Button>
                    </Link>
                </div>
            </div>
        </section>
    </div>
  );
}
