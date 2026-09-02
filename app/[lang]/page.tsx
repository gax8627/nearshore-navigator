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
        'de': 'https://nearshorenavigator.com/de',
        'ja': 'https://nearshorenavigator.com/ja',
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
        "@type": "Organization",
        "@id": "https://nearshorenavigator.com/#organization",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com",
        "logo": "https://nearshorenavigator.com/logo.webp",
        "description": "Premier North American trade compliance, industrial shelter services, and nearshore manufacturing advisory headquartered in San Diego and Tijuana.",
        "sameAs": [
          "https://www.linkedin.com/company/nearshore-navigator",
          "https://x.com/nearshorenav",
          "https://twitter.com/nearshorenavigator",
          "https://www.crunchbase.com/organization/nearshore-navigator",
          "https://www.wikidata.org/wiki/Q125999000"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://nearshorenavigator.com/en/about/denisse-martinez#person",
        "name": "Denisse Martinez",
        "jobTitle": "Senior Technical SEO, Trade Compliance & Nearshoring Strategy Director",
        "worksFor": {
          "@type": "Organization",
          "@id": "https://nearshorenavigator.com/#organization"
        },
        "url": "https://nearshorenavigator.com/en/about/denisse-martinez",
        "sameAs": [
          "https://www.linkedin.com/in/denissemartinez",
          "https://x.com/denisse_nearshore",
          "https://www.crunchbase.com/person/denisse-martinez"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://nearshorenavigator.com/#website",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com",
        "publisher": {
          "@type": "Organization",
          "@id": "https://nearshorenavigator.com/#organization"
        }
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
