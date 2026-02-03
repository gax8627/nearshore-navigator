"use client";

import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocation, getService, LOCATIONS } from "@/app/constants/seo-data";

type Props = {
  city: string;
  serviceId: string;
};

export default function ServiceLocationClient({ city, serviceId }: Props) {
  const { t } = useLanguage();
  const location = getLocation(city);
  const service = getService(serviceId);

  if (!location || !service) {
    return null;
  }

  // Dynamic content generation
  const title = `${service.title} in ${location.name}`;
  const subtitle = `Comprehensive ${service.title.toLowerCase()} solutions tailored for the ${location.name} industrial market. Leverage ${location.name}'s ${location.stats.proximity} and a workforce of ${location.stats.laborForce} to optimize your nearshoring strategy.`;

  const faqs = [
    {
      q: `What makes ${location.name} ideal for ${service.title.toLowerCase()}?`,
      a: `${location.name} is a strategic hub in ${location.state} with ${location.stats.proximity}. For ${service.title.toLowerCase()}, it offers ${location.advantages[0]} and ${location.advantages[1]}, making it a top choice for international manufacturers.`
    },
    {
      q: `How does Nearshore Navigator support ${service.title.toLowerCase()} in ${location.name}?`,
      a: `We provide boots-on-the-ground expertise in ${location.name}. Our services include site selection, compliance auditing, and connecting you with the best ${service.title.toLowerCase()} partners in ${location.state}.`
    },
    {
      q: `What are the key industrial advantages of ${location.name}?`,
      a: `${location.name} offers ${location.advantages.join(', ')}. These factors contribute to a robust ecosystem for companies utilizing ${service.title.toLowerCase()} to serve the North American market.`
    },
    {
      q: `Can I combine ${service.title.toLowerCase()} with other services in ${location.name}?`,
      a: `Absolutely. Many clients in ${location.name} integrate ${service.title.toLowerCase()} with shelter operations or distribution center management to create a seamless supply chain.`
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} in ${location.name}`,
    "provider": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "url": "https://nearshorenavigator.com"
    },
    "serviceType": service.title,
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": location.state,
        "addressCountry": "MX"
      }
    },
    "description": subtitle
  };

  return (
    <div className="pb-20 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={location.image}
            alt={`${service.title} in ${location.name}`}
            fill
            className="object-cover premium-image-filter"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/60" />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-300 mb-8">
                <span className="text-sm font-bold tracking-wider uppercase">{location.name} Industrial Hub</span>
            </div>
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">
            {service.title} in <span className="text-primary-500">{location.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 relative z-20 -mt-10 md:-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-glass border border-white/20 dark:border-gray-800">
            
            {/* Key Benefits */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Critical Advantages of {location.name} for {service.title}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-8">
                <p>
                  Operating in {location.name} provides immediate access to {location.stats.proximity}. With a population of {location.stats.population} and a mature industrial base, companies utilizing {service.title.toLowerCase()} can expect high operational efficiency and significant cost advantages.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {location.advantages.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-white/40 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                    <CheckCircle2 className="text-primary-500 w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Service Details */}
            <section>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Our {service.title} Expertise in {location.name}
                </h3>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <p>
                        Our mission in {location.name} is to bridge the gap between US requirements and Mexican execution. For {service.title.toLowerCase()}, this means:
                    </p>
                    <ul className="grid grid-cols-1 gap-4 mt-6 not-prose">
                        <li className="flex items-center gap-3">
                            <ArrowRight className="w-4 h-4 text-primary-500" />
                            <span>Navigating the local {location.name} real estate or labor market.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ArrowRight className="w-4 h-4 text-primary-500" />
                            <span>Ensuring compliance with ${location.state} and federal regulations.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ArrowRight className="w-4 h-4 text-primary-500" />
                            <span>Mitigating risk through vetted local partnerships.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                FAQs: {service.title} in {location.name}
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700 open:bg-white/60 dark:open:bg-gray-800/60 transition-colors">
                    <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                      {faq.q}
                      <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related Locations */}
            <section>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    See {service.title} in Other Cities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {LOCATIONS.filter(l => l.slug !== city).slice(0, 6).map((loc) => (
                        <Link 
                            key={loc.slug} 
                            href={`/locations/${loc.slug}/${serviceId}`}
                            className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group"
                        >
                            <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 translation-colors">
                                {loc.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <LeadForm
                title={`Expand to ${location.name}`}
                subtitle={`Get a custom proposal for ${service.title.toLowerCase()} in ${location.name}.`}
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Founder Block */}
      <FounderBlock />
    </div>
  );
}
