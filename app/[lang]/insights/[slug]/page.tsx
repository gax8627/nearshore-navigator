import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { getAllPosts, getPostBySlug } from "@/app/constants/blog-data";
import type { BlogPost as BlogPostType } from "@/app/constants/blog-data";
import { INDEXABLE_LOCALES } from "@/app/constants/seo-config";
import { Metadata } from "next";

// Phase 1 indexable locales for insights: en, de, ja (es has same content as en for blog)
const BLOG_INDEXABLE_LANGS = new Set(['en', 'de', 'ja']);

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const isIndexable = BLOG_INDEXABLE_LANGS.has(lang);
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/insights/${slug}`;

  // Use localized title/excerpt for de/ja if available, fall back to English
  const localized = post.locales?.[lang];
  const title = localized?.title || post.title;
  const description = localized?.excerpt || post.excerpt;

  return {
    title,
    description,
    // Only non-indexable locales (es, zh, ko, etc.) get noindex
    robots: isIndexable ? undefined : { index: false, follow: true },
    alternates: {
      // Each indexable locale is its own canonical
      canonical: isIndexable
        ? canonicalUrl
        : `https://nearshorenavigator.com/en/insights/${slug}`,
      languages: {
        'en': `https://nearshorenavigator.com/en/insights/${slug}`,
        'de': `https://nearshorenavigator.com/de/insights/${slug}`,
        'ja': `https://nearshorenavigator.com/ja/insights/${slug}`,
        'x-default': `https://nearshorenavigator.com/en/insights/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
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
  // Pre-render all slugs for all indexable locales (lang comes from parent [lang] segment)
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
