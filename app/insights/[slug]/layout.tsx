import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    // Convert slug to title
    const title = params.slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
        title: `${title} | Nearshore Navigator Insights`,
        description: `Read our expert analysis: ${title}. Learn about nearshoring, manufacturing, and industrial solutions in Tijuana.`,
        openGraph: {
            title: `${title} | Nearshore Navigator`,
            description: `Expert insights on ${title.toLowerCase()} for manufacturing and nearshoring in Tijuana, Mexico.`,
            type: "article",
        },
    };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
