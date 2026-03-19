"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

export function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href={`/${language}`} className="block group" aria-label="Nearshore Navigator Home">
                            <div className="relative w-44 md:w-60 h-12 md:h-16 transition-all group-hover:scale-105 duration-300">
                                <Image
                                    src="/images/nearshore-logo-brand.png"
                                    alt="Nearshore Navigator Logo"
                                    fill
                                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </Link>
                        <p className="mt-6 text-gray-400 text-sm leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gray-100">{t('nav.services')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href={`/${language}/services/industrial-real-estate-baja`} className="hover:text-primary-400">{t('services.real_estate')}</Link></li>

                            <li><Link href={`/${language}/services/contract-manufacturing-tijuana`} className="hover:text-primary-400">{t('services.contract')}</Link></li>
                            <li><Link href={`/${language}/services/distribution-centers-tijuana`} className="hover:text-primary-400">{t('services.logistics')}</Link></li>
                            <li><Link href={`/${language}/services/call-center-tijuana`} className="hover:text-primary-400">{t('services.call_center')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gray-100">{t('nav.resources')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href={`/${language}/resources/tijuana-industrial-park-map`} className="hover:text-primary-400">{t('footer.industrial_map')}</Link></li>
                            <li><Link href={`/${language}/resources/questionnaire`} className="hover:text-primary-400">Assessment Questionnaire</Link></li>
                            <li><Link href={`/${language}/insights`} className="hover:text-primary-400">{t('nav.insights')}</Link></li>
                            <li><Link href={`/${language}/about`} className="hover:text-primary-400">{t('nav.about')}</Link></li>
                            <li><Link href={`/${language}/contact`} className="hover:text-primary-400">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gray-100">{t('nav.contact')}</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li>
                                <span className="block font-medium text-gray-400 mb-1">USA HQ</span>
                                San Diego, California, US
                            </li>
                            <li>
                                <span className="block font-medium text-gray-400 mb-1">Mexico Operations</span>
                                Blvd. Agua Caliente 10611, Tijuana
                            </li>
                            <li className="pt-2 flex items-center gap-4">
                                <a href="mailto:denisse@nearshorenavigator.com" className="hover:text-primary-400 font-medium" aria-label="Send email to Nearshore Navigator">denisse@nearshorenavigator.com</a>
                                <a href="https://www.linkedin.com/company/nearshore-navigator/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn Profile">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Nearshore Navigator. {t('footer.rights')}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href={`/${language}/privacy`} className="hover:text-white">{t('footer.privacy')}</Link>
                        <Link href={`/${language}/terms`} className="hover:text-white">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Nearshore Navigator",
                        "image": "https://nearshorenavigator.com/images/nearshore-logo-brand.png",
                        "url": "https://nearshorenavigator.com",
                        "telephone": "+1-800-000-0000",
                        "address": [
                            {
                                "@type": "PostalAddress",
                                "streetAddress": "San Diego, California, US",
                                "addressLocality": "San Diego",
                                "addressRegion": "CA",
                                "addressCountry": "US"
                            },
                            {
                                "@type": "PostalAddress",
                                "streetAddress": "Blvd. Agua Caliente 10611",
                                "addressLocality": "Tijuana",
                                "addressRegion": "BNC",
                                "addressCountry": "MX"
                            }
                        ]
                    })
                }}
            />
        </footer>
    );
}
