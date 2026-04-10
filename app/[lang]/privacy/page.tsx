import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';
import { getDictionary } from '@/app/i18n/get-dictionary';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: `${dict.privacy.title} | Nearshore Navigator`,
    description: dict.privacy.metaDescription || 'Legal privacy policy and data protection for Nearshore Navigator.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/privacy'
        : `https://nearshorenavigator.com/${lang}/privacy`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/privacy',
        'es': 'https://nearshorenavigator.com/es/privacy',
        'fr': 'https://nearshorenavigator.com/fr/privacy',
        'de': 'https://nearshorenavigator.com/de/privacy',
        'it': 'https://nearshorenavigator.com/it/privacy',
        'pt': 'https://nearshorenavigator.com/pt/privacy',
        'ru': 'https://nearshorenavigator.com/ru/privacy',
        'ja': 'https://nearshorenavigator.com/ja/privacy',
        'zh': 'https://nearshorenavigator.com/zh/privacy',
        'ko': 'https://nearshorenavigator.com/ko/privacy',
        'x-default': 'https://nearshorenavigator.com/en/privacy',
      }
    }
  };
}

export default function Page() {
  return <PrivacyClient />;
}
