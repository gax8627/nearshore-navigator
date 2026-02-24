import { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Mexico Location Assessment | Cost Estimator | Nearshore Navigator',
    description: 'Get a detailed data-backed analysis of your potential operating costs in Mexico. Labor, Real Estate, and Utility modeling for your expansion.',
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
        'x-default': 'https://nearshorenavigator.com/en/assessment',
      }
    }
  };
}

export default function AssessmentPage() {
  return <AssessmentClient />;
}
