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
    
    // We'll use a safer approach: find each post by slug in the text, 
    // and then inject or update the locales object.
    // This is tricky with raw text. Let's try to parse the array part.
    
    for (const slug of targetSlugs) {
        console.log(`\nProcessing articles for slug: ${slug}`);
        
        // Extract the specific post object using a rough regex or string search
        // For simplicity in this agentic context, I'll extract the title, excerpt, and content 
        // from the English version which we just wrote.
        
        const postStartIdx = content.indexOf(`slug: "${slug}"`);
        if (postStartIdx === -1) continue;
        
        // Find the block around it
        const blockStart = content.lastIndexOf('{', postStartIdx);
        // Find the end of this object (approximate by matching braces)
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
        
        // Extract EN fields
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
            console.log(`  Translating to ${locale}...`);
            
            let retries = 3;
            let success = false;
            while (retries > 0 && !success) {
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
                    
                    // Inject into the file content
                    // We look for the locales object in the postBlock
                    const localesKey = `locales: {`;
                    const localesIdx = postBlock.indexOf(localesKey);
                    
                    if (localesIdx === -1) {
                        // Create locales object if missing
                        const newLocales = `\n      locales: {\n        ${locale}: ${JSON.stringify(translated, null, 10).replace(/\s{2,}/g, ' ')}\n      },`;
                        const lastBrace = postBlock.lastIndexOf('}');
                        const updatedPostBlock = postBlock.substring(0, lastBrace) + newLocales + `\n  }`;
                        content = content.replace(postBlock, updatedPostBlock);
                    } else {
                        // Check if locale already exists
                        const localeKey = `${locale}: {`;
                        if (postBlock.indexOf(localeKey) === -1) {
                            // Add to existing locales
                            const insertionPoint = postBlock.indexOf('{', localesIdx) + 1;
                            const newLocaleEntry = `\n        ${locale}: ${JSON.stringify(translated, null, 10).replace(/\s{2,}/g, ' ')},`;
                            const updatedPostBlock = postBlock.substring(0, insertionPoint) + newLocaleEntry + postBlock.substring(insertionPoint);
                            content = content.replace(postBlock, updatedPostBlock);
                        } else {
                            // Skip if exists (or we could overwrite, but let's assume clean start)
                            console.log(`    ${locale} already exists, skipping.`);
                        }
                    }
                    
                    success = true;
                    fs.writeFileSync(blogDataPath, content);
                } catch (e: any) {
                    retries--;
                    console.error(`    Error for ${locale}:`, e.message);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

translateBlogData().catch(console.error);
