import { MetadataRoute } from 'next'
import { LOCATIONS, SERVICES } from '@/app/constants/seo-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nearshorenavigator.com'

    // Helper to generate alternates for a given path
    // path should be relative without language prefix, e.g., '/about'
    const getAlternates = (path: string) => ({
        languages: {
            'en': `${baseUrl}/en${path}`,
            'es': `${baseUrl}/es${path}`,
            'fr': `${baseUrl}/fr${path}`,
            'de': `${baseUrl}/de${path}`,
            'ja': `${baseUrl}/ja${path}`,
            'zh': `${baseUrl}/zh${path}`,
            'ko': `${baseUrl}/ko${path}`,
            'it': `${baseUrl}/it${path}`,
            'pt': `${baseUrl}/pt${path}`,
            'ru': `${baseUrl}/ru${path}`,
            'x-default': `${baseUrl}/en${path}`,
        }
    })

    const routes: MetadataRoute.Sitemap = [
        // Homepage
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: getAlternates(''),
        },
        // Main pages
        {
            url: `${baseUrl}/en/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: getAlternates('/about'),
        },
        {
            url: `${baseUrl}/en/about/denisse-martinez`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: getAlternates('/about/denisse-martinez'),
        },
        {
            url: `${baseUrl}/en/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: getAlternates('/contact'),
        },
        {
            url: `${baseUrl}/en/assessment`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/assessment'),
        },
        {
            url: `${baseUrl}/en/insights`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: getAlternates('/insights'),
        },
        {
            url: `${baseUrl}/en/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
            alternates: getAlternates('/privacy'),
        },
        {
            url: `${baseUrl}/en/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
            alternates: getAlternates('/terms'),
        },
        {
            url: `${baseUrl}/en/tools/industrial-park-map`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: getAlternates('/tools/industrial-park-map'),
        },
        {
            url: `${baseUrl}/en/tools/cost-calculator`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/tools/cost-calculator'),
        },
        {
            url: `${baseUrl}/en/resources/questionnaire`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
            alternates: getAlternates('/resources/questionnaire'),
        },
        {
            url: `${baseUrl}/en/resources`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: getAlternates('/resources'),
        },
        {
            url: `${baseUrl}/en/resources/brochure`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
            alternates: getAlternates('/resources/brochure'),
        },
        // Service pages
        {
            url: `${baseUrl}/en/services/industrial-real-estate-baja`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/services/industrial-real-estate-baja'),
        },

        {
            url: `${baseUrl}/en/services/contract-manufacturing-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/services/contract-manufacturing-tijuana'),
        },
        {
            url: `${baseUrl}/en/services/distribution-centers-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/services/distribution-centers-tijuana'),
        },
        {
            url: `${baseUrl}/en/services/call-center-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/services/call-center-tijuana'),
        },
        {
            url: `${baseUrl}/en/services/nearshore-marketing`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: getAlternates('/services/nearshore-marketing'),
        },
        // Blog posts (Note: Assuming these exist in both languages for now, or just indexing EN)
        {
            url: `${baseUrl}/en/insights/nearshoring-in-tijuana-guide-for-us-companies`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
            alternates: getAlternates('/insights/nearshoring-in-tijuana-guide-for-us-companies'),
        },
        {
            url: `${baseUrl}/en/insights/tijuana-vs-asia-manufacturing-cost-comparison`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
            alternates: getAlternates('/insights/tijuana-vs-asia-manufacturing-cost-comparison'),
        },

        {
            url: `${baseUrl}/en/insights/industrial-parks-in-tijuana-map-and-overview`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
            alternates: getAlternates('/insights/industrial-parks-in-tijuana-map-and-overview'),
        },
        {
            url: `${baseUrl}/en/insights/ultimate-guide-nearshore-shelter-services-baja-california`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: getAlternates('/insights/ultimate-guide-nearshore-shelter-services-baja-california'),
        },
        {
            url: `${baseUrl}/en/insights/2025-tariffs-baja-california-supply-chain`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: getAlternates('/insights/2025-tariffs-baja-california-supply-chain'),
        },
        {
            url: `${baseUrl}/en/insights/how-shelter-services-work-in-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: getAlternates('/insights/how-shelter-services-work-in-tijuana'),
        },
        {
            url: `${baseUrl}/en/insights/maquiladora-vs-shelter-services-mexico`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: getAlternates('/insights/maquiladora-vs-shelter-services-mexico'),
        },
        {
            url: `${baseUrl}/en/insights/mexico-2025-nearshoring-boom-usmca-review`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
            alternates: getAlternates('/insights/mexico-2025-nearshoring-boom-usmca-review'),
        },
        {
            url: `${baseUrl}/en/insights/how-to-start-manufacturing-in-mexico-2026`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.9,
            alternates: getAlternates('/insights/how-to-start-manufacturing-in-mexico-2026'),
        },
        // Sub-resources
        {
            url: `${baseUrl}/en/services/distribution-centers-tijuana/section-321-guide`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: getAlternates('/services/distribution-centers-tijuana/section-321-guide'),
        },
    ]

    // Programmatic Pages: Locations
    LOCATIONS.forEach(city => {
        // City Overview
        routes.push({
            url: `${baseUrl}/en/locations/${city.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: getAlternates(`/locations/${city.slug}`),
        })

        // Service Pages per Location
        // High-priority combos that are actively ranking in GSC (pos 5-17)
        const highPriorityPairs: Record<string, string[]> = {
            'puebla': ['contract-manufacturing'],
            'matamoros': ['contract-manufacturing'],
            'saltillo': ['distribution-centers'],
            'hermosillo': ['contract-manufacturing'],
        };
        SERVICES.forEach(service => {
            const isHighPriority = highPriorityPairs[city.slug]?.includes(service.slug);
            routes.push({
                url: `${baseUrl}/en/locations/${city.slug}/${service.slug}`,
                lastModified: new Date(),
                changeFrequency: isHighPriority ? 'weekly' : 'monthly',
                priority: isHighPriority ? 0.95 : 0.9,
                alternates: getAlternates(`/locations/${city.slug}/${service.slug}`),
            })
        })
    })

    return routes
}
