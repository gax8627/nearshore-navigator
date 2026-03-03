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
                "name": "What is a shelter company in Mexico?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A shelter company is a Mexican legal entity that assumes the administrative, legal, HR, and import/export risks for foreign manufacturers. You control production and IP; the shelter handles compliance."
                }
            },
            {
                "@type": "Question",
                "name": "How much does a shelter service cost in Mexico?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Shelter services typically charge an administrative fee based on headcount or a percentage of payroll. Despite the fee, the 40-60% savings on labor and overhead still result in massive cost reductions."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to set up manufacturing in Mexico under a shelter?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Using a shelter service allows companies to bypass the 6-12 month legal incorporation process. You can typically begin manufacturing operations within 90 days of signing a shelter agreement."
                }
            },
            {
                "@type": "Question",
                "name": "Do I own my equipment under a Mexico shelter agreement?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Under a shelter agreement, you retain 100% ownership of your machinery, equipment, raw materials, and intellectual property. The shelter simply facilitates their legal import and operation in Mexico."
                }
            }
        ]
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
        </>
    );
}

export { SchemaMarkup };
