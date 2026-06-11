import { IndustryMatrixEntry } from './city-industry-matrix';

/**
 * Shared SEO configuration constants.
 * Single source of truth — import from here, never redefine locally.
 *
 * --- 2026-05 Phase 1 multilingual rollout --------------------------------
 * German (de) and Japanese (ja) are re-activated as fully indexable locales.
 * These two markets have confirmed demand (de/ja pages still rank in GSC
 * even after 301-redirects) and represent the largest foreign manufacturing
 * investors in Mexico (German automotive, Japanese electronics/auto).
 *
 * Strategy:
 *   1. en, es, de, ja — indexable, pre-rendered, in sitemap, proper hreflang.
 *   2. fr, zh, ko, it, pt, ru — still 301-redirected to /en/ until Phase 2/3.
 *   3. Each de/ja page has localized title + excerpt + tags (blog-data.ts).
 *   4. Canonical always points to self (never cross-locale override).
 *   5. Hreflang now advertises en, es, de, ja, x-default on all indexable pages.
 *
 * Phase 2 (next): zh, ko
 * Phase 3 (after): fr, pt, it, ru (demand-driven only)
 *
 * NOINDEX_LOCALES is kept (empty) so existing generateMetadata files
 * that still import it don't break.
 */

export const NOINDEX_LOCALES = new Set<string>();

/** All locales the site supports (middleware uses this for routing). */
export const LOCALES = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'] as const;
export type Locale = typeof LOCALES[number];

/**
 * Indexable locales — pre-rendered, submitted in sitemap, hreflang-advertised.
 * Phase 1: en, es, de, ja
 * Use this in generateStaticParams() and sitemap.ts.
 */
export const INDEXABLE_LOCALES: readonly string[] = ['en', 'es', 'de', 'ja'] as const;

/**
 * Locales still being redirected to /en/ (Phase 2/3 candidates).
 */
export const DEPRECATED_LOCALES = ['fr', 'zh', 'ko', 'it', 'pt', 'ru'] as const;

/** Base URL for canonical and hreflang generation. */
export const BASE_URL = 'https://nearshorenavigator.com';

/**
 * Helper to generate hreflang alternates for any page path.
 * Ensures all indexable locales (en, es, de, ja) are symmetrically advertised.
 * 
 * @param path The path of the page, starting with a slash (e.g. '/about')
 */
export function getAlternateLanguages(path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return Object.fromEntries([
    ...INDEXABLE_LOCALES.map(lang => [lang, `${BASE_URL}/${lang}${cleanPath}`]),
    ['x-default', `${BASE_URL}/en${cleanPath}`]
  ]);
}

export const TIER1_CITIES = new Set([
  'tijuana', 'mexicali', 'juarez', 'reynosa', 'nuevo-laredo',
  'nogales', 'matamoros', 'monterrey', 'guadalajara', 'queretaro',
  'san-luis-potosi', 'saltillo', 'hermosillo', 'silao', 'puebla',
  'chihuahua-city',
]);

/**
 * Content quality gate: checks if a matrix entry has real data
 * (not the generic placeholder pattern).
 */
export function hasRealContent(entry: IndustryMatrixEntry): boolean {
  const isPlaceholder = (
    entry.topLocalEmployers.some(e => e.startsWith('Global ')) ||
    entry.featuredParks.some(p => p.includes(' Industrial Zone'))
  );
  return !isPlaceholder && TIER1_CITIES.has(entry.citySlug);
}
