import { notFound } from "next/navigation";
import { getLocation, getService } from "@/app/constants/seo-data";
import ServiceLocationClient from "./ServiceLocationClient";
import { getLocalizedSeoContent } from "@/app/i18n/get-seo-content";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
    service: string;
  }>;
};

// Locales whose machine-translated content cannibalizes /en/ rankings.
// Genuine non-English demand locales (zh, ko, ja, es) remain fully indexed.
const NOINDEX_LOCALES = new Set(['fr', 'de', 'it', 'pt', 'ru']);

export async function generateMetadata({ params }: Props) {
  const { lang, city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);
  
  if (!location || !service) return {};

  const localized = await getLocalizedSeoContent(lang, city, serviceParam);

  // Check for city+service-specific SEO overrides
  const serviceHowItWorks = location.serviceHowItWorks?.[serviceParam];
  const seoTitleOverride = lang === 'en' ? serviceHowItWorks?.seoTitle : undefined;
  const seoDescOverride = lang === 'en' ? serviceHowItWorks?.seoDescription : undefined;
  // If a dedicated /services/ page exists for this city+service, canonicalize to it
  // to avoid splitting authority between two competing pages (e.g. Tijuana contract-manufacturing).
  const canonicalOverride = lang === 'en' ? serviceHowItWorks?.canonicalOverride : undefined;

  const title = seoTitleOverride
    ?? (localized
      ? `Trusted ${localized.service.title} in ${localized.location.name} | 2026 Guide`
      : `Trusted ${service.title} in ${location.name} | 2026 Guide`);

  const description = seoDescOverride
    ?? localized?.service.description
    ?? `Verified ${service.title.toLowerCase()} partners in ${location.name}. Reduce costs 40-60% with our objective broker network. Get your 2026 expansion roadmap.`;

  const canonicalUrl = canonicalOverride
    ?? `https://nearshorenavigator.com/${lang}/locations/${city}/${serviceParam}`;

  // Pages that canonicalize to a different URL should also be noindexed so Google
  // doesn't index a duplicate. Pages in cannibalizing locales are always noindexed.
  const shouldNoindex = NOINDEX_LOCALES.has(lang) || (lang === 'en' && !!canonicalOverride);

  return {
    title,
    description,
    robots: shouldNoindex ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://nearshorenavigator.com/en/locations/${city}/${serviceParam}`,
        'es': `https://nearshorenavigator.com/es/locations/${city}/${serviceParam}`,
        'fr': `https://nearshorenavigator.com/fr/locations/${city}/${serviceParam}`,
        'de': `https://nearshorenavigator.com/de/locations/${city}/${serviceParam}`,
        'ja': `https://nearshorenavigator.com/ja/locations/${city}/${serviceParam}`,
        'zh': `https://nearshorenavigator.com/zh/locations/${city}/${serviceParam}`,
        'ko': `https://nearshorenavigator.com/ko/locations/${city}/${serviceParam}`,
        'it': `https://nearshorenavigator.com/it/locations/${city}/${serviceParam}`,
        'pt': `https://nearshorenavigator.com/pt/locations/${city}/${serviceParam}`,
        'ru': `https://nearshorenavigator.com/ru/locations/${city}/${serviceParam}`,
        'x-default': `https://nearshorenavigator.com/en/locations/${city}/${serviceParam}`,
      }
    }
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { lang, city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);

  if (!location || !service) {
    notFound();
  }

  const localizedData = await getLocalizedSeoContent(lang, city, serviceParam);

  // FAQ schema is handled exclusively by ServiceLocationClient (dynamic, city+service-specific).
  // Removed duplicate generic FAQPage here to fix "Duplicate field FAQPage" GSC rich-result error.
  return (
    <ServiceLocationClient city={city} serviceId={serviceParam} localizedData={localizedData} />
  );
}
