import { BlogCard } from "@/components/BlogCard";

export const metadata = {
    title: "Insights | Nearshoring Blog",
    description: "Guides, news, and analysis on manufacturing and industrial real estate in Tijuana.",
};

const posts = [
    {
        title: "Nearshoring in Tijuana: A Guide for US Companies",
        excerpt: "Everything you need to know about setting up operations in Mexico's manufacturing hub.",
        date: "Oct 24, 2025",
        slug: "nearshoring-in-tijuana-guide-for-us-companies",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        tags: ["Guide", "Strategy"],
    },
    {
        title: "Tijuana vs Asia: Manufacturing Cost Comparison",
        excerpt: "Analyze the total landed cost benefits of manufacturing in Tijuana versus traditional Asian hubs.",
        date: "Nov 12, 2025",
        slug: "tijuana-vs-asia-manufacturing-cost-comparison",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        tags: ["Cost Analysis", "Economics"],
    },
    {
        title: "How Shelter Services Work in Tijuana",
        excerpt: "Understanding the shelter model: the fastest, lowest-risk way to start manufacturing in Mexico.",
        date: "Dec 05, 2025",
        slug: "how-shelter-services-work-in-tijuana",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
        tags: ["Shelter", "Legal"],
    },
    {
        title: "Industrial Parks Map Overview 2026",
        excerpt: "A deep dive into the top industrial zones: Otay, El Florido, and Pacifico.",
        date: "Jan 10, 2026",
        slug: "industrial-parks-in-tijuana-map-and-overview",
        imageUrl: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800",
        tags: ["Real Estate", "Maps"],
    }
];

export default function InsightsPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Nearshore Insights</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Expert analysis and guides to help you navigate the Mexican industrial landscape.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
