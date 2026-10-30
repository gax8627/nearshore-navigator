import fs from "fs";
import path from "path";
import { getLocation, getService } from "@/app/constants/seo-data";

export async function getLocalizedSeoContent(lang: string, city: string, serviceParam: string) {
  const location = getLocation(city);
  const service = getService(serviceParam);

  if (!location || !service) return null;

  // Default to English if anything fails
  let localeData: any = {};
  try {
    const localePath = path.join(process.cwd(), "app/i18n/locales", `${lang}.json`);
    const fileContents = fs.readFileSync(localePath, "utf8");
    localeData = JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading locale data for ${lang}:`, error);
  }

  // Map service parameter to localized services dictionary or industries
  const serviceKeyMap: Record<string, string> = {
    'contract-manufacturing': 'contract',
    'shelter-services': 'shelter',
    'customs-brokerage': 'customs',
    'distribution-centers': 'logistics',
    'industrial-real-estate': 'real_estate',
  };

  const mappedKey = serviceKeyMap[serviceParam] || serviceParam;
  const localizedService = localeData.services?.[mappedKey] || localeData.industries?.[serviceParam] || {};
  const localizedMatrix = localeData.matrix?.[city]?.[serviceParam] || "";

  const localizedTitle = typeof localizedService === 'string'
    ? localizedService
    : (localizedService.name || localizedService.title || service.title);

  const localizedDesc = typeof localizedService === 'object' && localizedService.description
    ? localizedService.description
    : (localeData.services?.[`${mappedKey}_desc`] || service.description);

  // Return a merged object
  return {
    location: {
      ...location,
      name: location.name,
      state: location.state,
    },
    service: {
      ...service,
      title: localizedTitle,
      description: localizedDesc,
    },
    matrixContent: localizedMatrix || "",
    marketOpportunity: localizedService.marketOpportunity || "",
    laborProfile: localizedService.laborProfile || "",
    logisticsEdge: localizedService.logisticsEdge || "",
  };
}
