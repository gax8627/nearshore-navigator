# 🔍 Nearshore Navigator — Multi-Agent Website Audit Report V3

**Date:** February 26, 2026  
**Project:** `nearshore-navigator` (Next.js 16, Clerk, Drizzle ORM, Inngest, Vercel Postgres, Tailwind v3)  
**Live Site:** https://nearshorenavigator.com  
**Agents Deployed:** 6 (Security, Performance, SEO & i18n, UI/UX & Accessibility, Functionality, Code Quality)

---

## Executive Summary

| Domain           | Status         | Top Finding                                                   |
| ---------------- | -------------- | ------------------------------------------------------------- |
| 🔐 Security      | ⚠️ Medium Risk | 2 unprotected API routes; cron & admin protected              |
| ⚡ Performance   | ✅ Good        | TypeScript clean; no raw `<img>` tags; minor bundle concern   |
| 🌐 SEO & i18n    | ⚠️ Issues      | Section 321 page crashes; IT/PT locales missing; hreflang gap |
| 🎨 UI/UX         | ✅ Excellent   | 9/10 visual, 10/10 mobile; minor ARIA gaps                    |
| 🤖 Functionality | ❌ Critical    | Section 321 Guide is **broken in production**                 |
| 📐 Code Quality  | ✅ Good        | TypeScript clean; orphaned data files in root                 |

---

## Priority Fix Matrix

### 🔴 Critical

| #   | Issue                                                                        | File                                                                          | Action                                                                                                                                  |
| --- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | **Section 321 Guide crashes in production** (server error Digest: 179193312) | `app/[lang]/services/distribution-centers-tijuana/section-321-guide/page.tsx` | Page uses `useLanguage()` (client context hook) but is a Server Component. Add `"use client"` directive OR pass lang prop via `params`. |
| C2  | **Clerk admin running in Development mode on production**                    | Vercel environment variables                                                  | Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to production keys in Vercel dashboard                                   |

---

### 🟠 High

| #   | Issue                                                                                             | File                                  | Action                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | **`/api/agents/prospecting` has NO auth check** — anyone can trigger AI prospecting campaigns     | `app/api/agents/prospecting/route.ts` | Add `const { userId } = await auth(); if (!userId) return 401;` at the top of the handler                                                                       |
| H2  | **`/api/lead-magnet` has NO auth check** — anyone can fire Inngest `lead.requested.magnet` events | `app/api/lead-magnet/route.ts`        | Add rate limiting or at minimum a honeypot check; or protect with Clerk if this is an internal route                                                            |
| H3  | **Italian (`/it`) and Portuguese (`/pt`) routes show English content**                            | `app/i18n/locales/`                   | Middleware declares 10 locales but only 8 JSON files exist. Create `it.json` and `pt.json`, or remove `it` and `pt` from the `locales` array in `middleware.ts` |

---

### 🟡 Medium

| #   | Issue                                                                                        | File                                                               | Action                                                                                                            |
| --- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| M1  | **Sitemap hreflang only covers `en` + `es`** — 8 other locales have no alternates            | `app/sitemap.ts`                                                   | Update `getAlternates()` to include all 8 active locale codes                                                     |
| M2  | **Static metadata on `resources/brochure` and `resources/questionnaire`** — not locale-aware | `app/[lang]/resources/brochure/page.tsx`, `questionnaire/page.tsx` | Convert to `generateMetadata` that reads `params.lang`                                                            |
| M3  | **`campaigns.stats` stored as text JSON** — no type safety or query-ability                  | `lib/db/schema.ts:51`                                              | Add a proper JSONB column or separate stats table                                                                 |
| M4  | **Logo link and Social icon links missing `aria-label`**                                     | `components/Navbar.tsx`, `components/Footer.tsx`                   | Add `aria-label="Nearshore Navigator Home"` to logo anchor; add `aria-label="LinkedIn"` etc. to social icon links |
| M5  | **Honeypot field missing `aria-hidden="true"` and `tabindex="-1"`**                          | `components/LeadForm.tsx`                                          | Ensure screen readers skip the honeypot field completely                                                          |
| M6  | **`puppeteer` listed as a production dependency** — large binary, should be devDependency    | `package.json:33`                                                  | Move to `devDependencies` or remove if not used by the web app (only used by scripts)                             |

---

### 🟢 Polish

| #   | Issue                                                                                                             | File                             | Action                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| P1  | **50+ orphaned data/batch files in project root** (`all_leads_raw.csv`, `research_*.json`, `current_batch*.json`) | `/`                              | Move to a `data/` or `operational/` folder and add to `.gitignore`                                            |
| P2  | **`TURNSTILE_SECRET_KEY` missing = CAPTCHA silently skipped**                                                     | `app/api/contact/route.ts:31`    | Ensure `TURNSTILE_SECRET_KEY` is set in Vercel env. Currently code warns and bypasses verification if missing |
| P3  | **`en.json.bak` committed to repo**                                                                               | `app/i18n/locales/en.json.bak`   | Delete this file and add `*.bak` to `.gitignore`                                                              |
| P4  | **`~83 any-casts` in scripts**                                                                                    | `scripts/`                       | Low priority (scripts aren't deployed), but type them properly over time                                      |
| P5  | **No `next/image` usage in cron email templates** — raw `<img>` used in HTML email strings                        | `app/api/cron/campaign/route.ts` | Acceptable for email HTML, no action needed; document this as intentional                                     |

---

## Agent Reports

### 🔐 Agent 1 — Security

**Method:** Code scan of all API route groups

| Route Group                     | Auth Guard              | Notes                      |
| ------------------------------- | ----------------------- | -------------------------- |
| `/api/admin/ai/*` (3 routes)    | ✅ Clerk `auth()`       | All protected              |
| `/api/admin/crm/*` (4 routes)   | ✅ Clerk `auth()`       | All protected              |
| `/api/admin/leads`              | ✅ Clerk `auth()`       | Protected                  |
| `/api/admin/metrics`            | ✅ Clerk `auth()`       | Protected                  |
| `/api/admin/posts/*` (2 routes) | ✅ Clerk `auth()`       | Protected                  |
| `/api/cron/campaign`            | ✅ `CRON_SECRET` Bearer | Correctly guarded          |
| `/api/inngest`                  | ✅ Inngest signing      | Framework-level protection |
| `/api/contact`                  | ✅ Turnstile + honeypot | No auth needed (public)    |
| **`/api/agents/prospecting`**   | ❌ **NONE**             | **CRITICAL** — unprotected |
| **`/api/lead-magnet`**          | ❌ **NONE**             | **HIGH** — unprotected     |

**Finding:** No API keys accepted via request bodies (all secrets are server-side). `.env.local` is in `.gitignore` ✅.

---

### ⚡ Agent 2 — Performance

**Method:** `next.config.mjs` review, dependency analysis, grep

- ✅ `next/image` used everywhere; no raw `<img>` in component or page files
- ✅ TypeScript compiles with 0 errors (`npx tsc --noEmit` exits clean)
- ✅ `next.config.mjs` has proper `remotePatterns` for Unsplash
- ⚠️ `puppeteer` (large Chromium binary) is in `dependencies`, not `devDependencies`
- ⚠️ No compiler flags (`swcMinify`, `turbopack`) configured — defaults used
- ⚠️ Framer Motion imported directly (not lazy-loaded) across multiple pages

---

### 🌐 Agent 3 — SEO & i18n

**Method:** Code review of metadata, sitemap, robots, locale files

**Metadata Coverage:**

- ✅ `generateMetadata()` present on: homepage, about, assessment, services (all 5), locations (city + city/service), contact layout, distribution 321, resources, insights detail
- ⚠️ `resources/brochure` and `resources/questionnaire` use static `metadata` (not locale-aware)

**Open Graph (verified live):**

- `og:title`: "Nearshore Navigator | Industrial Manufacturing in Baja California" ✅
- `og:description`: Present ✅
- `og:image`: `https://nearshorenavigator.com/og-image.png` ✅
- `twitter:card`: `summary_large_image` ✅

**Sitemap:**

- ✅ Exists at `/sitemap.xml` and has content
- ⚠️ `getAlternates()` only generates `en` + `es` alternates — 8 other locales not included

**Robots:**

- ✅ `/api/`, `/_next/`, `/admin/` correctly disallowed

**i18n Locales:**

- ✅ 8 locale files present: `en`, `es`, `fr`, `de`, `ja`, `ko`, `zh`, + `it`/`pt` locale dirs missing
- ❌ Middleware declares `['en','es','fr','de','ja','zh','ko','it','pt','ru']` — 10 locales
- ❌ Only 8 locale JSON files exist — `it` and `pt` missing entirely

---

### 🎨 Agent 4 — UI/UX & Accessibility

**Method:** Live browser testing on production at 375px and desktop

- **Visual Quality: 9/10** — Professional industrial imagery, clean layout, consistent branding, strong CTAs ("Map Your Expansion", "Get Broker Audit")
- **Mobile Responsiveness: 10/10** — No horizontal overflow, hamburger menu with correct `aria-label`, forms sized for touch
- ✅ Turnstile CAPTCHA widget visible on contact form
- ✅ **100% of images have `alt` text** across all tested pages
- ⚠️ Logo links in header/footer have no `aria-label` text
- ⚠️ Social media icon links (LinkedIn etc.) have no `aria-label`
- ⚠️ Honeypot field should have `aria-hidden="true"` and `tabindex="-1"`

**Screenshots captured:**

- Homepage (desktop): `homepage_en_1772108897459.png`
- Contact page: `contact_page_en_1772108923185.png`
- Mobile homepage: `mobile_homepage_en_1772109040360.png`
- Services page: `services_page_en_1772109069346.png`
- Insights page: `insights_page_en_retry_1772109312617.png`
- About page: `about_page_en_1772109186041.png`

---

### 🤖 Agent 5 — Functionality

**Method:** Live browser testing on production

| Feature                   | Status          | Notes                                         |
| ------------------------- | --------------- | --------------------------------------------- |
| Root `/` → `/en` redirect | ✅ PASS         | Works correctly                               |
| `/en` route               | ✅ PASS         | Loads correctly                               |
| `/es` route               | ✅ PASS         | Spanish content                               |
| `/fr` route               | ✅ PASS         | French content                                |
| `/de` route               | ✅ PASS         | German content                                |
| `/ja` route               | ✅ PASS         | Japanese content                              |
| `/zh` route               | ✅ PASS         | Chinese content                               |
| `/ko` route               | ✅ PASS         | Korean content                                |
| `/it` route               | ⚠️ PARTIAL      | Loads but shows **English** content           |
| `/pt` route               | ⚠️ PARTIAL      | Loads but shows **English** content           |
| Contact form              | ✅ PASS         | Turnstile visible, fields usable              |
| Assessment page           | ✅ PASS         | Loads correctly                               |
| Resources + PDFs          | ✅ PASS         | Download links visible                        |
| Admin sign-in             | ⚠️ PARTIAL      | Clerk loads but shows **Development mode**    |
| Location `/tijuana`       | ✅ PASS         | Loads correctly                               |
| Blog posts                | ✅ PASS         | Insights page and posts accessible            |
| **Section 321 Guide**     | ❌ **CRITICAL** | **Server-side exception** (Digest: 179193312) |
| Sitemap                   | ✅ PASS         | `/sitemap.xml` exists with full content       |

---

### 📐 Agent 6 — Code Quality

**Method:** `npm run lint`, `npx tsc --noEmit`, grep analysis, file audit

- ✅ `npx tsc --noEmit` — **0 errors** (clean)
- ✅ `npm run lint` — exits cleanly (path warning only, not a code error)
- ⚠️ ~83 `any` casts across `scripts/` directory (acceptable for scripts, not deployed code)
- ⚠️ ~10 `any` casts in `lib/` (should be typed)
- ❌ 50+ orphaned data/research JSON files and CSV in project root
- ⚠️ `en.json.bak` committed to repository

**Schema Quality:**

- ✅ `leads` table has indexes on `email` and `created_at`
- ✅ `social_drafts` has index on `post_id`
- ⚠️ `campaigns.stats` stored as `text` (not JSONB) — no structured querying

---

## Recommended Fix Order

1. **Immediately:** Fix Section 321 Guide crash (`"use client"` or server-side i18n)
2. **This week:** Set Clerk production keys to exit Development mode
3. **This week:** Add auth to `/api/agents/prospecting`
4. **This week:** Either create `it.json` + `pt.json` locale files, or remove `it`/`pt` from middleware locales array
5. **Next sprint:** Add rate limiting to `/api/lead-magnet`
6. **Next sprint:** Update sitemap hreflang to include all active locales
7. **Ongoing:** Move `puppeteer` to devDependencies; clean up root-level data files
