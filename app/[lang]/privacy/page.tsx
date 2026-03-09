import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  
  return {
    title: 'Privacy Policy | Nearshore Navigator',
    description: 'Privacy policy and data protection practices for Nearshore Navigator.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/privacy`,
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
