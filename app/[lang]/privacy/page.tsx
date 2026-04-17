import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';
import { getDictionary } from '@/app/i18n/get-dictionary';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: `${dict.privacy.title} | Nearshore Navigator`,
    description: dict.privacy.metaDescription || 'Legal privacy policy and data protection for Nearshore Navigator.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/privacy`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/privacy',
        'es': 'https://nearshorenavigator.com/es/privacy',
        'x-default': 'https://nearshorenavigator.com/en/privacy',
      }
    }
  };
}

export default function Page() {
  return <PrivacyClient />;
}
