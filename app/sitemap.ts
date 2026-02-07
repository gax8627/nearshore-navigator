import { MetadataRoute } from 'next'
import { LOCATIONS, SERVICES } from '@/app/constants/seo-data'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nearshorenavigator.com'

    const routes: MetadataRoute.Sitemap = [
        // Homepage
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Main pages
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/assessment`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/insights`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/resources/tijuana-industrial-park-map`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/resources/questionnaire`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        // Service pages
        {
            url: `${baseUrl}/services/industrial-real-estate-baja`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },

        {
            url: `${baseUrl}/services/contract-manufacturing-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/distribution-centers-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/call-center-tijuana`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        // Blog posts
        {
            url: `${baseUrl}/insights/nearshoring-in-tijuana-guide-for-us-companies`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/insights/tijuana-vs-asia-manufacturing-cost-comparison`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },

        {
            url: `${baseUrl}/insights/industrial-parks-in-tijuana-map-and-overview`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
    ]

    // Programmatic Pages: Locations
    LOCATIONS.forEach(city => {
        // City Overview
        routes.push({
            url: `${baseUrl}/locations/${city.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        })

        // Service Pages per Location
        SERVICES.forEach(service => {
            routes.push({
                url: `${baseUrl}/locations/${city.slug}/${service.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.9,
            })
        })
    })

    return routes
}
