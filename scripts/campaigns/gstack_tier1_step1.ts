import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CSV_FILE = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_1.csv');
const PROCESSED_FILE = path.join(process.cwd(), 'scripts/processed_leads.json');

function getNextMonday8AM(): string {
  const d = new Date();
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7)); // Next Monday
  d.setHours(8, 0, 0, 0);
  return d.toISOString();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Starting GStack Tier 1 Step 1...');

  const { db } = await import('../../lib/db');
  const { leads } = await import('../../lib/db/schema');
  const { eq } = await import('drizzle-orm');
  const { brevo } = await import('../../lib/brevo');

  let processedIds: string[] = [];
  if (fs.existsSync(PROCESSED_FILE)) {
    processedIds = JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf-8'));
  }

  const content = fs.readFileSync(CSV_FILE, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });

  // Filter out already processed leads and invalid rows
  const unprocessedLeads = records.filter((r: any) => !processedIds.includes(r['Lead Id']) && r['Email']);

  console.log(`Found ${unprocessedLeads.length} unprocessed Tier 1 leads.`);
  
  if (unprocessedLeads.length === 0) {
    console.log('No leads to process. Exiting.');
    return;
  }

  const scheduledTime = getNextMonday8AM();
  console.log(`Scheduling Step 1 for ${unprocessedLeads.length} leads on ${scheduledTime}...`);
  
  const isDryRun = process.argv.includes('--dry-run');
  const newProcessedIds: string[] = [];

  for (let i = 0; i < unprocessedLeads.length; i++) {
    const lead = unprocessedLeads[i];
    const email = lead['Email'];
    const firstName = lead['First Name'] || 'there';
    const company = lead['Company'] || 'your company';

    // GSTACK TIER 1 STEP 1 TEMPLATE
    const subject = `Manufacturing capacity at ${company}`;
    const textContent = `Hi ${firstName},

I was reviewing ${company}'s current manufacturing footprint and wanted to reach out directly.

A lot of the industrial executives we speak with are currently re-evaluating their Asian assembly lines due to rising tariffs and supply chain volatility. We recently helped a similar company move their assembly to a shelter setup in Baja California—keeping operations in the same timezone and entirely eliminating USMCA duties.

Would you be open to a quick chat to see if moving some of your SKU lines makes mathematical sense for your 2026 roadmap?

Best,
Denisse Martinez
Nearshore Navigator`;

    const htmlContent = `<div style="font-family: sans-serif; font-size: 14px; color: #000;">${textContent.replace(/\n/g, '<br>')}</div>`;

    try {
      if (isDryRun) {
        if (i < 3 || i >= unprocessedLeads.length - 2) {
          console.log(`\n[DRY RUN ${i+1}/${unprocessedLeads.length}] To: ${email}\nSubject: ${subject}\n${textContent}\n`);
        }
      } else {
        await brevo.sendEmail({
          sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
          to: [{ email, name: `${firstName} ${lead['Last Name']}` }],
          subject,
          htmlContent,
          scheduledAt: scheduledTime
        });

        // Insert into database if not exists
        const existingLead = await db.select().from(leads).where(eq(leads.email, email));
        if (existingLead.length === 0) {
          await db.insert(leads).values({
            email,
            firstName,
            lastName: lead['Last Name'],
            company,
            title: lead['Title'],
            industry: lead['Industry'],
            status: 'queued',
            tier: 'tier1',
            source: 'brevo_campaign'
          });
        }
        
        console.log(`[${i+1}/${unprocessedLeads.length}] ✅ Scheduled Step 1 for ${email}`);
      }
      newProcessedIds.push(lead['Lead Id']);
    } catch (e: any) {
      console.error(`[${i+1}/${unprocessedLeads.length}] ❌ Failed for ${email}: ${e.message}`);
    }

    if (!isDryRun && i < unprocessedLeads.length - 1) await sleep(1000);
  }
  
  if (!isDryRun) {
    fs.writeFileSync(PROCESSED_FILE, JSON.stringify([...processedIds, ...newProcessedIds], null, 2));
    console.log(`✅ Saved ${newProcessedIds.length} leads to processed_leads.json`);
  }

  console.log('✅ GStack Tier 1 scheduling complete.');
}

main().catch(console.error);
