import { getDictionary } from '../i18n/get-dictionary';
import HomeClient from "./HomeClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.home?.metaTitle || 'Nearshore Navigator | Industrial Manufacturing In Baja California',
    description: dict.home?.metaDescription || 'Strategic advisory for US companies expanding to Mexico.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}`,
      languages: {
        'en': 'https://nearshorenavigator.com/en',
        'es': 'https://nearshorenavigator.com/es',
        'fr': 'https://nearshorenavigator.com/fr',
        'de': 'https://nearshorenavigator.com/de',
        'it': 'https://nearshorenavigator.com/it',
        'pt': 'https://nearshorenavigator.com/pt',
        'ru': 'https://nearshorenavigator.com/ru',
        'ja': 'https://nearshorenavigator.com/ja',
        'zh': 'https://nearshorenavigator.com/zh',
        'ko': 'https://nearshorenavigator.com/ko',
        'x-default': 'https://nearshorenavigator.com/en',
      }
    }
  };
}

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Nearshore Navigator",
        "description": "Strategic advisory for US companies expanding manufacturing to Tijuana and Baja California.",
        "url": "https://nearshorenavigator.com",
        "telephone": "+1-800-000-0000",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tijuana",
          "addressRegion": "Baja California",
          "addressCountry": "MX"
        }
      },
      {
        "@type": "Person",
        "name": "Denisse Martinez",
        "jobTitle": "Marketing Director & Advisor",
        "url": "https://nearshorenavigator.com/about/denisse"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between a maquiladora and a shelter service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A maquiladora is a manufacturing operation in Mexico that imports materials tax-free for assembly and export. A shelter service is an administrative framework that allows foreign companies to operate in Mexico without full legal exposure, as the shelter provider handles HR, compliance, and human resources."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to set up manufacturing in Baja California?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Using a shelter service or contract manufacturer, companies can often launch operations in Baja California within 90 days. Standalone setups may take up to a year due to permitting and real estate construction."
            }
          },
          {
            "@type": "Question",
            "name": "What are the typical manufacturing labor costs in Tijuana?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The fully burdened labor rate in Tijuana for manufacturing operators averages around $7.84 per hour in 2026, which represents a 60-75% reduction compared to California wages."
            }
          },
          {
            "@type": "Question",
            "name": "Are there still USMCA tariff benefits for manufacturing in Mexico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, goods manufactured in Mexico under the IMMEX program and meeting USMCA rules of origin can enter the United States duty-free, bypassing the heavy Section 301 tariffs on Asian imports."
            }
          },
          {
            "@type": "Question",
            "name": "Is it required to use a shelter company in Mexico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it is not required. Companies can form their own Mexican legal entity (standalone maquiladora). However, many foreign companies use shelter services initially to reduce administrative burdens and legal risks."
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/*
       * SSR-only H1 removed to fix double-H1 SEO violation.
       * The primary visible H1 is rendered by HomeClient.
       */}
      <HomeClient />
    </>
  );
}
