import { MetadataRoute } from 'next'
import { LOCATIONS } from '@/app/constants/seo-data'
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix'
import { LOCALES, BASE_URL, NOINDEX_LOCALES } from '@/app/constants/seo-config'

/**
 * SITEMAP GENERATOR
 *
 * Only submits indexable locales (en + es) as primary <loc> entries.
 * The 8 deprecated locales (fr, de, it, pt, ru, ja, zh, ko) are now
 * 301-redirected to /en by middleware.ts, so we never advertise them
 * in the sitemap or hreflang — which previously created contradictory
 * signals and produced ~960 "Duplicate, Google chose different canonical"
 * errors in Search Console.
 *
 * Hreflang now advertises only en + es + x-default, matching what we
 * actually serve 200-OK responses for.
 */

// Only submit pages Google is allowed to index
const INDEXABLE_LOCALES = LOCALES.filter(l => !NOINDEX_LOCALES.has(l)); // ['en', 'es']
export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // Bump lastModified on each deploy of SEO-affecting changes so Google
    // re-crawls and re-evaluates canonical/hreflang after the cleanup.
    const lastModified = new Date('2026-04-16');

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
        cityPaths.push({ 
            path: `/locations/${city.slug}`, 
            priority: 0.9, 
            freq: 'weekly' 
        });

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
     * 3. INDUSTRY MATRIX (THE 250 PAGES)
     */
    const matrixPaths: string[] = INDUSTRY_MATRIX.map(entry => 
        `/locations/${entry.citySlug}/industries/${entry.industrySlug}`
    );

    /**
     * GENERATOR — only en + es as primary <loc> entries
     * Hreflang alternates still cover all 10 locales for language targeting.
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

        // Build Industry Matrix
        matrixPaths.forEach(path => {
            routes.push({
                url: `${BASE_URL}/${lang}${path}`,
                lastModified,
                changeFrequency: 'weekly',
                priority: 0.85,
                alternates: getAlternates(path)
            });
        });
    });

    return routes;
}
