import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
    title: "About Nearshore Navigator | Industrial Consulting",
    description: "We are a team of cross-border experts helping international companies establish successful manufacturing operations in Tijuana.",
};

export default function AboutPage() {
    return (
        <div className="pb-20">
            <section className="bg-gray-50 dark:bg-gray-900/50 py-20 px-4 transition-colors">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Bridging the Border for Global Industry</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Nearshore Navigator was founded to demystify the process of expanding into Mexico. We believe that Tijuana is the premier manufacturing hub for the North American market, and our mission is to make accessing it simple, transparent, and efficient.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <SectionTitle title="Our Expertise" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative h-80 rounded-2xl overflow-hidden glass-card">
                        <Image
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200"
                            alt="Our Team"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 dark:text-white">Local Knowledge, Global Standards</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Our team consists of industrial real estate brokers, shelter operations managers, and supply chain analysts who have lived and worked on both sides of the US-Mexico border.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            We understand the nuances of Mexican labor laws, import/export regulations (IMMEX), and the local industrial park landscape better than anyone else because we are on the ground every day.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
