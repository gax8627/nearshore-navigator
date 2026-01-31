"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function TermsPage() {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">{t('terms.title')}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t('terms.lastUpdated')}</p>

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
                        <a href="mailto:info@nearshorenavigator.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                            info@nearshorenavigator.com
                        </a>
                    </p>
                </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline">
                    {t('terms.backToHome')}
                </Link>
            </div>
        </div>
    );
}
