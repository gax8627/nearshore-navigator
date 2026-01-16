import Link from "next/link";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    // Mock data - in a real app this would fetch based on slug
    const title = params.slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <Link href="/insights" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
            </Link>

            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">{title}</h1>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-12 border-b border-gray-100 dark:border-gray-800 pb-8">
                    <span>Oct 24, 2025</span>
                    <span>•</span>
                    <span>5 min read</span>
                    <span>•</span>
                    <span className="text-primary-600 dark:text-primary-400 font-medium">Strategy Guide</span>
                </div>

                <p className="lead text-xl text-gray-700 dark:text-gray-300">
                    This is a placeholder for the full article content. In a production environment, this would be populated by a CMS or Markdown file corresponding to the slug: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm text-pink-600 dark:text-pink-400">{params.slug}</code>.
                </p>

                <h2 className="mt-12 text-2xl font-bold dark:text-white">Why Tijuana?</h2>
                <p>
                    Tijuana has established itself as the premier manufacturing hub for North America, specifically for the medical device, aerospace, and electronics sectors.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <figure className="my-12">
                    <div className="bg-gray-200 dark:bg-gray-800 h-96 w-full rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500">
                        Article Diagram / Image Placeholder
                    </div>
                    <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">Figure 1.1: Cost comparison chart.</figcaption>
                </figure>

                <h2 className="text-2xl font-bold dark:text-white">Key Takeaways</h2>
                <ul>
                    <li>Proximity to California reduces logistics costs.</li>
                    <li>Highly skilled labor force with decades of manufacturing heritage.</li>
                    <li>Shelter programs offer rapid market entry.</li>
                </ul>
            </article>

            <div className="mt-20 p-8 sm:p-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-center transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to learn more?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Schedule a consultation with our team to discuss your specific project requirements.
                </p>
                <Link href="/contact">
                    <Button size="lg">Book a Free Consultation</Button>
                </Link>
            </div>
        </div>
    );
}
