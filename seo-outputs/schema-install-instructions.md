# Schema Installation Instructions

## 1. Global Schema (app/layout.tsx)
Insert the `schema.json` content as a JSON-LD script inside the `<head>` of your root layout. Since the site is using Next.js App Router, you can create a `SchemaMarkup` component or inject it directly.

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
/>
```

## 2. Location Page Schema (app/[lang]/locations/[city]/page.tsx)
For the dynamic location pages, inject the `schema-locations-template.json` by dynamically computing the variables (`{{CITY_NAME}}`, `{{STATE_NAME}}`, etc.) based on the URL segment and the data from `seo-data.ts`.

## 3. Multilingual Consideration
Ensure the `url` property in the `LocalBusiness` schema dynamically updates to match the current locale (e.g., `https://nearshorenavigator.com/es/locations/tijuana`).
