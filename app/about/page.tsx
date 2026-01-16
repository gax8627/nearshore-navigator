"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="py-20 bg-gray-50 dark:bg-gray-900/50 min-h-screen transition-colors">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t('about.title')}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">{t('about.subtitle')}</p>

                    <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-16 shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600"
                            alt="Nearshore Navigator Team"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
                        <section className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.mission_title')}</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('about.mission')}
                            </p>
                        </section>

                        <section className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.expertise_title')}</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('about.expertise')}
                            </p>
                        </section>

                        <section className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.team_title')}</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t('about.team')}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
