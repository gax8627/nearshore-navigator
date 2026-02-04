"use client";

import { Button } from "@/components/Button";
import Image from "next/image";
import { Check } from "lucide-react";
import { useState } from "react";

export default function ResourceMapPage({ params }: { params: { lang: string } }) {
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = (e: React.FormEvent) => {
        e.preventDefault();
        setDownloaded(true);
        
        // Redirect to the printable questionnaire page
        window.location.href = `/${params.lang}/resources/questionnaire`;
    };

    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000&v=2"
                        alt="Tijuana Industrial Park Map"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/70" />
                </div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tijuana Industrial Map</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Get high-resolution access to the layout of Tijuana&apos;s major industrial clusters. Essential for site selection planning.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-20">
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold uppercase tracking-wider text-sm mb-4">Free Resource</span>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Download the 2026 Map</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                            Ensure your site selection team has the most updated zoning data for Tijuana&apos;s top industrial zones: Otay, El Florido, and Pacifico.
                        </p>

                        <div className="space-y-4 mb-8">
                            {["Detailed zoning and locations", "Major highway access points", "Key tenants in each park", "Infrastructure highlights"].map(item => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                        {/* Decorative BG */}
                        <div className="absolute inset-0 bg-gray-900/5 dark:bg-gray-900/20 mix-blend-multiply pattern-grid-lg" />

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl relative z-10 glass-card border-none">
                            {!downloaded ? (
                                <form onSubmit={handleDownload} className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get the Map</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                        <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="Jane Smith" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email</label>
                                        <input required type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-colors" placeholder="jane@company.com" />
                                    </div>
                                    <Button className="w-full" size="lg">Download PDF</Button>
                                </form>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-6 text-4xl">
                                        ↓
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Download Started!</h3>
                                    <p className="text-gray-600 dark:text-gray-300">Check your email for the high-res file.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
