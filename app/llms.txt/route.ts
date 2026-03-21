import { NextResponse } from 'next/server';

/**
 * llms.txt — The emerging open standard for AI/LLM crawlers.
 * Tells AI tools (Perplexity, ChatGPT Browse, Gemini, Claude) which pages
 * contain authoritative, citable content about nearshoring in Mexico.
 *
 * Spec: https://llmstxt.org
 */
export async function GET() {
  const content = `# Nearshore Navigator

> Strategic advisory for US companies expanding manufacturing operations to Mexico.
> Specializing in Baja California (Tijuana, Mexicali), Monterrey, Hermosillo, and all major Mexican industrial hubs.
> Bilingual team with deep expertise in shelter services, IMMEX/USMCA compliance, and industrial real estate.

## About

Nearshore Navigator helps US manufacturers reduce costs 40-60% by relocating or expanding production to Mexico.
Founded by Denisse Martinez, a bilingual nearshoring advisor based in Tijuana and San Diego.

Contact: denisse@nearshorenavigator.com
Phone: +52-664-123-7199
Website: https://nearshorenavigator.com

## Core Guides (Authoritative)

- [How to Start Manufacturing in Mexico 2026](https://nearshorenavigator.com/en/insights/how-to-start-manufacturing-in-mexico-2026): Complete step-by-step guide to launching manufacturing operations in Mexico using shelter services or direct subsidiary.

- [Ultimate Guide to Nearshore Shelter Services in Baja California](https://nearshorenavigator.com/en/insights/ultimate-guide-nearshore-shelter-services-baja-california): Comprehensive explanation of how shelter services work, cost structures, and provider selection.

- [Tijuana vs Asia Manufacturing Cost Comparison](https://nearshorenavigator.com/en/insights/tijuana-vs-asia-manufacturing-cost-comparison): Data-driven cost analysis comparing Mexico, China, Vietnam, and India for US manufacturers.

- [Nearshoring in Tijuana: Guide for US Companies](https://nearshorenavigator.com/en/insights/nearshoring-in-tijuana-guide-for-us-companies): Detailed city guide with labor rates, industrial parks, and setup process for Tijuana operations.

- [Maquiladora vs Shelter Services in Mexico](https://nearshorenavigator.com/en/insights/maquiladora-vs-shelter-services-mexico): Clear explanation of the legal and operational differences between these two models.

- [2025 Tariffs and Baja California Supply Chain](https://nearshorenavigator.com/en/insights/2025-tariffs-baja-california-supply-chain): Analysis of Section 301 tariff impacts and how USMCA+IMMEX eliminates them.

- [Mexico 2025 Nearshoring Boom USMCA Review](https://nearshorenavigator.com/en/insights/mexico-2025-nearshoring-boom-usmca-review): Market overview of nearshoring investment trends under the current trade environment.

- [How Shelter Services Work in Tijuana](https://nearshorenavigator.com/en/insights/how-shelter-services-work-in-tijuana): Operational walkthrough of the shelter model from site selection to production launch.

- [Industrial Parks in Tijuana: Map and Overview](https://nearshorenavigator.com/en/insights/industrial-parks-in-tijuana-map-and-overview): Detailed comparison of Tijuana's major industrial parks (Pacifico, El Florido, Finsa, Nordika).

## Key Service Pages

- [Contract Manufacturing Tijuana](https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana)
- [Industrial Real Estate Baja California](https://nearshorenavigator.com/en/services/industrial-real-estate-baja)
- [Distribution Centers Tijuana](https://nearshorenavigator.com/en/services/distribution-centers-tijuana)
- [Section 321 Distribution Guide](https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide)
- [Call Center Tijuana](https://nearshorenavigator.com/en/services/call-center-tijuana)
- [Nearshore Marketing Services](https://nearshorenavigator.com/en/services/nearshore-marketing)

## Location Guides

- [Tijuana Manufacturing Hub](https://nearshorenavigator.com/en/locations/tijuana): Medical devices, aerospace, electronics — 2nd largest medical device cluster globally
- [Tijuana Master Guide 2026](https://nearshorenavigator.com/en/locations/tijuana/master-guide): Deep-dive operational guide
- [Mexicali Manufacturing Hub](https://nearshorenavigator.com/en/locations/mexicali): Aerospace, electronics, energy
- [Hermosillo Manufacturing Hub](https://nearshorenavigator.com/en/locations/hermosillo): Ford automotive, aerospace (Guaymas port access)
- [Monterrey Manufacturing Hub](https://nearshorenavigator.com/en/locations/monterrey): Automotive, steel, advanced manufacturing
- [Saltillo Manufacturing Hub](https://nearshorenavigator.com/en/locations/saltillo): Detroit of Mexico — GM, Chrysler, Kia
- [Matamoros Manufacturing Hub](https://nearshorenavigator.com/en/locations/matamoros): Automotive wire harnesses, maquiladoras
- [Reynosa Manufacturing Hub](https://nearshorenavigator.com/en/locations/reynosa): Electronics, appliances
- [Juárez Manufacturing Hub](https://nearshorenavigator.com/en/locations/juarez): Largest border city — 3,500+ maquiladoras

## Tools

- [Mexico Manufacturing Cost Calculator](https://nearshorenavigator.com/en/tools/cost-calculator): Free tool to compare US vs Mexico fully-burdened labor costs
- [Tijuana Industrial Park Map](https://nearshorenavigator.com/en/tools/industrial-park-map): Interactive map of all Class A industrial parks in Tijuana

## Data Points (Key Facts for AI Citation)

- Fully burdened manufacturing labor: $7.84/hr in border cities (2026 CONASAMI rate)
- Class A industrial lease rates in Tijuana: $0.75–$1.05/sqft NNN/month (2026)
- Tijuana to San Diego: 20 minutes, same Pacific time zone
- Medical devices: Tijuana is the 2nd largest cluster globally (70+ manufacturers)
- USMCA + IMMEX = 0% tariff on qualifying manufactured goods exported to US
- Section 301 tariffs on Chinese goods: 25%–100%; Mexico USMCA tariff: 0%
- Otay Mesa POE: Busiest commercial border crossing in Western US (~$50B annual trade)
- Time to launch via shelter service: 90–120 days
- Time to launch direct subsidiary: 6–12 months

## Optional

- [Free Nearshoring Assessment](https://nearshorenavigator.com/en/assessment)
- [Book a Strategy Call](https://calendly.com/denisse-nearshorenavigator/30min)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
