import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2, Truck, Globe, Clock, DollarSign, Package } from "lucide-react";

export const metadata = {
    title: "Distribution Centers & Logistics in Tijuana | 3PL, Cross-Docking",
    description: "Optimize your supply chain with distribution and fulfillment centers in Tijuana. 3PL, cross-docking, Section 321 compliance, and last-mile delivery to the US West Coast.",
};

export default function DistributionPage() {
    const benefits = [
        { icon: <Clock className="w-6 h-6" />, title: "Same-Day Delivery to CA", desc: "Reach 40 million consumers in Southern California within hours." },
        { icon: <DollarSign className="w-6 h-6" />, title: "Section 321 Compliance", desc: "Ship duty-free to US consumers on orders under $800." },
        { icon: <Globe className="w-6 h-6" />, title: "2 Ports of Entry", desc: "Otay Mesa and San Ysidro crossings for flexible routing." },
        { icon: <Truck className="w-6 h-6" />, title: "Transloading Services", desc: "Switch containers between rail, truck, and air seamlessly." },
    ];

    const services = [
        "Cross-docking & Transloading",
        "E-commerce Fulfillment",
        "Inventory Management Systems",
        "Pick, Pack & Ship",
        "Returns Processing",
        "Last-Mile Delivery Partners",
        "Customs Brokerage",
        "Cold Chain Logistics",
    ];

    const stats = [
        { value: "2", label: "Border Crossings" },
        { value: "4hrs", label: "To Los Angeles" },
        { value: "40M", label: "CA Consumers" },
        { value: "$0", label: "Duty (<$800)" },
    ];

    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1566576912906-600aceebca9b?auto=format&fit=crop&q=80&w=2000"
                        alt="Distribution center with trucks and loading docks in Tijuana"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply" />
                </div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Package className="w-4 h-4" />
                        Logistics & Fulfillment
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Distribution Centers in <span className="text-blue-300">Tijuana</span>
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        Optimize your supply chain with cross-border fulfillment and 3PL solutions at the busiest land port of entry in the Western Hemisphere.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 -mt-24 relative z-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass-card p-6 text-center">
                            <p className="text-3xl md:text-4xl font-bold text-primary-500">{stat.value}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Benefits Grid */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Tijuana for Distribution?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefits.map((benefit) => (
                                    <div key={benefit.title} className="glass-card p-6">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Strategic Location */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Strategic Border Location</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    Tijuana is adjacent to San Diego, providing immediate access to the US Interstate highway system (I-5 and I-805). The Otay Mesa Commercial Port of Entry processes over $50 billion in trade annually, making it the busiest commercial crossing on the California-Mexico border.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    For e-commerce brands targeting the US West Coast market, Tijuana acts as the perfect fulfillment hub — combining Mexican labor cost advantages with same-day delivery capabilities to Southern California.
                                </p>
                            </div>
                            <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1200"
                                    alt="Cross-border logistics at Otay Mesa"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </section>

                        {/* Services List */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Available Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <div key={service} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                        What is Section 321 and how does it benefit e-commerce?
                                        <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                        Section 321 is a US customs provision that allows duty-free import of goods valued under $800 per recipient per day. By shipping from a Tijuana fulfillment center directly to US consumers, e-commerce brands can avoid import duties entirely on qualifying orders.
                                    </p>
                                </details>
                                <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                        How long does it take to cross the border?
                                        <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                        FAST-lane enabled carriers with C-TPAT certification can cross in under 30 minutes during off-peak hours. Standard commercial crossings average 1-2 hours. We work with 3PL partners that have priority crossing privileges.
                                    </p>
                                </details>
                                <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                        Can you handle cold chain / temperature-controlled goods?
                                        <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                        Yes. Several of our 3PL partners offer temperature-controlled warehousing and transportation for food, pharmaceuticals, and other perishable goods requiring cold chain integrity.
                                    </p>
                                </details>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <LeadForm
                                title="Get a Logistics Quote"
                                subtitle="Connect with vetted 3PL and distribution partners in Tijuana."
                                className="shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
