import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';
import CostCalculatorClient from './CostCalculatorClient';

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
    alternates: {
      canonical: `https://nearshorenavigator.com/en/tools/cost-calculator`
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
