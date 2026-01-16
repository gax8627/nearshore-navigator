import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
    title: "Industrial Real Estate in Tijuana | Warehouses & Land",
    description: "Find Class A industrial buildings, built-to-suit options, and warehouse space in Tijuana's top industrial parks.",
};

export default function IndustrialRealEstatePage() {
    const features = [
        "Class A Industrial Buildings",
        "Built-to-Suit Projects",
        "Land for Development",
        "Flexible Lease Terms",
        "Cross-Docking Facilities",
        "Otay Mesa Proximity",
    ];

    const specs = [
        { label: "Clear Height", value: "24' - 36'" },
        { label: "Dock Doors", value: "1 per 10k sqft" },
        { label: "Floor Load", value: "6-8 inches reinforced" },
        { label: "Power", value: "KVA based on needs" },
    ];

    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2000"
                        alt="Tijuana Warehouse"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/80" />
                </div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Industrial Real Estate in <span className="text-primary-500">Tijuana</span></h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Secure the perfect industrial space for your manufacturing or logistics operation in Mexico&apos;s top border city.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-glass border border-white/20 dark:border-gray-800">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Premium Industrial Spaces</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                Tijuana offers over 70 million square feet of industrial inventory. Whether you need a 20,000 sq. ft. light assembly facility or a 200,000 sq. ft. distribution center, we help you navigate the market to find the right property.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                We have relationships with all major industrial developers in the region, including Vesta, Prologis, and local groups, ensuring you get access to both on-market and off-market opportunities.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Typical Building Specs</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {specs.map((spec) => (
                                    <div key={spec.label} className="flex justify-between items-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-300 font-medium">{spec.label}</span>
                                        <span className="text-gray-900 dark:text-white font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Tijuana?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {features.map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-primary-500 w-5 h-5 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700 open:bg-white/60 dark:open:bg-gray-800/60 transition-colors">
                                    <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                        What are the current lease rates?
                                        <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                        Lease rates in Tijuana typically range from $0.75 to $0.95 USD per sq. ft. per month (NNN), depending on location and building class.
                                    </p>
                                </details>
                                <details className="group p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg border border-gray-100 dark:border-gray-700 open:bg-white/60 dark:open:bg-gray-800/60 transition-colors">
                                    <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                                        What is the typical lease term?
                                        <span className="text-primary-500 group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                                        Standard industrial lease terms are usually 3 to 5 years, though longer terms (7-10 years) may be required for built-to-suit projects.
                                    </p>
                                </details>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <LeadForm
                                title="Find Available Space"
                                subtitle="Tell us your requirements and we'll send you a curated list of available properties."
                                className="shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
