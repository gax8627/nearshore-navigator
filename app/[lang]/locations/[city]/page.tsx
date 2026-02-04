import { notFound } from "next/navigation";
import { getLocation } from "@/app/constants/seo-data";
import CityOverviewClient from "./CityOverviewClient";

type Props = {
  params: Promise<{
    lang: string;
    city: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang, city } = await params;
  const location = getLocation(city);
  
  if (!location) return {};

  return {
    title: `Manufacturing in ${location.name}, ${location.state} | Nearshore Navigator`,
    description: `Complete guide to industrial manufacturing in ${location.name}. Access ${location.name}'s skilled workforce, industrial parks, and proximity to major US markets.`,
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/locations/${city}`
    }
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const location = getLocation(city);

  if (!location) {
    notFound();
  }

  return <CityOverviewClient city={city} />;
}
