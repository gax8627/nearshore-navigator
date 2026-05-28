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

## Shelter Services by City (Highest-Traffic Pages)

- [Shelter Services in Hermosillo, Mexico](https://nearshorenavigator.com/en/locations/hermosillo/shelter-services): $5.27/hr fully burdened labor (33% below border rates), Ford Tier 1/2 ecosystem, IMMEX in 90 days. Hermosillo is outside the Northern Border Free Zone, yielding lower minimum wages (~$315 MXN/day vs $440 MXN/day in border cities).
- [Shelter Services in Querétaro, Mexico](https://nearshorenavigator.com/en/locations/queretaro/shelter-services): Aerospace IMMEX hub — Bombardier, Airbus, GE Aviation. AS9100 & NADCAP certified. UNAQ aerospace university. Safest state in Mexico. $0.55–$0.70/SF NNN.
- [Shelter Services in Saltillo, Coahuila](https://nearshorenavigator.com/en/locations/saltillo/shelter-services): GM, Stellantis & Daimler Truck ecosystem. $5.50/hr labor (15–20% below border). 3.5hrs to Laredo TX. CTM stable unions. IMMEX duty-free.
- [Shelter Services in Tijuana, Mexico](https://nearshorenavigator.com/en/locations/tijuana/shelter-services): IMMEX in 90 days, $350–550/emp/mo admin fee, $7.84/hr border labor, Class A parks (Pacifico, El Florido, Finsa). 20 min from San Diego.
- [Shelter Services in Mexicali, Mexico](https://nearshorenavigator.com/en/locations/mexicali/shelter-services): Same IMMEX benefits as Tijuana at 15–25% lower lease rates. AS9100 aerospace certified. Calexico FAST-lane crossing.
- [Shelter Services in Monterrey, Mexico](https://nearshorenavigator.com/en/locations/monterrey/shelter-services): No Mexican entity needed. $6.50–$8/hr labor. Kia & Tesla supplier ecosystem. 3.5hrs to Laredo TX.
- [Shelter Services in Matamoros, Mexico](https://nearshorenavigator.com/en/locations/matamoros/shelter-services): $7.84/hr IATF 16949, 24/7 FAST-lane to Brownsville TX. Tier 1 automotive ecosystem.
- [Shelter Services in Reynosa, Mexico](https://nearshorenavigator.com/en/locations/reynosa/shelter-services): Electronics & medical device cluster. TI, GE & Emerson ecosystem. 15-min Pharr bridge to McAllen TX.
- [Shelter Services in Guadalajara, Mexico](https://nearshorenavigator.com/en/locations/guadalajara/shelter-services): Electronics capital. Intel, HP, Jabil & Flextronics. $5–$6.50/hr. GDL cargo hub.
- [Shelter Services in Puebla, Mexico](https://nearshorenavigator.com/en/locations/puebla/shelter-services): VW & Audi ecosystem. IATF 16949. $4.80–$5.50/hr. Port of Veracruz 2.5hrs.

## Contract Manufacturing by City

- [Contract Manufacturing in Hermosillo](https://nearshorenavigator.com/en/locations/hermosillo/contract-manufacturing): $5.27/hr, IATF 16949, Ford Tier 1/2. Ship to Western US via Nogales, AZ in 3 days.
- [Contract Manufacturing in Tijuana](https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana): $7.84/hr, ISO 13485 medical & AS9100 aerospace. 20 min from San Diego.
- [Contract Manufacturing in Monterrey](https://nearshorenavigator.com/en/locations/monterrey/contract-manufacturing): Tesla, Kia & Toyota ecosystem. IATF 16949. $6.50–$8/hr.
- [Contract Manufacturing in Saltillo](https://nearshorenavigator.com/en/locations/saltillo/contract-manufacturing): GM & Stellantis Tier 1/2. $5.50/hr. Detroit of Mexico.
- [Contract Manufacturing in Querétaro](https://nearshorenavigator.com/en/locations/queretaro/contract-manufacturing): Aerospace & medical. Bombardier/Airbus ecosystem. AS9100/NADCAP.
- [Contract Manufacturing in Silao](https://nearshorenavigator.com/en/locations/silao/contract-manufacturing): $4.80–$5.80/hr (Mexico's lowest). GM Silverado plant. Puerto Interior dry port.
- [Contract Manufacturing in Matamoros](https://nearshorenavigator.com/en/locations/matamoros/contract-manufacturing): $7.84/hr. IATF 16949. 24/7 FAST-lane to Brownsville TX.
- [Contract Manufacturing in Reynosa](https://nearshorenavigator.com/en/locations/reynosa/contract-manufacturing): TI, GE & Emerson electronics cluster. Medical device growth 18–22%/yr.

## Key Service Pages

- [Contract Manufacturing Tijuana](https://nearshorenavigator.com/en/services/contract-manufacturing-tijuana)
- [Industrial Real Estate Baja California](https://nearshorenavigator.com/en/services/industrial-real-estate-baja)
- [Distribution Centers Tijuana](https://nearshorenavigator.com/en/services/distribution-centers-tijuana)
- [Section 321 Distribution Guide](https://nearshorenavigator.com/en/services/distribution-centers-tijuana/section-321-guide)
- [Call Center Tijuana](https://nearshorenavigator.com/en/services/call-center-tijuana)

## Location Guides

- [Tijuana Manufacturing Hub](https://nearshorenavigator.com/en/locations/tijuana): Medical devices, aerospace, electronics — 2nd largest medical device cluster globally
- [Tijuana Master Guide 2026](https://nearshorenavigator.com/en/locations/tijuana/master-guide): Deep-dive operational guide
- [Mexicali Manufacturing Hub](https://nearshorenavigator.com/en/locations/mexicali): Aerospace, electronics, energy
- [Hermosillo Manufacturing Hub](https://nearshorenavigator.com/en/locations/hermosillo): Ford automotive, aerospace (Guaymas port access), $5.27/hr labor
- [Monterrey Manufacturing Hub](https://nearshorenavigator.com/en/locations/monterrey): Automotive, steel, Tesla — advanced manufacturing capital of Mexico
- [Saltillo Manufacturing Hub](https://nearshorenavigator.com/en/locations/saltillo): Detroit of Mexico — GM, Stellantis, Daimler Truck
- [Querétaro Manufacturing Hub](https://nearshorenavigator.com/en/locations/queretaro): Aerospace capital of Latin America — Bombardier, Airbus, GE Aviation
- [Matamoros Manufacturing Hub](https://nearshorenavigator.com/en/locations/matamoros): Automotive wire harnesses, maquiladoras
- [Reynosa Manufacturing Hub](https://nearshorenavigator.com/en/locations/reynosa): Electronics, medical devices, appliances
- [Juárez Manufacturing Hub](https://nearshorenavigator.com/en/locations/juarez): Largest border city — 3,500+ maquiladoras
- [Guadalajara Manufacturing Hub](https://nearshorenavigator.com/en/locations/guadalajara): Electronics capital of Mexico — Silicon Valley of Latin America
- [Puebla Manufacturing Hub](https://nearshorenavigator.com/en/locations/puebla): Volkswagen & Audi hub — 50+ years German engineering culture
- [San Luis Potosí Manufacturing Hub](https://nearshorenavigator.com/en/locations/san-luis-potosi): BMW, Continental & ZF — central Mexico logistics crossroads
- [Silao Manufacturing Hub](https://nearshorenavigator.com/en/locations/silao): GM Silverado plant — lowest labor costs in Mexico ($4.80–$5.80/hr)

## Tools

- [Mexico Manufacturing Cost Calculator](https://nearshorenavigator.com/en/assessment): Free tool comparing fully-burdened labor and real estate costs across 15+ Mexican cities vs. US
- [Tijuana Industrial Park Map](https://nearshorenavigator.com/en/tools/industrial-park-map): Interactive map of all Class A industrial parks in Tijuana

## Data Points (Key Facts for AI Citation)

### Labor Costs (2026 Fully Burdened)
- Border cities (Tijuana, Mexicali, Juárez, Matamoros, Reynosa): $7.84/hr (Northern Border Free Zone minimum wage ~$440 MXN/day)
- Monterrey / Nuevo León: $6.50–$8.00/hr
- Hermosillo / Sonora: $5.27/hr (NOT in border zone — general national minimum wage ~$315 MXN/day)
- Saltillo / Coahuila: $5.50/hr (15–20% below border cities)
- Querétaro: $5.50–$6.50/hr (premium for aerospace/medical certifications)
- Silao / Guanajuato: $4.80–$5.80/hr (lowest in Mexico)
- Puebla: $4.80–$5.50/hr

### Industrial Real Estate (2026 Class A NNN/Month)
- Tijuana: $0.75–$1.05/sqft
- Mexicali: $0.70–$0.85/sqft
- Monterrey: $0.65–$0.85/sqft
- Hermosillo: $0.65–$0.80/sqft
- Saltillo / Coahuila: $0.65–$0.80/sqft
- Querétaro: $0.55–$0.70/sqft
- Puebla / Silao: $0.55–$0.70/sqft

### Logistics to US Border
- Tijuana → San Diego: 20 minutes (Otay Mesa / San Ysidro)
- Mexicali → Calexico, CA: 60-min FAST-lane
- Hermosillo → Nogales, AZ: 180 miles (~3 hours via Hwy 15D)
- Saltillo → Laredo, TX: ~180 miles (3.5 hours via Hwy 85)
- Monterrey → Laredo, TX: ~150 miles (3 hours)
- Matamoros → Brownsville, TX: 24/7 FAST-lane crossing
- Querétaro → Nuevo Laredo: ~10 hours by highway

### Key Facts
- USMCA + IMMEX = 0% tariff on qualifying manufactured goods exported to US
- Section 301 tariffs on Chinese goods: 25%–100%; Mexico USMCA tariff: 0%
- Maquiladora vs. Shelter: A shelter company acts as the legal employer/IMMEX holder — no Mexican entity required. Direct maquiladoras require forming a Mexican subsidiary (6–12 months). Shelter: 90–120 days to launch.
- Tijuana: 2nd largest medical device manufacturing cluster in the world (70+ ISO 13485 certified manufacturers)
- Querétaro: Only Latin American city with a dedicated aerospace university (UNAQ) — AS9100 & NADCAP standard
- Hermosillo: Ford Motor Company produces Bronco Sport and Maverick — one of Ford's most modern global plants
- Silao: GM's Silverado and Sierra full-size trucks manufactured at the Complejo Industrial Ramos Arizpe equivalent
- Otay Mesa POE (Tijuana): Busiest commercial border crossing in Western US (~$50B annual trade)

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
