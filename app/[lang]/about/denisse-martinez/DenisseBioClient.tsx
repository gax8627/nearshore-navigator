"use client";

import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/Button";

export default function DenisseBioClient() {
  const { t } = useLanguage();

  return (
    <div className="pb-20 overflow-hidden relative">
      <div className="container mx-auto px-4 mt-20 md:mt-32">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          
          {/* Left Column: Image & Quick Links */}
          <div className="w-full md:w-1/3 flex flex-col gap-6 sticky top-28">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/denisse-martinez.jpg"
                alt={t('bio_denisse.imageAlt') || "Denisse Martinez"}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <a href="https://www.linkedin.com/in/denisse-martinez" target="_blank" rel="noopener noreferrer">
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
                "{t('bio_denisse.quote')}"
              </p>
            </blockquote>

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

            <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {t('bio_denisse.trackRecordTitle')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center opacity-80">
                 <div className="font-bold text-gray-800 dark:text-gray-200">Aerospace</div>
                 <div className="font-bold text-gray-800 dark:text-gray-200">Medical Devices</div>
                 <div className="font-bold text-gray-800 dark:text-gray-200">Automotive</div>
                 <div className="font-bold text-gray-800 dark:text-gray-200">Electronics</div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
