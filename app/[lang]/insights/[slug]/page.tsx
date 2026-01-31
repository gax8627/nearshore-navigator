import Link from "next/link";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import { getBlogPost, getAllBlogPosts } from "@/lib/blogContent";
import { notFound } from "next/navigation";
import Image from "next/image";

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getBlogPost(params.slug);
    
    // If post doesn't exist, show 404
    if (!post) {
        notFound();
    }

    // Convert markdown-style content to HTML paragraphs
    const renderContent = (content: string) => {
        const lines = content.trim().split('\n');
        const elements: JSX.Element[] = [];
        let currentIndex = 0;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('## ')) {
                elements.push(
                    <h2 key={currentIndex++} className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                        {trimmedLine.replace('## ', '')}
                    </h2>
                );
            } else if (trimmedLine.startsWith('### ')) {
                elements.push(
                    <h3 key={currentIndex++} className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
                        {trimmedLine.replace('### ', '')}
                    </h3>
                );
            } else if (trimmedLine.startsWith('- **')) {
                elements.push(
                    <li key={currentIndex++} className="ml-4 text-gray-600 dark:text-gray-300">
                        {trimmedLine.replace('- ', '')}
                    </li>
                );
            } else if (trimmedLine.startsWith('- ')) {
                elements.push(
                    <li key={currentIndex++} className="ml-4 text-gray-600 dark:text-gray-300">
                        {trimmedLine.replace('- ', '')}
                    </li>
                );
            } else if (trimmedLine.startsWith('1. ') || trimmedLine.startsWith('2. ') || trimmedLine.startsWith('3. ') || trimmedLine.startsWith('4. ') || trimmedLine.startsWith('5. ')) {
                elements.push(
                    <li key={currentIndex++} className="ml-4 text-gray-600 dark:text-gray-300 list-decimal">
                        {trimmedLine.replace(/^\d\. /, '')}
                    </li>
                );
            } else if (trimmedLine.startsWith('|')) {
                // Skip table rows for now - they need special handling
            } else if (trimmedLine.length > 0) {
                elements.push(
                    <p key={currentIndex++} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {trimmedLine}
                    </p>
                );
            }
        });

        return elements;
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <Link href="/insights" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
            </Link>

            <article>
                {/* Hero Image */}
                <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
                    <Image
                        src={post.imageUrl}
                        alt={`Featured image for article: ${post.title}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Category & Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                        {post.category}
                    </span>
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-12 border-b border-gray-100 dark:border-gray-800 pb-8">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                {/* Excerpt */}
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                    {post.excerpt}
                </p>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    {renderContent(post.content)}
                </div>
            </article>

            {/* CTA */}
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
