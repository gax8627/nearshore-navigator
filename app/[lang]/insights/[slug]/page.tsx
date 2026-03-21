import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { getAllPosts, getPostBySlug } from "@/app/constants/blog-data";
import type { BlogPost as BlogPostType } from "@/app/constants/blog-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Insights articles are English-only content. Non-EN locale variants
  // are noindexed to prevent cannibalization of the /en/ page in Google search.
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/insights/${slug}`;
  const isNonEnglish = lang !== 'en';

  return {
    title: post.title,
    description: post.excerpt,
    robots: isNonEnglish ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://nearshorenavigator.com/en/insights/${slug}`,
        'x-default': `https://nearshorenavigator.com/en/insights/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
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

function getStructuredData(post: BlogPostType, lang: string) {
  const baseUrl = 'https://nearshorenavigator.com';
  const articleUrl = `${baseUrl}/${lang}/insights/${post.slug}`;
  const publishedDate = new Date(post.date).toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `${baseUrl}${post.imageUrl}`,
    "url": articleUrl,
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Person",
      "name": "Denisse Martinez",
      "url": `${baseUrl}/en/about/denisse-martinez`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": `${baseUrl}/${lang}/insights`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": articleUrl
      }
    ]
  };

  // Use per-article faqSchema from blog-data.ts (PAA-optimized Q&A pairs)
  const faqSchema = post.faqSchema && post.faqSchema.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqSchema.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  } : null;

  return { articleSchema, breadcrumbSchema, faqSchema };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
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

  const { articleSchema, breadcrumbSchema, faqSchema } = getStructuredData(post, lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
