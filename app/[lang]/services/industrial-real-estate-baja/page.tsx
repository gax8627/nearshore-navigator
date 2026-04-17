import { Metadata } from 'next';
import RealEstateClient from './RealEstateClient';
import { getDictionary } from '@/app/i18n/get-dictionary';


export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);

  const title = lang === 'en'
    ? 'Industrial Real Estate Tijuana & Baja California | Class A Parks | 2026 Guide'
    : `${dict.realEstatePage.heroTitle} ${dict.realEstatePage.heroTitleHighlight} | Nearshore Navigator`;

  const description = lang === 'en'
    ? 'Class A industrial parks in Tijuana and Baja California: Pacifico, El Florido, Finsa, Nordika. Lease rates from $0.47–$1.10/sqft NNN. Built-to-suit available. 20 min from San Diego. Nearshore Navigator negotiates your facility — no developer commissions.'
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
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/industrial-real-estate-baja',
        'es': 'https://nearshorenavigator.com/es/services/industrial-real-estate-baja',
        'x-default': 'https://nearshorenavigator.com/en/services/industrial-real-estate-baja',
      }
    }
  };
}

export default function IndustrialRealEstatePage() {
  return <RealEstateClient />;
}
