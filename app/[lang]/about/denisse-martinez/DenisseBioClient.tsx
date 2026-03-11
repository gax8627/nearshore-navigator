"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/Button";
import { Shield, Award, Building2, Globe2 } from "lucide-react";

export default function DenisseBioClient() {
  const { t } = useLanguage();

  const credentials = [
    { icon: Shield, label: "ISO 9001 / AS9100 / IATF 16949", desc: "Certified facility network" },
    { icon: Award, label: "15+ Years Cross-Border", desc: "Cali-Baja corridor expertise" },
    { icon: Building2, label: "20+ Companies Launched", desc: "Multi-industry track record" },
    { icon: Globe2, label: "USMCA & IMMEX Specialist", desc: "Tariff & compliance advisory" },
  ];

  return (
    <div className="pb-20 overflow-hidden relative">
      <div className="container mx-auto px-4 mt-20 md:mt-32">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          
          {/* Left Column: Image & Quick Links */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 sticky top-28">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/denisse-martinez.jpg"
                alt={t('bio_denisse.imageAlt') || "Denisse Martinez, Expert Nearshore Consultant in Baja California"}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <a href="https://www.linkedin.com/in/denissemartinez" target="_blank" rel="noopener noreferrer">
                <Button className="w-full text-center py-4 bg-[#0077b5] hover:bg-[#005582] text-white">
                  {t('bio_denisse.linkedin_cta')}
                </Button>
              </a>
              <a href="https://wa.me/526641237199" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full text-center py-4 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                  {t('bio_denisse.whatsapp_cta')}
                </Button>
              </a>
            </div>

            {/* Reviewed-By Trust Badge */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">Content Reviewed By</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Denisse Martinez</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Mexico Manufacturing Advisor</p>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="w-full md:w-2/3 flex flex-col gap-10">
            <div>
              <p className="text-primary-500 font-semibold uppercase tracking-wider mb-2">
                {t('bio_denisse.intro')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {t('bio_denisse.title')}
              </h1>
            </div>

            <blockquote className="border-l-4 border-primary-500 pl-6 py-2 my-4">
              <p className="text-xl md:text-2xl font-light italic text-gray-600 dark:text-gray-300">
                &ldquo;{t('bio_denisse.quote')}&rdquo;
              </p>
            </blockquote>

            {/* Credentials Grid */}
            <section className="grid grid-cols-2 gap-4">
              {credentials.map((cred, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-2 flex-shrink-0">
                    <cred.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{cred.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cred.desc}</p>
                  </div>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('bio_denisse.backgroundTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('bio_denisse.backgroundDesc')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('bio_denisse.expertiseTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('bio_denisse.expertiseDesc')}
              </p>
            </section>

            {/* Track Record */}
            <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {t('bio_denisse.trackRecordTitle')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">Aerospace</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AS9100</p>
                 </div>
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">Medical Devices</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ISO 13485</p>
                 </div>
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">Automotive</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">IATF 16949</p>
                 </div>
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">Electronics</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">IPC Standards</p>
                 </div>
              </div>
            </section>

            {/* Certified Partner Network */}
            <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                Certified Manufacturing Network
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
                We exclusively work with certified facilities and proven partners across Baja California.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { cert: "ISO 9001", area: "Quality Management" },
                  { cert: "AS9100", area: "Aerospace Standards" },
                  { cert: "ISO 13485", area: "Medical Devices" },
                  { cert: "IATF 16949", area: "Automotive Quality" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 dark:border-gray-700 shadow-sm">
                    <p className="font-bold text-primary-700 dark:text-primary-400 text-sm">{item.cert}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.area}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
