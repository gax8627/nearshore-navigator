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
