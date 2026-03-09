import { notFound } from "next/navigation";
import { getLocation, getService } from "@/app/constants/seo-data";
import ServiceLocationClient from "./ServiceLocationClient";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
    service: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang, city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);
  
  if (!location || !service) return {};

  const titles = [
    `${service.title} in ${location.name}, ${location.state} | 2026 Guide`,
    `Top ${service.title} Partners in ${location.name} | Nearshore Navigator`,
    `${location.name} ${service.title} | Expert Nearshore Matchmaking`
  ];

  // Non-English pages serve identical server-rendered content to the EN version
  // (translations load client-side only). Use cross-canonical to EN so Google's
  // chosen canonical matches our declaration — this resolves the GSC "Duplicate,
  // Google chose different canonical" warning for ~650 non-en pages.
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/locations/${city}/${serviceParam}`;

  return {
    title: titles[0],
    description: `Expert ${service.title.toLowerCase()} services in ${location.name}, ${location.state}. ${location.description}. We provide full support for ${service.title.toLowerCase()} including site selection and local compliance.`,
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
  const { city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);

  if (!location || !service) {
    notFound();
  }

  return <ServiceLocationClient city={city} serviceId={serviceParam} />;
}
