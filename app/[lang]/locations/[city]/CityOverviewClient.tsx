"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2, Warehouse, Globe2, Cog, Truck, Headset, MapPin, ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocation, SERVICES } from "@/app/constants/seo-data";
import { TrustSeal } from "@/components/TrustSeal";
import { INDUSTRY_MATRIX } from "@/app/constants/city-industry-matrix";
import { INDUSTRY_VERTICALS } from "@/app/constants/industry-taxonomy";
import { Factory } from "lucide-react";

// Map string icon names to components
const iconMap = {
  Warehouse: Warehouse,
  Globe2: Globe2,
  Cog: Cog,
  Truck: Truck,
  Headset: Headset,
};

type Props = {
  city: string;
};

export default function CityOverviewClient({ city }: Props) {
  const { t, language } = useLanguage();
  const location = getLocation(city);

  if (!location) {
    return null; // Should be handled by parent or notFound() there, but safe to have
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Nearshore Navigator - ${location.name}`,
    "description": `Strategic nearshoring advisory and manufacturing services in ${location.name}, ${location.state}.`,
    "url": `https://nearshorenavigator.com/${language}/locations/${city}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": location.state,
      "addressCountry": "MX"
    },
    "serviceType": [
      `Industrial Real Estate ${location.name}`,
      `Contract Manufacturing ${location.name}`,
      `Shelter Services ${location.name}`
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "url": "https://nearshorenavigator.com"
    }
  };

  return (
    <div className="pb-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={location.image}
            alt={`Industrial Real Estate and Manufacturing in ${location.name}, ${location.state} - Nearshore Navigator`}
            fill
            className="object-cover premium-image-filter"
            priority
          />
        </div>

        {/* Breadcrumbs */}
        <div className="absolute top-8 left-0 right-0 z-20 container mx-auto px-4">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-gray-300">
                    <li className="inline-flex items-center">
                        <Link href={`/${language}`} className="inline-flex items-center hover:text-white transition-colors">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="text-gray-400">Locations</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="text-white font-medium" aria-current="page">{location.name}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium">{location.state}, {location.country}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Manufacturing in <span className="text-primary-500">{location.name}</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                {location.description}
            </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-20 mb-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Population</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{location.stats.population}</div>
                </div>
                <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Labor Force</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{location.stats.laborForce}</div>
                </div>
                <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Proximity</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{location.stats.proximity}</div>
                </div>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
                
                {/* Available Services */}
                <section>
                    <SectionTitle 
                        title={`Services in ${location.name}`}
                        subtitle="Explore our comprehensive manufacturing and logistics solutions tailored for this region."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {SERVICES.map((service) => {
                            const Icon = iconMap[service.icon];
                            return (
                                <ServiceCard
                                    key={service.slug}
                                    title={service.title}
                                    description={service.description}
                                    href={`/${language}/locations/${location.slug}/${service.slug}`}
                                    icon={<Icon className="w-6 h-6" />}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* Industrial Verticals (PAE Layer) */}
                <section>
                    <SectionTitle 
                        title="Industry Expertise"
                        subtitle={`Specialized manufacturing guides for ${location.name}'s key industrial clusters.`}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {INDUSTRY_MATRIX.filter(m => m.citySlug === city).map((entry) => {
                            const vertical = INDUSTRY_VERTICALS.find(v => v.slug === entry.industrySlug);
                            if (!vertical) return null;
                            return (
                                <Link 
                                    key={entry.industrySlug}
                                    href={`/${language}/locations/${city}/industries/${entry.industrySlug}`}
                                    className="group flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-500 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                            <Factory className="w-5 h-5" />
                                        </div>
                                          <div>
                                              <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                                 {t(`industries.${vertical.slug}.name`)}
                                              </h4>
                                              <p className="text-xs text-gray-500">{entry.stats.plants} Active Facilities</p>
                                          </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Why This City */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Choose {location.name}?</h2>
                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-1 gap-6">
                            {location.advantages.map((advantage, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="mt-1 bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
                                        <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{advantage}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Premium CTA & Trust Badges */}
                <section className="bg-sky-900 rounded-2xl p-8 border border-sky-800 text-white shadow-xl relative overflow-hidden mt-12">
                  <div className="absolute top-0 right-0 -tr-10 opacity-20 transform translate-x-1/2 -translate-y-1/2">
                    <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                      <path d="M12 8L16 12L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-sky-800 text-sky-200 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                       {location.name} Landed Cost Analysis
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Calculate Your Exact Savings in {location.name}
                    </h3>
                    <p className="text-sky-100 mb-8 max-w-lg leading-relaxed">
                      Stop guessing. Let our advisory team run a custom total landed cost analysis comparing your current supply chain directly to {location.name}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <Link 
                        href={`/${language}/contact`}
                        className="w-full sm:w-auto px-8 py-4 rounded-md bg-white text-sky-900 font-bold hover:bg-sky-50 transition-colors shadow-lg text-center"
                      >
                        Calculate Your Savings
                      </Link>
                      <p className="text-sm text-sky-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-400" />
                        Zero obligation report
                      </p>
                    </div>
                  </div>
                </section>

            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                    <TrustSeal />
                    <LeadForm
                        title={`Start in ${location.name}`}
                        subtitle="Get a free consultation and cost analysis for your project."
                        source={`city_overview_${city}`}
                        className="shadow-xl"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
