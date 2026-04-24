import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


const targetSlugs = [
  'nearshoring-in-tijuana-guide-for-us-companies',
  'tijuana-vs-asia-manufacturing-cost-comparison',
  'how-shelter-services-work-in-tijuana',
  'industrial-parks-in-tijuana-map-and-overview',
  'mexico-2025-nearshoring-boom-usmca-review'
];

const locales = ['es', 'fr', 'de', 'ja', 'zh', 'ko', 'it', 'pt', 'ru'];
const blogDataPath = path.join(process.cwd(), 'app/constants/blog-data.ts');

async function translateBlogData() {
    let content = fs.readFileSync(blogDataPath, 'utf8');
    
    for (const slug of targetSlugs) {
        console.log(`\nProcessing articles for slug: ${slug}`);
        
        const postStartIdx = content.indexOf(`slug: "${slug}"`);
        if (postStartIdx === -1) continue;
        
        const blockStart = content.lastIndexOf('{', postStartIdx);
        let blockEnd = blockStart;
        let braceCount = 0;
        for (let i = blockStart; i < content.length; i++) {
            if (content[i] === '{') braceCount++;
            if (content[i] === '}') braceCount--;
            if (braceCount === 0 && i > blockStart) {
                blockEnd = i + 1;
                break;
            }
        }
        
        const postBlock = content.substring(blockStart, blockEnd);
        
        const titleMatch = postBlock.match(/title:\s*"([^"]+)"/);
        const excerptMatch = postBlock.match(/excerpt:\s*"([^"]+)"/);
        const content_match = postBlock.match(/content:\s*`([\s\S]*?)`/);
        
        if (!titleMatch || !excerptMatch || !content_match) {
            console.error(`Could not extract fields for ${slug}`);
            continue;
        }
        
        const enTitle = titleMatch[1];
        const enExcerpt = excerptMatch[1];
        const enContent = content_match[1];
        
        for (const locale of locales) {
            // Check if locale already exists in this block
            const localeKey = `${locale}: {`;
            if (postBlock.indexOf(localeKey) !== -1) {
                console.log(`  [${locale}] Already exists for ${slug}, skipping.`);
                continue;
            }

            console.log(`  [${locale}] Translating...`);
            
            let backoff = 20000;
            let success = false;
            while (!success) {
                try {
                    const prompt = `Translate this B2B manufacturing article from English to ${locale}.
Keep the tone professional and authoritative.
IMPORTANT: Maintain all HTML tags (p, h2, strong, table, th, td, ul, li) exactly as they are.
Do not translate technical terms like "USMCA", "IMMEX", "Nearshoring", or city names like "Tijuana".

Title: ${enTitle}
Excerpt: ${enExcerpt}
Content: ${enContent}

Return a JSON object with keys: title, excerpt, content.`;
                    
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const text = response.text();
                    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
                    const translated = JSON.parse(jsonStr);
                    
                    const localesKey = `locales: {`;
                    const localesIdx = postBlock.indexOf(localesKey);
                    
                    if (localesIdx === -1) {
                        const newLocales = `\n      locales: {\n        ${locale}: ${JSON.stringify(translated, null, 10).replace(/\s{2,}/g, ' ')}\n      },`;
                        const lastBrace = postBlock.lastIndexOf('}');
                        const updatedPostBlock = postBlock.substring(0, lastBrace) + newLocales + `\n  }`;
                        content = content.replace(postBlock, updatedPostBlock);
                    } else {
                        const insertionPoint = postBlock.indexOf('{', localesIdx) + 1;
                        const newLocaleEntry = `\n        ${locale}: ${JSON.stringify(translated, null, 10).replace(/\s{2,}/g, ' ')},`;
                        const updatedPostBlock = postBlock.substring(0, insertionPoint) + newLocaleEntry + postBlock.substring(insertionPoint);
                        content = content.replace(postBlock, updatedPostBlock);
                    }
                    
                    success = true;
                    fs.writeFileSync(blogDataPath, content);
                    console.log(`  [${locale}] Success.`);
                    // Small break between successful translations
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } catch (e: any) {
                    if (e?.status === 429 || e?.message?.includes('429')) {
                        console.log(`    Rate limited (429). Waiting ${backoff/1000}s then retrying...`);
                        await new Promise(resolve => setTimeout(resolve, backoff));
                        backoff = Math.min(backoff * 2, 300000); 
                    } else {
                        console.error(`    Error for ${locale}:`, e.message);
                        await new Promise(resolve => setTimeout(resolve, 30000));
                        break; // Skip on fatal error
                    }
                }
            }
        }
    }
}

translateBlogData().catch(console.error);
