import { getAlternateLanguages, INDEXABLE_LOCALES } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import CivaCalculatorClient from './CivaCalculatorClient';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return INDEXABLE_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: 'CIVA VAT Risk & Anexo 30 Audit Assessment Tool (2026)',
    description: 'Calculate immediate 16% VAT cash outflow exposure, Anexo 24 vs 30 discharge gaps, and SAT AGACE audit vulnerability under 2026 Mexican customs regulations.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator`,
      languages: getAlternateLanguages('/tools/civa-audit-risk-calculator')
    },
    openGraph: {
      title: 'CIVA VAT Risk & Anexo 30 Audit Assessment Tool (2026)',
      description: 'Free interactive compliance tool: Quantify your company\'s 16% VAT cash exposure, Anexo 30 discharge gaps, and SAT Plan Maestro audit vulnerability in Mexico.',
      url: `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator`,
      siteName: 'Nearshore Navigator',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    }
  };
}

export default async function CivaAuditCalculatorPage({ params }: Props) {
  const { lang } = await params;

  const appSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator#software`,
        "name": "CIVA VAT Risk & Anexo 30 Audit Assessment Tool",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator`,
        "description": "Interactive tax and trade compliance diagnostic tool modeling immediate 16% VAT cash outflow exposure, Anexo 24 vs 30 reconciliation discrepancies, and SAT Plan Maestro audit vulnerability for IMMEX manufacturers in Mexico.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "Denisse Martinez",
          "jobTitle": "Founder & Principal Nearshore Advisor",
          "url": "https://nearshorenavigator.com/en/about/denisse-martinez",
          "sameAs": [
            "https://www.linkedin.com/in/denissemartinez"
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "Nearshore Navigator",
          "url": "https://nearshorenavigator.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `https://nearshorenavigator.com/${lang}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Assessment & Tools",
            "item": `https://nearshorenavigator.com/${lang}/assessment`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "CIVA VAT Risk & Anexo 30 Audit Assessment Tool",
            "item": `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://nearshorenavigator.com/${lang}/tools/civa-audit-risk-calculator#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the CIVA VAT Certification (Certificación en Materia de IVA e IEPS) in Mexico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The CIVA VAT Certification under Article 28-A of the Mexican Value Added Tax Law (Ley del IVA) and RGCE Chapter 7.1 grants IMMEX manufacturers an immediate 100% tax credit on the 16% VAT normally payable upon the temporary importation of raw materials, components, and machinery. Without an active CIVA certification, an IMMEX enterprise must prepay 16% cash VAT at the time of customs clearance on every inbound shipment, locking up substantial operating liquidity until exports are verified and refunds requested."
            }
          },
          {
            "@type": "Question",
            "name": "How do Anexo 24 and Anexo 30 interact under SAT customs surveillance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Anexo 24 is the automated customs inventory software maintained internally by the manufacturer under Article 59 of the Customs Law, tracking physical bill of materials (BOM), inbound pedimentos, physical transformations, and scrap. Anexo 30 is SAT's central electronic fiscal credit control ledger (SCCC-VE), tracking the monetary VAT credit balance. Maquiladoras must file monthly discharge reports (informes de descargo) in Anexo 30 to prove that temporarily imported inventory tracked in Anexo 24 was physically exported or returned abroad within the 18-month statutory limit."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 18-month statutory holding clock under Customs Law Article 108?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Article 108, Section I of the Mexican Customs Law (Ley Aduanera), temporarily imported raw materials, lubricants, and packaging materials may legally remain inside Mexico for a maximum of 18 months. If raw materials exceed 18 months without an associated export discharge pedimento (Clave RT) or valid virtual transfer, SAT automatically classifies the inventory as illegally residing in national territory, triggering immediate precautionary seizure (PAMA) under Article 151 and cancellation of the IMMEX program."
            }
          },
          {
            "@type": "Question",
            "name": "How does the SAT Plan Maestro 2026 deploy AI to trigger customs electronic audits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under the SAT Plan Maestro 2026, the Tax Administration Service deploys neural network algorithms that continuously cross-reference VUCEM pedimentos, CFDI 4.0 electronic invoices, Complemento Carta Porte 3.1 transport telemetry, and Anexo 30 SCCC-VE accounts in real time. Micro-variances exceeding 0.5% between temporarily imported inputs and exported finished products automatically trigger electronic audit notices (auditorías electrónicas) via Buzón Tributario under CFF Article 53-B, giving the company strictly 10 business days to cure discrepancies before formal tax assessments."
            }
          },
          {
            "@type": "Question",
            "name": "How do Mexican shelter services completely eliminate CIVA audit liability?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under a Mexican Shelter Services model, foreign manufacturers operate under the shelter provider's existing IMMEX program and established AAA CIVA certification. The shelter entity serves as the legal Importer of Record and assumes 100% of the statutory compliance and fiduciary liability under CFF Article 26. This allows foreign manufacturers to immediately avoid 16% cash VAT outflows from day one without waiting 6–12 months for independent government certification or exposing corporate officers to personal audit liabilities."
            }
          },
          {
            "@type": "Question",
            "name": "What are the financial penalties and director liabilities if SAT suspends CIVA certification?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If SAT or AGACE suspends or cancels CIVA certification under RGCE Rule 7.2.4, the company must immediately begin paying 16% cash VAT at customs clearance on all temporary imports, freezing millions in working capital. Furthermore, un-discharged historical balances in Anexo 30 trigger retroactive 16% VAT clawbacks, statutory fines from 70% to 100% of omitted taxes (Ley Aduanera Art. 178), inflation adjustments (actualización), and monthly compound surcharges (recargos) under CFF Art. 21. Under CFF Article 26, corporate directors and legal representatives face joint personal liability (responsabilidad solidaria)."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <CivaCalculatorClient language={lang} />
    </>
  );
}
