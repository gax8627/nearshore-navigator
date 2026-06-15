import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';

if (!BREVO_API_KEY) {
  console.error('❌ BREVO_API_KEY not set in .env.local');
  process.exit(1);
}

async function blacklistEmail(email: string) {
  try {
    const response = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailBlacklisted: true }),
    });
    if (response.ok) {
      console.log(`  ✅ Blacklisted in Brevo: ${email}`);
    } else {
      console.warn(`  ⚠️ Failed to blacklist ${email}`);
    }
  } catch (err: any) {
    console.error(`  ❌ Error blacklisting ${email}:`, err.message);
  }
}

async function main() {
  console.log('🔍 Querying Brevo for bounces on June 15, 2026...');
  
  const today = '2026-06-15';
  const tomorrow = '2026-06-16';

  let offset = 0;
  const limit = 1000;
  const newBounces = new Set<string>();

  try {
    const response = await fetch(`${BREVO_API_URL}/smtp/statistics/events?startDate=${today}&endDate=${tomorrow}&limit=${limit}&offset=${offset}&sort=desc`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY as string,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok && data.events) {
      data.events.forEach((e: any) => {
        // Check for bounce and error events
        if (['hardBounce', 'softBounce', 'invalid', 'bounces', 'spam', 'error', 'blocked'].includes(e.event)) {
          newBounces.add(e.email.toLowerCase().trim());
        }
      });
    }

    console.log(`✅ Found ${newBounces.size} bounces/errors from today's campaigns.`);

    if (newBounces.size === 0) {
      console.log('No new bounces to process.');
      return;
    }

    // Load existing hard bounces
    const hardBouncePath = path.join(process.cwd(), 'data/hard_bounce_suppression.csv');
    let existingBounces = new Set<string>();
    if (fs.existsSync(hardBouncePath)) {
      const rows = parse(fs.readFileSync(hardBouncePath, 'utf-8'), { columns: true });
      rows.forEach((r: any) => existingBounces.add((r.email || '').toLowerCase().trim()));
    }

    // Load existing full suppression list
    const fullSuppressionPath = path.join(process.cwd(), 'data/full_suppression_list.csv');
    let existingFull = new Set<string>();
    if (fs.existsSync(fullSuppressionPath)) {
      const rows = parse(fs.readFileSync(fullSuppressionPath, 'utf-8'), { columns: true });
      rows.forEach((r: any) => existingFull.add((r.email || '').toLowerCase().trim()));
    }

    const addedToHard: any[] = [];
    const addedToFull: any[] = [];

    for (const email of newBounces) {
      // Blacklist in Brevo first
      await blacklistEmail(email);

      if (!existingBounces.has(email)) {
        addedToHard.push({ email });
        existingBounces.add(email);
      }
      if (!existingFull.has(email)) {
        addedToFull.push({ email });
        existingFull.add(email);
      }
    }

    // Append to hard_bounce_suppression.csv
    if (addedToHard.length > 0) {
      const rows = Array.from(existingBounces).map(email => ({ email }));
      fs.writeFileSync(hardBouncePath, stringify(rows, { header: true }));
      console.log(`💾 Appended ${addedToHard.length} new bounces to data/hard_bounce_suppression.csv (Total: ${existingBounces.size})`);
    }

    // Append to full_suppression_list.csv
    if (addedToFull.length > 0) {
      const rows = Array.from(existingFull).map(email => ({ email }));
      fs.writeFileSync(fullSuppressionPath, stringify(rows, { header: true }));
      console.log(`💾 Appended ${addedToFull.length} new suppressions to data/full_suppression_list.csv (Total: ${existingFull.size})`);
    }

  } catch (err: any) {
    console.error('❌ Error fetching today\'s events:', err.message);
  }
}

main().catch(console.error);
