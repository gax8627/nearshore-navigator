
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));

  console.log('🔍 Fetching email events from 2026-05-01...');

  let offset = 0;
  const limit = 1000;
  const hardBounces = new Set<string>();

  try {
    while (true) {
      const res = await brevo.getEmailEvents({
        startDate: '2026-05-01',
        endDate: '2026-05-28',
        limit,
        offset,
        sort: 'desc'
      });

      if (res && res.events && res.events.length > 0) {
        res.events.forEach((e: any) => {
          if (['hardBounce', 'hardBounces', 'invalid', 'bounces', 'spam', 'error', 'blocked'].includes(e.event)) {
            hardBounces.add(e.email);
          }
        });
        console.log(`Processed ${offset + res.events.length} events... Found ${hardBounces.size} bounces/errors so far.`);
        offset += limit;
        if (res.events.length < limit) break;
      } else {
        break;
      }
    }

    const uniqueHardBounces = Array.from(hardBounces);
    console.log(`✅ Total unique bounces/errors found: ${uniqueHardBounces.length}`);

    const outputPath = path.join(process.cwd(), 'scratch/hard_bounces.json');
    fs.writeFileSync(outputPath, JSON.stringify(uniqueHardBounces, null, 2));
    console.log(`💾 Saved hard bounces to ${outputPath}`);

  } catch (error: any) {
    console.error('❌ Error fetching events:', error.message);
  }
}

main();
