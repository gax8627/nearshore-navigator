"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2, Warehouse, Globe2, Cog, Truck, Headset, MapPin } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocation, SERVICES } from "@/app/constants/seo-data";

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
  const { language } = useLanguage();
  const location = getLocation(city);

  if (!location) {
    return null; // Should be handled by parent or notFound() there, but safe to have
  }

  return (
    <div className="pb-20 overflow-hidden">
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

            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
                <div className="sticky top-28">
                    <LeadForm
                        title={`Start in ${location.name}`}
                        subtitle="Get a free consultation and cost analysis for your project."
                        className="shadow-xl"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
