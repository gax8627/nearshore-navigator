import { Metadata } from 'next';
import RealEstateClient from './RealEstateClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Industrial Real Estate in Baja California | Class A Warehouses & Parks',
    description: 'Find Class A industrial space, build-to-suit, and warehouse leasing in Tijuana and Baja California. 75M+ sq ft of inventory starting at $0.75/sqft/mo.',
    openGraph: {
      title: 'Industrial Real Estate in Baja California | Nearshore Navigator',
      description: 'Class A industrial parks, build-to-suit, and warehouse leasing in Tijuana and Baja California, Mexico.',
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/services/industrial-real-estate-baja`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/services/industrial-real-estate-baja',
        'es': 'https://nearshorenavigator.com/es/services/industrial-real-estate-baja',
        'fr': 'https://nearshorenavigator.com/fr/services/industrial-real-estate-baja',
        'de': 'https://nearshorenavigator.com/de/services/industrial-real-estate-baja',
        'ja': 'https://nearshorenavigator.com/ja/services/industrial-real-estate-baja',
        'zh': 'https://nearshorenavigator.com/zh/services/industrial-real-estate-baja',
        'ko': 'https://nearshorenavigator.com/ko/services/industrial-real-estate-baja',
        'x-default': 'https://nearshorenavigator.com/en/services/industrial-real-estate-baja',
      }
    }
  };
}

export default function IndustrialRealEstatePage() {
  return <RealEstateClient />;
}
