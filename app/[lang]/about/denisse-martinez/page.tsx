import { getDictionary } from '@/app/i18n/get-dictionary';
import { Metadata } from 'next';
import DenisseBioClient from './DenisseBioClient';
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
    title: dict.bio_denisse?.title || 'Meet Denisse Martinez | Nearshore Consultant in Baja California',
    description: dict.bio_denisse?.backgroundDesc?.substring(0, 160) || 'Expert nearshore consultant in Baja California, helping US manufacturers with site selection, shelter services, and cross-border strategic expansion.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/about/denisse-martinez'
        : `https://nearshorenavigator.com/${lang}/about/denisse-martinez`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/about/denisse-martinez',
        'es': 'https://nearshorenavigator.com/es/about/denisse-martinez',
        'fr': 'https://nearshorenavigator.com/fr/about/denisse-martinez',
        'de': 'https://nearshorenavigator.com/de/about/denisse-martinez',
        'ja': 'https://nearshorenavigator.com/ja/about/denisse-martinez',
        'zh': 'https://nearshorenavigator.com/zh/about/denisse-martinez',
        'ko': 'https://nearshorenavigator.com/ko/about/denisse-martinez',
        'it': 'https://nearshorenavigator.com/it/about/denisse-martinez',
        'pt': 'https://nearshorenavigator.com/pt/about/denisse-martinez',
        'ru': 'https://nearshorenavigator.com/ru/about/denisse-martinez',
        'x-default': 'https://nearshorenavigator.com/en/about/denisse-martinez',
      }
    }
  };
}

export default async function DenisseBioPage({ params }: Props) {
  const { lang } = await params;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Denisse Martinez",
    "jobTitle": "Marketing Director & Advisor",
    "url": "https://nearshorenavigator.com/about/denisse-martinez",
    "image": "https://nearshorenavigator.com/images/denisse-martinez.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/denissemartinez"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "url": "https://nearshorenavigator.com"
    },
    "knowsAbout": [
      "Nearshore shelter services",
      "Contract manufacturing in Mexico",
      "USMCA compliance",
      "IMMEX program",
      "Industrial real estate Baja California",
      "Cross-border supply chain management",
      "Site selection",
      "Mexico manufacturing labor costs"
    ],
    "description": "Expert nearshore consultant in Baja California, helping US manufacturers with site selection, shelter services, and cross-border strategic expansion."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <DenisseBioClient />
    </>
  );
}
