import { Metadata } from 'next';
import MarketingClient from './MarketingClient';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'B2B Marketing for Nearshore Companies | Outbound & SEO | Nearshore Navigator',
    description: 'Specialized B2B marketing services for companies expanding to Mexico. ICP research, outbound campaigns, LinkedIn strategy, and SEO for nearshore audiences.',
    openGraph: {
      title: 'B2B Marketing for Nearshore Companies | Nearshore Navigator',
      description: 'Outbound campaigns, ICP targeting, and content marketing for companies expanding manufacturing operations to Baja California.',
    },
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/services/nearshore-marketing'
        : `https://nearshorenavigator.com/${lang}/services/nearshore-marketing`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/nearshore-marketing',
        'es': 'https://nearshorenavigator.com/es/services/nearshore-marketing',
        'fr': 'https://nearshorenavigator.com/fr/services/nearshore-marketing',
        'de': 'https://nearshorenavigator.com/de/services/nearshore-marketing',
        'ja': 'https://nearshorenavigator.com/ja/services/nearshore-marketing',
        'zh': 'https://nearshorenavigator.com/zh/services/nearshore-marketing',
        'ko': 'https://nearshorenavigator.com/ko/services/nearshore-marketing',
        'it': 'https://nearshorenavigator.com/it/services/nearshore-marketing',
        'pt': 'https://nearshorenavigator.com/pt/services/nearshore-marketing',
        'ru': 'https://nearshorenavigator.com/ru/services/nearshore-marketing',
        'x-default': 'https://nearshorenavigator.com/en/services/nearshore-marketing',
      }
    }
  };
}

export default function MarketingServicePage() {
  return <MarketingClient />;
}
