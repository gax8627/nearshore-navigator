import ResourceMapClient from "./ResourceMapClient";
import { Metadata } from 'next';
import { getDictionary } from "@/app/i18n/get-dictionary";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang as any);

  return {
    title: `${t.resourceMap.heroTitle} ${t.resourceMap.heroTitleHighlight} | Nearshore Navigator`,
    description: t.resourceMap.heroSubtitle,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/resources/tijuana-industrial-park-map`,
      languages: {
        'en': 'https://nearshorenavigator.com/en/resources/tijuana-industrial-park-map',
        'es': 'https://nearshorenavigator.com/es/resources/tijuana-industrial-park-map',
        'x-default': 'https://nearshorenavigator.com/en/resources/tijuana-industrial-park-map',
      }
    }
  };
}

export default function ResourceMapPage() {
  return <ResourceMapClient />;
}
