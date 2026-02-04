import { notFound } from "next/navigation";
import { getLocation, getService } from "@/app/constants/seo-data";
import ServiceLocationClient from "./ServiceLocationClient";

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

  const titles = [
    `${service.title} in ${location.name} | Nearshore Navigator`,
    `${location.name} ${service.title} Solutions & Consulting`,
    `Expanding to ${location.name}? ${service.title} Full Guide`
  ];

  return {
    title: titles[0],
    description: `Expert ${service.title.toLowerCase()} services in ${location.name}, ${location.state}. ${location.description}. We provide full support for ${service.title.toLowerCase()} including site selection and local compliance.`,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/locations/${city}/${serviceParam}`
    }
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { city, service: serviceParam } = await params;
  const location = getLocation(city);
  const service = getService(serviceParam);

  if (!location || !service) {
    notFound();
  }

  return <ServiceLocationClient city={city} serviceId={serviceParam} />;
}
