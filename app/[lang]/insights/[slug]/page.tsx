import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { getAllPosts, getPostBySlug } from "@/app/constants/blog-data";
import type { BlogPost as BlogPostType } from "@/app/constants/blog-data";
import { INDEXABLE_LOCALES } from "@/app/constants/seo-config";
import { Metadata } from "next";

// Indexable locales for insights: en, es, de, ja (synced with INDEXABLE_LOCALES)
const BLOG_INDEXABLE_LANGS = new Set(INDEXABLE_LOCALES);

function formatImageUrl(imageUrl: string, baseUrl: string = 'https://nearshorenavigator.com'): string {
  if (!imageUrl) return `${baseUrl}/images/nearshore-logo-brand.webp`;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const isIndexable = BLOG_INDEXABLE_LANGS.has(lang);
  const canonicalUrl = `https://nearshorenavigator.com/${lang}/insights/${slug}`;

  // Use localized title/excerpt for es/de/ja if available, fall back to English
  const localized = post.locales?.[lang];
  const title = localized?.title || post.metaTitle || post.title;
  const description = post.metaDescription || localized?.excerpt || post.excerpt;
  const fullImageUrl = formatImageUrl(post.imageUrl);
  const pageTitle = (post.metaTitle || title.length > 42)
    ? title
    : `${title} | Nearshore Navigator`;

  return {
    title: { absolute: pageTitle },
    description,
    // Only non-indexable locales get noindex
    robots: isIndexable ? undefined : { index: false, follow: true },
    alternates: {
      // Each indexable locale is its own canonical
      canonical: isIndexable
        ? canonicalUrl
        : `https://nearshorenavigator.com/en/insights/${slug}`,
      languages: Object.fromEntries([
        ...INDEXABLE_LOCALES.map(l => [l, `https://nearshorenavigator.com/${l}/insights/${slug}`]),
        ['x-default', `https://nearshorenavigator.com/en/insights/${slug}`]
      ]),
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
  };
}

function getStructuredData(post: BlogPostType, lang: string) {
  const baseUrl = 'https://nearshorenavigator.com';
  const articleUrl = `${baseUrl}/${lang}/insights/${post.slug}`;
  const publishedDate = new Date(post.date).toISOString();
  const fullImageUrl = formatImageUrl(post.imageUrl, baseUrl);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": fullImageUrl,
    "url": articleUrl,
    "datePublished": publishedDate,
    "dateModified": publishedDate,
    "author": {
      "@type": "Person",
      "@id": `${baseUrl}/en/about/denisse-martinez#person`,
      "name": "Denisse Martinez",
      "jobTitle": "Founder & Principal Nearshore Advisor",
      "url": `${baseUrl}/en/about/denisse-martinez`,
      "image": `${baseUrl}/images/denisse-martinez.webp`,
      "sameAs": [
        "https://www.linkedin.com/in/denissemartinez"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nearshore Navigator",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/nearshore-logo-brand.webp`
      }
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".speakable-direct-answer",
        ".speakable-summary",
        ".direct-answer-capsule",
        ".faq-answer",
        "#faq-direct-response",
        "h1",
        "h2"
      ]
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

  const howToSchema = post.howToSchema ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.howToSchema.name,
    "description": post.howToSchema.description,
    "step": post.howToSchema.step.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.name,
      "text": s.text
    }))
  } : null;

  return { articleSchema, breadcrumbSchema, faqSchema, howToSchema };
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

  const { articleSchema, breadcrumbSchema, faqSchema, howToSchema } = getStructuredData(post, lang);

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
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <BlogPost post={post} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.flatMap((post) =>
    INDEXABLE_LOCALES.map((lang) => ({
      lang,
      slug: post.slug,
    }))
  );
}
