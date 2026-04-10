import BrochureClient from "./BrochureClient";
import { Metadata } from 'next';
import { getDictionary } from "@/app/i18n/get-dictionary";
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang);

  return {
    title: `${t.brochure.title} | Nearshore Navigator`,
    description: t.brochure.subtitle,
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/resources/brochure'
        : `https://nearshorenavigator.com/${lang}/resources/brochure`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources/brochure',
        'es': 'https://nearshorenavigator.com/es/resources/brochure',
        'fr': 'https://nearshorenavigator.com/fr/resources/brochure',
        'de': 'https://nearshorenavigator.com/de/resources/brochure',
        'ja': 'https://nearshorenavigator.com/ja/resources/brochure',
        'zh': 'https://nearshorenavigator.com/zh/resources/brochure',
        'ko': 'https://nearshorenavigator.com/ko/resources/brochure',
        'it': 'https://nearshorenavigator.com/it/resources/brochure',
        'pt': 'https://nearshorenavigator.com/pt/resources/brochure',
        'ru': 'https://nearshorenavigator.com/ru/resources/brochure',
        'x-default': 'https://nearshorenavigator.com/en/resources/brochure',
      }
    }
  };
}

export default async function BrochurePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  return <BrochureClient />;
}
