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

/**
 * Tier 1 cities with rich, verified content in seo-data.ts.
 * Only these cities produce indexable industry vertical pages.
 * All other matrix entries are placeholder data and remain noindex.
 */
const TIER1_CITIES = new Set([
  'tijuana', 'mexicali', 'juarez', 'reynosa', 'nuevo-laredo',
  'nogales', 'matamoros', 'monterrey', 'guadalajara', 'queretaro',
  'san-luis-potosi', 'saltillo', 'hermosillo', 'silao', 'puebla',
  'chihuahua-city',
]);

/**
 * Content quality gate: checks if a matrix entry has real data
 * (not the generic placeholder pattern).
 */
function hasRealContent(entry: typeof INDUSTRY_MATRIX[number]): boolean {
  const isPlaceholder = (
    entry.topLocalEmployers.some(e => e.startsWith('Global ')) ||
    entry.featuredParks.some(p => p.includes(' Industrial Zone'))
  );
  return !isPlaceholder && TIER1_CITIES.has(entry.citySlug);
}

/**
 * Only generate static pages for:
 *   - Indexable locales (en + es)
 *   - Tier 1 cities with real content
 *
 * This reduces page count from 2,510 → ~100-150 pages.
 * Other city/industry combos are still accessible via dynamic rendering
 * but are NOT pre-built at compile time.
 */
export async function generateStaticParams() {
  const tier1Entries = INDUSTRY_MATRIX.filter(entry => 
    TIER1_CITIES.has(entry.citySlug)
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
      languages: {
        'en': `https://nearshorenavigator.com/en/locations/${city}/industries/${industry}`,
        'es': `https://nearshorenavigator.com/es/locations/${city}/industries/${industry}`,
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
