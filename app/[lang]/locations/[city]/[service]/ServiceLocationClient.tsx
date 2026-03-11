"use client";

import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { FounderBlock } from "@/components/FounderBlock";
import { CheckCircle2, ArrowRight, MapPin, ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocation, getService, LOCATIONS } from "@/app/constants/seo-data";

type Props = {
  city: string;
  serviceId: string;
};

export default function ServiceLocationClient({ city, serviceId }: Props) {
  const { t, language } = useLanguage();
  const location = getLocation(city)!;
  const service = getService(serviceId)!;

  // Dynamic content generation
  const title = `${service.title} in ${location.name}`;
  const subtitle = `Comprehensive ${service.title.toLowerCase()} solutions tailored for the ${location.name} industrial market. Leverage ${location.name}'s ${location.stats.proximity} and a workforce of ${location.stats.laborForce} to optimize your nearshoring strategy.`;

  const faqs = location.serviceFaqs?.[serviceId] || location.localFaqs || [
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

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nearshorenavigator.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": location.name,
        "item": `https://nearshorenavigator.com/${language}/locations/${city}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://nearshorenavigator.com/${language}/locations/${city}/${serviceId}`
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Nearshore Navigator - ${location.name}`,
    "description": `Strategic nearshoring advisory and ${service.title} services in ${location.name}, ${location.state}.`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={location.image}
            alt={`${service.title} Solutions in ${location.name}, ${location.state} - Nearshore Navigator Industrial Hub`}
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
                            <Link href={`/${language}/locations/${city}`} className="hover:text-white transition-colors">
                                {location.name}
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <span className="text-white font-medium" aria-current="page">{service.title}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium">{location.name} Industrial Hub</span>
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

            {/* How It Works (Dynamic Depth Expansion) */}
            {(location.serviceHowItWorks?.[serviceId] || location.howItWorksSection) && (() => {
              const section = location.serviceHowItWorks?.[serviceId] || location.howItWorksSection!;
              return (
              <section className="bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {section.title}
                </h3>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Industrial Parks</h4>
                    <ul className="space-y-2">
                      {section.parks.map((park, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <MapPin className="w-4 h-4 text-primary-500" />
                          {park}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Logistics Advantage</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-l-2 border-primary-500 pl-3 py-1">
                      {section.logistics}
                    </p>
                  </div>
                </div>
              </section>
              );
            })()}

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
                            href={`/${language}/locations/${loc.slug}/${serviceId}`}
                            className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group"
                        >
                            <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {loc.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Related Insights */}
            {location.relatedInsights && (
              <section>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  Insights & Research
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {location.relatedInsights.map((insight, idx) => (
                    <Link
                      key={idx}
                      href={`/${language}${insight.url}`}
                      className="block p-5 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-500 transition-colors group"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors mb-2">
                        {insight.title}
                      </h4>
                      <span className="text-sm text-primary-600 flex items-center gap-1 font-medium">
                        Read Analysis <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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
            <div className="sticky top-28">
              <LeadForm
                title={`Expand to ${location.name}`}
                subtitle={`Get a custom proposal for ${service.title.toLowerCase()} in ${location.name}.`}
                source={`service_location_${city}_${serviceId}`}
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
