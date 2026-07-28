import { MetadataRoute } from 'next'
import { LOCATIONS } from '@/app/constants/seo-data'
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix'
import { INDEXABLE_LOCALES, BASE_URL, TIER1_CITIES, hasRealContent } from '@/app/constants/seo-config'
import { getAllPosts } from '@/app/constants/blog-data'

/**
 * SITEMAP GENERATOR — 2026-07 Dynamic Overhaul
 *
 * Submits indexable locales (en, es, de, ja).
 * Deprecated locales are excluded from sitemap.
 */

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];
    const lastModified = new Date();

    const getAlternates = (path: string) => ({
        languages: Object.fromEntries([
            ...INDEXABLE_LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`]),
            ['x-default', `${BASE_URL}/en${path}`]
        ])
    });

    /**
     * 1. STATIC CORE PAGES & DYNAMIC BLOG POSTS
     */
    const posts = getAllPosts();
    const blogPaths = posts.map(post => `/insights/${post.slug}`);

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
        ...blogPaths,
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
            const serviceConfig = city.serviceHowItWorks?.[serviceSlug];
            // Exclude if it lacks substantial content or has a canonicalOverride redirect
            if (!serviceConfig || serviceConfig.canonicalOverride) {
                return;
            }
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
        if (hasRealContent(entry)) {
            matrixPaths.push({
                path: `/locations/${entry.citySlug}/industries/${entry.industrySlug}`,
                priority: 0.85,
            });
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
                priority: path === '' ? 1.0 : (path.startsWith('/services/') ? 0.9 : 0.7),
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
