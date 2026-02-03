import { notFound } from "next/navigation";
import { getLocation, getService } from "@/app/constants/seo-data";
import ServiceLocationClient from "./ServiceLocationClient";

type Props = {
  params: {
    lang: string;
    city: string;
    service: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const location = getLocation(params.city);
  const service = getService(params.service);
  
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
      canonical: `https://nearshorenavigator.com/${params.lang}/locations/${params.city}/${params.service}`
    }
  };
}

export default function ServiceLocationPage({ params }: Props) {
  const location = getLocation(params.city);
  const service = getService(params.service);

  if (!location || !service) {
    notFound();
  }

  return <ServiceLocationClient city={params.city} serviceId={params.service} />;
}
