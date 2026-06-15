import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

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
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        emailBlacklisted: true,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      // If contact does not exist, create it as blacklisted
      if (response.status === 404) {
        const createResponse = await fetch(`${BREVO_API_URL}/contacts`, {
          method: 'POST',
          headers: {
            'api-key': BREVO_API_KEY as string,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email,
            emailBlacklisted: true,
          }),
        });
        if (!createResponse.ok) {
          const createData = await createResponse.json().catch(() => ({}));
          console.warn(`  ⚠️ Failed to create blacklisted contact ${email}:`, createData);
        } else {
          console.log(`  ✅ Created new blacklisted contact: ${email}`);
        }
      } else {
        console.warn(`  ⚠️ Failed to update ${email}:`, data);
      }
    } else {
      console.log(`  ✅ Blacklisted: ${email}`);
    }
  } catch (err: any) {
    console.error(`  ❌ Error processing ${email}:`, err.message);
  }
}

async function main() {
  const csvPath = path.join(process.cwd(), 'data/hard_bounce_suppression.csv');
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV not found at ${csvPath}`);
    process.exit(1);
  }

  const rows = parse(fs.readFileSync(csvPath, 'utf-8'), { columns: true, skip_empty_lines: true });
  const emails = rows.map((r: any) => (r.email || '').toLowerCase().trim()).filter(Boolean);

  console.log(`🚀 Blacklisting ${emails.length} contacts in Brevo...`);

  // Run in small batches of 5 to avoid rate limits
  for (let i = 0; i < emails.length; i += 5) {
    const batch = emails.slice(i, i + 5);
    await Promise.all(batch.map(email => blacklistEmail(email)));
    // Brief sleep to be gentle on API rate limit
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('🎉 Done blacklisting bounces!');
}

main().catch(console.error);
