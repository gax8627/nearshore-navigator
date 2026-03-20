"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { LeadForm } from "@/components/LeadForm";
import { TrustSeal } from "@/components/TrustSeal";
import { 
  CheckCircle2, 
  MapPin, 
  ChevronRight, 
  Home, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Zap,
  Building2,
  Users2,
  TrendingUp,
  Award
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocation } from "@/app/constants/seo-data";
import { INDUSTRY_VERTICALS } from "@/app/constants/industry-taxonomy";
import { INDUSTRY_MATRIX } from "@/app/constants/city-industry-matrix";

type Props = {
  city: string;
  industry: string;
};

export default function IndustryVerticalClient({ city, industry }: Props) {
  const { t, language } = useLanguage();
  const location = getLocation(city);
  const vertical = INDUSTRY_VERTICALS.find(v => v.slug === industry);
  const matrixEntry = INDUSTRY_MATRIX.find(m => m.citySlug === city && m.industrySlug === industry);

  if (!location || !vertical || !matrixEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vertical Guide Not Found</h1>
          <Link href={`/${language}/locations/${city}`} className="text-primary-600 hover:underline">
            Return to {t(`locations.${city}.name`) || location?.name || 'City'} Overview
          </Link>
        </div>
      </div>
    );
  }

  // Schema for industrial authority
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://nearshorenavigator.com/${language}` },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": `https://nearshorenavigator.com/${language}/locations` },
      { "@type": "ListItem", "position": 3, "name": t(`locations.${city}.name`) || location.name, "item": `https://nearshorenavigator.com/${language}/locations/${city}` },
      { "@type": "ListItem", "position": 4, "name": t(`industries.${industry}.name`), "item": `https://nearshorenavigator.com/${language}/locations/${city}/industries/${industry}` }
    ]
  };

  return (
    <div className="pb-20 overflow-hidden bg-gray-50 dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={vertical.heroImage}
            alt={`${t(`industries.${industry}.name`)} in ${t(`locations.${city}.name`) || location.name} - Nearshore Navigator`}
            fill
            className="object-cover opacity-90 brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gray-50 dark:to-gray-950" />
        </div>

        {/* Breadcrumbs */}
        <div className="absolute top-8 left-0 right-0 z-20 container mx-auto px-4">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-gray-300">
                    <li className="inline-flex items-center">
                        <Link href={`/${language}`} className="inline-flex items-center hover:text-white transition-colors">
                            <Home className="w-4 h-4 mr-2" />
                            {t('nav.home') || 'Home'}
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <Link href={`/${language}/locations/${city}`} className="hover:text-white transition-colors">
                                {t(`locations.${city}.name`) || location.name}
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="text-white font-medium" aria-current="page">{t(`industries.${industry}.name`)}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-200 mb-8">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-widest">{t(`industries.${industry}.name`)} {t('industries.authorityGuide')}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                {t(`industries.${industry}.name`)} in <span className="text-primary-400">{t(`locations.${city}.name`) || location.name}</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                {t(`matrix.${city}.${industry}`)}
            </p>
        </div>
      </section>

      {/* Industrial Intelligence Grid */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-5 h-5 text-primary-500" />
                    <span className="text-xs font-bold uppercase text-gray-400">{t('industries.activePlants')}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{matrixEntry.stats.plants}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <Users2 className="w-5 h-5 text-primary-500" />
                    <span className="text-xs font-bold uppercase text-gray-400">{t('industries.specializedTalent')}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{matrixEntry.stats.workforce}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    <span className="text-xs font-bold uppercase text-gray-400">{t('industries.medical-devices.avgLaborRate')}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{vertical.metrics.avgLaborRate}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-primary-500" />
                    <span className="text-xs font-bold uppercase text-gray-400">{t('industries.medical-devices.certEase')}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{vertical.metrics.complianceScore}</div>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-20">
                
                {/* Sector Opportunity Deep Dive */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-primary-500 w-12" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-widest">{t('industries.medical-devices.industryAnalysis')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                {t('industries.medical-devices.marketOpportunity')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t(`industries.${industry}.marketOpportunity`)}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Users2 className="w-5 h-5 text-blue-500" />
                                {t('industries.medical-devices.laborProfile')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t(`industries.${industry}.laborProfile`)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Compliance & Certifications */}
                <section>
                    <div className="bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-8">{t('industries.medical-devices.regulatoryFramework')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-6">{t('industries.medical-devices.requiredCerts')}</h4>
                                    <div className="space-y-4">
                                        {vertical.compliance.certifications.map((cert) => (
                                            <div key={cert} className="flex items-center gap-3">
                                                <div className="bg-primary-500/20 p-1 rounded-md">
                                                    <CheckCircle2 className="w-4 h-4 text-primary-400" />
                                                </div>
                                                <span className="text-gray-300 font-medium">{cert}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-6">{t('industries.medical-devices.keyBodies')}</h4>
                                    <div className="space-y-4">
                                        {vertical.compliance.regulatoryBodies.map((body) => (
                                            <div key={body} className="flex items-center gap-3">
                                                <div className="bg-gray-800 p-1 rounded-md">
                                                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <span className="text-gray-400">{body}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Top Players & Validation */}
                <section>
                    <SectionTitle 
                        title={t('industries.medical-devices.clusterValidation')}
                        subtitle={t('industries.medical-devices.clusterSub')}
                        align="left"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {matrixEntry.topLocalEmployers.map((brand) => (
                            <div key={brand} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center group hover:border-primary-500 transition-colors">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
                                    <Building2 className="w-6 h-6 text-gray-400 group-hover:text-primary-500" />
                                </div>
                                <span className="font-bold text-gray-900 dark:text-white">{brand}</span>
                                <span className="text-xs text-gray-500 mt-2">{location.name} Ops</span>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Sidebar Sticky Area */}
            <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="bg-primary-600 p-4 text-center">
                            <span className="text-white font-bold text-sm uppercase tracking-widest">{t('industries.medical-devices.specialistAccess')}</span>
                        </div>
                        <LeadForm
                            title={t('industries.medical-devices.consultAdvisor').replace('{name}', t(`industries.${industry}.name`))}
                            subtitle={t('industries.medical-devices.advisorSub').replace('{location}', location.name)}
                            source={`vertical_guide_${city}_${industry}`}
                            className="p-6"
                        />
                    </div>

                    <TrustSeal />

                    {/* Industrial Parks Badge */}
                    <div className="bg-gradient-to-br from-primary-900 to-primary-700 p-8 rounded-2xl text-white shadow-lg">
                        <h4 className="text-xl font-bold mb-4">{t('industries.medical-devices.strategicRealEstate')}</h4>
                        <p className="text-primary-100 text-sm mb-6 leading-relaxed">
                            {t('industries.medical-devices.realEstateSub').replace('{name}', t(`industries.${industry}.name`))}
                        </p>
                        <div className="space-y-3">
                            {matrixEntry.featuredParks.map((park) => (
                                <div key={park} className="flex items-center gap-3">
                                    <Layers className="w-4 h-4 text-primary-300" />
                                    <span className="text-sm font-medium">{park}</span>
                                </div>
                            ))}
                        </div>
                        <Link 
                            href={`/${language}/locations/${city}`}
                            className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-primary-200 hover:text-white transition-colors"
                        >
                            {t('industries.medical-devices.viewAllInfrastructure').replace('{location}', location.name)}
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
