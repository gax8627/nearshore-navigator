import { InsightsClient } from "./InsightsClient";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as any);
  return {
    title: `Baja California Market Insights & Nearshoring Analysis | Nearshore Navigator`,
    description: 'In-depth analysis of the Baja California industrial market: labor costs, real estate trends, tariff impacts, and nearshoring strategy for US manufacturers.',
    openGraph: {
      title: `Baja California Market Insights | Nearshore Navigator`,
      description: 'In-depth analysis of the Baja California industrial market: labor costs, real estate trends, tariff impacts, and nearshoring strategy for US manufacturers.',
      images: ['https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000'],
    },
    alternates: {
      canonical: `https://nearshorenavigator.com/en/insights`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/insights',
        'es': 'https://nearshorenavigator.com/es/insights',
        'fr': 'https://nearshorenavigator.com/fr/insights',
        'de': 'https://nearshorenavigator.com/de/insights',
        'ja': 'https://nearshorenavigator.com/ja/insights',
        'zh': 'https://nearshorenavigator.com/zh/insights',
        'ko': 'https://nearshorenavigator.com/ko/insights',
        'it': 'https://nearshorenavigator.com/it/insights',
        'pt': 'https://nearshorenavigator.com/pt/insights',
        'ru': 'https://nearshorenavigator.com/ru/insights',
        'x-default': 'https://nearshorenavigator.com/en/insights',
      }
    }
  };
}

export default function page() {
  return <InsightsClient />;
}
