"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/Button";
import { Download, MapPin, Users, Factory, Globe, Phone, Mail } from "lucide-react";
import { useRef } from "react";

export default function BrochureClient() {
    const { t, language } = useLanguage();
    const brochureRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 print:bg-white print:p-0 print:m-0">
            {/* Control Bar - Hidden when printing */}
            <div className="container mx-auto px-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
                <div>
                     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Brochure</h1>
                     <p className="text-gray-500 text-sm">Preview of the downloadable PDF.</p>
                </div>
                <Button 
                    onClick={handlePrint} 
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                    <Download className="w-4 h-4" />
                    {t('brochure.download')}
                </Button>
            </div>

            {/* A4 Sheet Container */}
            <div 
                ref={brochureRef}
                className="mx-auto bg-white text-gray-900 shadow-2xl max-w-[210mm] min-h-[297mm] relative overflow-hidden print:shadow-none print:w-full print:max-w-none print:min-h-0 print:mx-0"
                style={{ breakAfter: 'avoid' }}
            >
                {/* Header Decoration */}
                <div className="h-4 bg-gradient-to-r from-blue-600 to-indigo-900" />
                
                {/* Content Padding */}
                <div className="p-12 print:p-8">
                    
                    {/* Header */}
                    <header className="flex justify-between items-start mb-12 border-b border-gray-100 pb-8">
                        <div>
                             <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight leading-tight mb-2">
                                Nearshore Navigator
                            </h1>
                            <p className="text-lg text-gray-500 font-medium tracking-wide uppercase">
                                {t('brochure.subtitle')}
                            </p>
                        </div>
                        <div className="w-16 h-16 bg-blue-50 text-blue-700 flex items-center justify-center rounded-xl">
                            <Globe className="w-8 h-8" />
                        </div>
                    </header>

                    {/* Main Value Prop */}
                    <div className="mb-12">
                        <div className="relative rounded-2xl overflow-hidden h-64 mb-8 bg-gray-900">
                             <Image 
                                src="https://images.unsplash.com/photo-1565514020176-db7936a7114b?auto=format&fit=crop&q=80&w=1200" 
                                alt="Baja California Industry"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-3xl font-bold mb-1">{t('brochure.whyBaja')}</h3>
                                <p className="text-blue-200">The premier destination for North American manufacturing.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <MapPin className="w-6 h-6 text-blue-600 mb-3" />
                                <h4 className="font-bold text-sm mb-1">{t('brochure.proximity')}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{t('brochure.proximityDesc')}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <Users className="w-6 h-6 text-blue-600 mb-3" />
                                <h4 className="font-bold text-sm mb-1">{t('brochure.labor')}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{t('brochure.laborDesc')}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <Factory className="w-6 h-6 text-blue-600 mb-3" />
                                <h4 className="font-bold text-sm mb-1">{t('brochure.infrastructure')}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{t('brochure.infrastructureDesc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">
                            {t('brochure.services')}
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{t('brochure.realEstate')}</h4>
                                    <p className="text-sm text-gray-600">Site selection, BTS analysis, and lease negotiation for Class A industrial facilities.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{t('brochure.shelter')}</h4>
                                    <p className="text-sm text-gray-600">Administrative and legal compliance services to launch operations in 90 days.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{t('brochure.mfg')}</h4>
                                    <p className="text-sm text-gray-600">Partner matching with certified manufacturers for medical, aerospace, and electronics.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team Spotlight */}
                    <div className="bg-blue-900 text-white rounded-xl p-8 flex items-center justify-between">
                         <div>
                            <span className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 block">Leadership</span>
                            <h3 className="text-2xl font-bold mb-1">Denisse Martinez</h3>
                            <p className="text-blue-200 text-sm mb-4">Director of Marketing & Business Development</p>
                            <p className="text-xs text-blue-100/80 max-w-sm italic">
                                "We help you align your operational needs with the reality of the Baja market to ensure a successful long-term investment."
                            </p>
                         </div>
                         <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center border-2 border-blue-400">
                             <span className="text-xs text-center text-blue-200">Photo<br/>Placeholder</span>
                         </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-8 border-t border-gray-200 mt-auto">
                     <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                             <h5 className="font-bold text-gray-900 mb-2">{t('brochure.contact')}</h5>
                             <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Phone className="w-4 h-4" /> +1 (619) 555-0123
                             </div>
                             <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" /> denisse@nearshorenavigator.com
                             </div>
                        </div>
                        <div className="text-right">
                             <h5 className="font-bold text-gray-900 mb-2">San Diego HQ</h5>
                             <p className="text-gray-600">Baja California Operations</p>
                             <p className="text-blue-600 font-bold mt-2">nearshorenavigator.com</p>
                        </div>
                     </div>
                </div>
            </div>
            
            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: auto;
                    }
                    body {
                        background: white;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                    .print\\:w-full {
                        width: 100% !important;
                        max-width: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
