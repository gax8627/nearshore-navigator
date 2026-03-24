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
 * Genuine non-English demand locales (es, zh, ja, ko) remain fully indexed.
 */
export const NOINDEX_LOCALES = new Set(['fr', 'de', 'it', 'pt', 'ru']);

/** All supported locales for this site. */
export const LOCALES = ['en', 'es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'] as const;
export type Locale = typeof LOCALES[number];

/** Base URL for canonical and hreflang generation. */
export const BASE_URL = 'https://nearshorenavigator.com';

