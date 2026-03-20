import { Metadata } from 'next';
import TermsClient from './TermsClient';
import { getDictionary } from '@/app/i18n/get-dictionary';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: `${dict.terms.title} | Nearshore Navigator`,
    description: dict.terms.metaDescription || 'Legal terms and conditions for using Nearshore Navigator services.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/terms`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/terms',
        'es': 'https://nearshorenavigator.com/es/terms',
        'fr': 'https://nearshorenavigator.com/fr/terms',
        'de': 'https://nearshorenavigator.com/de/terms',
        'it': 'https://nearshorenavigator.com/it/terms',
        'pt': 'https://nearshorenavigator.com/pt/terms',
        'ru': 'https://nearshorenavigator.com/ru/terms',
        'ja': 'https://nearshorenavigator.com/ja/terms',
        'zh': 'https://nearshorenavigator.com/zh/terms',
        'ko': 'https://nearshorenavigator.com/ko/terms',
        'x-default': 'https://nearshorenavigator.com/en/terms',
      }
    }
  };
}

export default function Page() {
  return <TermsClient />;
}
