import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// In a real implementation, this would likely come from a database or CMS.
// For now, we use a simple configuration map.
const campaignData: Record<string, { title: string; subtitle: string; heroImage: string; features: string[] }> = {
  'cnc-machining': {
    title: 'Precision CNC Machining in Mexico',
    subtitle: 'Reduce costs by up to 40% while maintaining AS9100 and ISO 9001 quality standards. Find your ideal nearshore manufacturing partner today.',
    heroImage: '/images/hero/factory-floor.png',
    features: ['Access to certified machinists', 'Same time-zone collaboration', 'IP Protection guarantees', 'Logistics and cross-border support']
  },
  'medical-device': {
    title: 'Medical Device Manufacturing Nearshore',
    subtitle: 'Accelerate your time to market with ISO 13485 certified facilities just minutes from the US border.',
    heroImage: '/images/hero/medical-facility.png',
    features: ['Class II and III device experience', 'Cleanroom assembly (ISO Class 7/8)', 'FDA registered facilities', 'Supply chain resilience']
  },
  'furniture': {
    title: 'Contract Furniture Manufacturing',
    subtitle: 'Scale your furniture brand with high-quality upholstery, woodcraft, and metal fabrication in Mexico.',
    heroImage: '/images/hero/furniture-shop.png',
    features: ['Skilled artisans and upholstery', 'Sustainably sourced materials', 'Fast prototyping and scaling', 'Direct-to-consumer fulfillment options']
  },
  'nearshore-marketing': {
    title: 'Nearshore Marketing OS',
    subtitle: 'Automate your B2B marketing engine with AI-driven lead enrichment, CRM routing, and LinkedIn content generation for a flat $3,450/month retainer.',
    heroImage: '/images/hero/marketing_hero.png',
    features: ['Automated CRM Routing', 'AI Lead Enrichment', 'Autonomous LinkedIn Content', 'Live Growth ROI Dashboards']
  }
};

export default function CampaignLandingPage({ params }: { params: { slug: string } }) {
  const data = campaignData[params.slug];

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
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        
        <div className="container relative z-20 mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-teal-50 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
          
          <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm max-w-2xl mx-auto text-left">
            <h3 className="text-2xl font-semibold mb-4">Request a Consultation</h3>
            <form action="/api/contact" method="POST" className="space-y-4">
              <input type="hidden" name="source" value={`campaign_${params.slug}`} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 text-teal-100">Full Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-2 rounded-md bg-white/90 text-black border-0 focus:ring-2 focus:ring-teal-400" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-teal-100">Work Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-2 rounded-md bg-white/90 text-black border-0 focus:ring-2 focus:ring-teal-400" placeholder="john@company.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1 text-teal-100">Company</label>
                <input type="text" name="company" className="w-full px-4 py-2 rounded-md bg-white/90 text-black border-0 focus:ring-2 focus:ring-teal-400" placeholder="Company Name" />
              </div>

              <div>
                <label className="block text-sm mb-1 text-teal-100">What are you looking to manufacture?</label>
                <textarea name="message" rows={3} className="w-full px-4 py-2 rounded-md bg-white/90 text-black border-0 focus:ring-2 focus:ring-teal-400" placeholder="Tell us about your project..."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-md transition-colors text-lg">
                Get Started
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Nearshore with Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4">
                <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-gray-700 font-medium text-lg leading-tight pt-1">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
