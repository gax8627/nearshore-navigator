import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { LeadForm } from '@/components/LeadForm';

// In a real implementation, this would likely come from a database or CMS.
// For now, we use a simple configuration map.
const campaignData: Record<string, { title: string; subtitle: string; heroImage: string; features: string[] }> = {
  'cnc-machining': {
    title: 'Precision CNC Machining in Mexico',
    subtitle: 'Reduce costs by up to 40% while maintaining AS9100 and ISO 9001 quality standards. Find your ideal nearshore manufacturing partner today.',
    heroImage: '/images/hero/factory-floor.webp',
    features: ['Access to certified machinists', 'Same time-zone collaboration', 'IP Protection guarantees', 'Logistics and cross-border support']
  },
  'medical-device': {
    title: 'Medical Device Manufacturing Nearshore',
    subtitle: 'Accelerate your time to market with ISO 13485 certified facilities just minutes from the US border.',
    heroImage: '/images/hero/medical-facility.webp',
    features: ['Class II and III device experience', 'Cleanroom assembly (ISO Class 7/8)', 'FDA registered facilities', 'Supply chain resilience']
  },
  'furniture': {
    title: 'Contract Furniture Manufacturing',
    subtitle: 'Scale your furniture brand with high-quality upholstery, woodcraft, and metal fabrication in Mexico.',
    heroImage: '/images/hero/furniture-shop.webp',
    features: ['Skilled artisans and upholstery', 'Sustainably sourced materials', 'Fast prototyping and scaling', 'Direct-to-consumer fulfillment options']
  },
  'nearshore-marketing': {
    title: 'Nearshore Marketing OS',
    subtitle: 'Automate your B2B marketing engine with AI-driven lead enrichment, CRM routing, and LinkedIn content generation for a flat $3,450/month retainer.',
    heroImage: '/images/hero/marketing_hero.webp',
    features: ['Automated CRM Routing', 'AI Lead Enrichment', 'Autonomous LinkedIn Content', 'Live Growth ROI Dashboards']
  }
};

export default async function CampaignLandingPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const data = campaignData[slug];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col pt-16">
      <section className="relative bg-teal-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-teal-950/80 mix-blend-multiply" />
        </div>

        <div className="relative container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-teal-50 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
          
          <div className="max-w-xl mx-auto text-left">
            <LeadForm 
              title="Request a Consultation" 
              subtitle="Connect directly with our manufacturing advisory team." 
              source={`campaign_${slug}`} 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Nearshore with Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.features.map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{feature}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Leverage vetted regional industrial infrastructure and direct advisory access.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
