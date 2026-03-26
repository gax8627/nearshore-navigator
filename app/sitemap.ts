import { MetadataRoute } from 'next'
import { LOCATIONS } from '@/app/constants/seo-data'
import { INDUSTRY_MATRIX } from '@/app/constants/city-industry-matrix'
import { LOCALES, BASE_URL } from '@/app/constants/seo-config'

/**
 * MEGA-SITEMAP GENERATOR
 * 
 * Goal: Restore all 250 industry pages and all 10 language variants as first-class citizens.
 * Total unique URLs: ~3,600.
 * 
 * Instead of listing English as the primary <loc> and others as alternates, we now list 
 * every language variant as its own <loc> entry. This forces Google to see and count 
 * every URL in its "Submitted" index in Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];
    
    // Stable date to avoid unnecessary Googlebot recrawl cycles
    const lastModified = new Date('2026-03-26');

    // Helper to generate hreflang alternates for any path
    const getAlternates = (path: string) => ({
        languages: Object.fromEntries([
            ...LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`]),
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

        if (city.slug === 'tijuana') {
            cityPaths.push({ 
                path: `/locations/tijuana/master-guide`, 
                priority: 1.0, 
                freq: 'daily' 
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
     * 3. INDUSTRY MATRIX (THE 250 PAGES)
     */
    const matrixPaths: string[] = INDUSTRY_MATRIX.map(entry => 
        `/locations/${entry.citySlug}/industries/${entry.industrySlug}`
    );

    /**
     * MEGA GENERATOR
     * Build the entries by iterating every locale as a primary <loc>
     */
    
    LOCALES.forEach(lang => {
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
