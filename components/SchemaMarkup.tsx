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
            "telephone": "+1-619-555-0123",
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
        "name": "Nearshore Navigator - Tijuana Office",
        "@id": "https://nearshorenavigator.com/#tijuana-office",
        "url": "https://nearshorenavigator.com",
        "telephone": "+52-664-123-7199",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tijuana",
            "addressRegion": "Baja California",
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

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Industrial Nearshoring Consulting",
        "provider": {
            "@type": "Organization",
            "name": "Nearshore Navigator"
        },
        "areaServed": {
            "@type": "Place",
            "name": "Tijuana, Baja California, Mexico"
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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is nearshoring in Tijuana?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nearshoring in Tijuana refers to relocating manufacturing or business operations from distant countries (like Asia) to Mexico, specifically Tijuana, which is just 20 minutes from San Diego, California. This provides cost savings of 40-60% compared to US operations while maintaining proximity and time zone alignment."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to start manufacturing in Tijuana?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With a shelter service, you can begin manufacturing operations in as little as 90 days. The shelter company handles all legal entity requirements, HR, payroll, import/export compliance, and permits while you focus on production."
                }
            },
            {
                "@type": "Question",
                "name": "What industries are best suited for manufacturing in Tijuana?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tijuana excels in medical devices (Class I, II, and III), aerospace components, electronics assembly, automotive sub-assemblies, and consumer products. The region has over 70 million square feet of industrial inventory and a workforce trained in precision manufacturing."
                }
            },
            {
                "@type": "Question",
                "name": "How much can I save by manufacturing in Tijuana vs the US?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Companies typically save 40-60% on labor costs. Industrial lease rates are $0.75-$0.95 per sq ft (NNN), compared to $1.50+ in Southern California. When including logistics savings from proximity, total landed cost reductions often exceed 50%."
                }
            },
            {
                "@type": "Question",
                "name": "What is a shelter company in Mexico?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A shelter company is a Mexican entity that allows foreign companies to manufacture in Mexico without establishing their own legal entity. The shelter handles all administrative, legal, and compliance aspects including labor relations, customs, and government permits. You retain 100% control over production and intellectual property."
                }
            }
        ]
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}

export { SchemaMarkup };
