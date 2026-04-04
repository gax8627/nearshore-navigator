/**
 * Shared SEO configuration constants.
 * Single source of truth — import from here, never redefine locally.
 */

/**
 * Locales whose machine-translated content is too similar to /en/ and
 * cannibalizes English rankings in Google.
 *
 * We set robots: { index: false, follow: true } on these locales to
 * consolidate PageRank authority to /en/ while keeping hreflang signals intact.
 *
 * Only /en/ and /es/ are indexable — they serve the two primary audiences:
 * English-speaking US/Canada companies and Spanish-speaking Mexican companies.
 * ja, zh, ko cause canonical confusion (Google was picking /ko/ as canonical
 * over /en/ for some pages) because they compete as equally-weighted duplicates.
 */
export const NOINDEX_LOCALES = new Set<string>(['fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'ko']);

/** All supported locales for this site. */
export const LOCALES = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'] as const;
export type Locale = typeof LOCALES[number];

/** Base URL for canonical and hreflang generation. */
export const BASE_URL = 'https://nearshorenavigator.com';
