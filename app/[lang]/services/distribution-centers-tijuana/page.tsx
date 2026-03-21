import { Metadata } from 'next';
import DistributionClient from './DistributionClient';

const NOINDEX_LOCALES_DC = new Set(['fr', 'de', 'it', 'pt', 'ru']);

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === 'en'
      ? 'Tijuana 3PL & Distribution Centers | Section 321, 20 Min from San Diego | 2026'
      : 'Distribution Centers in Tijuana | Section 321 & 3PL Fulfillment Services',
    description: lang === 'en'
      ? 'Tijuana distribution centers: Section 321 duty-free fulfillment, 3PL warehousing, cross-docking — 20 min from San Diego. Class A facilities at $0.47–0.85/sqft. Ship to LA next day. Nearshore Navigator finds and vets your 3PL partner — no commissions.'
      : 'Optimize cross-border logistics with strategically located 3PL, fulfillment, and distribution hubs in Tijuana — 20 minutes from San Diego. Section 321 duty-free eligible.',
    robots: NOINDEX_LOCALES_DC.has(lang) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: 'Distribution Centers in Tijuana | Nearshore Navigator',
      description: 'Cross-border logistics, Section 321 fulfillment, and 3PL warehousing in Tijuana, Baja California — 20 min from San Diego.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/distribution-centers-tijuana`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana',
        'es': 'https://nearshorenavigator.com/es/services/distribution-centers-tijuana',
        'fr': 'https://nearshorenavigator.com/fr/services/distribution-centers-tijuana',
        'de': 'https://nearshorenavigator.com/de/services/distribution-centers-tijuana',
        'ja': 'https://nearshorenavigator.com/ja/services/distribution-centers-tijuana',
        'zh': 'https://nearshorenavigator.com/zh/services/distribution-centers-tijuana',
        'ko': 'https://nearshorenavigator.com/ko/services/distribution-centers-tijuana',
        'it': 'https://nearshorenavigator.com/it/services/distribution-centers-tijuana',
        'pt': 'https://nearshorenavigator.com/pt/services/distribution-centers-tijuana',
        'ru': 'https://nearshorenavigator.com/ru/services/distribution-centers-tijuana',
        'x-default': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana',
      }
    }
  };
}

export default function DistributionCentersPage() {
  return <DistributionClient />;
}
