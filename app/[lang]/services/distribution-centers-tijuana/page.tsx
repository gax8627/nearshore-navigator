import { Metadata } from 'next';
import DistributionClient from './DistributionClient';


export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: lang === 'en'
      ? 'Tijuana 3PL & Distribution Centers | Section 321, 20 Min from San Diego | 2026'
      : 'Distribution Centers in Tijuana | Section 321 & 3PL Fulfillment Services',
    description: lang === 'en'
      ? 'Tijuana distribution centers: Section 321 duty-free fulfillment, 3PL warehousing, cross-docking — 20 min from San Diego. Class A facilities at $0.47–0.85/sqft. Ship to LA next day. Nearshore Navigator finds and vets your 3PL partner — no commissions.'
      : 'Optimize cross-border logistics with strategically located 3PL, fulfillment, and distribution hubs in Tijuana — 20 minutes from San Diego. Section 321 duty-free eligible.',
    openGraph: {
      title: 'Distribution Centers in Tijuana | Nearshore Navigator',
      description: 'Cross-border logistics, Section 321 fulfillment, and 3PL warehousing in Tijuana, Baja California — 20 min from San Diego.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/distribution-centers-tijuana`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana',
        'es': 'https://nearshorenavigator.com/es/services/distribution-centers-tijuana',
        'x-default': 'https://nearshorenavigator.com/en/services/distribution-centers-tijuana',
      }
    }
  };
}

export default function DistributionCentersPage() {
  return <DistributionClient />;
}
