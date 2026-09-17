import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/admin/'],
            },
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'PerplexityBot',
                    'ClaudeBot',
                    'Google-Extended',
                    'Applebot-Extended',
                    'cohere-ai',
                ],
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: 'https://nearshorenavigator.com/sitemap.xml',
    }
}
