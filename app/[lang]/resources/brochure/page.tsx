import BrochureClient from "./BrochureClient";
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Nearshore Navigator Brochure | Download PDF',
    description: 'Download our comprehensive guide to manufacturing in Baja California. Services, statistics, and strategic advantages.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/resources/brochure`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources/brochure',
        'es': 'https://nearshorenavigator.com/es/resources/brochure',
        'x-default': 'https://nearshorenavigator.com/en/resources/brochure',
      }
    }
  };
}

export default function BrochurePage() {
  return <BrochureClient />;
}
