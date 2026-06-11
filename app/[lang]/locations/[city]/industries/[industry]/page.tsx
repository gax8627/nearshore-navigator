import { getAlternateLanguages, TIER1_CITIES, hasRealContent } from '@/app/constants/seo-config';
import { notFound } from "next/navigation";
import { getLocation } from "@/app/constants/seo-data";
import { INDUSTRY_VERTICALS } from "@/app/constants/industry-taxonomy";
import { INDUSTRY_MATRIX } from "@/app/constants/city-industry-matrix";
import IndustryVerticalClient from "./IndustryVerticalClient";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
    industry: string;
  }>;
};

import { getDictionary } from "@/app/i18n/get-dictionary";
import { INDEXABLE_LOCALES } from "@/app/constants/seo-config";



export async function generateStaticParams() {
  const tier1Entries = INDUSTRY_MATRIX.filter(entry => 
    hasRealContent(entry)
  );

  return tier1Entries.flatMap(entry => 
    INDEXABLE_LOCALES.map(lang => ({
      lang,
      city: entry.citySlug,
      industry: entry.industrySlug
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { lang, city, industry } = await params;
  const location = getLocation(city);
  const vertical = INDUSTRY_VERTICALS.find(v => v.slug === industry);
  const dict = await getDictionary(lang);

  if (!location || !vertical || !dict) return {};

  const matrixEntry = INDUSTRY_MATRIX.find(m => m.citySlug === city && m.industrySlug === industry);
  const isIndexable = matrixEntry ? hasRealContent(matrixEntry) : false;

  const industryName = dict.industries?.[industry]?.name || "Manufacturing Industry";
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/locations/${city}/industries/${industry}`;

  return {
    title: `${industryName} in ${location.name}, Mexico | 2026 Industrial Guide`,
    description: `Expert guide to ${industryName} manufacturing in ${location.name}. Scale your production with ${location.name}'s specialized workforce and AS9100/FDA-compliant infrastructure.`,
    // Only index pages with verified, real content. Placeholder pages remain noindex.
    robots: { index: isIndexable, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/locations/${city}/industries/${industry}`)
    }
  };
}

export default async function IndustryVerticalPage({ params }: Props) {
  const { city, industry } = await params;
  const location = getLocation(city);
  const vertical = INDUSTRY_VERTICALS.find(v => v.slug === industry);
  const matrixEntry = INDUSTRY_MATRIX.find(m => m.citySlug === city && m.industrySlug === industry);

  if (!location || !vertical || !matrixEntry || !hasRealContent(matrixEntry)) {
    notFound();
  }

  return <IndustryVerticalClient city={city} industry={industry} />;
}
