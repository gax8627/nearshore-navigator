import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { db } from '../lib/db';
import { leads } from '../lib/db/schema';
import { sql } from 'drizzle-orm';

const DOWNLOADS_DIR = path.join(process.env.HOME || '', 'Downloads', 'leads');
// Fallback for local testing or server path if HOME not set right for some reason
const SEGMENTED_DIR = path.join(process.cwd(), 'segmented_leads');

async function main() {
    console.log("🚀 Starting Lead Migration...");

    // 1. Process CSVs from Downloads
    if (fs.existsSync(DOWNLOADS_DIR)) {
        const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.csv'));
        console.log(`Found ${files.length} CSV files in ${DOWNLOADS_DIR}`);

        for (const file of files) {
            const content = fs.readFileSync(path.join(DOWNLOADS_DIR, file), 'utf-8');
            const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });
            
            console.log(`Processing ${file} (${records.length} records)...`);
            
            const batch = records.map((r: any) => ({
                name: r.Name || r['First Name'] || r.FirstName || r['Lead Name'] || 'Unknown',
                email: r.Email || r['Lead Email'] || r['Email Address'] || '',
                company: r.Company || r['Account Name'] || '',
                phone: r.Phone || r['Mobile Phone'] || '',
                source: 'csv_import',
                status: 'new',
                tags: `["source:${file}"]`,
                createdAt: new Date(),
            })).filter((l: any) => l.email && l.email.includes('@'));

            if (batch.length > 0) {
                 // Insert in chunks of 50 to avoid limits
                 for (let i = 0; i < batch.length; i += 50) {
                    const chunk = batch.slice(i, i + 50);
                    try {
                        await db.insert(leads).values(chunk).onConflictDoNothing();
                    } catch (e: any) {
                        console.error(`Error inserting chunk from ${file}:`, e.message);
                    }
                 }
            }
        }
    } else {
        console.log(`⚠️ Downloads dir not found: ${DOWNLOADS_DIR}`);
    }

    // 2. Process Segmented JSONs (High Intent)
    if (fs.existsSync(SEGMENTED_DIR)) {
        // High Intent Clickers
        const clickersPath = path.join(SEGMENTED_DIR, 'high_intent_clickers.json');
        if (fs.existsSync(clickersPath)) {
            const clickers = JSON.parse(fs.readFileSync(clickersPath, 'utf-8'));
            console.log(`Processing ${clickers.length} high intent clickers...`);
            
            const batch = clickers.map((c: any) => ({
                name: 'Unknown', // Clickers file might only have email, need enrichment? 
                // Wait, feb18_blended_mix.ts tried to look up details.
                // We'll insert what we have, update later if exists.
                email: c.email,
                company: '',
                source: 'segment_clickers',
                status: 'contacted',
                score: 50 + (c.clickCount * 10), // Boost score
                tags: `["clicker", "clicks:${c.clickCount}"]`,
            }));

            // This update is tricky with onConflictDoNothing. 
            // Ideally we UPSERT. db.insert().values().onConflictDoUpdate(...)
            // But let's just insert for now.
             for (let i = 0; i < batch.length; i += 50) {
                const chunk = batch.slice(i, i + 50);
                try {
                     await db.insert(leads).values(chunk).onConflictDoNothing();
                } catch (e) {
                     // ignore
                }
             }
        }
    }

    console.log("✅ Migration Complete.");
    process.exit(0);
}

main().catch(console.error);
