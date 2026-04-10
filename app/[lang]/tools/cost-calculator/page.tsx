import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';
import CostCalculatorClient from './CostCalculatorClient';
import { NOINDEX_LOCALES } from '@/app/constants/seo-config';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.cost_calculator?.metaTitle || 'Baja California Manufacturing Cost Calculator | Nearshore Navigator',
    description: dict.cost_calculator?.metaDesc || 'Estimate your fully-burdened manufacturing costs in Baja California vs. US domestic. Free interactive tool.',
    robots: NOINDEX_LOCALES.has(lang) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: NOINDEX_LOCALES.has(lang)
        ? 'https://nearshorenavigator.com/en/tools/cost-calculator'
        : `https://nearshorenavigator.com/${lang}/tools/cost-calculator`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/tools/cost-calculator',
        'es': 'https://nearshorenavigator.com/es/tools/cost-calculator',
        'fr': 'https://nearshorenavigator.com/fr/tools/cost-calculator',
        'de': 'https://nearshorenavigator.com/de/tools/cost-calculator',
        'ja': 'https://nearshorenavigator.com/ja/tools/cost-calculator',
        'zh': 'https://nearshorenavigator.com/zh/tools/cost-calculator',
        'ko': 'https://nearshorenavigator.com/ko/tools/cost-calculator',
        'it': 'https://nearshorenavigator.com/it/tools/cost-calculator',
        'pt': 'https://nearshorenavigator.com/pt/tools/cost-calculator',
        'ru': 'https://nearshorenavigator.com/ru/tools/cost-calculator',
        'x-default': 'https://nearshorenavigator.com/en/tools/cost-calculator',
      }
    }
  };
}

export default async function CostCalculatorPage({ params }: Props) {
  const { lang } = await params;

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Baja California Manufacturing Cost Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Denisse Martinez",
      "url": "https://nearshorenavigator.com/about/denisse-martinez"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <CostCalculatorClient language={lang} />
    </>
  );
}
