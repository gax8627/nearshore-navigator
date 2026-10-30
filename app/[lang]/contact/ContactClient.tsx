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
            <section className="relative min-h-[40vh] py-20 md:py-0 md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                        alt="Contact Nearshore Navigator"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
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
                                    <a href="mailto:denisse@nearshorenavigator.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">denisse@nearshorenavigator.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{t('contact.phone')}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">+52 664 123 7199</p>
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

                            {/* APAC & WhatsApp Direct Desk */}
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800 space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                    <span>🌏</span>
                                    <span>Global & APAC Inquiries</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-base">
                                    Discreet &amp; Timezone-Flexible Consultation
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Operating out of Singapore, China, Japan, or Europe? We accommodate SGT, CST, and JST hours. Chat asynchronously on WhatsApp or request a mutual NDA before disclosing your project specifications.
                                </p>
                                <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                                    <a
                                        href="https://wa.me/526641237199?text=Hello%20Denisse,%20I%20am%20inquiring%20about%20industrial%20nearshoring%20in%20Mexico."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fa851] text-white text-xs font-bold shadow-md transition-all"
                                        onClick={() => {
                                            if (typeof window !== 'undefined' && (window as any).gtag) {
                                                (window as any).gtag('event', 'click_whatsapp', {
                                                    event_category: 'lead_generation',
                                                    event_label: 'contact_page_apac_desk'
                                                });
                                            }
                                        }}
                                    >
                                        <span>Chat on WhatsApp</span>
                                    </a>
                                    <a
                                        href="https://calendly.com/denisse-nearshorenavigator/30min?utm_source=contact_page&utm_campaign=apac_desk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                    >
                                        <span>Pick a Calendar Slot</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <LeadForm source="contact_page" className="shadow-2xl" />
                    </div>
                </div>

                {/* New Content Sections */}
                <div className="max-w-5xl mx-auto mt-24 grid md:grid-cols-2 gap-12 border-t border-gray-100 dark:border-gray-800 pt-16">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What to expect</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            We don't do high-pressure sales. Our goal is to determine if Baja California is the right strategic fit for your operation.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">1</div>
                                <span className="text-gray-700 dark:text-gray-200">A 30-minute discovery call to map your requirements.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">2</div>
                                <span className="text-gray-700 dark:text-gray-200">Preliminary cost modeling and site availability check.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">3</div>
                                <span className="text-gray-700 dark:text-gray-200">Introduction to vetted partners (Shelters, Legal, Construction).</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visit Us</h3>
                         <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Nothing beats seeing the infrastructure on the ground. We regularly host guided industrial tours for executives.
                         </p>
                         <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
                            <Image 
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
                                alt="Executive Tour of Tijuana Industrial Parks"
                                fill
                                className="object-cover"
                            />
                         </div>
                         <p className="text-sm text-gray-500 italic">
                            * Tours are available for qualified manufacturing projects. Mention your interest in the contact form.
                         </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
