"use client";

import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ShelterServicesPage() {
    const { t } = useLanguage();

    return (
        <div className="pb-20">
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000"
                        alt="Team Strategy"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
                </div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('shelterPage.heroTitle')} <span className="text-green-300">{t('shelterPage.heroTitleHighlight')}</span></h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        {t('shelterPage.heroSubtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
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
        </div>
    );
}
