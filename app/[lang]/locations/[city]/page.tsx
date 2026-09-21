import { notFound } from "next/navigation";
import { getLocation } from "@/app/constants/seo-data";
import CityOverviewClient from "./CityOverviewClient";
import { TIER1_CITIES, INDEXABLE_LOCALES, getAlternateLanguages } from "@/app/constants/seo-config";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
  }>;
};

import { getDictionary } from "@/app/i18n/get-dictionary";

export async function generateStaticParams() {
  const cities = Array.from(TIER1_CITIES);

  const params: { lang: string; city: string }[] = [];
  for (const lang of INDEXABLE_LOCALES) {
    for (const city of cities) {
      params.push({ lang, city });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { lang, city } = await params;
  const location = getLocation(city);
  const dict = await getDictionary(lang);

  if (!location || !dict || !TIER1_CITIES.has(city)) return {};

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
      languages: getAlternateLanguages(`/locations/${city}`)
    }
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const location = getLocation(city);

  if (!location || !TIER1_CITIES.has(city)) {
    notFound();
  }

  return <CityOverviewClient city={city} />;
}
