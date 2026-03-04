export default function SchemaMarkup() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com",
        "logo": "https://nearshorenavigator.com/logo.png",
        "description": "Your partner for industrial nearshoring, shelter services, and contract manufacturing in Tijuana, Mexico.",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+52-664-123-7199",
            "contactType": "sales",
            "availableLanguage": ["English", "Spanish"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/nearshore-navigator",
            "https://twitter.com/nearshorenavigator"
        ],
        "address": [
            {
                "@type": "PostalAddress",
                "addressLocality": "San Diego",
                "addressRegion": "CA",
                "addressCountry": "US"
            },
            {
                "@type": "PostalAddress",
                "addressLocality": "Tijuana",
                "addressRegion": "BC",
                "addressCountry": "MX"
            }
        ]
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Nearshore Navigator Mexico Operations",
        "image": "https://nearshorenavigator.com/logo.png",
        "@id": "https://nearshorenavigator.com/#mexico-office",
        "url": "https://nearshorenavigator.com",
        "telephone": "+52-664-123-7199",
        "email": "denisse@nearshorenavigator.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Blvd. Agua Caliente 10611",
            "addressLocality": "Tijuana",
            "addressRegion": "BC",
            "postalCode": "22014",
            "addressCountry": "MX"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.5149,
            "longitude": -117.0382
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
        },
        "priceRange": "$$$$"
    };

    const mexicaliBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Nearshore Navigator Mexicali Operations",
        "image": "https://nearshorenavigator.com/logo.png",
        "@id": "https://nearshorenavigator.com/#mexicali-office",
        "url": "https://nearshorenavigator.com",
        "telephone": "+52-664-123-7199",
        "email": "denisse@nearshorenavigator.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mexicali",
            "addressRegion": "BC",
            "addressCountry": "MX"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.6245,
            "longitude": -115.4523
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
        },
        "priceRange": "$$$$"
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Industrial Nearshoring Consulting",
        "provider": {
            "@type": "Organization",
            "name": "Nearshore Navigator"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Nearshoring Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Industrial Real Estate",
                        "description": "Class A industrial buildings, warehouses, and land in Tijuana's prime industrial parks."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Shelter Services",
                        "description": "Launch manufacturing operations in 90 days with full HR, legal, and compliance support."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Contract Manufacturing",
                        "description": "Partner with certified maquiladoras for electronics, medical devices, and aerospace."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Distribution & Logistics",
                        "description": "3PL and cross-docking solutions near Otay Mesa and San Ysidro ports of entry."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Call Center Solutions",
                        "description": "BPO services with 50,000+ bilingual agents. 40-60% cost savings."
                    }
                }
            ]
        }
    };


    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Denisse Martinez",
        "jobTitle": "Marketing Director & Advisor",
        "worksFor": {
            "@type": "Organization",
            "name": "Nearshore Navigator"
        },
        "url": "https://nearshorenavigator.com",
        /* Assuming image path or linking to a generic professional profile */
        "image": "https://nearshorenavigator.com/images/founder.jpg",
        "sameAs": [
            "https://www.linkedin.com/in/denisse-martinez"
        ],
        "description": "Expert in nearshoring, site selection, and shelter services for manufacturing companies expanding to Baja California."
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(mexicaliBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
        </>
    );
}

export { SchemaMarkup };
