import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";

export const metadata = {
    title: "Contract Manufacturing in Tijuana | Electronics & Medical",
    description: "Connect with certified contract manufacturers (CM) in Tijuana for electronics, medical devices, and automotive assembly.",
};

export default function ContractManufacturingPage() {
    const industries = [
        { name: "Medical Devices", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800", desc: "Clean room assembly (ISO Class 7/8) for class I, II, and III devices." },
        { name: "Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", desc: "PCB assembly, wire harness, and consumer electronics manufacturing." },
        { name: "Automotive", img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800", desc: "Sub-assembly, upholstery, and injection molding for Tier 1 & 2 suppliers." },
    ];

    return (
        <div className="pb-20">
            <section className="bg-gray-900 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contract Manufacturing</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Don&apos;t want to run a factory? Partner with established manufacturers in Tijuana who already have the equipment, certifications, and workforce.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Industries We Serve</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {industries.map((ind) => (
                        <div key={ind.name} className="glass-card overflow-hidden group">
                            <div className="h-48 relative overflow-hidden">
                                <Image src={ind.img} alt={ind.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ind.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{ind.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 glass border border-primary-100 dark:border-primary-800">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to find a partner?</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We curate a shortlist of 3-5 contract manufacturers that match your volume, quality standards (ISO 13485, IATF 16949), and capabilities.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <Link href="/contact">
                            <Button size="lg">Request Vendor Shortlist</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
