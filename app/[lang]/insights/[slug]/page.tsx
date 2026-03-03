import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { getAllPosts, getPostBySlug } from "@/app/constants/blog-data";
import type { BlogPost as BlogPostType } from "@/app/constants/blog-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

function getStructuredData(post: BlogPostType) {
  const isShelterGuide = post.slug === 'ultimate-guide-nearshore-shelter-services-baja-california';
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://nearshorenavigator.com${post.imageUrl}`,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": "Denisse Martinez",
      "url": "https://nearshorenavigator.com/about/denisse-martinez"
    }
  };

  const faqSchema = isShelterGuide ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to set up manufacturing in Mexico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With a shelter service, you can bypass the 6-12 month legal incorporation process and begin manufacturing operations in as little as 90 days."
        }
      }
    ]
  } : null;

  return { articleSchema, faqSchema };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getPostBySlug(slug);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/posts/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (res.ok) {
      const data = await res.json();
        if (data.post) {
          post = {
            ...data.post,
            tags: typeof data.post.tags === 'string' ? JSON.parse(data.post.tags) : data.post.tags
          };
        }
    }
  } catch (error) {
    console.warn(`Failed to fetch post ${slug} from API, using fallback.`);
  }

  if (!post) {
    notFound();
  }

  const { articleSchema, faqSchema } = getStructuredData(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPost post={post} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
