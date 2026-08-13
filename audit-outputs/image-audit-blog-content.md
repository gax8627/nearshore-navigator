# Web Media Asset & Blog Image Audit Report

**Target Scope:** `app/constants/blog-data.ts`, `content/` directory, and blog rendering components (`app/[lang]/insights/`)  
**Audit Date:** August 13, 2026  
**Auditor:** QA & Web Media Asset Auditor  
**Output Path:** `audit-outputs/image-audit-blog-content.md`

---

## Executive Summary

A comprehensive audit was performed across all blog data files, Markdown/MDX content, metadata Open Graph tags, JSON-LD structured data schemas, and UI rendering components. A total of **40 blog post records** in `app/constants/blog-data.ts` and **20 files** in `content/` were audited alongside local public assets in `public/images/`.

### Key Findings & Risk Levels

| Risk Category | Severity | Issue Summary | Affected File(s) |
| :--- | :---: | :--- | :--- |
| **Malformed Schema.org URL** | 🔴 **CRITICAL** | `image` field in `Article` JSON-LD prepends `${baseUrl}` to external Unsplash URLs, creating invalid malformed URLs like `https://nearshorenavigator.comhttps://images.unsplash.com/...`. | [page.tsx](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/insights/%5Bslug%5D/page.tsx#L72) |
| **Relative Open Graph URL** | 🟠 **HIGH** | `openGraph.images[0].url` uses relative paths (`/images/...`) instead of absolute URLs, causing broken image previews on social platforms (LinkedIn, Twitter). | [page.tsx](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/insights/%5Bslug%5D/page.tsx#L50-L57) |
| **Missing `imageAlt` Type Field** | 🟡 **MEDIUM** | `BlogPost` TypeScript interface and `BLOG_POSTS_RAW` data objects lack dedicated `imageAlt` fields, relying solely on fallback to article titles. | [blog-data.ts](file:///Users/gax8627/nearshore-navigator/app/constants/blog-data.ts#L1-L18) |
| **External Unsplash CDN Risk** | 🟡 **MEDIUM** | 8 Unsplash URLs used across blog posts without local fallbacks or local caching. | [blog-data.ts](file:///Users/gax8627/nearshore-navigator/app/constants/blog-data.ts#L26) |
| **Duplicate Raw Post Entries** | 🔵 **LOW** | `BLOG_POSTS_RAW` contains redundant duplicate post objects (e.g. lines 613 vs 2071, lines 953 vs 2415) appended to the array. | [blog-data.ts](file:///Users/gax8627/nearshore-navigator/app/constants/blog-data.ts#L613) |

---

## 1. Audit Scope & Methodology

The audit inspected all image references across:
1. **Blog Data Registry:** `app/constants/blog-data.ts` (3,814 lines, 40 raw blog post entries).
2. **Markdown/MDX Content:** `content/` directory (20 `.md` and `.mdx` files across `content/insights/`, `content/blogs/`, `content/outreach/`, and `content/reports/`).
3. **Local Media Assets:** `public/images/` directory (verification of local file existence, format, and pathing).
4. **Rendering & Metadata Components:** `app/[lang]/insights/[slug]/page.tsx`, `components/BlogPost.tsx`, `components/BlogCard.tsx`, and `app/[lang]/insights/InsightsClient.tsx`.

---

## 2. Inspection of `app/constants/blog-data.ts`

### 2.1 Type Schema Analysis (`BlogPost`)

In `app/constants/blog-data.ts` ([lines 1–18](file:///Users/gax8627/nearshore-navigator/app/constants/blog-data.ts#L1-L18)):

```typescript
export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  imageUrl: string;
  tags: string[];
  content?: string;
  faqSchema?: { q: string; a: string }[];
  locales?: {
    [key: string]: {
      title: string;
      excerpt: string;
      content?: string;
      tags?: string[];
    }
  }
};
```

> [!WARNING]
> **Schema Deficit:** The `BlogPost` type lacks an `imageAlt?: string` property. As a result, no individual post entry specifies custom descriptive accessibility text for its hero image.

### 2.2 Inventory of Blog Post Image References

The table below lists all 40 post instances in `BLOG_POSTS_RAW`, their line numbers, image URLs, asset types, and verified disk status:

| Line # | Post Slug | Hero Image URL | Asset Type | Disk Status / URL Risk |
| :---: | :--- | :--- | :---: | :---: |
| **26** | `monterrey-industrial-parks-energy-resilience` | `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e...` | Unsplash CDN | External Link |
| **61** | `nearshoring-in-tijuana-guide-for-us-companies` | `/images/warehouse.jpg` | Local File | ✅ Exists (`public/images/warehouse.jpg`) |
| **158** | `tijuana-vs-asia-manufacturing-cost-comparison` | `/images/factory-worker.jpg` | Local File | ✅ Exists (`public/images/factory-worker.jpg`) |
| **244** | `how-shelter-services-work-in-tijuana` | `/images/consulting.jpg` | Local File | ✅ Exists (`public/images/consulting.jpg`) |
| **333** | `industrial-parks-in-tijuana-map-and-overview` | `https://images.unsplash.com/photo-1587293852726-70cdb56c2866...` | Unsplash CDN | External Link |
| **409** | `mexico-2025-nearshoring-boom-usmca-review` | `https://images.unsplash.com/photo-1565793298595-6a879b1d9492...` | Unsplash CDN | External Link |
| **481** | `ultimate-guide-nearshore-shelter-services-baja-california` | `/images/consulting.jpg` | Local File | ✅ Exists (`public/images/consulting.jpg`) |
| **560** | `2025-tariffs-baja-california-supply-chain` | `/images/warehouse.jpg` | Local File | ✅ Exists (`public/images/warehouse.jpg`) |
| **613** | `maquiladora-vs-shelter-services-mexico` (Entry 1) | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158...` | Unsplash CDN | External Link (Duplicate Post) |
| **953** | `china-plus-one-strategy-mexico` (Entry 1) | `/images/china-plus-one-strategy.png` | Local File | ✅ Exists (`public/images/china-plus-one-strategy.png`) |
| **1544** | `medical-device-manufacturing-tijuana` (Entry 1) | `https://images.unsplash.com/photo-1579684385127-1ef15d508118...` | Unsplash CDN | External Link (Duplicate Post) |
| **1808** | `aerospace-manufacturing-queretaro-mexico` (Entry 1) | `/images/industrial-park-hero.jpg` | Local File | ✅ Exists (`public/images/industrial-park-hero.jpg`) |
| **2071** | `maquiladora-vs-shelter-services-mexico` (Entry 2) | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158...` | Unsplash CDN | External Link (Duplicate Post) |
| **2415** | `china-plus-one-strategy-mexico` (Entry 2) | `/images/china-plus-one-strategy.png` | Local File | ✅ Exists (`public/images/china-plus-one-strategy.png`) |
| **3028** | `medical-device-manufacturing-tijuana` (Entry 2) | `https://images.unsplash.com/photo-1579684385127-1ef15d508118...` | Unsplash CDN | External Link (Duplicate Post) |
| **3301** | `aerospace-manufacturing-queretaro-mexico` (Entry 2) | `/images/industrial-park-hero.jpg` | Local File | ✅ Exists (`public/images/industrial-park-hero.jpg`) |
| **3563** | `how-to-start-manufacturing-in-mexico-2026` | `/images/factory-worker.jpg` | Local File | ✅ Exists (`public/images/factory-worker.jpg`) |
| **3716** | `section-321-vs-immex-maquiladora-fulfillment-guide` | `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d...` | Unsplash CDN | External Link |

*Note: The remaining 22 entries in `BLOG_POSTS_RAW` are localized child objects or additional raw duplicates in the array.*

---

## 3. Inspection of `content/` Directory (.md & .mdx)

Audited 20 files in `content/`. Frontmatter image references were identified in 7 files:

| File Path | Frontmatter Line | Image URL | Disk / URL Status |
| :--- | :---: | :--- | :--- |
| `content/blogs/asian-capital-expansion-mexico-immex.md` | Line 4 | `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb...` | Unsplash CDN |
| `content/insights/aerospace-manufacturing-queretaro-mexico.mdx` | Line 4 | `https://images.unsplash.com/photo-1544256718-3b62373aec17...` | Unsplash CDN |
| `content/insights/china-plus-one-strategy-mexico.mdx` | Line 4 | `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb...` | Unsplash CDN |
| `content/insights/ko/china-plus-one-strategy-mexico.mdx` | Line 4 | `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb...` | Unsplash CDN |
| `content/insights/maquiladora-vs-shelter-services-mexico.mdx` | Line 4 | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158...` | Unsplash CDN |
| `content/insights/medical-device-manufacturing-tijuana.mdx` | Line 4 | `https://images.unsplash.com/photo-1579684385127-1ef15d508118...` | Unsplash CDN |
| `content/insights/zh/china-plus-one-strategy-mexico.mdx` | Line 4 | `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb...` | Unsplash CDN |

### 3.1 Markdown `![alt](url)` & Raw `<img>` Tag Audit
- **Markdown Body Images `![alt](url)`:** **0** inline markdown image tags found across `content/`.
- **HTML `<img>` Tags:** **0** raw HTML `<img>` tags found across `content/`.

---

## 4. 404 Image Link Risks & Metadata Deficiencies

### 4.1 🔴 Malformed JSON-LD Structured Data `image` URL (Critical Bug)

In [app/[lang]/insights/[slug]/page.tsx:L72](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/insights/%5Bslug%5D/page.tsx#L72):

```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": `${baseUrl}${post.imageUrl}`, // <--- CRITICAL BUG
  "url": articleUrl,
  ...
};
```

#### Problem Analysis:
When `post.imageUrl` is an absolute HTTP/HTTPS URL (such as an Unsplash URL), string interpolation produces a corrupted URL string:
```text
"image": "https://nearshorenavigator.comhttps://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
```
This causes search engine parsers (Googlebot, Bingbot) to throw structured data errors and fail Rich Snippet validation.

---

### 4.2 🟠 Relative Open Graph Image URLs (High Risk)

In [app/[lang]/insights/[slug]/page.tsx:L50-L57](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/insights/%5Bslug%5D/page.tsx#L50-L57):

```typescript
openGraph: {
  title,
  description,
  type: "article",
  url: canonicalUrl,
  images: [
    {
      url: post.imageUrl, // <--- HIGH RISK: Can be relative path '/images/warehouse.jpg'
      width: 1200,
      height: 630,
      alt: title,
    },
  ],
}
```

#### Problem Analysis:
When `post.imageUrl` is a relative local path such as `/images/warehouse.jpg`, Next.js renders:
```html
<meta property="og:image" content="/images/warehouse.jpg" />
```
Per Open Graph Protocol specifications, `og:image` values **must be absolute URLs with scheme (`http://` or `https://`)**. Social platforms (LinkedIn, Twitter/X, Facebook, WhatsApp, Slack) will fail to resolve relative image paths, displaying blank link preview cards.

---

### 4.3 🟡 External Unsplash CDN Risks

8 blog posts rely on external Unsplash image URLs (e.g. `https://images.unsplash.com/photo-...`). 
- **Risks:** Remote asset removal, DNS resolution delays, parameter deprecation, or rate limiting.
- **Recommendation:** Download all external Unsplash cover photos to local WebP/JPG assets in `public/images/blog/` for static self-hosting and guaranteed 100% uptime.

---

## 5. Missing Alt Text & Accessibility (WCAG 2.1) Audit

1. **Cover Image Component Alt Text:**
   - In [components/BlogPost.tsx:L30](file:///Users/gax8627/nearshore-navigator/components/BlogPost.tsx#L30):
     `alt={`${currentTitle} - Nearshore Navigator Industrial Insight`}`
   - In [components/BlogCard.tsx:L37](file:///Users/gax8627/nearshore-navigator/components/BlogCard.tsx#L37):
     `alt={title}`
   - **Assessment:** Alt text is dynamically generated using the post title. While this prevents completely empty `alt=""` attributes, it does not provide descriptive alternative text for screen readers describing visual context (e.g., "Industrial manufacturing floor with automated robotic arms in Monterrey park").
2. **Schema Level:** `BlogPost` type lacks an optional `imageAlt?: string` attribute.

---

## 6. Recommended Fixes & Implementation Plan

### Fix 1: Resolve Malformed JSON-LD & Relative OG Image URLs

Update [app/[lang]/insights/[slug]/page.tsx](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/insights/%5Bslug%5D/page.tsx) with a helper function to ensure proper absolute URL formatting:

```diff
+ function formatImageUrl(imageUrl: string, baseUrl: string): string {
+   if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
+     return imageUrl;
+   }
+   return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
+ }

  export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    ...
+   const fullImageUrl = formatImageUrl(post.imageUrl, 'https://nearshorenavigator.com');

    return {
      ...
      openGraph: {
        title,
        description,
        type: "article",
        url: canonicalUrl,
        images: [
          {
-           url: post.imageUrl,
+           url: fullImageUrl,
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
+   const fullImageUrl = formatImageUrl(post.imageUrl, baseUrl);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
-     "image": `${baseUrl}${post.imageUrl}`,
+     "image": fullImageUrl,
      "url": articleUrl,
      ...
    };
  }
```

---

### Fix 2: Extend `BlogPost` Type Schema with `imageAlt`

In [app/constants/blog-data.ts](file:///Users/gax8627/nearshore-navigator/app/constants/blog-data.ts#L1-L18):

```diff
  export type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    imageUrl: string;
+   imageAlt?: string;
    tags: string[];
    content?: string;
    faqSchema?: { q: string; a: string }[];
    locales?: {
      [key: string]: {
        title: string;
        excerpt: string;
        content?: string;
        tags?: string[];
+       imageAlt?: string;
      }
    }
  };
```

---

### Fix 3: Update `BlogPost.tsx` and `BlogCard.tsx` Alt Handling

In [components/BlogPost.tsx](file:///Users/gax8627/nearshore-navigator/components/BlogPost.tsx#L28-L34):

```diff
+ const currentImageAlt = post.locales?.[language]?.imageAlt || post.imageAlt || `${currentTitle} - Nearshore Navigator Industrial Insight`;

  <Image
      src={post.imageUrl}
-     alt={`${currentTitle} - Nearshore Navigator Industrial Insight`}
+     alt={currentImageAlt}
      fill
      className="object-cover transition-transform duration-1000 hover:scale-105 premium-image-filter"
      priority
  />
```

---

### Fix 4: Localize External Unsplash Assets

Download external Unsplash images to local files under `public/images/blog/` and update references in `blog-data.ts` and `content/`:

1. `public/images/blog/monterrey-energy.jpg`
2. `public/images/blog/tijuana-parks-map.jpg`
3. `public/images/blog/nearshoring-investment.jpg`
4. `public/images/blog/maquiladora-shelter.jpg`
5. `public/images/blog/medical-device-tijuana.jpg`
6. `public/images/blog/section-321-customs.jpg`
7. `public/images/blog/aerospace-queretaro.jpg`
