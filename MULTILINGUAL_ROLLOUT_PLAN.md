# Nearshore Navigator — Multilingual Rollout Plan

## Phase 1 ✅ COMPLETE (May 2026)

**Locales activated:** `en`, `es`, `de`, `ja`

### What was done
- `seo-config.ts` → `INDEXABLE_LOCALES` set to `['en', 'es', 'de', 'ja']`
- `middleware.ts` → Removed `de` and `ja` from deprecated redirects list
- `blog-data.ts` → Added `locales.de` and `locales.ja` (translated title, excerpt, tags) to all 9 core blog articles
- `app/[lang]/insights/[slug]/page.tsx` → `BLOG_INDEXABLE_LANGS` set includes `en`, `de`, `ja`; canonical and hreflang self-reference for all three
- Sitemap and hreflang automatically include `de` and `ja` via `INDEXABLE_LOCALES`

### Why de + ja first
- German automotive suppliers (Bosch, BMW, Continental) and Japanese electronics/auto (Panasonic, Toyota, Honda) are among the largest foreign investors in Mexico's manufacturing sector
- GSC data showed de/ja pages were still getting impressions even while being 301-redirected — confirming real organic demand
- These markets directly align with Nearshore Navigator's core audience: procurement and supply-chain executives evaluating Mexico nearshoring

---

## Phase 2 — Planned (Q3 2026)

**Locales to activate:** `zh`, `ko`

### Demand signals to confirm before launch
- [ ] GSC: check zh/ko impression share on existing redirected pages
- [ ] Check if Chinese and Korean FDI in Tijuana maquiladoras is growing (INEGI/ICSID data)
- [ ] Validate search volume for key terms in zh/ko using Google Keyword Planner or Ahrefs

### Work required
1. **`seo-config.ts`** — add `'zh'`, `'ko'` to `INDEXABLE_LOCALES`; remove from `DEPRECATED_LOCALES`
2. **`middleware.ts`** — remove `zh` and `ko` from `deprecatedLocalesList`
3. **`blog-data.ts`** — add `locales.zh` and `locales.ko` entries to all core blog articles (same structure as de/ja)
4. **`app/[lang]/insights/[slug]/page.tsx`** — update `BLOG_INDEXABLE_LANGS` to include `'zh'` and `'ko'`; update `alternates.languages` to include zh and ko hreflang entries
5. **Other `generateMetadata` files** — audit any page-level metadata files that hardcode language sets and add zh/ko
6. **Translation pass** — use DeepL or professional translator for zh/ko content; verify IMMEX, USMCA, and shelter services terminology accuracy
7. **Sitemap** — verify `app/sitemap.ts` picks up new locales automatically from `INDEXABLE_LOCALES`

### Files to audit
- `app/[lang]/page.tsx` (homepage)
- `app/[lang]/insights/page.tsx` (insights index)
- `app/[lang]/services/[service]/page.tsx`
- `app/[lang]/locations/[city]/[service]/page.tsx`
- Any page with hardcoded `['en', 'de', 'ja']` or `BLOG_INDEXABLE_LANGS`

---

## Phase 3 — Planned (Q4 2026 or demand-driven)

**Locales to activate:** `fr`, `pt`, `it`, `ru`

### Notes
- **French (`fr`)** — French-Canadian manufacturers have Tijuana presence; EU companies sourcing via French-speaking procurement teams
- **Portuguese (`pt`)** — Brazilian manufacturing investors; Portugal-based EU companies
- **Italian (`it`)** — Italian machinery/automation suppliers active in Bajío region
- **Russian (`ru`)** — Lower priority; geopolitical factors reduce demand signal reliability

### Demand threshold
Only activate a locale when it shows **≥ 50 impressions/month** in GSC for its redirected pages, or when a direct B2B lead references that language market.

### Work required (same pattern as Phase 2)
1. `seo-config.ts` → add to `INDEXABLE_LOCALES`, remove from `DEPRECATED_LOCALES`
2. `middleware.ts` → remove from `deprecatedLocalesList`
3. `blog-data.ts` → add `locales.{lang}` to all articles
4. All `generateMetadata` files → add hreflang entries
5. Professional translation pass — especially for legal/regulatory terms (IMMEX, PTU, USMCA)

---

## Ongoing Maintenance

### After each Phase activation
- [ ] Submit updated sitemap to GSC: `https://nearshorenavigator.com/sitemap.xml`
- [ ] Use GSC URL Inspection to request indexing on 5–10 key new-locale pages
- [ ] Monitor "Discovered - currently not indexed" counts in GSC over 30–60 days
- [ ] Check hreflang errors in GSC → Search Results → International Targeting

### Translation quality checklist
- IMMEX = Industria Manufacturera, Maquiladora y de Servicios de Exportación (do not translate; use acronym)
- USMCA = T-MEC in Spanish, CUSMA in Canadian English (de/ja can use USMCA or local equivalent)
- Shelter service = "Empresa de alojamiento" (es), "Shelter-Service" (de), "シェルターサービス" (ja)
- Maquiladora = keep as-is in all languages (proper noun)
- Nearshoring = "Nearshoring" (universal, do not translate)

### Known issues to fix before Phase 2
- [ ] `app/[lang]/insights/page.tsx` renders client-side only → causes "Crawled not indexed" — convert to SSR/SSG
- [ ] `app/[lang]/locations/[city]/[service]/page.tsx` noindexes ~342 thin pages → replace `shouldNoindex` with `notFound()` to prevent crawl waste
- [ ] Broken image audit: run quarterly to catch expired Unsplash photo IDs (replace with `/public/images/` local assets)
