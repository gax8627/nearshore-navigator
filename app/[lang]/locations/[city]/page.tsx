import { notFound } from "next/navigation";
import { getLocation } from "@/app/constants/seo-data";
import CityOverviewClient from "./CityOverviewClient";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang, city } = await params;
  const location = getLocation(city);
  
  if (!location) return {};

  // Non-English city overview pages render identical server-side content to /en/.
  // Cross-canonical to /en/ aligns our declaration with Google's chosen canonical,
  // resolving the GSC "Duplicate, Google chose different canonical" warning.
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/locations/${city}`;

  return {
    title: `Nearshoring to ${location.name}, ${location.state} | 2026 Manufacturing Guide`,
    description: location.description || `Complete guide to industrial manufacturing in ${location.name}. Access ${location.name}'s skilled workforce, industrial parks, and proximity to major US markets.`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://nearshorenavigator.com/en/locations/${city}`,
        'es': `https://nearshorenavigator.com/es/locations/${city}`,
        'fr': `https://nearshorenavigator.com/fr/locations/${city}`,
        'de': `https://nearshorenavigator.com/de/locations/${city}`,
        'ja': `https://nearshorenavigator.com/ja/locations/${city}`,
        'zh': `https://nearshorenavigator.com/zh/locations/${city}`,
        'ko': `https://nearshorenavigator.com/ko/locations/${city}`,
        'it': `https://nearshorenavigator.com/it/locations/${city}`,
        'pt': `https://nearshorenavigator.com/pt/locations/${city}`,
        'ru': `https://nearshorenavigator.com/ru/locations/${city}`,
        'x-default': `https://nearshorenavigator.com/en/locations/${city}`,
      }
    }
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) {
    notFound();
  }

  return <CityOverviewClient city={city} />;
}
