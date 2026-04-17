/**
 * Shared SEO configuration constants.
 * Single source of truth — import from here, never redefine locally.
 *
 * --- 2026-04 cleanup --------------------------------------------------
 * We previously shipped 10 locales with the 8 non-English/Spanish ones
 * marked `noindex` + canonicalized to /en/. That strategy created
 * contradictory signals (Google ignores canonical on noindex pages) and
 * produced ~960 "Duplicate, Google chose different canonical than user"
 * errors in Search Console at scale.
 *
 * New strategy (aligned with Google's own guidance):
 *   1. Only build /en/ and /es/ pages.
 *   2. Requests to old locale prefixes (fr, de, ja, zh, ko, it, pt, ru)
 *      are 301-redirected to the /en/ equivalent by middleware.ts.
 *   3. Hreflang only advertises en, es, x-default.
 *   4. Canonical always points to self (never a cross-locale override).
 *
 * NOINDEX_LOCALES is kept (empty) so existing generateMetadata files
 * that still import it don't break — the predicate simply returns false.
 */

export const NOINDEX_LOCALES = new Set<string>();

/** Indexable + buildable locales for this site. */
export const LOCALES = ['en', 'es'] as const;
export type Locale = typeof LOCALES[number];

/**
 * Locales we used to serve but now 301-redirect to /en/.
 * Exported so robots/sitemap/debug scripts can reason about them.
 */
export const DEPRECATED_LOCALES = ['fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'] as const;

/** Base URL for canonical and hreflang generation. */
export const BASE_URL = 'https://nearshorenavigator.com';
