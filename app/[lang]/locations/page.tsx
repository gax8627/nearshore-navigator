import { Metadata } from 'next';
import Link from 'next/link';
import { TIER1_CITIES, BASE_URL, INDEXABLE_LOCALES } from '@/app/constants/seo-config';
import { LOCATIONS } from '@/app/constants/seo-data';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'Mexico Manufacturing Hubs & Industrial City Directory | Nearshore Navigator',
    description: 'Explore top nearshore manufacturing locations across Mexico including Tijuana, Mexicali, Monterrey, Juárez, and Querétaro.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/locations`,
      languages: Object.fromEntries([
        ...INDEXABLE_LOCALES.map(l => [l, `${BASE_URL}/${l}/locations`]),
        ['x-default', `${BASE_URL}/en/locations`]
      ])
    }
  };
}

export default async function LocationsHubPage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const tier1Locations = LOCATIONS.filter(loc => TIER1_CITIES.has(loc.slug));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mexico Industrial Manufacturing Cities Directory",
    "itemListElement": tier1Locations.map((loc, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": loc.name,
      "url": `${BASE_URL}/${lang}/locations/${loc.slug}`
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
          Mexico Industrial Manufacturing Hubs
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl">
          Comprehensive operational data, labor cost comparisons, industrial park maps, and shelter service guides across Mexico&apos;s primary manufacturing corridors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tier1Locations.map(loc => (
            <Link
              key={loc.slug}
              href={`/${lang}/locations/${loc.slug}`}
              className="p-6 bg-gray-800/60 rounded-xl border border-gray-700 hover:border-primary-500 transition-all hover:scale-[1.02] group"
            >
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-400">
                {loc.name}
              </h2>
              <p className="text-sm text-gray-400 mb-4">{loc.state}, Mexico</p>
              <div className="text-xs text-primary-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                Explore Industrial Infrastructure &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
