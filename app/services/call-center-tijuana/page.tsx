import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { Headset, Users, Clock, DollarSign, Globe, CheckCircle2 } from "lucide-react";

export const metadata = {
    title: "Call Center Solutions in Tijuana | BPO Services",
    description: "Scale your customer support with 50,000+ bilingual agents in the Pacific Time Zone. Save 40-60% on BPO costs with nearshore call center services.",
};

export default function CallCenterPage() {
    const benefits = [
        { icon: <DollarSign className="w-6 h-6" />, title: "40-60% Cost Savings", desc: "Reduce operational costs compared to US-based call centers while maintaining quality." },
        { icon: <Users className="w-6 h-6" />, title: "50,000+ Bilingual Agents", desc: "Access a deep talent pool of English and Spanish speaking professionals." },
        { icon: <Clock className="w-6 h-6" />, title: "Pacific Time Zone", desc: "Same working hours as California for real-time collaboration and oversight." },
        { icon: <Globe className="w-6 h-6" />, title: "Cultural Alignment", desc: "Agents familiar with US culture and customer expectations." },
    ];

    const services = [
        "Inbound Customer Support",
        "Outbound Sales & Lead Generation",
        "Technical Support (Tier 1 & 2)",
        "Back Office Processing",
        "Chat & Email Support",
        "Bilingual (EN/ES) Services",
    ];

    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80&w=2000"
                        alt="Call center agents providing customer support"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
                </div>
                <div className="container mx-auto px-4 z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6">
                        <Headset className="w-4 h-4" />
                        BPO &amp; Call Center Services
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Call Center Solutions in <span className="text-green-300">Tijuana</span>
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                        Scale your customer support operations with Tijuana&apos;s world-class bilingual workforce at a fraction of US costs.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Benefits Grid */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Tijuana for BPO?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefits.map((benefit) => (
                                    <div key={benefit.title} className="glass-card p-6">
                                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Services List */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Services We Connect You With</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <div key={service} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Stats */}
                        <section className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Tijuana BPO at a Glance</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">50K+</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Bilingual Agents</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">40-60%</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">PST</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Time Zone</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary-500">85%+</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Agent Retention</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <LeadForm
                                title="Get a BPO Consultation"
                                subtitle="Tell us about your support needs and we&apos;ll connect you with vetted call center partners."
                                className="shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
