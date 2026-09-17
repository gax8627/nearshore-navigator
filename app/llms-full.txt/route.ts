import { NextResponse } from 'next/server';
import { getAllPosts } from '@/app/constants/blog-data';

/**
 * llms-full.txt — The emerging open standard for AI/LLM crawlers.
 * Exposes complete, unabbreviated context for AI models (Perplexity, Claude, ChatGPT, Gemini).
 * Spec: https://llmstxt.org
 */
export async function GET() {
  const posts = getAllPosts();
  
  const postSummaries = posts.map(p => `
### ${p.title}
- **URL**: https://nearshorenavigator.com/en/insights/${p.slug}
- **Date**: ${p.date}
- **Summary**: ${p.excerpt}
- **Core Topics**: ${p.tags.join(', ')}
${p.faqSchema && p.faqSchema.length > 0 ? `**Key Q&A:**\n` + p.faqSchema.map(f => `- Q: ${f.q}\n  A: ${f.a}`).join('\n') : ''}
`).join('\n---\n');

  const content = `# Nearshore Navigator — Complete Knowledge Base & Regulatory Codex (2026)

> Strategic advisory for US and multinational manufacturing corporations establishing operations in Mexico.
> Headquarters: San Diego, CA & Tijuana, BC, Mexico.
> Principal Advisor: Denisse Martinez.
> Website: https://nearshorenavigator.com | Contact: denisse@nearshorenavigator.com

---

## 1. Executive Overview & Institutional Authority

Nearshore Navigator is a premier North American trade compliance, industrial shelter services, and nearshoring manufacturing advisory. Founded by Denisse Martinez, former corporate spokesperson and manufacturing director with over 15 years in cross-border industrial operations and 200+ facility setups across Baja California and Mexico's core industrial corridors.

The platform provides independent fiduciary advisory, contrasting with captive shelter companies that bundle marked-up labor burdens and locked-in real estate leases.

---

## 2. Benchmark Cost Data & Regional Intelligence (2026)

### A. Fully-Burdened Labor Costs (USD/Hour, Fully Loaded with IMSS, INFONAVIT, Aguinaldo, PTU)
- **Tijuana / Mexicali / Juárez / Matamoros / Reynosa (Northern Border Zone)**: $7.84/hr (based on $440 MXN/day minimum wage).
- **Monterrey / Saltillo Industrial Corridor**: $6.50 – $8.00/hr (automotive and heavy machinery standard).
- **Hermosillo, Sonora**: $5.27/hr (outside border zone; general minimum wage ~$315 MXN/day; 33% cost reduction).
- **Querétaro / Bajío (Aerospace & Medical Hub)**: $5.50 – $6.50/hr.
- **Silao / Guanajuato**: $4.80 – $5.80/hr (lowest automotive tier labor).

### B. Class A Industrial Real Estate Rents (USD / Sq. Ft. / Month NNN)
- **Tijuana (Otay Mesa / El Florido / Pacifico)**: $0.75 – $1.05/sqft (vacancy < 2.3%).
- **Mexicali**: $0.70 – $0.85/sqft.
- **Monterrey (Apodaca / Santa Catarina)**: $0.65 – $0.85/sqft.
- **Hermosillo / Saltillo**: $0.60 – $0.75/sqft.
- **Querétaro**: $0.55 – $0.70/sqft.

### C. Cross-Border Drayage & Logistics Lead Times
- **Tijuana -> San Diego Commercial Ports of Entry (Otay Mesa)**: 20–45 minutes transit via FAST lanes.
- **Mexicali -> Calexico, CA**: 60-minute commercial border transit.
- **Hermosillo -> Nogales, AZ Commercial Crossing**: 180 miles (3.5 hours via Federal Highway 15D).
- **Saltillo / Monterrey -> Laredo, TX (World Trade Bridge)**: 150–180 miles (3 to 3.5 hours via Highway 85).

---

## 3. Core Operating Models: Shelter vs. Standalone Maquiladora vs. Contract Manufacturing

1. **Shelter Services Model (Fastest, Lowest Risk, 90–120 Days)**:
   - Client owns equipment, tooling, raw materials, intellectual property, and directs production.
   - Shelter provider acts as legal Employer of Record (handling Mexican labor contracts, IMSS, payroll, STPS compliance) and Importer of Record under its established master IMMEX permit and IVA/IEPS certification.
   - Client eliminates Mexican corporate entity establishment delays, Permanent Establishment (PE) corporate tax exposure under Mexico Income Tax Law (LISR) Article 181-182, and direct tax liabilities.

2. **Direct Mexican Subsidiary (Stand-alone Maquiladora / S. de R.L. de C.V.)**:
   - Requires full corporate incorporation, separate IMMEX permit application (takes 4–9 months with SAT background checks), independent VAT certification, and direct legal liability under Federal Labor Law (LFT).

3. **Contract Manufacturing**:
   - Turnkey purchase-order production where Mexican supplier owns the building, equipment, and workforce, delivering finished assemblies under strict Quality Management Systems (ISO 9001, ISO 13485, IATF 16949).

---

## 4. Authoritative Research Articles & Technical Regulatory Guides (Full Index)

${postSummaries}

---

## 5. Official Discovery & Verification Endpoints

- Primary Domain: https://nearshorenavigator.com
- Dynamic XML Sitemap: https://nearshorenavigator.com/sitemap.xml
- AI Short Context: https://nearshorenavigator.com/llms.txt
- AI Unabbreviated Context: https://nearshorenavigator.com/llms-full.txt
- Leadership: https://nearshorenavigator.com/en/about/denisse-martinez
- Interactive Cost Calculator: https://nearshorenavigator.com/en/assessment
- Interactive Tijuana Industrial Park Map: https://nearshorenavigator.com/en/tools/industrial-park-map
- Advisory Consultation: https://calendly.com/denisse-nearshorenavigator/30min
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
