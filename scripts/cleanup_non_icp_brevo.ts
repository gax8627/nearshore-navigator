/**
 * Brevo Non-ICP Cleanup Script
 * 
 * This script analyzes your engagement_data.json contacts and:
 * 1. Classifies each contact as manufacturing ICP or non-ICP
 * 2. Unsubscribes non-ICP contacts from Brevo (so you stop paying for them / they don't dilute metrics)
 * 3. Outputs a clean report
 * 
 * Run: npx tsx scripts/cleanup_non_icp_brevo.ts
 */

import engagementRaw from './engagement_data.json';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;

// ─── ICP Classification ───────────────────────────────────────────────────────
// A contact is ICP if their company domain/subject indicates physical goods manufacturing
const NON_ICP_KEYWORDS = [
  'therapeutics', 'biologic', 'pharma', 'bionics', 'genomics', 
  'medicine', 'discovery', 'biotech', 'clinical', 'rna', 'adar',
  'epirium', 'evofem', 'ensysce', 'avidity', 'inovio', 'axsome',
  'herontx', 'dxtherapeutics', 'primemedicine', 'wildcatdiscovery',
  'bionano', 'adarx', 'betabionics', 'activcareliving', 'absihc',
  'abs-solutions', 'exagen',
];

function isNonICP(email: string, subject: string): boolean {
  const combined = (email + subject).toLowerCase();
  return NON_ICP_KEYWORDS.some(kw => combined.includes(kw));
}

async function unsubscribeContact(email: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailBlacklisted: true }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  if (!BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY not set. Run with: BREVO_API_KEY=your_key npx tsx scripts/cleanup_non_icp_brevo.ts');
    process.exit(1);
  }

  const engagement = engagementRaw as Record<string, any>;
  
  const toUnsubscribe: string[] = [];
  const toKeep: string[] = [];

  for (const [email, data] of Object.entries(engagement)) {
    const subject = data.history?.[0]?.subject || '';
    if (isNonICP(email, subject)) {
      toUnsubscribe.push(email);
    } else {
      toKeep.push(email);
    }
  }

  console.log('\n📊 Classification Results:');
  console.log(`  ✅ ICP (keep): ${toKeep.length}`);
  console.log(`  🗑️  Non-ICP (remove): ${toUnsubscribe.length}`);

  if (toKeep.length > 0) {
    console.log('\n✅ Contacts to KEEP:');
    toKeep.forEach(e => console.log(`   • ${e}`));
  }

  console.log('\n🗑️  Contacts to UNSUBSCRIBE in Brevo:');
  toUnsubscribe.forEach(e => console.log(`   • ${e}`));

  const DRY_RUN = process.argv.includes('--dry-run');
  
  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN — no changes made. Remove --dry-run to execute.');
    return;
  }

  console.log('\n🔄 Unsubscribing non-ICP contacts from Brevo...');
  let success = 0, failed = 0;
  
  for (const email of toUnsubscribe) {
    const ok = await unsubscribeContact(email);
    if (ok) {
      console.log(`  ✅ Unsubscribed: ${email}`);
      success++;
    } else {
      console.log(`  ❌ Failed: ${email}`);
      failed++;
    }
    await new Promise(r => setTimeout(r, 300)); // rate limit
  }

  console.log(`\n✅ Done. Unsubscribed: ${success} | Failed: ${failed}`);
  console.log('\n💡 Next step: Run the monday_manufacturing_followup.ts script to start emailing your real ICP leads.');
}

main().catch(console.error);
