import { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL, INDEXABLE_LOCALES } from '@/app/constants/seo-config';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Nearshore Advisory & Manufacturing Services in Mexico | Nearshore Navigator',
    description: 'Strategic nearshore advisory services including industrial real estate site selection, contract manufacturing, distribution centers, and shelter services in Tijuana.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/services`,
      languages: Object.fromEntries([
        ...INDEXABLE_LOCALES.map(l => [l, `${BASE_URL}/${l}/services`]),
        ['x-default', `${BASE_URL}/en/services`]
      ])
    }
  };
}

export default async function ServicesHubPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  const services = [
    {
      title: 'Shelter Services & IMMEX Advisory',
      slug: 'shelter-services',
      description: 'Turnkey legal framework, labor administration, 0% VAT exemption, and corporate risk mitigation in Baja California.'
    },
    {
      title: 'Customs Brokerage & USMCA Compliance',
      slug: 'customs-brokerage',
      description: 'Pedimentos clearance, Annex 24/31 tracking, 0% USMCA preferential tariffs, and Section 301 mitigation.'
    },
    {
      title: 'Industrial Real Estate & Site Selection',
      slug: 'industrial-real-estate-baja',
      description: 'Lease representation, build-to-suit negotiation, and energy audit analysis across Baja California industrial parks.'
    },
    {
      title: 'Contract Manufacturing & Shelter Advisory',
      slug: 'contract-manufacturing-tijuana',
      description: 'Turnkey IMMEX shelter service setup, labor recruitment, payroll administration, and customs compliance.'
    },
    {
      title: 'Distribution Centers & Section 321 Guide',
      slug: 'distribution-centers-tijuana',
      description: 'Cross-border logistics, Section 321 de minimis fulfillment, and Otay Mesa border warehouse operations.'
    },
    {
      title: 'Call Center & BPO Services',
      slug: 'call-center-tijuana',
      description: 'Bilingual customer support, technical helpdesk, and sales teams operating in Tijuana.'
    },
    {
      title: 'Nearshore B2B Marketing Advisory',
      slug: 'nearshore-marketing',
      description: 'B2B lead generation, market entry positioning, and demand generation for cross-border operations.'
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Nearshore Navigator Advisory Services Directory",
    "itemListElement": services.map((svc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": svc.title,
      "url": `${BASE_URL}/${lang}/services/${svc.slug}`
    }))
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white py-16 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Nearshore Manufacturing Advisory Services
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          End-to-end guidance for US companies establishing, scaling, and optimizing manufacturing and fulfillment operations in Mexico.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(svc => (
            <Link
              key={svc.slug}
              href={`/${lang}/services/${svc.slug}`}
              className="p-8 bg-gray-800/60 rounded-xl border border-gray-700 hover:border-primary-500 transition-all hover:scale-[1.01] group"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-400">
                {svc.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {svc.description}
              </p>
              <div className="text-xs text-primary-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                View Service Details &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
