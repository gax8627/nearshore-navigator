import { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL, INDEXABLE_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Shelter Services Baja California | IMMEX & 90-Day Setup',
    description: 'Baja California shelter services in Tijuana & Mexicali. 90-day IMMEX setup, $350/mo fee, zero corporate risk. Compare top shelter providers.',
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
        "description": "Turnkey IMMEX shelter service setup, labor administration, tax compliance, and facility management in Baja California."
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
            <table className="w-full text-left border-collapse border border-gray-800 bg-gray-900 rounded-xl">
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
              <p className="text-sm text-gray-300">Management of IMSS social security, INFONAVIT housing tax, Aguinaldo bonuses, and Ley Federal del Trabajo compliance.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-400">Customs & Pedimentos Clearances</h3>
              <p className="text-sm text-gray-300">Annex 24 and Annex 30 automated digital inventory tracking, virtual pedimentos (V1/V5), and USMCA documentation.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary-400">Industrial Facility Leasing</h3>
              <p className="text-sm text-gray-300">Lease administration in Class A industrial parks (Otay Mesa, Pacifico, El Florido, PIMSA) with NNN rates ($0.47–$0.83/SF).</p>
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
              className="px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary-600/20"
            >
              Launch Landed Cost Calculator
            </Link>
            <Link
              href={`/${lang}/locations/tijuana`}
              className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all"
            >
              Explore Tijuana Location Guide
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
