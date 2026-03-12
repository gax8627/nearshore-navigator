"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { StatsGrid } from "@/components/StatsGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { LandedCostCalculator } from "@/components/LandedCostCalculator";

export default function MasterGuideClient() {
  const { t, language: lang } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      
      {/* 1. HERO SECTION (Enterprise Gateway) */}
      <section className="relative bg-slate-900 text-white pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600" 
            alt="Tijuana Industrial Skyline" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-widest uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              {t('tijuanaMasterGuide.hero.badge')}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
              {t('tijuanaMasterGuide.hero.title')}
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 max-w-2xl mb-12 leading-relaxed font-light">
              {t('tijuanaMasterGuide.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                href={`/${lang}/contact`}
                className="group relative px-8 py-4 rounded-xl bg-sky-600 text-white font-bold transition-all duration-300 hover:bg-sky-500 text-center flex items-center justify-center gap-2 overflow-hidden shadow-2xl shadow-sky-900/40"
              >
                <span className="relative z-10">{t('tijuanaMasterGuide.hero.cta_landed_cost')}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link 
                href="#clusters"
                className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all duration-300 backdrop-blur-md border border-white/10 text-center"
              >
                {t('tijuanaMasterGuide.hero.cta_clusters')}
              </Link>
            </div>
          </motion.div>
          
          {/* Enhanced Trust Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-24 pt-12 border-t border-white/5"
          >
            <p className="text-xs font-bold text-slate-500 mb-10 uppercase tracking-[0.2em]">
              {t('tijuanaMasterGuide.hero.trust_label')}
            </p>
            <div className="flex flex-wrap gap-x-12 gap-y-8 items-center opacity-40 grayscale hover:opacity-100 transition-opacity duration-500">
              <span className="text-2xl font-black tracking-tighter">BECTON DICKINSON</span>
              <span className="text-2xl font-black tracking-tighter">SAMSUNG</span>
              <span className="text-2xl font-black tracking-tighter">COLLINS AEROSPACE</span>
              <span className="text-2xl font-black tracking-tighter">DJO GLOBAL</span>
              <span className="text-2xl font-black tracking-tighter">EATON</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE COST ADVANTAGE (Animated Grid) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <SectionTitle 
            title={t('tijuanaMasterGuide.cost_advantage.title')}
            subtitle={t('tijuanaMasterGuide.cost_advantage.subtitle')}
            align="center"
          />
          
          <div className="grid lg:grid-cols-3 gap-10 mt-20">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-slate-50 border border-slate-100 group transition-all duration-300"
            >
              <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                {t('tijuanaMasterGuide.cost_advantage.labor_val')}<span className="text-2xl text-slate-400 font-medium">/hr</span>
              </div>
              <h3 className="text-xl font-bold text-sky-900 mb-4">{t('tijuanaMasterGuide.cost_advantage.labor_label')}</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                {t('tijuanaMasterGuide.cost_advantage.labor_desc')}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-slate-50 border border-slate-100 group transition-all duration-300"
            >
              <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                {t('tijuanaMasterGuide.cost_advantage.real_estate_val')}<span className="text-2xl text-slate-400 font-medium">/SF</span>
              </div>
              <h3 className="text-xl font-bold text-sky-900 mb-4">{t('tijuanaMasterGuide.cost_advantage.real_estate_label')}</h3>
              <p className="text-slate-600 leading-relaxed font-light">
                {t('tijuanaMasterGuide.cost_advantage.real_estate_desc')}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-sky-900 border border-sky-800 text-white shadow-2xl shadow-sky-900/20"
            >
              <div className="text-6xl font-black text-white mb-4 tracking-tighter">
                {t('tijuanaMasterGuide.cost_advantage.tariffs_val')}
              </div>
              <h3 className="text-xl font-bold text-sky-200 mb-4">{t('tijuanaMasterGuide.cost_advantage.tariffs_label')}</h3>
              <p className="text-sky-100/70 leading-relaxed font-light">
                {t('tijuanaMasterGuide.cost_advantage.tariffs_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CALCULATOR (Pillar Highlight) */}
      <section className="py-32 bg-slate-900 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <LandedCostCalculator />
        </div>
      </section>

      {/* 4. CLUSTERS (Visual Cards) */}
      <section id="clusters" className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">{t('tijuanaMasterGuide.clusters.title')}</h2>
              <p className="text-xl text-slate-600 font-light">{t('tijuanaMasterGuide.clusters.subtitle')}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: 'medical', icon: 'M19.423 15.641a1.595 1.595 0 00.357-1.041c0-.882-.713-1.595-1.595-1.595h-5.01c-.134 0-.256-.051-.351-.133l-2.45-2.091a.519.519 0 01-.157-.393V4.94a1.595 1.595 0 10-3.19 0v5.448c0 .151-.067.294-.183.393l-2.43 2.074c-.097.083-.222.134-.359.134H2.074A1.595 1.595 0 00.48 14.6c0 .4.148.766.393 1.041m18.55 0c.245.275.393.641.393 1.041 0 .882-.713 1.595-1.595 1.595h-5.01c-.134 0-.256.051-.351.134L10.4 20.501c-.097.083-.222.134-.359.134H4.074A1.595 1.595 0 012.48 19.04a1.595 1.595 0 011.595-1.595h5.01c.134 0 .256-.051.351-.133l2.45-2.091c.116-.1.183-.242.183-.393v-5.448c0-.882.713-1.595 1.595-1.595s1.595.713 1.595 1.595v5.448c0 .151.067.294.183.393l2.43 2.074c.097.083.222.134.359.134h5.01c.882 0 1.595.713 1.595 1.595z' },
              { key: 'aerospace', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { key: 'electronics', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
            ].map((cluster, i) => (
              <motion.div 
                key={cluster.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-12 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-sky-300 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="inline-block px-4 py-1 bg-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
                  {t(`tijuanaMasterGuide.clusters.${cluster.key}.badge`)}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 group-hover:text-primary-600 transition-colors">
                  {t(`tijuanaMasterGuide.clusters.${cluster.key}.title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {t(`tijuanaMasterGuide.clusters.${cluster.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOGISTICS SPLIT */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
               <h2 className="text-4xl lg:text-5xl font-bold mb-10 leading-tight">
                 {t('tijuanaMasterGuide.border.title')}
               </h2>
               <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                 {t('tijuanaMasterGuide.border.desc')}
               </p>
               
               <div className="space-y-12">
                 <div className="relative pl-8 border-l-2 border-white/10 hover:border-sky-500 transition-colors duration-500">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{t('tijuanaMasterGuide.border.asia_label')}</p>
                    <p className="text-4xl font-black text-slate-500 line-through opacity-30">{t('tijuanaMasterGuide.border.asia_val')}</p>
                 </div>
                 
                 <div className="relative pl-8 border-l-2 border-sky-500">
                    <div className="absolute -left-[3px] top-0 bottom-0 w-[4px] bg-sky-400 animate-pulse"></div>
                    <p className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-2">{t('tijuanaMasterGuide.border.tijuana_label')}</p>
                    <p className="text-4xl font-black text-white">{t('tijuanaMasterGuide.border.tijuana_val')}</p>
                 </div>
               </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-slate-800 rounded-3xl overflow-hidden border border-white/5 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Logistics and Border Infrastructure" 
                  className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 p-10 bg-sky-600 rounded-2xl shadow-2xl max-w-sm">
                <p className="text-white font-bold text-lg mb-2 italic">"0% USMCA Tariffs"</p>
                <p className="text-sky-100 text-sm font-light">Bypass Section 301 duties entirely by manufacturing inside the IMMEX zone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OPERATING MODELS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <SectionTitle 
            title={t('tijuanaMasterGuide.models.title')}
            subtitle={t('tijuanaMasterGuide.models.subtitle')}
            align="center"
          />
          
          <div className="grid lg:grid-cols-2 gap-10 mt-20">
            <div className="group p-12 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-sky-200 hover:shadow-2xl transition-all duration-500">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">{t('tijuanaMasterGuide.models.shelter_title')}</h3>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg font-light">
                {t('tijuanaMasterGuide.models.shelter_desc')}
              </p>
              <Link href={`/${lang}/services/shelter-services-tijuana`} className="inline-flex items-center gap-2 text-sky-700 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                {t('tijuanaMasterGuide.models.cta_shelter')} 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>

            <div className="group p-12 rounded-[2rem] bg-slate-900 border border-slate-800 text-white hover:shadow-2xl hover:shadow-sky-900/20 transition-all duration-500">
              <h3 className="text-3xl font-bold mb-6">{t('tijuanaMasterGuide.models.contract_title')}</h3>
              <p className="text-slate-400 mb-10 leading-relaxed text-lg font-light">
                {t('tijuanaMasterGuide.models.contract_desc')}
              </p>
              <Link href={`/${lang}/services/contract-manufacturing-tijuana`} className="inline-flex items-center gap-2 text-sky-400 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                {t('tijuanaMasterGuide.models.cta_contract')} 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-slate-900 to-sky-500"></div>
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
            {t('tijuanaMasterGuide.cta_final.title')}
          </h2>
          <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
            {t('tijuanaMasterGuide.cta_final.subtitle')}
          </p>
          <Link 
            href={`/${lang}/contact`}
            className="px-12 py-6 rounded-2xl bg-slate-900 text-white text-xl font-bold transition-transform hover:scale-105 shadow-2xl shadow-slate-900/40"
          >
            {t('tijuanaMasterGuide.cta_final.button')}
          </Link>
        </div>
      </section>

    </div>
  );
}
