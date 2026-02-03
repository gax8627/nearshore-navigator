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

  return {
    title: `${service.title} in ${location.name} | Nearshore Navigator`,
    description: `Everything you need to know about ${service.title.toLowerCase()} in ${location.name}. ${service.description}`,
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
