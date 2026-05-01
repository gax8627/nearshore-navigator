import { MetadataRoute } from 'next'
import { LOCATIONS } from '@/app/constants/seo-data'
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix'
import { INDEXABLE_LOCALES, BASE_URL } from '@/app/constants/seo-config'

/**
 * SITEMAP GENERATOR — 2026-04-27 Overhaul
 *
 * Only submits en + es locales (the only indexable ones).
 * The 8 deprecated locales (fr/de/ja/zh/ko/it/pt/ru) are 301-redirected
 * by middleware.ts and must NOT appear in the sitemap.
 *
 * Industry matrix pages are now conditionally included: only Tier 1
 * cities with real, verified content are submitted. Placeholder entries
 * are excluded to prevent "Discovered - currently not indexed" buildup.
 */

/** Tier 1 cities with verified deep content in seo-data.ts */
const TIER1_CITIES = new Set([
  'tijuana', 'mexicali', 'juarez', 'reynosa', 'nuevo-laredo',
  'nogales', 'matamoros', 'monterrey', 'guadalajara', 'queretaro',
  'san-luis-potosi', 'saltillo', 'hermosillo', 'silao', 'puebla',
  'chihuahua-city',
]);

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // Bump lastModified on each deploy of SEO-affecting changes so Google
    // re-crawls and re-evaluates canonical/hreflang after the cleanup.
    const lastModified = new Date('2026-04-28');

    // Helper to generate hreflang alternates for any path.
    // ONLY indexable locales go in here — advertising deprecated locales
    // tells Google to crawl them, and they all now 301 to /en anyway.
    const getAlternates = (path: string) => ({
        languages: Object.fromEntries([
            ...INDEXABLE_LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`]),
            ['x-default', `${BASE_URL}/en${path}`]
        ])
    });

    /**
     * 1. STATIC CORE PAGES
     */
    const staticPaths = [
        '',
        '/about',
        '/about/denisse-martinez',
        '/contact',
        '/assessment',
        '/insights',
        '/privacy',
        '/terms',
        '/tools/industrial-park-map',
        '/tools/cost-calculator',
        '/resources',
        '/resources/questionnaire',
        '/resources/brochure',
        '/services/industrial-real-estate-baja',
        '/services/contract-manufacturing-tijuana',
        '/services/distribution-centers-tijuana',
        '/services/call-center-tijuana',
        '/services/nearshore-marketing',
        '/services/distribution-centers-tijuana/section-321-guide',
        // Blog/Insight Pillars
        '/insights/nearshoring-in-tijuana-guide-for-us-companies',
        '/insights/tijuana-vs-asia-manufacturing-cost-comparison',
        '/insights/industrial-parks-in-tijuana-map-and-overview',
        '/insights/ultimate-guide-nearshore-shelter-services-baja-california',
        '/insights/2025-tariffs-baja-california-supply-chain',
        '/insights/how-shelter-services-work-in-tijuana',
        '/insights/maquiladora-vs-shelter-services-mexico',
        '/insights/mexico-2025-nearshoring-boom-usmca-review',
        '/insights/how-to-start-manufacturing-in-mexico-2026',
    ];

    /**
     * 2. PROGRAMMATIC LOCATION PAGES
     */
    const cityPaths: { path: string, priority: number, freq: 'daily' | 'weekly' | 'monthly' }[] = [];
    LOCATIONS.forEach(city => {
        // Only submit cities that have substantial unique content to prevent thin content indexing errors
        const hasSubstantialContent = city.howItWorksSection || (city.serviceHowItWorks && Object.keys(city.serviceHowItWorks).length > 0);
        
        if (hasSubstantialContent) {
            cityPaths.push({ 
                path: `/locations/${city.slug}`, 
                priority: 0.9, 
                freq: 'weekly' 
            });
        }

        const cityServices = city.serviceHowItWorks ? Object.keys(city.serviceHowItWorks) : [];
        cityServices.forEach(serviceSlug => {
            const isPremium = ['tijuana', 'mexicali', 'hermosillo', 'monterrey'].includes(city.slug);
            cityPaths.push({
                path: `/locations/${city.slug}/${serviceSlug}`,
                priority: isPremium ? 0.95 : 0.8,
                freq: isPremium ? 'weekly' : 'monthly'
            });
        });
    });

    /**
     * 3. INDUSTRY MATRIX — Tier 1 cities only
     * Only submit industry vertical pages for cities with verified,
     * non-placeholder content. This prevents GSC "Discovered - currently
     * not indexed" accumulation from thin doorway pages.
     */
    const matrixPaths: { path: string, priority: number }[] = [];
    INDUSTRY_MATRIX.forEach(entry => {
        if (TIER1_CITIES.has(entry.citySlug)) {
            // Check for non-placeholder data (real company names, real parks)
            const isPlaceholder = (
                entry.topLocalEmployers.some(e => e.startsWith('Global ')) ||
                entry.featuredParks.some(p => p.includes(' Industrial Zone'))
            );
            if (!isPlaceholder) {
                matrixPaths.push({
                    path: `/locations/${entry.citySlug}/industries/${entry.industrySlug}`,
                    priority: 0.85,
                });
            }
        }
    });

    /**
     * GENERATOR — only en + es as primary <loc> entries
     * Hreflang alternates cover en + es + x-default only.
     */
    INDEXABLE_LOCALES.forEach(lang => {
        // Build Static
        staticPaths.forEach(path => {
            routes.push({
                url: `${BASE_URL}/${lang}${path}`,
                lastModified,
                changeFrequency: path === '' ? 'daily' : 'weekly',
                priority: path === '' ? 1.0 : 0.7,
                alternates: getAlternates(path)
            });
        });
        
        // Build Cities
        cityPaths.forEach(item => {
            routes.push({
                url: `${BASE_URL}/${lang}${item.path}`,
                lastModified,
                changeFrequency: item.freq as any,
                priority: item.priority,
                alternates: getAlternates(item.path)
            });
        });

        // Build Industry Matrix (Tier 1 only)
        matrixPaths.forEach(item => {
            routes.push({
                url: `${BASE_URL}/${lang}${item.path}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: item.priority,
                alternates: getAlternates(item.path)
            });
        });
    });

    return routes;
}
