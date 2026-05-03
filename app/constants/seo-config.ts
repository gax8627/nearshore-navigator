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
