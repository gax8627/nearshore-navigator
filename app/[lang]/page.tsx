import { getDictionary } from '../i18n/get-dictionary';
import HomeClient from "./HomeClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.home?.metaTitle || 'Nearshore Navigator | Industrial Manufacturing In Baja California',
    description: dict.home?.metaDescription || 'Strategic advisory for US companies expanding to Mexico.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}`,
      languages: {
        'en': 'https://nearshorenavigator.com/en',
        'es': 'https://nearshorenavigator.com/es',
        'fr': 'https://nearshorenavigator.com/fr',
        'de': 'https://nearshorenavigator.com/de',
        'it': 'https://nearshorenavigator.com/it',
        'pt': 'https://nearshorenavigator.com/pt',
        'ru': 'https://nearshorenavigator.com/ru',
        'ja': 'https://nearshorenavigator.com/ja',
        'zh': 'https://nearshorenavigator.com/zh',
        'ko': 'https://nearshorenavigator.com/ko',
        'x-default': 'https://nearshorenavigator.com/en',
      }
    }
  };
}

export default function Home() {
  return (
    <>
      {/*
       * SSR-only H1 for Googlebot – visually hidden but present in initial HTML.
       * HomeClient renders the animated visual heading; this ensures crawlers
       * always see the primary keyword-bearing heading without client-side JS.
       */}
      {/*
       * SSR-only H1 removed to fix double-H1 SEO violation.
       * The primary visible H1 is rendered by HomeClient.
       */}
      <HomeClient />
    </>
  );
}
