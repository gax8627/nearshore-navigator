import { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Mexico Manufacturing Cost Calculator | Free Location Assessment | Nearshore Navigator',
    description: 'Calculate your real operating costs in Tijuana vs. US manufacturing. Instant labor, real estate, and utility cost modeling for Baja California expansion.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/assessment`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/assessment',
        'es': 'https://nearshorenavigator.com/es/assessment',
        'fr': 'https://nearshorenavigator.com/fr/assessment',
        'de': 'https://nearshorenavigator.com/de/assessment',
        'ja': 'https://nearshorenavigator.com/ja/assessment',
        'zh': 'https://nearshorenavigator.com/zh/assessment',
        'ko': 'https://nearshorenavigator.com/ko/assessment',
        'it': 'https://nearshorenavigator.com/it/assessment',
        'pt': 'https://nearshorenavigator.com/pt/assessment',
        'ru': 'https://nearshorenavigator.com/ru/assessment',
        'x-default': 'https://nearshorenavigator.com/en/assessment',
      }
    }
  };
}

export default function AssessmentPage() {
  return <AssessmentClient />;
}
