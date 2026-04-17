import { Metadata } from 'next';
import MarketingClient from './MarketingClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'B2B Marketing for Nearshore Companies | Outbound & SEO | Nearshore Navigator',
    description: 'Specialized B2B marketing services for companies expanding to Mexico. ICP research, outbound campaigns, LinkedIn strategy, and SEO for nearshore audiences.',
    openGraph: {
      title: 'B2B Marketing for Nearshore Companies | Nearshore Navigator',
      description: 'Outbound campaigns, ICP targeting, and content marketing for companies expanding manufacturing operations to Baja California.',
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
