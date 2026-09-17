import { getAlternateLanguages } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import UsmcaCalculatorClient from './UsmcaCalculatorClient';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: 'USMCA Regional Value Content (RVC) Calculator | Nearshore Navigator',
    description: 'Calculate your USMCA Regional Value Content (RVC) under Net Cost and Transaction Value methods. Instant origin qualification checker for automotive, electronics, and medical manufacturing.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/tools/usmca-rvc-calculator`,
      languages: getAlternateLanguages('/tools/usmca-rvc-calculator')
    },
    openGraph: {
      title: 'USMCA Regional Value Content (RVC) Calculator & Tariff Checker (2026)',
      description: 'Free interactive compliance tool: Determine if your Mexican manufactured products qualify for 0% USMCA tariff preference under 2026 Rules of Origin.',
      url: `https://nearshorenavigator.com/${lang}/tools/usmca-rvc-calculator`,
      siteName: 'Nearshore Navigator',
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    }
  };
}

export default async function UsmcaCalculatorPage({ params }: Props) {
  const { lang } = await params;

  const appSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://nearshorenavigator.com/#usmca-rvc-calculator",
        "name": "USMCA Regional Value Content (RVC) Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": `https://nearshorenavigator.com/${lang}/tools/usmca-rvc-calculator`,
        "description": "Interactive trade compliance software calculating USMCA Regional Value Content (RVC) under Net Cost and Transaction Value methods.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "Denisse Martinez",
          "jobTitle": "Founder & Principal Nearshore Advisor",
          "url": "https://nearshorenavigator.com/en/about/denisse-martinez"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Nearshore Navigator",
          "url": "https://nearshorenavigator.com"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://nearshorenavigator.com/#usmca-rvc-faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the formula for USMCA Regional Value Content (RVC) under Net Cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under the USMCA Net Cost method, the formula is: RVC = ((Net Cost - Value of Non-Originating Materials) / Net Cost) * 100. Net Cost excludes sales promotion, marketing, royalties, and non-allowable interest costs."
            }
          },
          {
            "@type": "Question",
            "name": "What is the automotive RVC requirement under USMCA in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For passenger vehicles and light trucks, the 2026 USMCA requirement is 75% Regional Value Content under the Net Cost method, following the full expiration of Alternative Transition Regimes (ATR). Core parts require 75%, principal parts 70%, and complementary parts 65%."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if a product fails the USMCA RVC threshold?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If a product fails to meet the required RVC threshold, it cannot be certified under USMCA and is subject to standard Most-Favored-Nation (MFN) tariffs, plus potential Section 301 tariffs if inputs originate from China."
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
      <UsmcaCalculatorClient language={lang} />
    </>
  );
}
