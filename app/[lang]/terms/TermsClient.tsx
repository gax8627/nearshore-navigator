"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function TermsPage() {
    const { t, language } = useLanguage();

    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-12">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
                        alt="Legal and Terms"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/80" />
                </div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('terms.title')}</h1>
                    <p className="text-gray-300">{t('terms.lastUpdated')}</p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-4xl">

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section1_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section1_text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section2_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section2_text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section3_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section3_text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section4_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section4_text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section5_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section5_text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section6_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section6_text')}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('terms.section7_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('terms.section7_text')}{" "}
                        <a href="mailto:denisse@nearshorenavigator.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                            denisse@nearshorenavigator.com
                        </a>
                    </p>
                </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <Link href={`/${language}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                    {t('terms.backToHome')}
                </Link>
            </div>
        </div>
    </div>
    );
}
