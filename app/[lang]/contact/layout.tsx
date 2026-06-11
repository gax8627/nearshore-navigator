import { getAlternateLanguages } from '@/app/constants/seo-config';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Contact Nearshore Navigator | Free Mexico Manufacturing Consultation',
    description: 'Book a free consultation about nearshoring to Baja California. Talk to our experts about factory setup, cost savings, and industrial site selection in Tijuana.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/contact`,
      languages: getAlternateLanguages('/contact')
    }
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
