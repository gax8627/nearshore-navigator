import { notFound } from "next/navigation";
import { getLocation } from "@/app/constants/seo-data";
import CityOverviewClient from "./CityOverviewClient";

type Props = {
  params: {
    lang: string;
    city: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const location = getLocation(params.city);
  if (!location) return {};

  return {
    title: `Manufacturing in ${location.name} | Nearshore Navigator`,
    description: `Explore manufacturing opportunities in ${location.name}, ${location.state}. ${location.description}`,
  };
}

export default function CityOverviewPage({ params }: Props) {
  const location = getLocation(params.city);

  if (!location) {
    notFound();
  }

  return <CityOverviewClient city={params.city} />;
}
