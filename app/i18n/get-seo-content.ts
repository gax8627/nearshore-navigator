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

  // Extract translations from the matrix or industries
  const localizedService = localeData.industries?.[serviceParam] || {};
  const localizedMatrix = localeData.matrix?.[city]?.[serviceParam] || "";

  // Return a merged object
  return {
    location: {
      ...location,
      name: location.name, // Usually city names don't change, but could be localized
      state: location.state,
    },
    service: {
      ...service,
      title: localizedService.name || service.title,
      description: localizedService.description || service.description,
    },
    matrixContent: localizedMatrix || "",
    marketOpportunity: localizedService.marketOpportunity || "",
    laborProfile: localizedService.laborProfile || "",
    logisticsEdge: localizedService.logisticsEdge || "",
  };
}
