import { Metadata } from 'next';
import MarketingClient from './MarketingClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Nearshore Marketing OS | B2B Growth System | Nearshore Navigator',
    description: 'Automate your B2B marketing operations. We build and deploy a custom system for CRM routing, AI lead enrichment, and automated LinkedIn content generation.',
    openGraph: {
      title: 'Nearshore Marketing OS | Automated Growth for B2B',
      description: 'A complete B2B growth system installed directly into your business. Capture demand, enrich leads, and scale authority with AI.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/nearshore-marketing`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/nearshore-marketing',
        'es': 'https://nearshorenavigator.com/es/services/nearshore-marketing',
        'x-default': 'https://nearshorenavigator.com/en/services/nearshore-marketing',
      }
    }
  };
}

export default function MarketingServicePage() {
  return <MarketingClient />;
}
