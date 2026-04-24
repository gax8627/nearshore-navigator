import { notFound } from "next/navigation";
import { getLocation } from "@/app/constants/seo-data";
import CityOverviewClient from "./CityOverviewClient";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
  }>;
};

import { getDictionary } from "@/app/i18n/get-dictionary";

export async function generateMetadata({ params }: Props) {
  const { lang, city } = await params;
  const location = getLocation(city);
  const dict = await getDictionary(lang);

  if (!location || !dict) return {};

  const cityName = dict.locations?.[city]?.name || location.name;
  const cityDesc = dict.locations?.[city]?.description || location.description;

  const canonicalUrl = `https://nearshorenavigator.com/${lang}/locations/${city}`;

  const hasSubstantialContent = location.howItWorksSection || (location.serviceHowItWorks && Object.keys(location.serviceHowItWorks).length > 0);

  return {
    title: `${cityName}, ${location.state} | 2026 Industrial Data & Labor Rates`,
    description: cityDesc || `Complete guide to industrial manufacturing in ${cityName}. Access ${cityName}'s skilled workforce, industrial parks, and proximity to major US markets.`,
    robots: hasSubstantialContent ? undefined : { index: false, follow: true },
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
