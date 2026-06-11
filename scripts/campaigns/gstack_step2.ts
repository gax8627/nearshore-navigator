import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CSV_FILE = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_2.csv');
const PROCESSED_FILE = path.join(process.cwd(), 'scripts/processed_leads.json');

function getNext8AM(): string {
  const target = new Date();
  target.setHours(8, 0, 0, 0);
  if (target.getTime() <= new Date().getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return target.toISOString();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Starting GStack Step 2 (Bump)...');

  const { db } = await import('../../lib/db');
  const { leads } = await import('../../lib/db/schema');
  const { inArray } = await import('drizzle-orm');
  const { brevo } = await import('../../lib/brevo');

  const processedIds: string[] = fs.existsSync(PROCESSED_FILE) ? JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf-8')) : [];
  
  const content = fs.readFileSync(CSV_FILE, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });

  // Get all leads that were processed in Step 1
  const step1Leads = records.filter((r: any) => processedIds.includes(r['Lead Id']) && r['Email']);

  // Get excluded emails from the DB (replied, bounced, unsubscribed)
  const excludedStatuses = ['warm_interest', 'bounced', 'archived'];
  const excludedDbLeads = await db.select().from(leads).where(inArray(leads.status, excludedStatuses));
  const excludedEmails = new Set(excludedDbLeads.map((l: any) => l.email.toLowerCase()));

  // Filter out the excluded emails
  const targetLeads = step1Leads.filter((r: any) => !excludedEmails.has(r['Email'].toLowerCase()));

  console.log(`Found ${step1Leads.length} leads that received Step 1.`);
  console.log(`Excluding ${step1Leads.length - targetLeads.length} leads (replied/bounced).`);
  console.log(`Scheduling Step 2 for ${targetLeads.length} leads at 8 AM...`);
  
  const scheduledTime = getNext8AM();
  const isDryRun = process.argv.includes('--dry-run');

  for (let i = 0; i < targetLeads.length; i++) {
    const lead = targetLeads[i];
    const email = lead['Email'];
    const firstName = lead['First Name'] || 'there';
    const company = lead['Company'] || 'your company';

    // GSTACK STEP 2 TEMPLATE (Bump)
    const subject = `Re: Manufacturing capacity at ${company}`;
    const textContent = `Hi ${firstName},

One quick follow-up: A similar industrial manufacturer we work with just reduced their total landed costs by 24% by eliminating USMCA duties and transitioning assembly to Baja.

Let me know if you want to see the math on how that could work for ${company}.

Best,
Denisse`;

    const htmlContent = `<div style="font-family: sans-serif; font-size: 14px; color: #000;">${textContent.replace(/\n/g, '<br>')}</div>`;

    try {
      if (isDryRun) {
        if (i < 3) {
          console.log(`\n[DRY RUN ${i+1}/${targetLeads.length}] To: ${email}\nSubject: ${subject}\n${textContent}\n`);
        }
      } else {
        await brevo.sendEmail({
          sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
          to: [{ email, name: `${firstName} ${lead['Last Name']}` }],
          subject,
          htmlContent,
          scheduledAt: scheduledTime
        });
        console.log(`[${i+1}/${targetLeads.length}] ✅ Scheduled Step 2 for ${email}`);
      }
    } catch (e: any) {
      console.error(`[${i+1}/${targetLeads.length}] ❌ Failed for ${email}: ${e.message}`);
    }

    if (!isDryRun && i < targetLeads.length - 1) await sleep(1000);
  }
  
  console.log('✅ GStack Step 2 scheduling complete.');
}

main().catch(console.error);
