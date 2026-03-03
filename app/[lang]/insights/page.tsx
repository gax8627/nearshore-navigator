import { InsightsClient } from "./InsightsClient";
import { getDictionary } from "@/app/i18n/get-dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as any);
  return {
    title: `${dict.insights.title} | Nearshore Navigator`,
    description: dict.insights.subtitle,
    openGraph: {
      title: `${dict.insights.title} | Nearshore Navigator`,
      description: dict.insights.subtitle,
      images: ['https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000'],
    },
  };
}

export default function page() {
  return <InsightsClient />;
}
