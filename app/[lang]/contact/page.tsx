"use client";

import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                        alt="Contact Nearshore Navigator"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/70" />
                </div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {t('contact.title')}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Offices</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{t('contact.email')}</h3>
                                    <a href="mailto:info@nearshorenavigator.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">info@nearshorenavigator.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{t('contact.phone')}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">+1 (619) 555-0123</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{t('contact.hours')}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{t('contact.offices')}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{t('contact.office_sd')}</p>
                                    <p className="text-gray-600 dark:text-gray-300">{t('contact.office_tj')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <LeadForm className="shadow-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
