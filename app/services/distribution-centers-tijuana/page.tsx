import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
    title: "Distribution Centers & Logistics in Tijuana",
    description: "3PL, cross-docking, and distribution solutions on the US-Mexico border.",
};

export default function DistributionPage() {
    return (
        <div className="pb-20">
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1566576912906-600aceebca9b?auto=format&fit=crop&q=80&w=2000"
                        alt="Logistics"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-900/80 mix-blend-overlay" />
                </div>
                <div className="container mx-auto px-4 z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Distribution & Logistics</h1>
                    <p className="text-xl text-white/90">Optimize your supply chain with cross-border solutions.</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Strategic Location</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Tijuana is adjacent to San Diego, California, providing immediate access to the US Interstate highway system (I-5 and I-805). It acts as a perfect fulfillment hub for e-commerce brands targeting the US West Coast market.
                        </p>
                        <ul className="space-y-4">
                            {["Section 321 Compliance (Duty-Free under $800)", "Cross-docking & Transloading", "Inventory Management Systems", "Last-mile Delivery Partners"].map(item => (
                                <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl skew-y-1">
                        <Image
                            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1200"
                            alt="Border Logistics"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="mt-20">
                    <LeadForm title="Get a Logistics Quote" subtitle="Connect with top 3PL providers in the region." className="max-w-2xl mx-auto" />
                </div>
            </div>
        </div>
    );
}
