"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { FileText, Map as MapIcon, ClipboardCheck, ArrowRight, BarChart3, Download } from "lucide-react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/app/constants/blog-data";
import { BlogCard } from "@/components/BlogCard";

export default function ResourcesClient() {
    const { t, language } = useLanguage();

    const resources = [
        {
            title: t('resources.mapTitle'),
            desc: t('resources.mapDesc') || "Interactive map of all major industrial parks in Tijuana, including infrastructure specs and tenant lists.",
            icon: <MapIcon className="w-8 h-8" />,
            href: `/${language}/resources/tijuana-industrial-park-map`,
            color: "bg-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/10",
            text: "text-blue-600 dark:text-blue-400",
            cta: t('resources.ctaViewMap')
        },
        {
            title: t('resources.assessmentTitle'),
            desc: t('resources.assessmentDesc') || "Get a data-backed analysis of your potential operating costs in Mexico (Labor, Real Estate, Utilities).",
            icon: <ClipboardCheck className="w-8 h-8" />,
            href: `/${language}/assessment`,
            color: "bg-primary-500",
            bg: "bg-primary-50 dark:bg-primary-900/10",
            text: "text-primary-600 dark:text-primary-400",
            cta: t('resources.ctaStartAssessment')
        },
        {
            title: t('resources.questionnaireTitle'),
            desc: t('resources.questionnaireDesc') || "A comprehensive scoping tool to define your logistics requirements for shelter or 3PL partners.",
            icon: <FileText className="w-8 h-8" />,
            href: `/${language}/resources/questionnaire`,
            color: "bg-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/10",
            text: "text-purple-600 dark:text-purple-400",
            cta: t('resources.ctaLaunchTool')
        },
        {
            title: t('resources.brochureTitle'),
            desc: t('resources.brochureDesc'),
            icon: <Download className="w-8 h-8" />,
            href: `/${language}/resources/brochure`,
            color: "bg-amber-500",
            bg: "bg-amber-50 dark:bg-amber-900/10",
            text: "text-amber-600 dark:text-amber-400",
            cta: t('resources.ctaDownload')
        },
        {
            title: t('resources.insightsTitle'),
            desc: t('resources.insightsDesc'),
            icon: <BarChart3 className="w-8 h-8" />,
            href: `/${language}/insights`,
            color: "bg-green-500",
            bg: "bg-green-50 dark:bg-green-900/10",
            text: "text-green-600 dark:text-green-400",
            cta: t('resources.ctaReadInsights')
        }
    ];

    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
                 <div className="absolute inset-0 z-0 opacity-100">
                    <Image
                        src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=2000"
                        alt="Expansion Strategy and Tools"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/40 z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40 z-[1]" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4 block">{t('resources.heroBadge')}</span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {t('resources.heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">{t('resources.heroTitleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-gray-300 font-light">
                            {t('resources.heroDesc')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Resources Grid */}
            <div className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((resource, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card group overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 transition-all duration-300"
                        >
                            <Link href={resource.href} className="h-full flex flex-col">
                                <div className={`p-6 ${resource.bg} border-b border-gray-100 dark:border-gray-700/50`}>
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${resource.text} bg-white dark:bg-gray-800 shadow-sm mb-4 group-hover:scale-110 transition-transform`}>
                                        {resource.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {resource.title}
                                    </h3>
                                </div>
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {resource.desc}
                                    </p>
                                    <div className={`flex items-center gap-2 font-bold ${resource.text} group-hover:gap-3 transition-all`}>
                                        {resource.cta} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Latest Intelligence Section */}
            <div className="container mx-auto px-4 mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('resources.latestIntelligence') || "Latest Intelligence"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('resources.latestIntelligenceDesc') || "Expert analysis and strategic guides to help you navigate the nearshoring landscape."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {BLOG_POSTS.slice(0, 3).map((post, index) => (
                         <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                         >
                            <BlogCard post={post} />
                         </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
