import { getAlternateLanguages } from '@/app/constants/seo-config';
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
      languages: getAlternateLanguages('/terms')
    }
  };
}

export default function Page() {
  return <TermsClient />;
}
