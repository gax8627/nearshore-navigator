import { Metadata } from "next";
import { getBlogPost } from "@/lib/blogContent";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getBlogPost(params.slug);
    
    if (!post) {
        return {
            title: "Article Not Found",
            description: "The requested article could not be found.",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            images: [post.imageUrl],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.imageUrl],
        },
    };
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
