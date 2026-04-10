import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';
import IndustrialMapClient from './IndustrialMapClient';
import { BAJA_INDUSTRIAL_PARKS } from '@/app/constants/industrial-parks-data';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.park_map?.metaTitle || 'Baja California Industrial Park Map (2026) | Nearshore Navigator',
    description: dict.park_map?.metaDesc || 'Complete guide to Baja California industrial parks. Compare Class A availability, lease rates, and locations in Tijuana, Mexicali, and Tecate.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/tools/industrial-park-map'
        : `https://nearshorenavigator.com/${lang}/tools/industrial-park-map`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/tools/industrial-park-map',
        'es': 'https://nearshorenavigator.com/es/tools/industrial-park-map',
        'fr': 'https://nearshorenavigator.com/fr/tools/industrial-park-map',
        'de': 'https://nearshorenavigator.com/de/tools/industrial-park-map',
        'ja': 'https://nearshorenavigator.com/ja/tools/industrial-park-map',
        'zh': 'https://nearshorenavigator.com/zh/tools/industrial-park-map',
        'ko': 'https://nearshorenavigator.com/ko/tools/industrial-park-map',
        'it': 'https://nearshorenavigator.com/it/tools/industrial-park-map',
        'pt': 'https://nearshorenavigator.com/pt/tools/industrial-park-map',
        'ru': 'https://nearshorenavigator.com/ru/tools/industrial-park-map',
        'x-default': 'https://nearshorenavigator.com/en/tools/industrial-park-map',
      }
    }
  };
}

export default async function IndustrialParkMapPage({ params }: Props) {
  const { lang } = await params;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Baja California Industrial Parks Dataset",
    "description": "A dataset comparing industrial parks in Tijuana, Mexicali, and Tecate detailing class, vacancy status, lease rates, and key tenants.",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "url": "https://nearshorenavigator.com"
    },
    "spatialCoverage": {
      "@type": "Place",
      "name": "Baja California, Mexico"
    },
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Park Name"
      },
      {
        "@type": "PropertyValue",
        "name": "Lease Rate"
      },
      {
        "@type": "PropertyValue",
        "name": "Vacancy Status"
      }
    ],
    "hasPart": BAJA_INDUSTRIAL_PARKS.map(park => ({
      "@type": "Dataset",
      "name": park.name,
      "description": `Class: ${park.classification}, Lease Rate: ${park.leaseRate}, Vacancy: ${park.vacancyStatus}`,
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "creator": {
        "@type": "Organization",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <IndustrialMapClient language={lang} />
    </>
  );
}
