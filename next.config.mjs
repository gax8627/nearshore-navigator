/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/:lang/locations/:city/soft-landing-services',
                destination: '/:lang/locations/:city/shelter-services',
                permanent: true,
            },
            {
                source: '/locations/:city/soft-landing-services',
                destination: '/en/locations/:city/shelter-services',
                permanent: true,
            },
            // Legacy / Misspelled URLs from GSC
            {
                source: '/contact-accuracy-questionnaire',
                destination: '/en/resources/questionnaire',
                permanent: true,
            },
            {
                source: '/location/entry-node/third-pary-logistics-services',
                destination: '/en/services/distribution-centers-tijuana',
                permanent: true,
            },
            {
                source: '/location/questionnaire/product-service-needs',
                destination: '/en/resources/questionnaire',
                permanent: true,
            },
            {
                source: '/location/marketing-assets',
                destination: '/en/resources',
                permanent: true,
            },
            {
                source: '/company/name',
                destination: '/en',
                permanent: true,
            },
            // Direct mapping for singular location to plural locations if needed
            {
                source: '/location/:slug',
                destination: '/en/locations/:slug',
                permanent: true,
            }
        ]
    },
    // Prevent Next.js from aggressively bundling the massive CSV directories into serverless functions
    experimental: {
        outputFileTracingExcludes: {
            '*': [
                'scripts/**/*',
                'segmented_leads/**/*',
                '**/*.csv',
                '.git/**/*',
            ],
        },
    },
};

export default nextConfig;
