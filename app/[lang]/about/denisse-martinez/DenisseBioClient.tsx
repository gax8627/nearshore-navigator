"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/Button";
import { Shield, Award, Building2, Globe2 } from "lucide-react";

export default function DenisseBioClient() {
  const { t } = useLanguage();

  const credentials = [
    { icon: Shield, label: t('bio_denisse.credLabel1'), desc: t('bio_denisse.credDesc1') },
    { icon: Award, label: t('bio_denisse.credLabel2'), desc: t('bio_denisse.credDesc2') },
    { icon: Building2, label: t('bio_denisse.credLabel3'), desc: t('bio_denisse.credDesc3') },
    { icon: Globe2, label: t('bio_denisse.credLabel4'), desc: t('bio_denisse.credDesc4') },
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
            
            <div className="flex flex-col gap-3">
              <a 
                href="https://calendly.com/denisse-nearshorenavigator/30min?utm_source=denisse_bio&utm_campaign=direct_profile" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_calendly', {
                      event_category: 'lead_generation',
                      event_label: 'denisse_bio_primary',
                    });
                  }
                }}
              >
                <Button className="w-full text-center py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold shadow-lg shadow-primary-900/30">
                  Schedule Strategy Session
                </Button>
              </a>

              <a 
                href="https://wa.me/526641237199?text=Hello%20Denisse,%20I%20am%20inquiring%20about%20industrial%20nearshoring%20in%20Mexico." 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_whatsapp', {
                      event_category: 'lead_generation',
                      event_label: 'denisse_bio_whatsapp',
                    });
                  }
                }}
              >
                <Button variant="outline" className="w-full text-center py-3.5 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 font-semibold text-sm flex items-center justify-center gap-2">
                  <span>Chat on WhatsApp</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold">Discreet</span>
                </Button>
              </a>

              <a href="https://www.linkedin.com/in/denissemartinez" target="_blank" rel="noopener noreferrer">
                <Button className="w-full text-center py-3 bg-[#0077b5] hover:bg-[#005582] text-white text-xs font-semibold">
                  {t('bio_denisse.linkedin_cta')}
                </Button>
              </a>
            </div>

            {/* APAC & Global Timezone Note */}
            <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5 mb-1">
                <span>🌏</span> Global & APAC Friendly
              </span>
              <span>Evening video briefings and asynchronous WhatsApp consultations available for Singapore (SGT), China (CST), Japan (JST) & Europe.</span>
            </div>

            {/* Reviewed-By Trust Badge */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">{t('bio_denisse.reviewedBy')}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Denisse Martinez</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('bio_denisse.advisorTitle')}</p>
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
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                   <p className="font-bold text-gray-800 dark:text-gray-200">{t('bio_denisse.industryAerospace')}</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AS9100</p>
                 </div>
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">{t('bio_denisse.industryMedical')}</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ISO 13485</p>
                 </div>
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">{t('bio_denisse.industryAutomotive')}</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">IATF 16949</p>
                 </div>
                 <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                   <p className="font-bold text-gray-800 dark:text-gray-200">{t('bio_denisse.industryElectronics')}</p>
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">IPC Standards</p>
                 </div>
              </div>
            </section>

            {/* Certified Partner Network */}
            <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                {t('bio_denisse.certNetworkTitle')}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
                {t('bio_denisse.certNetworkDesc')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { cert: "ISO 9001", area: t('bio_denisse.certQualityArea') },
                  { cert: "AS9100", area: t('bio_denisse.certAeroArea') },
                  { cert: "ISO 13485", area: t('bio_denisse.certMedArea') },
                  { cert: "IATF 16949", area: t('bio_denisse.certAutoArea') },
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
