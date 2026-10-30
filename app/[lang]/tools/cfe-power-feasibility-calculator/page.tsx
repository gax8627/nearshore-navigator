import { getAlternateLanguages, INDEXABLE_LOCALES } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import CfeCalculatorClient from './CfeCalculatorClient';

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
    title: 'CFE Industrial Power Feasibility & KVA Cost Estimator (2026)',
    description: 'Calculate substation CapEx ($150–$350/kVA), CFE/CENACE grid energization lead times, dead rent carrying cost risk, and detect phantom power across 10 Mexican manufacturing markets.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator`,
      languages: getAlternateLanguages('/tools/cfe-power-feasibility-calculator')
    },
    openGraph: {
      title: 'CFE Industrial Power Feasibility & KVA Cost Estimator (2026)',
      description: 'Free interactive engineering and financial tool: Model substation CapEx, CFE energization delays, and phantom power lease risk across Monterrey, Tijuana, Saltillo, and Juarez.',
      url: `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator`,
      siteName: 'Nearshore Navigator',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    }
  };
}

export default async function CfePowerCalculatorPage({ params }: Props) {
  const { lang } = await params;

  const appSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator#software`,
        "name": "CFE Industrial Power Feasibility & KVA Cost Estimator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator`,
        "description": "Interactive electrical engineering and real estate diagnostic tool modeling medium and high-voltage substation CapEx, CENACE grid queue delays, dark facility carrying costs, and phantom power risks for manufacturing tenants in Mexico.",
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
        "@id": `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator#breadcrumbs`,
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
            "name": "CFE Industrial Power Feasibility & KVA Cost Estimator",
            "item": `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://nearshorenavigator.com/${lang}/tools/cfe-power-feasibility-calculator#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does this tool calculate industrial substation CapEx in Mexico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator models substation capital expenditure based on required kVA capacity and voltage class (Medium Voltage 13.8–34.5 kV at $165–$280/kVA vs High Voltage 115 kV at $300–$380/kVA), adding switching bay structures, dielectric oil containment pits, LAPEM testing, and localized CFE obras de refuerzo."
            }
          },
          {
            "@type": "Question",
            "name": "What is 'phantom power' in Mexican industrial parks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Phantom power occurs when an industrial park brochure advertises gross historical capacity or nearby power lines, but the local CFE distribution substation node has zero available capacity for immediate load connection. Non-binding Cartas de Factibilidad expire in 180 days; only an executed CENACE Dictamen and Contrato de Conexión guarantee capacity."
            }
          },
          {
            "@type": "Question",
            "name": "How is dark facility dead rent carrying cost calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Carrying cost exposure is calculated by multiplying facility square footage by the monthly triple-net (NNN) rent and operating expenses across the projected delay period between target commissioning and actual CFE grid energization, plus capitalized machinery depreciation."
            }
          },
          {
            "@type": "Question",
            "name": "Why do transformer delivery lead times exceed 80 weeks in late 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simultaneous demand shocks from US hyperscale AI data centers, renewable grid interconnections, and Mexican nearshoring construction have overwhelmed global manufacturers of large step-down power transformers (Prolec GE, WEG, Siemens), creating 70 to 110-week backlogs for 5 to 25 MVA units."
            }
          },
          {
            "@type": "Question",
            "name": "What are the 5 essential fiduciary lease covenants for Mexican industrial facilities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 5 covenants are: 1) Utility Energization Condition Precedent (rent abated until power is live), 2) Landlord Substation CapEx Escrow with delay liquidated damages, 3) Contractually Guaranteed kVA Nodal Allocation, 4) Landlord-Subsidized Temporary Generation Cost-Sharing, and 5) Mutual Unconditional Right of Rescission after 120 days."
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
      <CfeCalculatorClient lang={lang} />
    </>
  );
}
