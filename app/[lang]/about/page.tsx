import AboutClient from "./AboutClient";
import { Metadata } from 'next';
import { getDictionary } from '@/app/i18n/get-dictionary';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: `${dict.about.title} | Nearshore Navigator`,
    description: dict.about.metaDescription || 'Learn more about Nearshore Navigator and our mission to support manufacturing expansion in Mexico.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/about`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/about',
        'es': 'https://nearshorenavigator.com/es/about',
        'x-default': 'https://nearshorenavigator.com/en/about',
      }
    }
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
