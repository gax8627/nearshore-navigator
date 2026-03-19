import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { LOCATIONS, SERVICES } from "../app/constants/seo-data";

dotenv.config({ path: ".env.local" });

const LANGUAGES = ['es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];

async function translateContent(content: any, targetLang: string, retries = 5) {
    const prompt = `
    Transform the following JSON object into ${targetLang}. 
    This is for a professional manufacturing and nearshoring advisory website.
    The tone should be professional, authoritative, and SEO-optimized.
    Keep all keys identical. Translate all string values.
    Important: Do not translate city names like "Tijuana" or "Mexicali" unless there is a standard localized name (e.g., "Múnich" for "Munich", but "Tijuana" remains "Tijuana").
    
    JSON to translate:
    ${JSON.stringify(content, null, 2)}
    `;

    try {
        const { text } = await generateText({
            model: google("gemini-1.5-flash"),
            prompt: prompt,
        });
        
        // Remove markdown formatting if present
        const jsonText = text.replace(/```json\n?/, "").replace(/\n?```/, "");
        
        return JSON.parse(jsonText);
    } catch (error: any) {
        if (error.status === 429 && retries > 0) {
            const delay = (6 - retries) * 15000;
            console.warn(`Rate limited for ${targetLang}. Retrying in ${delay/1000}s... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return translateContent(content, targetLang, retries - 1);
        }
        console.error(`Error translating to ${targetLang}:`, error);
        return null;
    }
}

async function main() {
    console.log("Starting SEO data translation using AI SDK...");

    for (const lang of LANGUAGES) {
        console.log(`Translating to ${lang}...`);
        
        const outPath = path.join(process.cwd(), `app/i18n/locales/${lang}-seo.json`);
        if (fs.existsSync(outPath)) {
            console.log(`File already exists for ${lang}, skipping.`);
            continue;
        }

        const seoData = {
            locations: LOCATIONS.map(l => ({
                slug: l.slug,
                name: l.name,
                state: l.state,
                country: l.country,
                description: l.description,
                stats: l.stats,
                advantages: l.advantages
            })),
            services: SERVICES.map(s => ({
                slug: s.slug,
                title: s.title,
                description: s.description
            }))
        };

        const translated = await translateContent(seoData, lang);
        
        if (translated) {
            fs.writeFileSync(outPath, JSON.stringify(translated, null, 2));
            console.log(`Saved ${outPath}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log("Translation complete!");
}

main().catch(console.error);
