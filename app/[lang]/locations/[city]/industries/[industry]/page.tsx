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

export async function generateStaticParams() {
  const langs = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];
  
  return INDUSTRY_MATRIX.flatMap(entry => 
    langs.map(lang => ({
      lang,
      city: entry.citySlug,
      industry: entry.industrySlug
    }))
  );
}

import { getDictionary } from "@/app/i18n/get-dictionary";

import { NOINDEX_LOCALES } from "@/app/constants/seo-config";

export async function generateMetadata({ params }: Props) {
  const { lang, city, industry } = await params;
  const location = getLocation(city);
  const vertical = INDUSTRY_VERTICALS.find(v => v.slug === industry);
  const dict = await getDictionary(lang);

  if (!location || !vertical || !dict) return {};

  const industryName = dict.industries?.[industry]?.name || "Manufacturing Industry";
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/locations/${city}/industries/${industry}`;

  return {
    title: `${industryName} in ${location.name}, Mexico | 2026 Industrial Guide`,
    description: `Expert guide to ${industryName} manufacturing in ${location.name}. Scale your production with ${location.name}'s specialized workforce and AS9100/FDA-compliant infrastructure.`,
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang) 
        ? `https://nearshorenavigator.com/en/locations/${city}/industries/${industry}` 
        : canonicalUrl,
      languages: {
        'en': `https://nearshorenavigator.com/en/locations/${city}/industries/${industry}`,
        'es': `https://nearshorenavigator.com/es/locations/${city}/industries/${industry}`,
        'fr': `https://nearshorenavigator.com/fr/locations/${city}/industries/${industry}`,
        'de': `https://nearshorenavigator.com/de/locations/${city}/industries/${industry}`,
        'ja': `https://nearshorenavigator.com/ja/locations/${city}/industries/${industry}`,
        'zh': `https://nearshorenavigator.com/zh/locations/${city}/industries/${industry}`,
        'ko': `https://nearshorenavigator.com/ko/locations/${city}/industries/${industry}`,
        'it': `https://nearshorenavigator.com/it/locations/${city}/industries/${industry}`,
        'pt': `https://nearshorenavigator.com/pt/locations/${city}/industries/${industry}`,
        'ru': `https://nearshorenavigator.com/ru/locations/${city}/industries/${industry}`,
        'x-default': `https://nearshorenavigator.com/en/locations/${city}/industries/${industry}`,
      }
    }
  };
}

export default async function IndustryVerticalPage({ params }: Props) {
  const { city, industry } = await params;
  const location = getLocation(city);
  const vertical = INDUSTRY_VERTICALS.find(v => v.slug === industry);
  const matrixEntry = INDUSTRY_MATRIX.find(m => m.citySlug === city && m.industrySlug === industry);

  if (!location || !vertical || !matrixEntry) {
    notFound();
  }

  return <IndustryVerticalClient city={city} industry={industry} />;
    }
