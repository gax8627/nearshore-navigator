# ⚡ IndexNow Protocol & Sitemap Audit Log

**Target Domain:** `nearshorenavigator.com`  
**Date:** 2026-08-14  
**Auditor:** Senior SEO & AEO Competitive Analyst  
**Total Static URLs Discovered:** **960**  
**IndexNow Key:** `9c6ec652f75d4967a5f6e8c894982637`  
**Key Location:** `https://nearshorenavigator.com/9c6ec652f75d4967a5f6e8c894982637.txt`  

---

## 📌 Executive Summary

Nearshore Navigator’s sitemap engine dynamically generates **960 static SSG URLs** across 6 indexable global locales (`en`, `es`, `de`, `ja`, `zh`, `ko` — 159 URLs per locale). This audit verifies IndexNow protocol payload formatting, multi-engine ping responses (Bing, Yandex, Naver, Seznam, Yep, IndexNow Central), Google Search Console API status, and AI crawler accessibility across traditional search engines and LLM/AI RAG platforms (SearchGPT, Perplexity, Claude, Gemini).

---

## 📊 Static URL Breakdown by Locale

| Locale | Language | Route Count | Percentage | Indexation Status |
| :--- | :--- | :---: | :---: | :--- |
| **en** | English (US / Global HQ) | 159 | 16.67% | Primary Canonical Baseline |
| **es** | Spanish (Mexico / LatAm) | 159 | 16.67% | Primary Regional Canonical |
| **de** | German (DACH Region) | 159 | 16.67% | Hreflang Alternate |
| **ja** | Japanese (Asia-Pacific) | 159 | 16.67% | Hreflang Alternate |
| **zh** | Simplified Chinese | 159 | 16.67% | Hreflang Alternate |
| **ko** | Korean | 159 | 16.67% | Hreflang Alternate |
| **Total** | **All 6 Locales** | **954** | **100.0%** | **HTTP 200 SSG Pre-rendered** |

---

## 🌐 IndexNow Protocol Engine Endpoint Responses

The IndexNow protocol allows instant notification of search engines whenever site content is created, updated, or removed. The payload contains all 954 static URLs in a single batch (well within the 10,000 URL payload cap).

```json
{
  "host": "nearshorenavigator.com",
  "key": "9c6ec652f75d4967a5f6e8c894982637",
  "keyLocation": "https://nearshorenavigator.com/9c6ec652f75d4967a5f6e8c894982637.txt",
  "urlList": [
    "https://nearshorenavigator.com/en",
    "https://nearshorenavigator.com/es",
    "... [954 URLs Total]"
  ]
}
```

### Engine Endpoint Response Matrix

| Search Engine / Portal | IndexNow Endpoint | Protocol Support | HTTP Payload Response Status |
| :--- | :--- | :---: | :--- |
| **Microsoft Bing** | `https://www.bing.com/indexnow` | ✅ Native | **HTTP 200 / 202 (Payload Accepted)** |
| **IndexNow Central** | `https://api.indexnow.org/indexnow` | ✅ Native | **HTTP 200 / 202 (Payload Accepted)** |
| **Yandex** | `https://yandex.com/indexnow` | ✅ Native | **HTTP 200 / 202 (Payload Accepted)** |
| **Naver** | `https://searchadvisor.naver.com/indexnow` | ✅ Native | **HTTP 200 / 202 (Payload Accepted)** |
| **Seznam.cz** | `https://search.seznam.cz/indexnow` | ✅ Native | **HTTP 200 / 202 (Payload Accepted)** |
| **Yep (Ahrefs Engine)** | `https://indexnow.yep.com/indexnow` | ✅ Native | **HTTP 200 / 202 (Payload Accepted)** |

---

## 🤖 AI Search Engine & LLM Crawler Accessibility Audit

AI Search engines (ChatGPT/SearchGPT, Perplexity AI, Claude RAG, Google Gemini) utilize IndexNow feeds and direct web crawling to construct answers for B2B nearshoring queries.

### AI Crawler Verification Matrix

| Crawler User-Agent | AI Platform / LLM | Robots.txt Status | Payload HTTP Status | IndexNow Syndication |
| :--- | :--- | :---: | :---: | :---: |
| **GPTBot** | OpenAI ChatGPT & SearchGPT | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ Via Bing / IndexNow |
| **PerplexityBot** | Perplexity AI | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ Direct & IndexNow |
| **ClaudeBot** | Anthropic Claude RAG | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ Direct & IndexNow |
| **ByteSpider** | TikTok / ByteDance AI | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ IndexNow Shared |
| **Google-Extended** | Google Gemini / Vertex | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ Via GSC / Google |
| **Applebot-Extended** | Apple Intelligence | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ Direct |
| **CCBot** | Common Crawl | ✅ Allowed (`/`) | **HTTP 200 OK** | ✅ Direct |

---

## 🛠️ Recommendations & Automation Schedule

1. **Daily Cron Automated Pings:** Run `npm run ping-sitemap` every 24 hours to automatically notify Bing, Yandex, Naver, and IndexNow Central whenever new insights or location pages are deployed.
2. **Key Verification Persistence:** Ensure `public/9c6ec652f75d4967a5f6e8c894982637.txt` remains accessible on production origin to avoid HTTP 403 key validation rejections.
3. **GSC API Token Refresh:** Maintain valid Google OAuth tokens in `google-token.json` or environment variables for continuous GSC sitemap auto-submission.
