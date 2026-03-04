---
name: ai-seo
description: Content optimization rules for traditional Google Search, AI Overviews, and LLMs (ChatGPT, Claude, Perplexity).
---

# AI SEO Content Rules

Applying these rules ensures content is machine-readable, highly structured, and prioritized by AI models during summarization and citation.

## 1. Direct Answer Blocks

Immediately after every `## H2` heading, provide a 40–60 word self-contained paragraph that fully answers the heading's intent. Do not use filler or lead-in text. This block must be able to stand alone as a direct answer.

## 2. Schema Stacking

Always inject multiple schema types in the JSON-LD block:

- **Article**: author, publisher, datePublished, headline, image
- **FAQPage**: Minimum 6 conversational Q&A pairs (how humans ask voice assistants)
- **HowTo**: For any process-driven content (steps required)
- **BreadcrumbList**: Home > Category > Article
- **Speakable**: Targeting the intro and all direct answer blocks

## 3. Semantic Natural Language Slugs

Use full, descriptive URL slugs (e.g., `china-plus-one-strategy-mexico`).

## 4. Structured Comparison

Include at least one `<table>` or tabular comparison per article. AI models heavily favor parsing and citing structured <th>/<td> data over pure text. Keep cells concise.

## 5. Listicle formatting

Include at least one numbered or bulleted list (minimum 5 items). Lists are easily extracted by AI Overviews.

## 6. Attributed Statistics

Always attribute data cleanly.
_CORRECT_: "According to IMMEX 2026 data, over 5,000 companies..."
_INCORRECT_: "Thousands of companies..."

## 7. Conversational FAQ Phrasing

Write FAQs as natural questions.
_CORRECT_: "What is the difference between a maquiladora and a shelter service?"
_INCORRECT_: "Maquiladora vs Shelter Services Details"
