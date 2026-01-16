import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { Factory, Shield, Award, Users } from "lucide-react";

export const metadata = {
    title: "Contract Manufacturing in Tijuana | Electronics, Medical, Aerospace",
    description: "Connect with certified contract manufacturers (CM) in Tijuana. ISO 13485, IATF 16949, and AS9100 certified maquiladoras for electronics, medical devices, aerospace, and automotive.",
};

export default function ContractManufacturingPage() {
    const industries = [
        {
            name: "Medical Devices",
            img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
            desc: "Clean room assembly (ISO Class 7/8) for Class I, II, and III devices. ISO 13485 certified.",
            certifications: ["ISO 13485", "FDA Registered", "Clean Room"],
        },
        {
            name: "Electronics",
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            desc: "PCB assembly, SMT lines, wire harness, and consumer electronics manufacturing.",
            certifications: ["IPC-A-610", "ISO 9001", "RoHS"],
        },
        {
            name: "Aerospace",
            img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
            desc: "Precision components, sub-assemblies, and MRO services for commercial and defense.",
            certifications: ["AS9100D", "NADCAP", "ITAR"],
        },
        {
            name: "Automotive",
            img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800",
            desc: "Sub-assembly, upholstery, injection molding, and wire harness for OEMs and Tier 1/2 suppliers.",
            certifications: ["IATF 16949", "ISO 14001", "VDA 6.3"],
        },
    ];

    const benefits = [
        { icon: <Factory className="w-6 h-6" />, title: "Established Facilities", desc: "Skip the 2-year ramp-up. Partner with manufacturers already running production." },
        { icon: <Shield className="w-6 h-6" />, title: "Your IP, Protected", desc: "NDA-first approach. Contract manufacturers handle production, you own the designs." },
        { icon: <Award className="w-6 h-6" />, title: "Pre-Certified", desc: "We match you with CMs that already hold your required industry certifications." },
        { icon: <Users className="w-6 h-6" />, title: "Trained Workforce", desc: "Tijuana has 700,000+ manufacturing workers with decades of export experience." },
    ];

    const process = [
        { step: "01", title: "Define Requirements", desc: "Share your product specs, volume needs, quality standards, and certification requirements." },
        { step: "02", title: "Receive Shortlist", desc: "We curate 3-5 contract manufacturers that match your criteria, all pre-vetted." },
        { step: "03", title: "Visit & Evaluate", desc: "Tour facilities, meet management, assess capabilities, and review quality systems." },
        { step: "04", title: "Negotiate & Launch", desc: "We assist with contract terms, pricing negotiation, and production ramp-up." },
    ];

    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="bg-gray-900 py-24 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Factory className="w-4 h-4" />
                        Maquiladora Partners
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Contract Manufacturing in <span className="text-primary-400">Tijuana</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Don&apos;t want to run a factory? Partner with established manufacturers in Tijuana who already have the equipment, certifications, and trained workforce.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Benefits Grid */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Contract Manufacturing?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="glass-card p-6 text-center">
                                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Industries We Serve</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {industries.map((ind) => (
                            <div key={ind.name} className="glass-card overflow-hidden group flex flex-col md:flex-row">
                                <div className="h-48 md:h-auto md:w-48 relative overflow-hidden flex-shrink-0">
                                    <Image src={ind.img} alt={ind.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ind.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{ind.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {ind.certifications.map((cert) => (
                                            <span key={cert} className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process */}
                <section className="mb-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {process.map((item, i) => (
                            <div key={item.step} className="text-center relative">
                                {i < process.length - 1 && (
                                    <div className="hidden md:block absolute top-6 left-[60%] right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
                                )}
                                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-20">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                What minimum order volumes do CMs require?
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                This varies by industry and complexity. Medical device CMs often start at $500K-$1M annual spend. Electronics CMs may accept lower volumes for high-mix products. We match you with partners suited to your scale.
                            </p>
                        </details>
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                How is intellectual property protected?
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                All relationships begin with NDAs. Mexican IP law is USMCA-aligned, providing strong protections. We recommend registering patents/trademarks in Mexico as well. CMs typically sign non-compete clauses for your product category.
                            </p>
                        </details>
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                Can I audit the factory before committing?
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                Absolutely. We encourage and facilitate site visits. Most clients conduct 1-2 day audits covering quality systems, production capabilities, workforce, and financial stability before making a decision.
                            </p>
                        </details>
                        <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                            <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                What certifications should I look for?
                                <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                Medical: ISO 13485, FDA Registration. Automotive: IATF 16949. Aerospace: AS9100D, NADCAP. Electronics: IPC-A-610, ISO 9001. We only match you with CMs holding your required certifications.
                            </p>
                        </details>
                    </div>
                </section>

                {/* CTA */}
                <div className="max-w-4xl mx-auto">
                    <LeadForm
                        title="Request a Vendor Shortlist"
                        subtitle="Tell us your product, volume, and certification requirements. We'll curate 3-5 pre-vetted contract manufacturers."
                        className="shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
}
