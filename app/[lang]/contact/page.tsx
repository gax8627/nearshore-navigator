import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  
  return {
    title: 'Contact Us | Nearshore Navigator',
    description: 'Get in touch with Nearshore Navigator for industrial nearshoring expertise in Baja California, Mexico.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/contact'
        : `https://nearshorenavigator.com/${lang}/contact`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/contact',
        'es': 'https://nearshorenavigator.com/es/contact',
        'fr': 'https://nearshorenavigator.com/fr/contact',
        'de': 'https://nearshorenavigator.com/de/contact',
        'it': 'https://nearshorenavigator.com/it/contact',
        'pt': 'https://nearshorenavigator.com/pt/contact',
        'ru': 'https://nearshorenavigator.com/ru/contact',
        'ja': 'https://nearshorenavigator.com/ja/contact',
        'zh': 'https://nearshorenavigator.com/zh/contact',
        'ko': 'https://nearshorenavigator.com/ko/contact',
        'x-default': 'https://nearshorenavigator.com/en/contact',
      }
    }
  };
}

export default function Page() {
  return <ContactClient />;
}
