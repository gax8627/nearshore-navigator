import ResourceMapClient from "./ResourceMapClient";
import { Metadata } from 'next';
import { getDictionary } from "@/app/i18n/get-dictionary";
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang as any);

  return {
    title: `${t.resourceMap.heroTitle} ${t.resourceMap.heroTitleHighlight} | Nearshore Navigator`,
    description: t.resourceMap.heroSubtitle,
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/resources/tijuana-industrial-park-map'
        : `https://nearshorenavigator.com/${lang}/resources/tijuana-industrial-park-map`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources/tijuana-industrial-park-map',
        'es': 'https://nearshorenavigator.com/es/resources/tijuana-industrial-park-map',
        'fr': 'https://nearshorenavigator.com/fr/resources/tijuana-industrial-park-map',
        'de': 'https://nearshorenavigator.com/de/resources/tijuana-industrial-park-map',
        'ja': 'https://nearshorenavigator.com/ja/resources/tijuana-industrial-park-map',
        'zh': 'https://nearshorenavigator.com/zh/resources/tijuana-industrial-park-map',
        'ko': 'https://nearshorenavigator.com/ko/resources/tijuana-industrial-park-map',
        'it': 'https://nearshorenavigator.com/it/resources/tijuana-industrial-park-map',
        'pt': 'https://nearshorenavigator.com/pt/resources/tijuana-industrial-park-map',
        'ru': 'https://nearshorenavigator.com/ru/resources/tijuana-industrial-park-map',
        'x-default': 'https://nearshorenavigator.com/en/resources/tijuana-industrial-park-map',
      }
    }
  };
}

export default function ResourceMapPage() {
  return <ResourceMapClient />;
}
