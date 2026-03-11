import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  return {
    title: 'The Ultimate Guide to Manufacturing in Tijuana (2026)',
    description: 'Secure 0% USMCA tariffs and $7.84/hr fully burdened labor. Complete 2026 guide to contract manufacturing, shelter services, and Otay Mesa logistics in Tijuana.',
    alternates: {
      canonical: `https://nearshorenavigator.com/${lang}/locations/tijuana/master-guide`,
      languages: {
        'en': `https://nearshorenavigator.com/en/locations/tijuana/master-guide`,
        'es': `https://nearshorenavigator.com/es/locations/tijuana/master-guide`,
        'x-default': `https://nearshorenavigator.com/en/locations/tijuana/master-guide`,
      }
    }
  };
}

export default async function TijuanaMasterGuidePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION (Enterprise Gateway) */}
      <section className="relative bg-slate-900 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2600" 
            alt="Tijuana Industrial Parks skyline" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="inline-block px-4 py-1 rounded-full bg-sky-900/50 border border-sky-500/30 text-sky-300 text-sm font-semibold tracking-wide mb-6">
            2026 B2B ADVISORY REPORT
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            The Ultimate Guide to <br className="hidden md:block"/> Manufacturing in Tijuana
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            Positioned 20 minutes from San Diego, Tijuana offers 0% USMCA tariffs, $7.84/hr fully-burdened labor, and 1-day shipping to California. See why top US manufacturers are bypassing Asia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/${lang}/contact`}
              className="px-8 py-4 rounded-md bg-sky-700 hover:bg-sky-600 text-white font-semibold transition-colors duration-200 text-center shadow-lg shadow-sky-900/20"
            >
              Calculate Your Landed Cost
            </Link>
            <Link 
              href="#clusters"
              className="px-8 py-4 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors duration-200 backdrop-blur-sm text-center border border-white/10"
            >
              Explore Industry Clusters
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Trusted by leaders operating in Baja California</p>
            <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale">
              <span className="text-2xl font-bold tracking-tighter">BECTON DICKINSON</span>
              <span className="text-2xl font-bold tracking-tighter">SAMSUNG</span>
              <span className="text-2xl font-bold tracking-tighter">COLLINS AEROSPACE</span>
              <span className="text-2xl font-bold tracking-tighter">DJO GLOBAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE COST ADVANTAGE (Data-Driven) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The "China-Plus-One" Pivot: The Cost Advantage</h2>
            <p className="text-lg text-slate-600">The math driving the massive shift in global supply chains from Shenzhen to Tijuana.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-5xl font-bold text-slate-900 mb-2">$7.84<span className="text-xl text-slate-500 font-normal">/hr</span></h3>
              <p className="font-semibold text-slate-900 mb-2">Fully Burdened Labor Rate</p>
              <p className="text-slate-600 text-sm leading-relaxed">Inclusive of IMSS social security, INFONAVIT housing, vacation premiums, and mandatory profit-sharing, representing a 60-75% reduction vs California.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-5xl font-bold text-slate-900 mb-2">$0.75<span className="text-xl text-slate-500 font-normal">/SF</span></h3>
              <p className="font-semibold text-slate-900 mb-2">Class A Real Estate (NNN)</p>
              <p className="text-slate-600 text-sm leading-relaxed">With an 8% vacancy rate in Q1 2026, premium industrial space is abundant. Mesa de Otay premium zones offer 32ft clear heights and heavy power.</p>
            </div>

            <div className="p-8 rounded-2xl bg-sky-900 border border-sky-800 text-white shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-sky-800 text-sky-300 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-5xl font-bold text-white mb-2">0%</h3>
              <p className="font-semibold text-sky-200 mb-2">USMCA Tariffs</p>
              <p className="text-sky-100/80 text-sm leading-relaxed">Bypass the 25-100% Section 301 tariffs on Chinese imports entirely. Goods manufactured underIMMEX entering the US are inherently duty-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLUSTERS */}
      <section id="clusters" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Dominant Industry Clusters</h2>
              <p className="text-lg text-slate-600">The infrastructure, supply chains, and specialized talent pools are already here.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Medical Devices</h3>
                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full mb-4">#1 IN MEXICO</span>
              </div>
              <div className="md:w-2/3">
                <p className="text-slate-600 leading-relaxed">Tijuana is the largest medical device hub in Mexico and second largest globally. Over 70 FDA-registered facilities operate in Class-A parks, producing everything from Class I disposables to Class III pacemakers. The ecosystem supports extensive ISO 13485 compliance infrastructure.</p>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Aerospace & Defense</h3>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full mb-4">AS9100 READY</span>
              </div>
              <div className="md:w-2/3">
                <p className="text-slate-600 leading-relaxed">Bolstered by its proximity to Southern California's defense sector, Tijuana has developed deep capabilities in precision machining, composite structures, and ITAR compliance for major OEMs like Safran and Collins Aerospace.</p>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Electronics & EV</h3>
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full mb-4">100+ FACILITIES</span>
              </div>
              <div className="md:w-2/3">
                <p className="text-slate-600 leading-relaxed">The original DNA of Tijuana's maquiladora era. The city remains a global powerhouse for PCBA (SMT lines), automotive wire harnesses, and increasingly, EV component assembly supporting the California electric vehicle transition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL ESTATE & LOGISTICS */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
               <h2 className="text-3xl font-bold mb-6">Class-A Industrial Parks</h2>
               <p className="text-slate-300 mb-8 leading-relaxed">Tijuana operates like a fortress for manufacturers. Industrial zones are physically separated from residential areas, maintaining 24/7 security, controlled access, and robust infrastructure.</p>
               <ul className="space-y-4">
                 <li className="flex gap-4">
                   <div className="text-sky-400 mt-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg></div>
                   <div>
                     <strong className="block text-white">Parque Industrial Pacifico</strong>
                     <span className="text-sm text-slate-400">The premier location. Immediate Otay Mesa access.</span>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="text-sky-400 mt-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg></div>
                   <div>
                     <strong className="block text-white">Mesa de Otay Zone</strong>
                     <span className="text-sm text-slate-400">Heavy power availability. Highest demand sector.</span>
                   </div>
                 </li>
                 <li className="flex gap-4">
                   <div className="text-sky-400 mt-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg></div>
                   <div>
                     <strong className="block text-white">Finsa & El Florido</strong>
                     <span className="text-sm text-slate-400">Large-scale footprints and built-to-suit capability.</span>
                   </div>
                 </li>
               </ul>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6">The Otay Mesa Border Advantage</h2>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Shenzhen to Long Beach (Ocean)</span>
                  <span className="font-bold text-white">30-45 Days</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-slate-500 h-2 rounded-full w-full"></div>
                </div>
              </div>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Tijuana to San Diego (Truck)</span>
                  <span className="font-bold text-sky-400">90 Minutes</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                The FAST Lane program allows registered commercial carriers to bypass standard traffic, clearing customs in under 90 minutes. Intermodal BNSF rail links connect directly to the Midwest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OPERATING MODELS (Shelter vs Contract) */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">How to Enter the Market</h2>
              <p className="text-lg text-slate-600">The 90-day playbook vs. Turnkey Outsourcing.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-slate-200 p-10 rounded-2xl bg-slate-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Shelter Services (IMMEX)</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  The fastest way to establish your own factory. A Mexican shelter company holds the IMMEX permit and handles all HR, payroll, SAT tax, and compliance. You bring your equipment and control 100% of the production quality and IP.
                </p>
                <ul className="text-slate-700 space-y-2 mb-8 font-medium">
                  <li>✓ 90-day speed to market</li>
                  <li>✓ Zero Mexican tax liability</li>
                  <li>✓ Full IP protection</li>
                </ul>
                <Link href={`/${lang}/services/shelter-services-tijuana`} className="text-sky-700 font-semibold hover:text-sky-800 flex items-center gap-2">
                  Learn about Shelter Setup <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>

              <div className="border border-slate-200 p-10 rounded-2xl bg-white">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Contract Manufacturing</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Turnkey outsourcing for immediate scale. Partner with an existing, ISO-certified contract manufacturer in Tijuana who already has the facility, labor force, and supply chain in place. You provide the specs; they provide the finished goods.
                </p>
                <ul className="text-slate-700 space-y-2 mb-8 font-medium">
                  <li>✓ Immediate scalability</li>
                  <li>✓ Zero capital expenditure (CapEx)</li>
                  <li>✓ US-grade quality assurance</li>
                </ul>
                <Link href={`/${lang}/services/contract-manufacturing-tijuana`} className="text-sky-700 font-semibold hover:text-sky-800 flex items-center gap-2">
                  Find a Contract Manufacturer <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-100">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to run the numbers?</h2>
          <p className="text-xl text-slate-600 mb-10">Connect with a Nearshore Navigator advisor for a custom total landed cost analysis comparing your current supply chain to a Tijuana operation.</p>
          <Link 
            href={`/${lang}/contact`}
            className="inline-block px-10 py-5 rounded-md bg-sky-700 hover:bg-sky-600 text-white text-lg font-bold transition-colors duration-200 shadow-xl shadow-sky-900/10"
          >
            Speak to a Principal Advisor
          </Link>
        </div>
      </section>

    </div>
  );
}
