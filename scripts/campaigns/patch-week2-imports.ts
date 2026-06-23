import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function getNiche(industry: string): string {
  const ind = (industry || '').toLowerCase();
  if (ind.includes('aerospace') || ind.includes('defense')) return 'Aerospace';
  if (ind.includes('medical') || ind.includes('pharma') || ind.includes('biotech')) return 'Medical';
  if (ind.includes('electronics')) return 'Electronics';
  if (ind.includes('automotive')) return 'Automotive';
  return 'General';
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🩹 Running patch script for Week 2 campaign imports...');

  if (!process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not configured');
    process.exit(1);
  }

  const { brevo } = await import('../../lib/brevo');

  // 1. Load the intended 258 emails from the Week 2 sent log
  const sentLogPath = path.join(process.cwd(), 'scripts/sent_june29_usmca_week2.json');
  if (!fs.existsSync(sentLogPath)) {
    console.error('❌ Intended sent log not found at scripts/sent_june29_usmca_week2.json');
    process.exit(1);
  }
  const intendedEmails: string[] = JSON.parse(fs.readFileSync(sentLogPath, 'utf-8'));
  const intendedSet = new Set(intendedEmails.map(e => e.toLowerCase().trim()));
  console.log(`📋 Loaded ${intendedSet.size} intended contacts from sent log.`);

  // 2. Load lead sources to get full metadata (FIRSTNAME, COMPANY, INDUSTRY)
  const tier1Path = path.join(process.cwd(), 'segmented_leads/feb17/tier1_med_device.json');
  const tier2Path = path.join(process.cwd(), 'segmented_leads/feb17/tier2_manufacturing.json');
  
  const leadMetadata = new Map<string, { firstName: string; company: string; industry: string }>();
  
  for (const fpath of [tier1Path, tier2Path]) {
    if (!fs.existsSync(fpath)) continue;
    const data = JSON.parse(fs.readFileSync(fpath, 'utf-8'));
    data.forEach((l: any) => {
      const email = (l.email || '').toLowerCase().trim();
      if (intendedSet.has(email)) {
        leadMetadata.set(email, {
          firstName: l.firstName || '',
          company: l.company || '',
          industry: l.industry || ''
        });
      }
    });
  }
  console.log(`✨ Resolved metadata for ${leadMetadata.size} contacts.`);

  // 3. Fetch current lists from Brevo to map names to list IDs
  console.log('🔍 Fetching lists from Brevo...');
  const listRes = await brevo.getLists({ limit: 50 });
  if (!listRes || !listRes.lists) {
    console.error('❌ Failed to retrieve lists from Brevo');
    process.exit(1);
  }

  const listMap = new Map<string, number>(); // Name -> ID
  listRes.lists.forEach((l: any) => {
    listMap.set(l.name, l.id);
  });

  const niches = ['Aerospace', 'Medical', 'Electronics', 'Automotive', 'General'];
  const nicheListIds = new Map<string, number>();
  
  for (const niche of niches) {
    const listName = `USMCA-Week2-${niche}-Jun29`;
    const listId = listMap.get(listName);
    if (!listId) {
      console.error(`❌ Could not find list named "${listName}" in Brevo.`);
      process.exit(1);
    }
    nicheListIds.set(niche, listId);
    console.log(`  - Niche: ${niche} | List Name: ${listName} | List ID: ${listId}`);
  }

  // 4. Import contacts sequentially with throttling (150ms delay)
  console.log('\n🚀 Starting throttled imports of all intended contacts...');
  let successCount = 0;
  let errorCount = 0;

  for (const email of intendedEmails) {
    const cleanEmail = email.toLowerCase().trim();
    const meta = leadMetadata.get(cleanEmail);
    if (!meta) {
      console.warn(`  ⚠️ Missing metadata for email: ${email}, skipping`);
      errorCount++;
      continue;
    }

    const niche = getNiche(meta.industry);
    const listId = nicheListIds.get(niche);
    if (!listId) {
      console.warn(`  ⚠️ Missing list ID for niche: ${niche}, skipping ${email}`);
      errorCount++;
      continue;
    }

    try {
      // Call createContact with sequential delay
      await brevo.createContact({
        email: cleanEmail,
        attributes: {
          FIRSTNAME: meta.firstName,
          COMPANY: meta.company,
          INDUSTRY: meta.industry
        },
        listIds: [listId],
        updateEnabled: true
      });
      successCount++;
      if (successCount % 20 === 0) {
        console.log(`  Processed ${successCount}/${intendedEmails.length} contacts...`);
      }
    } catch (err: any) {
      console.error(`  ❌ Failed to import ${email}:`, err.message);
      errorCount++;
    }

    // Throttle: sleep for 150ms
    await sleep(150);
  }

  console.log(`\n🎉 Patch execution completed!`);
  console.log(`  - Success: ${successCount}`);
  console.log(`  - Errors/Skipped: ${errorCount}`);
  console.log(`  - Total processed: ${intendedEmails.length}`);
}

main().catch(e => {
  console.error('❌ Script failed:', e.message);
  process.exit(1);
});
