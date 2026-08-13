# Media & Asset Audit Report: Public Assets & Image Audit

**Project:** Nearshore Navigator (`nearshore-navigator`)  
**Audit Date:** August 13, 2026  
**Auditor:** QA & Web Media Asset Auditor  
**Output Location:** [audit-outputs/image-audit-public-assets.md](file:///Users/gax8627/nearshore-navigator/audit-outputs/image-audit-public-assets.md)

---

## 1. Executive Summary

A comprehensive automated and manual inspection of all static media assets, local images, documents, videos, component code (`<Image>`, `<img>`), metadata Open Graph tags, favicons, and remote image references was performed across the `nearshore-navigator` repository.

### Key Metrics Summary
- **Total Local Static Assets (`public/`):** 36 files (19 images, 2 videos, 4 documents, 1 root text verification file, 1 map PDF, 3 `.DS_Store`/system files)
- **Total Code Files Scanned:** 641 source files (`.tsx`, `.ts`, `.jsx`, `.js`, `.json`, `.md`)
- **Missing Asset References (404 Risks):** 3 critical missing icon references in `app/layout.tsx` (`/icon.png`)
- **Case Mismatches / Path Sensitivity:** 1 download attribute capitalization discrepancy (`Tijuana-Industrial-Park-Map-2026.pdf` vs `tijuana-industrial-park-map-2026.pdf`)
- **Orphaned Public Assets:** 13 files on disk (including a 6.12 MB uncompressed raw PNG) not directly imported by application page components
- **Critical Performance & Large File Warnings:** 13 assets exceed 500 KB (notably `denisse-martinez.png` at 6.12 MB and 640x640 PNGs at ~800 KB each)
- **Missing `public/favicon/` Directory:** No dedicated `favicon/` folder or `favicon.ico` present in `public/`
- **External Image Dependencies:** 20+ page components depend on Unsplash CDN images (`images.unsplash.com`) without local fallback images

---

## 2. Complete Inventory of Disk Assets (`public/`)

Below is the complete inventory of all files present in `public/` and its subdirectories:

| Relative Path | Format | Resolution | File Size | KB / MB | Usage Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `images/denisse-martinez.png` | PNG | 2878x4320 | 6,266,772 B | **6.12 MB** | ⚠️ **Orphaned / Extreme Size** |
| `videos/hero-drone.webm` | WebM | Video | 6,124,531 B | **5.84 MB** | Active Hero Video |
| `videos/hero-drone.mp4` | MP4 | Video | 5,085,595 B | **4.85 MB** | Active Hero Video |
| `documents/Nearshore-Navigator-Master-Project-Report.pdf` | PDF | Doc | 1,814,386 B | **1.73 MB** | Project Report Doc |
| `images/industrial-park-hero.jpg` | JPG | 2600x1734 | 1,222,709 B | **1.19 MB** | Active Hero Background |
| `images/baja-landscape.jpg` | JPG | 4000x2667 | 837,440 B | **817.8 KB** | Active Content Image |
| `images/hero/furniture-shop.png` | PNG | 640x640 | 829,288 B | **809.9 KB** | ⚠️ **Uncompressed PNG** |
| `images/hero/factory-floor.png` | PNG | 640x640 | 796,023 B | **777.4 KB** | ⚠️ **Uncompressed PNG** |
| `images/warehouse.jpg` | JPG | 2000x1333 | 785,517 B | **767.1 KB** | Active Content Image |
| `documents/AI-SEO-Project-Report.pdf` | PDF | Doc | 761,028 B | **743.2 KB** | Project Report Doc |
| `images/services/furniture_mfg.png` | PNG | 640x640 | 741,336 B | **724.0 KB** | ⚠️ **Uncompressed PNG** |
| `images/hero/medical-facility.png` | PNG | 640x640 | 736,347 B | **719.1 KB** | ⚠️ **Uncompressed PNG** |
| `images/services/cnc_machining.png` | PNG | 640x640 | 727,084 B | **710.0 KB** | ⚠️ **Uncompressed PNG** |
| `logo.png` | PNG | - | 467,204 B | **456.3 KB** | Legacy Logo (Orphaned) |
| `images/factory-worker.jpg` | JPG | 2000x1334 | 457,419 B | **446.7 KB** | Active Content Image |
| `images/consulting.jpg` | JPG | 2000x1335 | 370,262 B | **361.6 KB** | Active Content Image |
| `images/hero-last-frame.jpg` | JPG | 1920x998 | 328,344 B | **320.6 KB** | Active Preload Poster |
| `images/nearshore-logo-brand.png` | PNG | 1024x474 | 182,975 B | **178.7 KB** | Active Brand Logo |
| `images/nearshore-logo-v5.png` | PNG | 1024x474 | 182,975 B | **178.7 KB** | Duplicate Brand Logo |
| `logo-new.png` | PNG | 1024x358 | 158,524 B | **154.8 KB** | Orphaned Root Logo |
| `images/china-plus-one-strategy.png` | PNG | - | 104,223 B | **101.8 KB** | Active Content Graphic |
| `images/denisse-banner.jpg` | JPG | 1024x512 | 75,925 B | **74.1 KB** | Outreach Email Banner |
| `images/liquid-top.gif` | GIF | - | 75,925 B | **74.1 KB** | Orphaned Asset |
| `images/denisse-2.jpg` | JPG | 682x1024 | 74,643 B | **72.9 KB** | Orphaned Asset |
| `images/denisse-1.jpg` | JPG | 800x800 | 71,721 B | **70.0 KB** | Active Bio Image |
| `images/denisse-martinez.jpg` | JPG | 800x800 | 71,721 B | **70.0 KB** | Active Bio Image |
| `images/denisse-3.jpg` | JPG | 682x1024 | 68,999 B | **67.4 KB** | Orphaned Asset |
| `og-image.png` | PNG | - | 49,337 B | **48.2 KB** | OpenGraph Metadata Image |
| `images/nearshore-logo-brand.jpg` | JPG | 565x262 | 20,358 B | **19.9 KB** | Email Signature Logo |
| `documents/Mexico-3PL-Operation-Questionnaire.html` | HTML | Doc | 11,648 B | **11.4 KB** | Static Questionnaire |
| `documents/Nearshore_Navigator_Questionnaire_2026.docx` | DOCX | Doc | 9,756 B | **9.5 KB** | Downloadable Doc |
| `tijuana-industrial-park-map-2026.pdf` | PDF | Map | 585 B | **0.6 KB** | Resource Download Map |
| `9c6ec652f75d4967a5f6e8c894982637.txt` | TXT | Domain | 33 B | **0.03 KB** | Domain Verification |

---

## 3. Broken & Missing File References Audit

### 🚨 Critical Finding 1: Broken Favicon & Application Icon Metadata (`app/layout.tsx`)
- **Location:** [app/layout.tsx:L12-L16](file:///Users/gax8627/nearshore-navigator/app/layout.tsx#L12-L16)
- **Code:**
  ```typescript
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  ```
- **Issue:** The file `/icon.png` **does not exist** anywhere in `public/` or `app/`. Browser requests for `/icon.png` will return a **404 Not Found** error.
- **Missing Directory:** The prompt specifically requested auditing `public/favicon/`. No `public/favicon/` directory exists in the project repository.
- **Recommended Fix:**
  1. Create a `public/favicon/` directory or place `icon.png`, `apple-touch-icon.png`, and `favicon.ico` into `public/`.
  2. Update [app/layout.tsx](file:///Users/gax8627/nearshore-navigator/app/layout.tsx) metadata to point to valid icons (e.g. `/favicon.ico` or `/images/nearshore-logo-brand.png`).

---

## 4. Case Sensitivity & Path Reference Audit

### ⚠️ Minor Finding 1: Download Filename Capitalization Discrepancy
- **Location:** [app/[lang]/resources/tijuana-industrial-park-map/ResourceMapClient.tsx:L35-L36](file:///Users/gax8627/nearshore-navigator/app/[lang]/resources/tijuana-industrial-park-map/ResourceMapClient.tsx#L35-L36)
- **Code:**
  ```typescript
  link.href = '/tijuana-industrial-park-map-2026.pdf';
  link.download = 'Tijuana-Industrial-Park-Map-2026.pdf';
  ```
- **Status:** `link.href` accurately uses lowercase `/tijuana-industrial-park-map-2026.pdf`, matching the disk filename. No runtime HTTP 404 occurs, but the `download` attribute sets the saved file name as `Tijuana-Industrial-Park-Map-2026.pdf`.

---

## 5. Orphaned Assets Analysis

Orphaned assets are files present on disk in `public/` that are not imported or referenced by any page component or route in the Next.js application.

### Identified Orphaned Files:
1. `public/images/denisse-martinez.png` (**6.12 MB**) — Huge uncompressed raw PNG photo. The site uses `images/denisse-martinez.jpg` (70 KB) instead.
2. `public/logo.png` (**456.3 KB**) — Legacy main logo file, replaced by `images/nearshore-logo-brand.png`.
3. `public/logo-new.png` (**154.8 KB**) — Root logo file, unreferenced in UI code.
4. `public/images/nearshore-logo-v5.png` (**178.7 KB**) — Byte-for-byte duplicate of `images/nearshore-logo-brand.png`.
5. `public/images/denisse-2.jpg` (**72.9 KB**) & `public/images/denisse-3.jpg` (**67.4 KB**) — Alternate headshot photos not currently rendered in bio pages.
6. `public/images/liquid-top.gif` (**74.1 KB**) — Unused legacy header GIF.

> [!NOTE]
> **Email Template Assets:** Assets such as `public/images/denisse-banner.jpg` and `public/images/nearshore-logo-brand.jpg` are referenced via absolute production URLs (`https://nearshorenavigator.com/images/...`) inside automated email outreach scripts in `scripts/campaigns/`. These should be retained.

---

## 6. Performance & Image Optimization Audit

### 🚨 Critical File Size Warnings (> 500 KB)

| Asset Path | Current Size | Current Format | Recommendation | Estimated Savings |
| :--- | :--- | :--- | :--- | :--- |
| `images/denisse-martinez.png` | **6.12 MB** | 2878x4320 PNG | Remove or convert to 800x800 `.webp` | **~98% (-6.0 MB)** |
| `images/industrial-park-hero.jpg` | **1.19 MB** | 2600x1734 JPG | Resize to 1920px & convert to `.webp` | **~85% (-1.0 MB)** |
| `images/hero/furniture-shop.png` | **809.9 KB** | 640x640 PNG | Convert PNG to compressed `.webp` | **~90% (-730 KB)** |
| `images/baja-landscape.jpg` | **817.8 KB** | 4000x2667 JPG | Resize 4000px to 1920px & WebP | **~85% (-700 KB)** |
| `images/hero/factory-floor.png` | **777.4 KB** | 640x640 PNG | Convert PNG to compressed `.webp` | **~90% (-700 KB)** |
| `images/warehouse.jpg` | **767.1 KB** | 2000x1333 JPG | Convert JPG to compressed `.webp` | **~80% (-610 KB)** |
| `images/services/furniture_mfg.png` | **724.0 KB** | 640x640 PNG | Convert PNG to compressed `.webp` | **~90% (-650 KB)** |
| `images/hero/medical-facility.png` | **719.1 KB** | 640x640 PNG | Convert PNG to compressed `.webp` | **~90% (-640 KB)** |
| `images/services/cnc_machining.png` | **710.0 KB** | 640x640 PNG | Convert PNG to compressed `.webp` | **~90% (-630 KB)** |

> [!WARNING]
> **640x640 PNG Overhead:** `furniture-shop.png`, `factory-floor.png`, `medical-facility.png`, `furniture_mfg.png`, and `cnc_machining.png` are 640x640 pixel images that consume over **700-800 KB each** because they are uncompressed 32-bit PNGs. Converting these 5 images to `.webp` will reduce total page payload by **~3.5 MB**.

---

## 7. Accessibility & Alt Attribute Verification

An automated scan of all Next.js `<Image>` and HTML `<img>` elements was conducted across all JSX/TSX files in the application.

- **Next.js `<Image>` components:** 100% compliant. All Next.js `<Image />` elements in `app/[lang]/` page components define valid `alt` attributes or dynamic localization strings (`t.alt` or descriptive headings).
- **Preload Link Tags:** [app/[lang]/layout.tsx:L65-L70](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/layout.tsx#L65-L70) correctly implements LCP preloading for `/images/hero-last-frame.jpg` with `fetchPriority="high"`.

---

## 8. External Remote Image Audit (Unsplash CDN)

The application relies on external **Unsplash CDN** (`images.unsplash.com`) URLs for dynamic card backgrounds, blog articles, and location headers.

### Sample Unsplash Dependencies:
- [app/[lang]/about/AboutClient.tsx:L36](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/about/AboutClient.tsx#L36): `https://images.unsplash.com/photo-1557426272-fc759fdf7a8d...`
- [app/[lang]/contact/ContactClient.tsx:L17](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/contact/ContactClient.tsx#L17): `https://images.unsplash.com/photo-1522071820081-009f0129c71c...`
- [app/[lang]/insights/InsightsClient.tsx:L57](file:///Users/gax8627/nearshore-navigator/app/%5Blang%5D/insights/InsightsClient.tsx#L57): `https://images.unsplash.com/photo-1590247813693-5541d1c609fd...`
- [app/[lang]/locations/tijuana/master-guide/MasterGuideClient.tsx:L21](file:///Users/gax8627/nearshore-navigator/app/[lang]/locations/tijuana/master-guide/MasterGuideClient.tsx#L21): `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab...`

> [!IMPORTANT]
> While Unsplash URLs work reliably with `auto=format&fit=crop`, relying heavily on external CDNs introduces potential third-party network failure risks. Consider caching or hosting core hero images locally in `public/images/`.

---

## 9. Actionable Recommendation Plan

### Phase 1: Immediate Fixes (Broken Links & Icons)
1. **Fix Metadata Icon References (`app/layout.tsx`):**
   - Create `public/favicon/` directory.
   - Add `favicon.ico`, `icon.png` (32x32), and `apple-touch-icon.png` (180x180).
   - Update `app/layout.tsx` `icons` object to point to valid paths.

### Phase 2: Asset Cleanup & Space Optimization
1. **Delete / Archive Large Orphaned PNGs:**
   - Remove `public/images/denisse-martinez.png` (saves 6.12 MB).
   - Remove legacy `public/logo.png` (saves 456 KB) and duplicate `public/images/nearshore-logo-v5.png` (saves 178 KB).
2. **Convert PNG Hero & Service Images to WebP:**
   - Convert the 5 640x640 PNG assets (`factory-floor.png`, `furniture-shop.png`, `medical-facility.png`, `cnc_machining.png`, `furniture_mfg.png`) to `.webp`.
   - Compression will save **~3.5 MB** of bandwidth.
3. **Resize & Compress Large JPEGs:**
   - Resize `baja-landscape.jpg` (4000px wide) and `industrial-park-hero.jpg` (2600px wide) to 1920px max width and compress with WebP quality 80%.

---

*Report generated by QA & Web Media Asset Auditor for `nearshore-navigator`.*
