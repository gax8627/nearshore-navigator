import ResourcesClient from "./ResourcesClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Industrial Resources & Tools | Nearshore Navigator',
    description: 'Access free tools for manufacturing in Mexico: Tijuana Industrial Map, Cost Estimators, Logistics Questionnaires, and Market Insights.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/resources`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources',
        'es': 'https://nearshorenavigator.com/es/resources',
        'fr': 'https://nearshorenavigator.com/fr/resources',
        'de': 'https://nearshorenavigator.com/de/resources',
        'ja': 'https://nearshorenavigator.com/ja/resources',
        'zh': 'https://nearshorenavigator.com/zh/resources',
        'ko': 'https://nearshorenavigator.com/ko/resources',
        'x-default': 'https://nearshorenavigator.com/en/resources',
      }
    }
  };
}

export default function ResourcesPage() {
  return <ResourcesClient />;
}
