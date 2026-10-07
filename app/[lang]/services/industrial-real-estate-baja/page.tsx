import { getAlternateLanguages } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import RealEstateClient from './RealEstateClient';
import { getDictionary } from '@/app/i18n/get-dictionary';


export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);

  const title = lang === 'en'
    ? 'Industrial Real Estate Tijuana & Baja California | Class A Parks | 2026 Guide'
    : `${dict.realEstatePage.heroTitle} ${dict.realEstatePage.heroTitleHighlight}`;

  const description = lang === 'en'
    ? 'Class A industrial parks in Tijuana and Baja California: Pacifico, El Florido, Finsa, Nordika. Asking rates typically $0.65–$1.05/sqft NNN depending on submarket and building class. Built-to-suit available. Nearshore Navigator provides independent site selection advisory.'
    : dict.realEstatePage.heroSubtitle || 'Find Class A industrial space and warehouse leasing in Baja California.';

  return {
    title,
    description,
    openGraph: {
      title: 'Industrial Real Estate in Baja California | Nearshore Navigator',
      description: 'Class A industrial parks, build-to-suit, and warehouse leasing in Tijuana and Baja California, Mexico.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/industrial-real-estate-baja`,
      languages: getAlternateLanguages('/services/industrial-real-estate-baja')
    }
  };
}

export default function IndustrialRealEstatePage() {
  return <RealEstateClient />;
}
