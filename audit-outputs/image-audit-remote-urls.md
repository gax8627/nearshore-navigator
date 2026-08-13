# External Remote Image URL Audit Report

**Generated:** August 13, 2026  
**Auditor:** QA & Web Media Asset Auditor  
**Target Repository:** Nearshore Navigator (`/Users/gax8627/nearshore-navigator`)  
**Output File:** `audit-outputs/image-audit-remote-urls.md`

---

## 1. Executive Summary

A comprehensive automated and manual web media asset audit was conducted across all pages, components, blog posts, insights articles, metadata tags (OpenGraph, Twitter Cards, Schema.org JSON-LD), and email templates within the Nearshore Navigator repository.

### Key Metrics Overview

| Metric | Count | Status / Impact |
| :--- | :--- | :--- |
| **Total Unique Remote Image URLs** | **61** | Audited across entire codebase |
| **Total Remote Image Occurrences** | **185** | Referenced in code, blog content, metadata |
| **Valid Remote URLs (HTTP 200 OK)** | **54** | Live and returning valid image content |
| **Broken Remote URLs (HTTP 404)** | **7** | **CRITICAL** (Affects 23 occurrences across site) |
| **Insecure HTTP URLs (non-HTTPS)** | **0** | **100% SSL Compliant** |
| **`next.config.mjs` Configured Domains** | **1** | `images.unsplash.com` (`https`) |
| **`next.config.mjs` Unconfigured Domains** | **2** | `nearshorenavigator.com`, `www.transparenttextures.com` |
| **Alt Attribute Compliance (JSX Components)** | **100%** | All 42 JSX `<Image>` / `<img>` elements have `alt` attributes |

---

## 2. Broken Remote Image URLs (HTTP 404 Errors)

The audit identified **7 unique remote image URLs returning HTTP 404 Not Found**. These broken URLs impact **23 locations** across landing page components, SEO metadata, and blog/insights articles.

### Broken URL Summary Table

| # | Broken Image URL | Status | Impacted Component / File | Occurrences | Recommended Fix |
| :-: | :--- | :-: | :--- | :-: | :--- |
| **1** | `https://images.unsplash.com/photo-1565514020176-db7936a7114b` | **404** | `app/[lang]/resources/brochure/BrochureClient.tsx:65` | 1 | Replace with active Unsplash logistics/brochure image (`photo-1586528116311...` or local asset) |
| **2** | `https://images.unsplash.com/photo-1576091160550-217359f4bd08` | **404** | `app/constants/industry-taxonomy.ts:22` | 1 | Replace medical devices taxonomy background image |
| **3** | `https://images.unsplash.com/photo-1605732562742-aec009732c8e` | **404** | `app/constants/seo-data.ts:708` | 1 | Replace Tijuana manufacturing SEO card hero image |
| **4** | `https://images.unsplash.com/photo-1609619385002-f40f1df827ef` | **404** | `app/constants/seo-data.ts:805` | 1 | Replace Mexicali aerospace SEO card hero image |
| **5** | `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb` | **404** | Blog & Insights frontmatter (`content/blogs/`, `content/insights/`) | 14 | Replace feature image URL across Asian Capital / China+1 articles |
| **6** | `https://nearshorenavigator.com/images/logo.png` | **404** | Blog metadata (`content/blogs/baja-shelter-services-guide-optimized.md`, etc.) | 2 | Update to valid logo path (`https://nearshorenavigator.com/images/nearshore-logo-brand.jpg` or `https://nearshorenavigator.com/logo.png`) |
| **7** | `https://images.unsplash.com/photo-1544256718-3b62373aec17` | **404** | `content/insights/aerospace-manufacturing-queretaro-mexico.mdx` | 3 | Replace aerospace Querétaro article hero & OpenGraph image |

### Detailed File Location Breakdown of Broken URLs

#### Issue 1: Brochure Client Card (`BrochureClient.tsx:L65`)
- **File:** [BrochureClient.tsx](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/resources/brochure/BrochureClient.tsx#L65)
- **URL:** `https://images.unsplash.com/photo-1565514020176-db7936a7114b?auto=format&fit=crop&q=80&w=1200`
- **Response:** HTTP 404
- **Fix:** Update `image` property in brochure download options object to an active Unsplash logistics photo (e.g. `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb` replacement or local public image).

#### Issue 2: Industry Taxonomy Data (`industry-taxonomy.ts:L22`)
- **File:** [industry-taxonomy.ts](file:///Users/gax8627/nearshore-navigator/app/constants/industry-taxonomy.ts#L22)
- **URL:** `https://images.unsplash.com/photo-1576091160550-217359f4bd08?auto=format&fit=crop&q=80&w=2600`
- **Response:** HTTP 404
- **Fix:** Update `heroImage` field for Medical Devices industry vertical.

#### Issue 3 & 4: SEO Data Constants (`seo-data.ts:L708, L805`)
- **File:** [seo-data.ts](file:///Users/gax8627/nearshore-navigator/app/constants/seo-data.ts#L708)
- **URL 1 (L708):** `https://images.unsplash.com/photo-1605732562742-aec009732c8e?auto=format&fit=crop&q=80&w=2000` (404)
- **URL 2 (L805):** `https://images.unsplash.com/photo-1609619385002-f40f1df827ef?auto=format&fit=crop&q=80&w=2000` (404)
- **Fix:** Replace hero image URLs in `seo-data.ts` location cards.

#### Issue 5: Article Hero Image Across 14 Articles
- **URL:** `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb?auto=format&fit=crop&q=80&w=1200` (404)
- **Affected Files (14 occurrences):**
  - [asian-capital-expansion-mexico-immex-optimized.md](file:///Users/gax8627/nearshore-navigator/content/blogs/asian-capital-expansion-mexico-immex-optimized.md#L10) (Lines 10, 44, 51, 117)
  - [asian-capital-expansion-mexico-immex.md](file:///Users/gax8627/nearshore-navigator/content/blogs/asian-capital-expansion-mexico-immex.md#L7) (Line 7)
  - [china-plus-one-tijuana-vs-vietnam-optimized.md](file:///Users/gax8627/nearshore-navigator/content/blogs/china-plus-one-tijuana-vs-vietnam-optimized.md#L10) (Lines 10, 38)
  - [china-plus-one-strategy-mexico.mdx](file:///Users/gax8627/nearshore-navigator/content/insights/china-plus-one-strategy-mexico.mdx#L8) (Lines 8, 22, 124)
  - [china-plus-one-strategy-mexico.mdx (KO)](file:///Users/gax8627/nearshore-navigator/content/insights/ko/china-plus-one-strategy-mexico.mdx#L8) (Lines 8, 28)
  - [china-plus-one-strategy-mexico.mdx (ZH)](file:///Users/gax8627/nearshore-navigator/content/insights/zh/china-plus-one-strategy-mexico.mdx#L8) (Lines 8, 28)

#### Issue 6: Non-Existent Logo Image URL in Blog Frontmatter
- **URL:** `https://nearshorenavigator.com/images/logo.png` (404)
- **Affected Files:**
  - [baja-shelter-services-guide-optimized.md](file:///Users/gax8627/nearshore-navigator/content/blogs/baja-shelter-services-guide-optimized.md#L37)
  - [china-plus-one-tijuana-vs-vietnam-optimized.md](file:///Users/gax8627/nearshore-navigator/content/blogs/china-plus-one-tijuana-vs-vietnam-optimized.md#L32)
- **Fix:** Change frontmatter publisher logo URL to `https://nearshorenavigator.com/images/nearshore-logo-brand.jpg` or relative `/logo.png`.

#### Issue 7: Aerospace Querétaro Insight Article Hero Image
- **URL:** `https://images.unsplash.com/photo-1544256718-3b62373aec17?auto=format&fit=crop&q=80&w=1200` (404)
- **Affected File:** [aerospace-manufacturing-queretaro-mexico.mdx](file:///Users/gax8627/nearshore-navigator/content/insights/aerospace-manufacturing-queretaro-mexico.mdx#L8) (Lines 8, 22, 121)

---

## 3. `next.config.mjs` Domain Permissions Audit

### Current Configuration
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    ...
};
```

### Remote Pattern Security & Compatibility Findings
1. **Unsplash Domain (`images.unsplash.com`):** Allowed with `https` protocol. All Next.js `<Image>` calls referencing `images.unsplash.com` render properly without domain security restrictions.
2. **Absolute Host References (`nearshorenavigator.com`):** Absolute production URLs (e.g. `https://nearshorenavigator.com/images/...`) are used in email templates, JSON-LD schema objects, and metadata headers. None of these pass through Next.js image optimization components directly. However, if any page dynamic component uses `next/image` with absolute self-domain URLs in production, it will trigger an unconfigured hostname error.
3. **Recommendation:** Add `nearshorenavigator.com` to `remotePatterns` in `next.config.mjs` for future-proofing:
```javascript
remotePatterns: [
    {
        protocol: 'https',
        hostname: 'images.unsplash.com',
    },
    {
        protocol: 'https',
        hostname: 'nearshorenavigator.com',
    },
]
```

---

## 4. Syntax Correctness & SSL Certificate Verification

- **Syntax Validity:** 100% of tested remote image URLs exhibit valid URI syntax, compliant scheme formatting (`https://`), and properly escaped parameter strings.
- **SSL / TLS Certificate Validation:** All remote hostnames (`images.unsplash.com`, `nearshorenavigator.com`, `www.transparenttextures.com`) support HTTPS with valid SSL certificates, active TLS 1.2/1.3 handshakes, and valid Subject Alternative Names (SAN).
- **Insecure (HTTP) Protocol Check:** **0 insecure `http://` image URLs** exist in application code or content.

---

## 5. Media Component & Accessibility (Alt Text) Audit

- **JSX Component Audit:** Audited all 42 multiline `<Image>` and `<img>` tags across `app/` and `components/`.
- **Alt Attribute Compliance:** **100% compliant**. Every `<Image>` and `<img>` element includes an `alt` attribute.
- **Local Public Asset Resolution:** Verified all local relative paths (`/images/...`, `/logo.png`, `/icon.png`). All local assets referenced in JSX components resolve to existing files inside `public/`.

---

## 6. Complete Inventory Table of All Audited Remote Image URLs

Below is the complete inventory of all **61 unique remote image URLs** detected in the application codebase, including HTTP status, SSL status, domain permissions, and occurrence count.

| # | Domain / Hostname | HTTP Status | SSL | Allowed in `next.config.mjs` | Remote Image URL | Occurrences |
| :-: | :--- | :-: | :-: | :-: | :--- | :-: |
| 1 | `www.transparenttextures.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://www.transparenttextures.com/patterns/cubes.png` | 1 |
| 2 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=form...` | 1 |
| 3 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/denisse-martinez.jpg` | 2 |
| 4 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=f...` | 2 |
| 5 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=f...` | 1 |
| 6 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=f...` | 1 |
| 7 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=f...` | 2 |
| 8 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=f...` | 2 |
| 9 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=f...` | 1 |
| 10 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=f...` | 1 |
| 11 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=f...` | 2 |
| 12 | `images.unsplash.com` | ❌ 404 | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1565514020176-db7936a7114b?auto=f...` | 1 |
| 13 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=f...` | 1 |
| 14 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=form...` | 1 |
| 15 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=f...` | 1 |
| 16 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=f...` | 1 |
| 17 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=f...` | 1 |
| 18 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=f...` | 1 |
| 19 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=f...` | 1 |
| 20 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=f...` | 1 |
| 21 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1553413077-190dd305871c?auto=form...` | 2 |
| 22 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/denisse-banner.jpg` | 20 |
| 23 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/nearshore-logo-brand.png` | 1 |
| 24 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=f...` | 1 |
| 25 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=f...` | 1 |
| 26 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=f...` | 2 |
| 27 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=f...` | 12 |
| 28 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=f...` | 7 |
| 29 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=f...` | 2 |
| 30 | `images.unsplash.com` | ❌ 404 | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1576091160550-217359f4bd08?auto=f...` | 1 |
| 31 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=f...` | 1 |
| 32 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=f...` | 1 |
| 33 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=f...` | 1 |
| 34 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=f...` | 1 |
| 35 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=f...` | 1 |
| 36 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=f...` | 2 |
| 37 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=f...` | 2 |
| 38 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=f...` | 37 |
| 39 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=f...` | 1 |
| 40 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=f...` | 1 |
| 41 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=f...` | 1 |
| 42 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=f...` | 1 |
| 43 | `images.unsplash.com` | ❌ 404 | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1605732562742-aec009732c8e?auto=f...` | 1 |
| 44 | `images.unsplash.com` | ❌ 404 | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1609619385002-f40f1df827ef?auto=f...` | 1 |
| 45 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?auto=f...` | 1 |
| 46 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/logo.png` | 7 |
| 47 | `images.unsplash.com` | ❌ 404 | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1586528116311-ad8ed74681fb?auto=f...` | 14 |
| 48 | `nearshorenavigator.com` | ❌ 404 | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/logo.png` | 2 |
| 49 | `images.unsplash.com` | ❌ 404 | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1544256718-3b62373aec17?auto=form...` | 3 |
| 50 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=f...` | 1 |
| 51 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=f...` | 1 |
| 52 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=f...` | 2 |
| 53 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/nearshore-logo-v5.png` | 1 |
| 54 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/denisse-banner.jpg?v=MAY20` | 2 |
| 55 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/liquid-top.gif` | 3 |
| 56 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/denisse-banner.jpg?v=JUN15` | 11 |
| 57 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/denisse-banner.jpg?v=MAY8` | 5 |
| 58 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/denisse-martinez.jpg?v=2026` | 2 |
| 59 | `images.unsplash.com` | ✅ 200 OK | ✅ HTTPS | ✅ Yes | `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=f...` | 2 |
| 60 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/icon.png` | 1 |
| 61 | `nearshorenavigator.com` | ✅ 200 OK | ✅ HTTPS | ⚠️ Unconfigured | `https://nearshorenavigator.com/images/nearshore-logo-brand.jpg` | 1 |

---

## 7. Recommended Action Plan & Priority Fixes

1. **Fix 404 Unsplash Image URLs (High Priority):**
   - Replace the 5 broken Unsplash photo IDs in `BrochureClient.tsx`, `industry-taxonomy.ts`, `seo-data.ts`, and blog/insight MDX files with valid Unsplash photo URLs or local public images.
2. **Fix Broken Logo Reference in Blog Content (Medium Priority):**
   - Update `https://nearshorenavigator.com/images/logo.png` to `https://nearshorenavigator.com/images/nearshore-logo-brand.jpg` in `content/blogs/baja-shelter-services-guide-optimized.md` and `content/blogs/china-plus-one-tijuana-vs-vietnam-optimized.md`.
3. **Update `next.config.mjs` (Low Priority):**
   - Add `nearshorenavigator.com` to `remotePatterns` in `next.config.mjs` to support absolute self-hosted image references.
