import ResourcesClient from "./ResourcesClient";
import { Metadata } from 'next';
import { NOINDEX_LOCALES } from "@/app/constants/seo-config";
import { getDictionary } from "@/app/i18n/get-dictionary";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: `${dict.resources.title} | Nearshore Navigator`,
    description: dict.resources.metaDescription || 'Industrial resources, tools, and guides for your Mexico expansion.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/resources'
        : `https://nearshorenavigator.com/${lang}/resources`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources',
        'es': 'https://nearshorenavigator.com/es/resources',
        'fr': 'https://nearshorenavigator.com/fr/resources',
        'de': 'https://nearshorenavigator.com/de/resources',
        'ja': 'https://nearshorenavigator.com/ja/resources',
        'zh': 'https://nearshorenavigator.com/zh/resources',
        'ko': 'https://nearshorenavigator.com/ko/resources',
        'it': 'https://nearshorenavigator.com/it/resources',
        'pt': 'https://nearshorenavigator.com/pt/resources',
        'ru': 'https://nearshorenavigator.com/ru/resources',
        'x-default': 'https://nearshorenavigator.com/en/resources',
      }
    }
  };
}

export default async function ResourcesPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  return <ResourcesClient />;
}
