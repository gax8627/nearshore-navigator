import { Metadata } from 'next';
import AssessmentClient from './AssessmentClient';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Mexico Manufacturing Cost Calculator | Free Location Assessment | Nearshore Navigator',
    description: 'Free Mexico manufacturing cost calculator. Model labor ($4.80–$7.84/hr), real estate, and utility costs across 15+ cities — Tijuana, Monterrey, Hermosillo, Querétaro, and more. Compare Mexico vs. US in 60 seconds.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/assessment`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/assessment',
        'es': 'https://nearshorenavigator.com/es/assessment',
        'x-default': 'https://nearshorenavigator.com/en/assessment',
      }
    }
  };
}

export default function AssessmentPage() {
  return <AssessmentClient />;
}
