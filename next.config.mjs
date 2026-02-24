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
    }
};

export default nextConfig;
