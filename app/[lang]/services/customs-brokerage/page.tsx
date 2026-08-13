import { Metadata } from 'next';
import { getAlternateLanguages, BASE_URL } from '@/app/constants/seo-config';
import { getDictionary } from '@/app/i18n/get-dictionary';
import CustomsBrokerageClient from './CustomsBrokerageClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  const title = lang === 'en'
    ? 'Customs Brokerage & Trade Compliance Mexico | Pedimentos, Annex 24/31 & USMCA'
    : `${dict.customsPage?.heroTitle || 'Customs Brokerage & Trade Compliance'} ${dict.customsPage?.heroTitleHighlight || 'in Mexico'} | Nearshore Navigator`;

  const description = lang === 'en'
    ? 'Standalone unbundled customs brokerage in Mexico: Pedimentos clearance, Annex 24/31 IMMEX digital inventory control, USMCA tariff mitigation & Section 301 China tariff elimination. Direct Agente Aduanal access.'
    : dict.customsPage?.heroSubtitle || 'Customs brokerage and cross-border trade compliance services in Mexico.';

  return {
    title,
    description,
    openGraph: {
      title: 'Customs Brokerage & Cross-Border Trade Compliance Mexico | Nearshore Navigator',
      description: 'Pedimentos clearance, Annex 24/31 digital inventory tracking, USMCA tariff mitigation, and Section 301 China tariff elimination.',
      url: `${BASE_URL}/${lang}/services/customs-brokerage`,
      siteName: 'Nearshore Navigator',
      type: 'website',
    },
    alternates: {
      canonical: `${BASE_URL}/${lang}/services/customs-brokerage`,
      languages: getAlternateLanguages('/services/customs-brokerage')
    }
  };
}

export default async function CustomsBrokeragePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/${lang}` },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/${lang}/services` },
        { "@type": "ListItem", "position": 3, "name": "Customs Brokerage & Trade Compliance", "item": `${BASE_URL}/${lang}/services/customs-brokerage` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Mexico Customs Brokerage & Cross-Border Compliance",
      "provider": {
        "@type": "Organization",
        "name": "Nearshore Navigator",
        "url": BASE_URL
      },
      "serviceType": "Customs Brokerage & International Trade Compliance Advisory",
      "areaServed": [
        { "@type": "Country", "name": "Mexico", "identifier": "MX" },
        { "@type": "State", "name": "Baja California" },
        { "@type": "City", "name": "Tijuana" },
        { "@type": "City", "name": "Mexicali font-bold" },
        { "@type": "City", "name": "Ciudad Juarez" },
        { "@type": "City", "name": "Monterrey" }
      ],
      "description": "Standalone unbundled customs brokerage advisory in Mexico: Pedimentos clearance, Annex 24/31 IMMEX digital inventory control, USMCA tariff mitigation, and Section 301 China tariff elimination.",
      "offers": {
        "@type": "Offer",
        "url": `${BASE_URL}/${lang}/services/customs-brokerage`
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Customs & Trade Compliance Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pedimentos de Importación & Exportación Processing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Anexo 24 & Anexo 31 Digital Inventory Control" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "USMCA (T-MEC) Rules of Origin Qualification & Certificates" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Section 301 Tariff Elimination via Substantial Transformation" } }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is standalone unbundled customs brokerage in Mexico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standalone unbundled customs brokerage allows US companies to contract directly with licensed Mexican Agentes Aduanales and trade compliance experts without being forced to buy full-scope shelter administrative packages. You pay only for customs clearance, maintain full ownership of your Pedimentos and Annex 24/31 inventory software, and eliminate 15-25% shelter markups."
          }
        },
        {
          "@type": "Question",
          "name": "How does a Pedimento de Importación clear Mexican customs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Pedimento is the legal customs declaration submitted to Mexico's SAT (Servicio de Administración Tributaria) via VUCEM. A licensed Agente Aduanal classifies your items by tariff code (Fracción Arancelaria & NICO), calculates applicable duties or IMMEX exemptions, attaches digital invoices (COVE), and routes the shipment through border customs (such as Otay Mesa or Laredo) with electronic pre-clearance."
          }
        },
        {
          "@type": "Question",
          "name": "Why are Annex 24 and Annex 31 inventory systems legally mandatory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under Mexican tax law, IMMEX companies import raw materials temporarily without paying the 16% VAT. Annex 24 tracks raw material entry, BOM explosion, finished goods export, and legal residency periods (18 to 36 months). Annex 31 manages your VAT/IEPS credit balances with SAT. Failing to reconcile Annex 24/31 results in massive retroactive 16% VAT penalties and IMMEX suspension."
          }
        },
        {
          "@type": "Question",
          "name": "How does manufacturing in Mexico eliminate US Section 301 tariffs on Chinese goods?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under U.S. Customs Substantial Transformation regulations (19 CFR § 134.1 / 19 U.S.C. § 1304), when Chinese raw materials or components undergo substantial processing, assembly, or manufacturing in Mexico under IMMEX, they transform into a new commercial product with a distinct name, character, and use. The country of origin becomes Mexico, legally eliminating the 25% Section 301 Chinese tariff upon entry into the United States."
          }
        },
        {
          "@type": "Question",
          "name": "What is required to qualify goods for 0% duty under USMCA (T-MEC)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To qualify for preferential 0% USMCA tariffs, products must satisfy specific Rules of Origin—either Regional Value Content (RVC) requirements (e.g., 60-75% North American content) or Tariff Shift rules (Change in Tariff Classification). Our team conducts origin verification, prepares USMCA Certificates of Origin (Form CBP 434), and maintains audit-ready defense files for 5 years."
          }
        },
        {
          "@type": "Question",
          "name": "What is a Virtual Pedimento (V1 / V5 entry)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Virtual Pedimento allows IMMEX maquiladoras to transfer raw materials, sub-assemblies, or tooling to another IMMEX facility or supplier within Mexico without physically hauling goods back into the United States first. This eliminates thousands of dollars in cross-border freight and speeds up local supply chain integration."
          }
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CustomsBrokerageClient />
    </>
  );
}
