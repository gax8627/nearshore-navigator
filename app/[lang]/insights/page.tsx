import { BlogCard } from "@/components/BlogCard";
import Image from "next/image";

export const metadata = {
    title: "Insights | Nearshoring Blog",
    description: "Guides, news, and analysis on manufacturing and industrial real estate in Baja California.",
};

import { BLOG_POSTS } from "@/app/constants/blog-data";

const posts = BLOG_POSTS;

export default function InsightsPage() {
    return (
        <div className="pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000"
                        alt="Nearshore Insights and Analysis"
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

            <div className="container mx-auto px-4 mt-20">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
                </div>
            </div>
        </div>
    );
}
