import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
    title: "Shelter Services in Tijuana | Fast Manufacturing Setup",
    description: "Start manufacturing in Mexico in 90 days with our Shelter Services. Minimize risk and liability while maintaining full control.",
};

export default function ShelterServicesPage() {
    return (
        <div className="pb-20">
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000"
                        alt="Team Strategy"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
                </div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Shelter Services in <span className="text-green-300">Tijuana</span></h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        The fastest, safest way to start manufacturing in Mexico without establishing a legal entity.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What is a Shelter Company?</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                            A Shelter Service acts as your legal entity in Mexico. We handle all the administrative, legal, human resources, and compliance tasks. You retain 100% control over your production processes, quality, and intellectual property. It&apos;s a &quot;plug-and-play&quot; solution for manufacturing.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shelter vs. Standalone Entity</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                        <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Feature</th>
                                        <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20">Shelter Service</th>
                                        <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">Standalone Entity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">Start-up Time</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 font-bold bg-primary-50/30 dark:bg-primary-900/10">90 Days</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">6-12 Months</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">Legal Liability</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">Shelter assumes liability</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">You assume 100% liability</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">HR & Recruiting</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">Included</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">Your Responsibility</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-900 dark:text-white">Exit Strategy</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-primary-700 dark:text-primary-400 bg-primary-50/30 dark:bg-primary-900/10">Simple (30-60 days)</td>
                                        <td className="p-4 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">Complex Liquidation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <LeadForm
                                title="Talk to a Shelter Advisor"
                                subtitle="Get a free cost analysis comparing Shelter vs. Standalone."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
