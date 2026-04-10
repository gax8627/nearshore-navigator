import AboutClient from "./AboutClient";
import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: `${dict.about.title} | Nearshore Navigator`,
    description: dict.about.metaDescription || 'Learn more about Nearshore Navigator and our mission to support manufacturing expansion in Mexico.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/about'
        : `https://nearshorenavigator.com/${lang}/about`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/about',
        'es': 'https://nearshorenavigator.com/es/about',
        'fr': 'https://nearshorenavigator.com/fr/about',
        'de': 'https://nearshorenavigator.com/de/about',
        'ja': 'https://nearshorenavigator.com/ja/about',
        'zh': 'https://nearshorenavigator.com/zh/about',
        'ko': 'https://nearshorenavigator.com/ko/about',
        'it': 'https://nearshorenavigator.com/it/about',
        'pt': 'https://nearshorenavigator.com/pt/about',
        'ru': 'https://nearshorenavigator.com/ru/about',
        'x-default': 'https://nearshorenavigator.com/en/about',
      }
    }
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
