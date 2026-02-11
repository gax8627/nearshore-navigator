import { BlogCard } from "@/components/BlogCard";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { TrendingUp, Users, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
    title: "Insights | Nearshoring Blog",
    description: "Guides, news, and analysis on manufacturing and industrial real estate in Baja California.",
};

import { BLOG_POSTS } from "@/app/constants/blog-data";
import { MRA_DATA } from "@/app/constants/mra-data";

const posts = BLOG_POSTS;
const mra = MRA_DATA;

export default function InsightsPage() {
    const { t, language } = useLanguage();
    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000"
                        alt="Nearshore Manufacturing Insights and Analysis - Baja California Blog"
                        fill
                        className="object-cover premium-image-filter"
                        priority
                    />
                    <div className="absolute inset-0 bg-gray-900/70" />
                </div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Nearshore Insights</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Expert analysis and guides to help you navigate the Mexican industrial landscape.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-12">
                {/* Market Pulse Dashboard */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <TrendingUp className="w-3 h-3" />
                                Real-Time Market Pulse
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Baja Nearshore Intelligence</h2>
                            <p className="text-gray-600 dark:text-gray-400">Synthesized data from {mra.auditSource}.</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Audit Data</span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">Updated {mra.lastUpdated}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {mra.highlights.map((item) => (
                            <div 
                                key={item.id} 
                                className={`p-5 rounded-2xl border ${
                                    item.category === 'HotTopic' 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-transparent' 
                                    : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800'
                                }`}
                            >
                                <h3 className={`text-sm font-bold uppercase mb-4 flex items-center gap-2 ${item.category === 'HotTopic' ? 'opacity-80' : 'text-gray-500'}`}>
                                    {item.category === 'Sentiment' && <Users className="w-4 h-4" />}
                                    {item.category === 'Investment' && <ShieldCheck className="w-4 h-4" />}
                                    {item.category === 'Constraint' && <AlertCircle className="w-4 h-4" />}
                                    {item.label}
                                </h3>
                                <div className={`text-2xl font-bold mb-1 ${item.category === 'HotTopic' ? '' : 'text-gray-900 dark:text-white'}`}>
                                    {item.value}
                                </div>
                                {item.category === 'Sentiment' && (
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full w-[85%]" />
                                    </div>
                                )}
                                {item.change && (
                                    <div className={`text-xs font-bold ${item.trend === 'up' ? 'text-green-500' : 'text-orange-500'}`}>
                                        {item.change}
                                    </div>
                                )}
                                <p className={`text-xs mt-3 ${item.category === 'HotTopic' ? 'opacity-90 leading-relaxed' : 'text-gray-500'}`}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Deep Dives</h2>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
                </div>
            </div>
        </div>
    );
}
