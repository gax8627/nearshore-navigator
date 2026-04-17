import BrochureClient from "./BrochureClient";
import { Metadata } from 'next';
import { getDictionary } from "@/app/i18n/get-dictionary";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang);

  return {
    title: `${t.brochure.title} | Nearshore Navigator`,
    description: t.brochure.subtitle,
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

export default async function BrochurePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  return <BrochureClient />;
}
