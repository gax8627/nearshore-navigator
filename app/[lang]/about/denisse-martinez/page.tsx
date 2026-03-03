import { getDictionary } from '@/app/i18n/get-dictionary';
import { Metadata } from 'next';
import DenisseBioClient from './DenisseBioClient';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.bio_denisse?.title || 'Meet Denisse Martinez | Nearshore Consultant in Baja California',
    description: dict.bio_denisse?.backgroundDesc?.substring(0, 160) || 'Expert nearshore consultant in Baja California, helping US manufacturers with site selection, shelter services, and cross-border strategic expansion.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/about/denisse-martinez`
    }
  };
}

export default async function DenisseBioPage({ params }: Props) {
  const { lang } = await params;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Denisse Martinez",
    "jobTitle": "Marketing Director & Advisor",
    "url": "https://nearshorenavigator.com/about/denisse-martinez",
    "image": "https://nearshorenavigator.com/images/denisse-martinez.png",
    "sameAs": [
      "https://www.linkedin.com/in/denisse-martinez"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "url": "https://nearshorenavigator.com"
    },
    "description": "Expert nearshore consultant in Baja California, helping US manufacturers with site selection, shelter services, and cross-border strategic expansion."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <DenisseBioClient />
    </>
  );
}
