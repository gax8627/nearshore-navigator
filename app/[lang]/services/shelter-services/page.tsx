import { Metadata } from 'next';
import Link from 'next/link';
import { LeadForm } from '@/components/LeadForm';
import { BASE_URL, INDEXABLE_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Shelter Services Baja California | IMMEX & 90-Day Setup',
    description: 'Baja California shelter services in Tijuana & Mexicali. IMMEX setup in as little as 90 days (project-dependent). Compare top shelter providers and understand the risks.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/services/shelter-services`,
      languages: Object.fromEntries([
        ...INDEXABLE_LOCALES.map(l => [l, `${BASE_URL}/${l}/services/shelter-services`]),
        ['x-default', `${BASE_URL}/en/services/shelter-services`]
      ])
    }
  };
}

export default async function ShelterServicesPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${BASE_URL}/${lang}/services/shelter-services#service`,
        "name": "Baja California Shelter Services & IMMEX Setup",
        "serviceType": "Nearshore Shelter Services",
        "provider": {
          "@type": "Organization",
          "name": "Nearshore Navigator",
          "url": BASE_URL
        },
        "areaServed": ["Tijuana", "Mexicali", "Tecate", "Baja California", "Mexico"],
        "description": "Turnkey IMMEX shelter service setup, labor administration, tax compliance, and facility management in Baja California.",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [
            ".speakable-direct-answer",
            ".speakable-summary",
            ".direct-answer-capsule",
            ".faq-answer",
            "#faq-direct-response",
            "h1",
            "h2"
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/${lang}/services/shelter-services#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/${lang}` },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/${lang}/services` },
          { "@type": "ListItem", "position": 3, "name": "Shelter Services", "item": `${BASE_URL}/${lang}/services/shelter-services` }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/${lang}/services/shelter-services#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a shelter service in Mexico?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A shelter service is a legal operating framework where a Mexican shelter provider acts as the legal employer and holder of the IMMEX permit. The foreign manufacturer retains 100% operational control over production while the shelter provider handles HR, payroll, customs, and fiscal compliance."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can a shelter program launch in Tijuana or Mexicali?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Shelter programs launch in 30 to 90 days because the shelter provider's pre-approved IMMEX permit, IVA/IEPS tax certification, and customs authorizations eliminate the 6 to 12-month wait required for a standalone Mexican entity."
            }
          },
          {
            "@type": "Question",
            "name": "What is the fully burdened labor rate under shelter services in Baja California?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As of 2026, fully burdened direct assembly labor in Tijuana and Mexicali averages $7.84 per hour, based on CONASAMI Northern Border Free Zone minimum wage adjustments ($440.87 MXN/day), IMSS social security, INFONAVIT housing, and mandatory profit-sharing (PTU)."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-16 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-block px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-xs font-semibold uppercase tracking-wider">
            IMMEX Turnkey Operating Model
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Shelter Services in Baja California: Tijuana & Mexicali IMMEX Guide
          </h1>
          <div className="speakable-direct-answer p-6 bg-gray-900/90 border border-primary-500/30 rounded-xl text-gray-200 text-lg leading-relaxed">
            Shelter services in Baja California provide US manufacturers with a legal turnkey umbrella to operate in Tijuana and Mexicali without forming a standalone Mexican entity. Operating under the shelter provider’s pre-approved IMMEX permit grants immediate 0% VAT exemptions on temporary imports and cuts market launch timelines to 30–90 days at a $7.84/hr fully burdened labor rate.
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Why US Manufacturers Choose Shelter Services Over Standalone Subsidiary Setup
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Establishing a standalone Mexican subsidiary (S.A. de C.V. or S. de R.L.) requires obtaining a direct IMMEX permit from the Ministry of Economy (SECON), securing VAT/IEPS certification from SAT, and registering for local municipal permits. This process routinely takes 6 to 12 months and exposes parent companies to direct tax and legal liabilities in Mexico.
          </p>

          <div className="overflow-x-auto my-6">
            <table itemScope itemType="https://schema.org/Table" className="w-full min-w-[550px] text-left border-collapse border border-gray-800 bg-gray-900 rounded-xl">
              <thead>
                <tr className="bg-gray-800 text-primary-400 text-sm">
                  <th className="p-4 border-b border-gray-700">Feature / Metric</th>
                  <th className="p-4 border-b border-gray-700">Shelter Service Framework</th>
                  <th className="p-4 border-b border-gray-700">Standalone Mexican Entity</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300 divide-y divide-gray-800">
                <tr>
                  <td className="p-4 font-semibold text-white">Time to First Production</td>
                  <td className="p-4 text-emerald-400 font-semibold">30 – 90 Days</td>
                  <td className="p-4 text-rose-400">6 – 12 Months</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">IMMEX Permit & VAT Exemption</td>
                  <td className="p-4">Instant (Use Provider Umbrella)</td>
                  <td className="p-4">Requires SAT Audit Approval</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Fully Burdened Labor Rate (2026)</td>
                  <td className="p-4 font-semibold text-white">$7.84 / hour</td>
                  <td className="p-4">$7.84 / hour + HR Overheads</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Corporate Permanent Establishment (PE) Risk</td>
                  <td className="p-4 text-emerald-400 font-semibold">Eliminated (Safe Harbor Protection)</td>
                  <td className="p-4 text-rose-400">Full Mexican Corporate Tax Liability</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Operational Control</td>
                  <td className="p-4">100% Control over Quality & IP</td>
                  <td className="p-4">100% Control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="p-8 bg-gray-900/60 rounded-2xl border border-gray-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Key Services Included in Shelter Representation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-400">Human Resources & Recruitment</h3>
              <p className="text-sm text-gray-300">Recruitment of direct assembly operators, CNC technicians, quality engineers, and plant managers across Tijuana and Mexicali.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-400">Payroll & Labor Compliance</h3>
              <p className="text-sm text-gray-300">
                Management of IMSS social security, INFONAVIT housing tax, Aguinaldo bonuses, and Ley Federal del Trabajo compliance—including <Link href={`/${lang}/insights/usmca-rapid-response-labor-mechanism-mexico-union-compliance`} className="text-primary-400 underline hover:text-primary-300">USMCA union compliance and RRLM audit defense</Link>, plus <Link href={`/${lang}/insights/mexico-40-hour-workweek-2027-manufacturing-compliance-cost-guide`} className="text-primary-400 underline hover:text-primary-300">2027 40-hour workweek readiness</Link> via our <Link href={`/${lang}/tools/mexico-40-hour-workweek-calculator`} className="text-primary-400 underline hover:text-primary-300">40-Hour Workweek Cost &amp; STPS Fine Calculator</Link>.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-400">Customs & Pedimentos Clearances</h3>
              <p className="text-sm text-gray-300">
                Annex 24 and Annex 30 automated digital inventory tracking, virtual pedimentos (V1/V5), and USMCA documentation, including <Link href={`/${lang}/insights/immex-civa-certification-anexo-24-30-audit-defense-monitoring-playbook`} className="text-primary-400 underline hover:text-primary-300">IMMEX & CIVA VAT audit defense</Link> and our real-time <Link href={`/${lang}/tools/civa-audit-risk-calculator`} className="text-primary-400 underline hover:text-primary-300">CIVA Audit Risk Calculator</Link>.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-400">Industrial Facility Leasing</h3>
              <p className="text-sm text-gray-300">
                Lease administration in Class A industrial parks (Otay Mesa, Pacifico, El Florido, PIMSA) with NNN rates ($0.47–$0.83/SF), evaluating <Link href={`/${lang}/insights/manufacturing-campus-vs-industrial-park-mexico-cost-lock-in`} className="text-primary-400 underline hover:text-primary-300">manufacturing campus vs standalone industrial park</Link> cost structures to eliminate long-term lease lock-in.
              </p>
            </div>
          </div>
        </section>

        <section className="p-8 bg-gray-900/60 rounded-2xl border border-gray-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Bundled Campus Trade Programs vs. Unbundled Control: 5 CFO Due-Diligence Questions
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Bundled manufacturing campuses (in hubs like Sonora, Saltillo, or Querétaro) can fit 150+ headcount operations seeking turnkey park infrastructure. Before signing a bundled IMMEX trade-program and lease agreement, benchmark these five structural terms against unbundled shelter operators and direct institutional REIT leases:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-800">
              <strong className="text-white block mb-1">1. Real Estate Tying &amp; Cross-Default</strong>
              Can you change shelter or trade-program administrators without losing your building lease or relocating machinery?
            </div>
            <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-800">
              <strong className="text-white block mb-1">2. Entity-Level CIVA Ring-Fencing</strong>
              Which legal RFC holds the IMMEX and CIVA certification, and how are <Link href={`/${lang}/services/customs-brokerage`} className="text-primary-400 underline hover:text-primary-300">Anexo 24/30 reconciliations</Link> audited across co-tenants?
            </div>
            <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-800">
              <strong className="text-white block mb-1">3. Open-Book Payroll Pass-Through</strong>
              Are IMSS, INFONAVIT, and statutory labor burdens billed strictly at verified CFDI 4.0 and SUA receipts rather than composite markups?
            </div>
            <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-800">
              <strong className="text-white block mb-1">4. LFT Art. 41 Exit Portability</strong>
              Does your MSA guarantee in-place employer substitution (<em>patrono sustituto</em>) so you can graduate to a standalone S.A. de C.V. without severance resets?
            </div>
            <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-800 md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <strong className="text-white block mb-1">5. Corridor Fit vs. Landlord Footprint</strong>
                Ensure your site is selected for freight, labor, and customer proximity—across Baja California, Monterrey, Juárez, Guadalajara, or the Bajío—rather than a provider&apos;s owned land bank.
              </div>
              <a
                href="#proposal-benchmark"
                className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs sm:text-sm transition-all text-center"
              >
                Benchmark Your Quote
              </a>
            </div>
          </div>
        </section>

        <section className="bg-primary-950/40 border border-primary-500/30 rounded-2xl p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Calculate Your Baja California Shelter Savings
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compare fully burdened labor, industrial lease rates, and IMMEX duty savings for your headcount with our real-time interactive financial modeler.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/tools/cost-calculator`}
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary-600/20"
            >
              Launch Landed Cost Calculator
            </Link>
            <Link
              href={`/${lang}/locations/tijuana`}
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all"
            >
              Explore Tijuana Location Guide
            </Link>
          </div>
        </section>

        <section id="proposal-benchmark" className="pt-4">
          <LeadForm
            source="shelter_services_benchmark"
            title="Request a Free 48-Hour Shelter & Trade-Program Proposal Benchmark"
            subtitle="Evaluating a bundled campus or trade-program quote? Share your target headcount, sq. ft., and timeline (NDA-protected) to benchmark Trade-Program-only vs. Unbundled Shelter vs. Standalone 3-year TCO across 3–5 vetted operators."
          />
        </section>
      </div>
    </main>
  );
}
