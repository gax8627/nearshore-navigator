"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/Button";
import { BAJA_INDUSTRIAL_PARKS } from "@/app/constants/industrial-parks-data";
import { MapPin, Building2, TrendingUp, Users } from "lucide-react";

export default function IndustrialMapClient({ language }: { language: string }) {
  const { t } = useLanguage();

  return (
    <div className="pb-20 pt-32 bg-gray-50 dark:bg-gray-900/40 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('park_map.title') || "Baja California Industrial Park Map (2026)"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('park_map.subtitle') || "Explore Class A & B manufacturing space across Tijuana, Mexicali, and Tecate. Data reflects current NNN lease rates and market vacancy statuses."}
          </p>
        </div>

        {/* Google Map Grid Layout */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-12">
           <div className="w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d107873.34440801646!2d-116.89260715367355!3d32.531238686617305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1714524458512!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 dark:invert dark:hue-rotate-180 dark:contrast-100"
                title="Baja California Industrial Infrastructure Map"
             ></iframe>
           </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-primary-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('park_map.tableTitle') || "Market Availability & Lease Rates"}
                    </h2>
                </div>
                <div className="flex gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-green-500" /> Live Data</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 8 Parks</span>
                </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">
                    <th className="p-6 font-semibold">Park Name</th>
                    <th className="p-6 font-semibold">City</th>
                    <th className="p-6 font-semibold">Class</th>
                    <th className="p-6 font-semibold">Vacancy Status</th>
                    <th className="p-6 font-semibold">Lease Rate (NNN)</th>
                    <th className="p-6 font-semibold">Key Tenants</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {BAJA_INDUSTRIAL_PARKS.map((park, index) => (
                    <tr key={park.id} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group">
                      <td className="p-6 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                           {park.name}
                        </div>
                      </td>
                      <td className="p-6 text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {park.city}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {park.classification}
                        </span>
                      </td>
                      <td className="p-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            park.vacancyStatus.includes('Very Low') ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            park.vacancyStatus.includes('Moderate') || park.vacancyStatus.includes('Stable') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {park.vacancyStatus}
                        </span>
                      </td>
                      <td className="p-6 font-medium text-gray-900 dark:text-white">
                        {park.leaseRate}
                      </td>
                      <td className="p-6 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate" title={park.keyTenants.join(', ')}>
                        {park.keyTenants.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[80px] opacity-20 pointer-events-none -mx-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-[80px] opacity-10 pointer-events-none -mx-24 -mb-24"></div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
                 {t('park_map.ctaTitle') || "Need help securing space in these parks?"}
            </h3>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
                {t('park_map.ctaDesc') || "Vacancy rates in Class A facilities are below 3%. Speak directly with Denisse Martinez to bypass waitlists and model your nearshore footprint."}
            </p>
            <a href="https://calendly.com/denisse-nearshorenavigator/30min" target="_blank" rel="noopener noreferrer">
                <Button className="w-full sm:w-auto py-4 px-8 text-primary-900 bg-white hover:bg-gray-100 text-lg font-bold">
                    Talk to Denisse &rarr;
                </Button>
            </a>
        </div>

      </div>
    </div>
  );
}
