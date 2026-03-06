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
        "jobTitle": "Marketing Director & Nearshoring Advisor",
        "worksFor": {
            "@type": "Organization",
            "name": "Nearshore Navigator"
        },
        "url": "https://nearshorenavigator.com/en/about/denisse-martinez",
        "image": "https://nearshorenavigator.com/images/denisse-martinez.jpg",
        "sameAs": [
            "https://www.linkedin.com/in/denissemartinez"
        ],
        "description": "Expert nearshore consultant in Baja California, helping US manufacturers with site selection, shelter services, and cross-border strategic expansion into Mexico."
    };

    // WebSite schema — enables Google Sitelinks Search Box
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com",
        "description": "Strategic advisory for US companies expanding manufacturing to Mexico. Shelter services, contract manufacturing, and industrial real estate in Baja California.",
        "publisher": {
            "@type": "Organization",
            "name": "Nearshore Navigator"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://nearshorenavigator.com/en/insights?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    // Homepage FAQPage schema — targets People Also Ask boxes for top queries
    const homepageFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is nearshoring and why is Mexico the #1 destination?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nearshoring means relocating manufacturing or business operations to a nearby country — in the case of US companies, Mexico is the #1 destination because it shares a land border, operates in the same time zones, benefits from 0% tariffs under USMCA, and offers fully burdened labor rates of $4.80–$7.84 per hour versus $18–$35 per hour in the US. Unlike Asian alternatives with 25–100% Section 301 tariffs and 30-day ocean freight, Mexico enables same-day truck delivery and face-to-face oversight."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between a maquiladora and a shelter service?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A maquiladora is a foreign-owned manufacturing plant in Mexico operating under an IMMEX permit for duty-free import of materials for export production. A shelter service is a third-party Mexican company that holds the IMMEX permit and acts as the legal employer, allowing a US company to manufacture in Mexico without forming a Mexican legal entity. Shelter services reduce setup from 6–12 months to 90 days and eliminate direct exposure to Mexican labor law, accounting, and customs administration."
                }
            },
            {
                "@type": "Question",
                "name": "How much does manufacturing labor cost in Mexico in 2026?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The 2026 fully burdened manufacturing labor cost in Mexico varies by region: border cities (Tijuana, Juárez, Reynosa, Matamoros) average $7.84 per hour under CONASAMI border zone rates, inclusive of base wages, IMSS social security, INFONAVIT housing fund, vacation premiums, Christmas bonus, and mandatory profit-sharing. Interior cities like Guadalajara ($5.00–$6.50/hr), San Luis Potosí ($5.50–$6.50/hr), and Silao/Guanajuato ($4.80–$5.80/hr) are 15–25% less. This compares to $18–$35 per hour fully burdened in the United States."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to start manufacturing in Mexico?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Using a shelter service, a US company can begin production in Mexico in 90–120 days: 2–3 weeks for site selection, 1–2 weeks for shelter agreement and IMMEX enrollment, 3–4 weeks for facility setup and equipment installation, 2–3 weeks for workforce recruitment and training, and 2–3 weeks for pilot production and quality validation. Establishing a direct Mexican subsidiary (without a shelter) requires 6–12 months due to SAT tax registration, IMSS enrollment, INFONAVIT compliance, and IMMEX permit approval."
                }
            },
            {
                "@type": "Question",
                "name": "How do USMCA tariff benefits work for US companies manufacturing in Mexico?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Under USMCA, goods manufactured in Mexico that meet Regional Value Content (RVC) thresholds — typically 60–75% North American content for automotive, lower for other categories — enter the United States at 0% tariff. This eliminates the 25–100% Section 301 tariffs applicable to equivalent Chinese-made goods. The IMMEX program further enables duty-free import of raw materials and components into Mexico for processing, with tariff obligations triggered only on the finished exported product's value-add. Together, USMCA + IMMEX create a tariff-optimized manufacturing structure unique to Mexico."
                }
            },
            {
                "@type": "Question",
                "name": "What are the main industrial cities in Mexico for manufacturing?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mexico's top manufacturing cities include: Tijuana (medical devices, aerospace, electronics — largest border industrial market); Ciudad Juárez (automotive wire harnesses, electronics — 3,500+ maquiladoras); Monterrey (automotive, steel, industrial equipment — Kia 300K vehicles/yr); Guadalajara (electronics — $30B annual exports, Silicon Valley of Mexico); Saltillo (Detroit of Mexico — 3.5hr to Laredo); Puebla (Volkswagen/Audi automotive); Querétaro (aerospace — Bombardier, GE Aviation); San Luis Potosí (BMW); Silao/Guanajuato (GM Silverado/Sierra); Hermosillo (Ford, aerospace via Guaymas port)."
                }
            },
            {
                "@type": "Question",
                "name": "Is manufacturing in Mexico risky? How is intellectual property protected?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mexico offers strong IP protection reinforced by USMCA Chapter 20, which establishes trade secret, patent, and copyright protections at parity with US standards. Under the shelter service model, the US company retains 100% legal ownership of all machinery, tooling, raw materials, intellectual property, and finished goods — the shelter company never takes title to any client assets. Industrial parks operate with 24/7 security, CCTV, controlled access, and physical separation from residential areas. Fortune 500 companies including Becton Dickinson, Samsung, GE, Honeywell, and Collins Aerospace have operated safely in Mexican industrial parks for decades."
                }
            },
            {
                "@type": "Question",
                "name": "What is contract manufacturing in Mexico and how is it different from shelter services?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Contract manufacturing in Mexico means hiring an existing Mexican manufacturer to produce your product to your specifications — zero capital investment, fastest launch (30–60 days), but less process control and shared facility capacity. Shelter services mean the US company installs its own equipment in a facility, manages its own production, but uses a Mexican legal entity (the shelter) for IMMEX compliance, HR, payroll, and legal employer functions — higher control, 90-day launch, moderate investment. Direct subsidiary (standalone maquiladora) means the US company incorporates in Mexico and manages everything — maximum control, 6–12 month setup, highest investment. Nearshore Navigator matches US manufacturers to all three models depending on volume, IP sensitivity, and timeline."
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
            />
        </>
    );
}

export { SchemaMarkup };
