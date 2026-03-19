
import fs from 'fs';
import path from 'path';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const locales = ['es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];
const localesDir = path.join(process.cwd(), 'app/i18n/locales');
const enPath = path.join(localesDir, 'en.json');

// Define a static schema based on the keys we know
const MarketingSchema = z.object({
  badge: z.string(),
  heroTitle: z.string(),
  heroTitleHighlight: z.string(),
  heroSubtitle: z.string(),
  heroCta: z.string(),
  heroCtaSecondary: z.string(),
  servicesTitle: z.string(),
  servicesSubtitle: z.string(),
  linkedinTitle: z.string(),
  linkedinDesc: z.string(),
  crmTitle: z.string(),
  crmDesc: z.string(),
  contentTitle: z.string(),
  contentDesc: z.string(),
  emailTitle: z.string(),
  emailDesc: z.string(),
  seoTitle: z.string(),
  seoDesc: z.string(),
  socialTitle: z.string(),
  socialDesc: z.string(),
  howTitle: z.string(),
  howSubtitle: z.string(),
  step1Title: z.string(),
  step1Desc: z.string(),
  step2Title: z.string(),
  step2Desc: z.string(),
  step3Title: z.string(),
  step3Desc: z.string(),
  whyDenisseTitle: z.string(),
  whyPoint1: z.string(),
  whyPoint2: z.string(),
  whyPoint3: z.string(),
  whyPoint4: z.string(),
  whyCta: z.string(),
  formTitle: z.string(),
  formSubtitle: z.string(),
});

async function translateLocales() {
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const marketingKeys = enData.marketingPage;

  if (!marketingKeys) {
    console.error('No marketingPage found in en.json');
    return;
  }

  for (const locale of locales) {
    const localePath = path.join(localesDir, `${locale}.json`);
    if (!fs.existsSync(localePath)) continue;

    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));

    // Re-check if it exists. If it has fewer keys than EN, re-translate.
    if (localeData.marketingPage && Object.keys(localeData.marketingPage).length >= Object.keys(marketingKeys).length) {
      console.log(`Skipping ${locale} (valid marketingPage exists)`);
      continue;
    }

    console.log(`Translating marketingPage for ${locale}...`);

    try {
      const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        schema: MarketingSchema,
        prompt: `Translate the following marketing content from English to ${locale}. Keep the tone professional, persuasive, and tailored for a B2B manufacturing audience. Use local business terminology where appropriate (e.g., proper Spanish terms for "Shelter" or "Maquiladora" if applicable, but maintain professional B2B tone).
        
        ${JSON.stringify(marketingKeys, null, 2)}
        
        Return the translations as a JSON object with exactly the same keys as the input.`,
      });

      localeData.marketingPage = object;
      fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2));
      console.log(`Successfully updated ${locale}.json`);
      
      // Wait to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error translating for ${locale}:`, error);
    }
  }
}

translateLocales().catch(console.error);
