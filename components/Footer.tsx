"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            Nearshore <span className="text-primary-500">Navigator</span>
                        </Link>
                        <p className="mt-4 text-gray-400 text-sm">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gray-100">{t('nav.services')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/services/industrial-real-estate-tijuana" className="hover:text-primary-400">{t('services.real_estate')}</Link></li>
                            <li><Link href="/services/shelter-services-tijuana" className="hover:text-primary-400">{t('services.shelter')}</Link></li>
                            <li><Link href="/services/contract-manufacturing-tijuana" className="hover:text-primary-400">{t('services.contract')}</Link></li>
                            <li><Link href="/services/distribution-centers-tijuana" className="hover:text-primary-400">{t('services.logistics')}</Link></li>
                            <li><Link href="/services/call-center-tijuana" className="hover:text-primary-400">{t('services.call_center')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gray-100">{t('nav.resources')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/resources/tijuana-industrial-park-map" className="hover:text-primary-400">{t('footer.industrial_map')}</Link></li>
                            <li><Link href="/insights" className="hover:text-primary-400">{t('nav.insights')}</Link></li>
                            <li><Link href="/about" className="hover:text-primary-400">{t('nav.about')}</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-400">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-gray-100">{t('nav.contact')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Baja California, MX</li>
                            <li>San Diego, California, US</li>
                            <li><a href="mailto:info@nearshorenavigator.com" className="hover:text-primary-400" aria-label="Send email to Nearshore Navigator">info@nearshorenavigator.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Nearshore Navigator. {t('footer.rights')}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white">{t('footer.privacy')}</Link>
                        <Link href="/terms" className="hover:text-white">{t('footer.terms')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
