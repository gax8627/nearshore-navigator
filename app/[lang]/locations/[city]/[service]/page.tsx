import { notFound } from "next/navigation";
import { getLocation, getService } from "@/app/constants/seo-data";
import ServiceLocationClient from "./ServiceLocationClient";
import { getLocalizedSeoContent } from "@/app/i18n/get-seo-content";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
    service: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang, city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);
  
  if (!location || !service) return {};

  const localized = await getLocalizedSeoContent(lang, city, serviceParam);

  const title = localized 
    ? `Trusted ${localized.service.title} in ${localized.location.name} | 2026 Guide`
    : `Trusted ${service.title} in ${location.name} | 2026 Guide`;

  const description = localized?.service.description || 
    `Verified ${service.title.toLowerCase()} partners in ${location.name}. Reduce costs 40-60% with our objective broker network. Get your 2026 expansion roadmap.`;

  const canonicalUrl = `https://nearshorenavigator.com/${lang}/locations/${city}/${serviceParam}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://nearshorenavigator.com/en/locations/${city}/${serviceParam}`,
        'es': `https://nearshorenavigator.com/es/locations/${city}/${serviceParam}`,
        'fr': `https://nearshorenavigator.com/fr/locations/${city}/${serviceParam}`,
        'de': `https://nearshorenavigator.com/de/locations/${city}/${serviceParam}`,
        'ja': `https://nearshorenavigator.com/ja/locations/${city}/${serviceParam}`,
        'zh': `https://nearshorenavigator.com/zh/locations/${city}/${serviceParam}`,
        'ko': `https://nearshorenavigator.com/ko/locations/${city}/${serviceParam}`,
        'it': `https://nearshorenavigator.com/it/locations/${city}/${serviceParam}`,
        'pt': `https://nearshorenavigator.com/pt/locations/${city}/${serviceParam}`,
        'ru': `https://nearshorenavigator.com/ru/locations/${city}/${serviceParam}`,
        'x-default': `https://nearshorenavigator.com/en/locations/${city}/${serviceParam}`,
      }
    }
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { lang, city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);

  if (!location || !service) {
    notFound();
  }

  const localizedData = await getLocalizedSeoContent(lang, city, serviceParam);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the benefits of ${service.title.toLowerCase()} in ${location.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Manufacturers in ${location.name} benefit from 40-60% labor savings, strict IP protection, and proximity to the US supply chain. We provide trusted operators.`
        }
      },
      {
        "@type": "Question",
        "name": `How fast can we start ${service.title.toLowerCase()} operations in ${location.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `With our verified network of partners in ${location.name}, ${location.state}, initial pilot production can often begin within 60 to 90 days.`
        }
      },
      {
        "@type": "Question",
        "name": `Are facilities in ${location.name} certified for US exports?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, our verified partners in ${location.name} maintain ISO 9001, AS9100, and ISO 13485 certifications depending on your industry requirements.`
        }
      },
      {
        "@type": "Question",
        "name": `Why choose a broker for ${location.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `An objective broker evaluates the entire ${location.name} market to find the best-fit partner for your volume and quality requirements without conflict of interest.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <ServiceLocationClient city={city} serviceId={serviceParam} localizedData={localizedData} />
    </>
  );
}
