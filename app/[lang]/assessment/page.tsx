import { getAlternateLanguages } from '@/app/constants/seo-config';
import { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Mexico Manufacturing Cost Calculator | Free Assessment',
    description: 'Free Mexico manufacturing calculator. Model estimated labor rates ($4.80–$8.50/hr) and operational costs across 15+ cities — Tijuana, Monterrey, Hermosillo, Querétaro. Compare Mexico vs. US.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/assessment`,
      languages: getAlternateLanguages('/assessment')
    }
  };
}

export default function AssessmentPage() {
  return <AssessmentClient />;
}
