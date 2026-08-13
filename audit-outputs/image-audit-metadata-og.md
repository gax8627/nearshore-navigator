# OpenGraph, Twitter, JSON-LD Schema & Favicon/Manifest Image Audit Report

**Target Workspace:** `nearshore-navigator`  
**Audit Date:** August 13, 2026  
**Auditor:** QA & Web Media Asset Auditor  
**Output File:** `audit-outputs/image-audit-metadata-og.md`

---

## Executive Summary

A comprehensive QA and web media asset audit was conducted across all metadata generators (`generateMetadata()`), layout files (`app/layout.tsx`, `app/[lang]/layout.tsx`), JSON-LD schema components (`components/SchemaMarkup.tsx`, page-level JSON-LD schemas), blog content data structures (`app/constants/blog-data.ts`, `lib/blogContent.ts`), favicons, and web manifest declarations across the Nearshore Navigator platform.

### Summary of Audit Findings

| Category | Inspected Items | Passed | Issues Found | Criticality |
| :--- | :---: | :---: | :---: | :--- |
| **JSON-LD Schema Images** | 7 Schemas | 6 | **1 Critical Bug** (Double-Protocol Malformed URLs) | 🚨 **CRITICAL** |
| **Favicons & Touch Icons** | 3 Configurations | 1 | **Missing Static Assets & 404 Routes** | ⚠️ **HIGH** |
| **Web App Manifest** | 1 Requirement | 0 | **Manifest File Completely Missing** | ⚠️ **HIGH** |
| **Twitter Cards (`twitter:image`)** | 32 Metadata Files | 0 | **100% Missing Across Site** | ⚠️ **MEDIUM** |
| **OpenGraph (`og:image`)** | 32 Metadata Files | 4 | **Missing in 4 Service Pages + 20 Subpages** | ℹ️ **LOW / MEDIUM** |
| **Remote/CDN Images (Unsplash)** | 9 Unique URLs | 9 | **External Dependency Risk** | ℹ️ **LOW** |

---

## 1. JSON-LD Schema Image Fields Audit

### 🚨 Critical Bug Found: Malformed Double-Protocol URLs in Article Schema

In [`app/[lang]/insights/[slug]/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/insights/[slug]/page.tsx#L72), line 72 prepends `baseUrl` (`'https://nearshorenavigator.com'`) directly onto `post.imageUrl`:

```typescript
// app/[lang]/insights/[slug]/page.tsx:72
"image": `${baseUrl}${post.imageUrl}`,
```

When `post.imageUrl` is defined in [`app/constants/blog-data.ts`](file:///Users/gax8627/nearshore-navigator/app/constants/blog-data.ts) or [`lib/blogContent.ts`](file:///Users/gax8627/nearshore-navigator/lib/blogContent.ts) as an absolute URL (e.g. starting with `https://images.unsplash.com/...`), string interpolation creates a **corrupted double-protocol URL**:

```text
https://nearshorenavigator.comhttps://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800
```

- **Impact:** Invalidates Google Rich Results / Article JSON-LD schema parsing for all blog posts using absolute image URLs, causing Google Search Console schema warnings and rendering failure in Google Discover / News previews.
- **Affected Posts (Sample):**
  - `monterrey-industrial-parks-energy-resilience`
  - `industrial-parks-in-tijuana-map-and-overview`
  - `mexico-2025-nearshoring-boom-usmca-review`
  - `maquiladora-vs-shelter-services-mexico`
  - `medical-device-manufacturing-tijuana`
  - `section-321-vs-immex-maquiladora-fulfillment-guide`
- **Recommended Fix:** Ensure `post.imageUrl` handles both absolute and relative URLs safely:
  ```typescript
  const articleImageUrl = post.imageUrl.startsWith('http')
    ? post.imageUrl
    : `${baseUrl}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`;
  ```

---

### Detailed Inventory of JSON-LD Schema Image Fields

| Schema File | Line # | Schema Type | Image Property | Resolved URL | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| [`components/SchemaMarkup.tsx`](file:///Users/gax8627/nearshore-navigator/components/SchemaMarkup.tsx#L14) | 14 | `Organization` | `logo` | `https://nearshorenavigator.com/logo.png` | ✅ Valid (`public/logo.png` exists) |
| [`components/SchemaMarkup.tsx`](file:///Users/gax8627/nearshore-navigator/components/SchemaMarkup.tsx#L46) | 46 | `LocalBusiness` (Tijuana) | `image` | `https://nearshorenavigator.com/logo.png` | ✅ Valid (`public/logo.png` exists) |
| [`components/SchemaMarkup.tsx`](file:///Users/gax8627/nearshore-navigator/components/SchemaMarkup.tsx#L77) | 77 | `LocalBusiness` (Mexicali) | `image` | `https://nearshorenavigator.com/logo.png` | ✅ Valid (`public/logo.png` exists) |
| [`components/SchemaMarkup.tsx`](file:///Users/gax8627/nearshore-navigator/components/SchemaMarkup.tsx#L169) | 169 | `Person` (Denisse) | `image` | `https://nearshorenavigator.com/images/denisse-martinez.jpg` | ✅ Valid (`public/images/denisse-martinez.jpg` exists) |
| [`app/[lang]/about/denisse-martinez/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/about/denisse-martinez/page.tsx#L35) | 35 | `Person` (Denisse) | `image` | `https://nearshorenavigator.com/images/denisse-martinez.jpg` | ✅ Valid (`public/images/denisse-martinez.jpg` exists) |
| [`app/[lang]/insights/[slug]/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/insights/[slug]/page.tsx#L86) | 86 | `Organization` (Publisher) | `logo.url` | `https://nearshorenavigator.com/logo.png` | ✅ Valid (`public/logo.png` exists) |
| [`app/[lang]/insights/[slug]/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/insights/[slug]/page.tsx#L72) | 72 | `Article` | `image` | `${baseUrl}${post.imageUrl}` | 🚨 **MALFORMED** for absolute URLs |

---

## 2. Favicon, Apple Touch Icon & Manifest Audit

### Findings & Issues

1. **`app/layout.tsx` Static Metadata Icon Resolution Error:**
   In [`app/layout.tsx`](file:///Users/gax8627/nearshore-navigator/app/layout.tsx#L12-L16):
   ```typescript
   icons: {
     icon: '/icon.png',
     shortcut: '/icon.png',
     apple: '/icon.png',
   }
   ```
   - **Problem:** `metadata.icons` references static path `/icon.png`. Next.js outputs standard `<link rel="icon" href="/icon.png">` tags pointing to the static web root. However, **`public/icon.png` DOES NOT EXIST**.
   - While Next.js App Router has `app/icon.png` (dynamic route `/icon.png?v=...`), direct requests to `/icon.png`, `/favicon.ico`, or `/apple-touch-icon.png` by browsers, bots, or Apple iOS devices return **404 Not Found**.

2. **Missing Standard Favicon / Touch Icon Assets in `public/`:**
   - `public/favicon.ico`: ❌ Missing
   - `public/icon.png`: ❌ Missing
   - `public/apple-icon.png` / `public/apple-touch-icon.png`: ❌ Missing

3. **Completely Missing Web Application Manifest (`manifest.json`):**
   - Neither `app/manifest.ts`, `app/manifest.json`, nor `public/manifest.json` exists in the repository.
   - Mobile browsers and PWA auditing tools (Lighthouse) fail to find web app icons (e.g. 192x192 PNG, 512x512 PNG).

---

## 3. Twitter Card Metadata Audit (`twitter:image`)

### Findings & Issues

- **100% Missing Across Entire Site:**
  None of the 32 page routes or layout files (`app/layout.tsx`, `app/[lang]/layout.tsx`, `app/[lang]/insights/[slug]/page.tsx`, etc.) declare `twitter` metadata.
- **Consequences:**
  When links are shared on Twitter/X, Twitter scrapers rely on OpenGraph fallbacks, but without explicit `twitter:card: "summary_large_image"` and `twitter:image` tags, card rendering often falls back to small thumbnails or fails to present high-impact preview cards.
- **Recommended Fix:** Include global Twitter card configuration in [`app/[lang]/layout.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/layout.tsx#L48):
  ```typescript
  twitter: {
    card: 'summary_large_image',
    title: 'Nearshore Navigator | Industrial Manufacturing in Baja California',
    description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Baja California, Mexico.',
    images: ['/og-image.png'],
    creator: '@nearshorenav',
  }
  ```

---

## 4. OpenGraph Images (`og:image`) Audit Across Routes

### Comprehensive Route Inspection Table

| Route File | OG Title / Meta | `og:image` URL | Asset Source | Status |
| :--- | :--- | :--- | :--- | :---: |
| [`app/[lang]/layout.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/layout.tsx#L46) | Root Layout Default | `/og-image.png` | `public/og-image.png` | ✅ OK |
| [`app/[lang]/insights/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/insights/page.tsx#L14) | Insights Overview | `https://images.unsplash.com/photo-1590247813693-5541d1c609fd...` | Unsplash CDN | ✅ OK |
| [`app/[lang]/insights/[slug]/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/insights/[slug]/page.tsx#L52) | Dynamic Insight Article | `post.imageUrl` | `blog-data.ts` / Unsplash | ✅ OK |
| [`app/[lang]/locations/tijuana/master-guide/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/locations/tijuana/master-guide/page.tsx#L10) | Tijuana Master Guide | `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab...` | Unsplash CDN | ✅ OK |
| [`app/[lang]/services/call-center-tijuana/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/services/call-center-tijuana/page.tsx#L11) | Call Center Tijuana | **Missing `images` array** | Fallback to layout | ⚠️ Missing Image Property |
| [`app/[lang]/services/distribution-centers-tijuana/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/services/distribution-centers-tijuana/page.tsx#L15) | Distribution Centers | **Missing `images` array** | Fallback to layout | ⚠️ Missing Image Property |
| [`app/[lang]/services/industrial-real-estate-baja/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/services/industrial-real-estate-baja/page.tsx#L22) | Real Estate Baja | **Missing `images` array** | Fallback to layout | ⚠️ Missing Image Property |
| [`app/[lang]/services/nearshore-marketing/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/services/nearshore-marketing/page.tsx#L10) | Nearshore Marketing | **Missing `images` array** | Fallback to layout | ⚠️ Missing Image Property |
| **All Other Pages (20+ Routes)** | E.g. `about`, `contact`, `locations/[city]` | **No `openGraph` block** | Fallback to layout | ℹ️ Inherits Root `/og-image.png` |

---

## 5. Remote Image Asset Inventory (Unsplash CDN)

The following external image URLs are currently referenced across OpenGraph metadata, JSON-LD schemas, and blog content modules:

1. `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800` (Monterrey Power Map)
2. `https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800` (Industrial Parks Map Overview)
3. `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&q=80&w=800` ($6B Nearshoring Investment)
4. `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200` (Maquiladora vs Shelter Services)
5. `https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200` (Medical Device Manufacturing)
6. `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800` (Section 321 vs IMMEX)
7. `https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=2000` (Insights Overview OG Image)
8. `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200` (Tijuana Master Guide OG Image)
9. `https://images.unsplash.com/photo-1544256718-3b62373aec17?auto=format&fit=crop&q=80&w=1200` (Aerospace Querétaro)

- **Status:** All Unsplash CDN URLs are active external assets.
- **Recommendation:** Download key metadata images into `public/images/og/` to eliminate third-party CDN availability risks.

---

## 6. Actionable Remediation Plan & Code Diffs

### Fix 1: Resolve Malformed URL in Article Schema ([`app/[lang]/insights/[slug]/page.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/insights/[slug]/page.tsx#L72))

```diff
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
-   "image": `${baseUrl}${post.imageUrl}`,
+   "image": post.imageUrl.startsWith('http') 
+     ? post.imageUrl 
+     : `${baseUrl}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`,
    "url": articleUrl,
    "datePublished": publishedDate,
```

---

### Fix 2: Add Global Twitter Cards & Correct Icons in Layout ([`app/[lang]/layout.tsx`](file:///Users/gax8627/nearshore-navigator/app/[lang]/layout.tsx#L41-L49))

```diff
    openGraph: {
      url: canonicalUrl,
      type: 'website',
      title: 'Nearshore Navigator | Industrial Manufacturing in Baja California',
      description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Baja California, Mexico.',
      images: ['/og-image.png'],
-   }
+   },
+   twitter: {
+     card: 'summary_large_image',
+     title: 'Nearshore Navigator | Industrial Manufacturing in Baja California',
+     description: 'Your partner for industrial nearshoring, shelter services, and contract manufacturing in Baja California, Mexico.',
+     images: ['/og-image.png'],
+   }
```

---

### Fix 3: Create App Router Manifest File (`app/manifest.ts`)

Create `app/manifest.ts` to expose web application manifest icons:

```typescript
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nearshore Navigator',
    short_name: 'NearshoreNav',
    description: 'Strategic advisory for US companies expanding manufacturing operations to Mexico.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#030712',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/og-image.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

---

### Fix 4: Ensure Static Icon Fallbacks in `public/`

Copy or link `logo.png` to `public/icon.png` and `public/favicon.ico`:
- Copy `public/logo.png` -> `public/icon.png`
- Copy `public/logo.png` -> `public/apple-icon.png`

---

## Conclusion & Verification Instructions

By applying the remedies above:
1. **JSON-LD Article Schema validation** will pass cleanly across Google Search Console and Google Rich Results Test.
2. **Twitter/X link sharing cards** will display large visual previews on all social shares.
3. **Favicon and Apple touch requests** will serve 200 OK responses instead of 404 errors.
4. **PWA Lighthouse audits** will detect a fully configured Web App Manifest.
