"use client";

import { BlogCard } from "@/components/BlogCard";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getMarketInsights } from "@/lib/mra-service";
import { BLOG_POSTS } from "@/app/constants/blog-data";
import { MRA_DATA } from "@/app/constants/mra-data";

const posts = BLOG_POSTS;
const mra = MRA_DATA;

// This is a client component
export default function InsightsPage() {
    const { t, language } = useLanguage();
    const [insights, setInsights] = useState<any[]>([]);
    const [blogPosts, setBlogPosts] = useState<any[]>(BLOG_POSTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch market insights
                const insightsData = await getMarketInsights();
                setInsights(insightsData);

                // Fetch blog posts
                const res = await fetch('/api/posts');
                if (res.ok) {
                    const data = await res.json();
                    if (data.posts && data.posts.length > 0) {
                        setBlogPosts(data.posts.map((p: any) => ({
                            ...p,
                            tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags
                        })));
                    }
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const mra = MRA_DATA;

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
                </div>

                <div className="container mx-auto px-4 z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Nearshore Insights</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Expert analysis and strategic roadmaps to help you navigate the Mexican industrial landscape.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-12">
                {/* Market Pulse Dashboard (Dynamic) */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <TrendingUp className="w-3 h-3" />
                                {t('broker.advisorTitle')} Pulse
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Baja Nearshore Intelligence</h2>
                            <p className="text-gray-600 dark:text-gray-400">Synthesized data from vetted broker network.</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Audit Data</span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">Updated 2026-02</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
                            ))
                        ) : (
                            insights.map((item) => (
                                <div 
                                    key={item.id} 
                                    className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                                        item.sentiment === 'caution' 
                                        ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30' 
                                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                                            {item.source}
                                        </h3>
                                        <span className={`w-2 h-2 rounded-full ${item.sentiment === 'caution' ? 'bg-amber-500' : 'bg-green-500'}`} />
                                    </div>
                                    <div className="text-xl font-bold mb-2 text-gray-900 dark:text-white leading-tight">
                                        {item.title}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {item.impact}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-[10px] font-bold text-gray-400">
                                        OBSERVED: {item.date}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Deep Dives</h2>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
                </div>
            </div>
        </div>
    );
}
