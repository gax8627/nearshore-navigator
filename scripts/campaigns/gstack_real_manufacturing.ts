import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CSV_FILE = path.join(process.cwd(), 'segmented_leads/clean_manufacturers_master.csv');
const PROCESSED_FILE = path.join(process.cwd(), 'scripts/processed_leads.json');

function getScheduledTime(index: number): string {
  const batchIndex = Math.floor(index / 100);
  const d = new Date();
  // Schedule batches starting tomorrow (June 11, 2026), 100 leads per day
  d.setDate(d.getDate() + 1 + batchIndex);
  d.setHours(8, 0, 0, 0);
  return d.toISOString();
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Starting GStack Real Manufacturing Campaign...');

  const { db } = await import('../../lib/db');
  const { leads } = await import('../../lib/db/schema');
  const { eq } = await import('drizzle-orm');
  const { brevo } = await import('../../lib/brevo');

  let processedIds: string[] = [];
  if (fs.existsSync(PROCESSED_FILE)) {
    processedIds = JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf-8'));
  }

  if (!fs.existsSync(CSV_FILE)) {
    console.error(`❌ CSV File not found at ${CSV_FILE}`);
    return;
  }

  const content = fs.readFileSync(CSV_FILE, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });

  // Filter out already processed leads and invalid rows
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const unprocessedLeads = records.filter((r: any) => {
    const leadId = r['Lead Id'] || r['Email'];
    return !processedIds.includes(leadId) && r['Email'] && emailRegex.test(r['Email']);
  });

  console.log(`Found ${unprocessedLeads.length} unprocessed physical manufacturing leads.`);
  
  if (unprocessedLeads.length === 0) {
    console.log('No leads to process. Exiting.');
    return;
  }

  const isDryRun = process.argv.includes('--dry-run');
  const newProcessedIds: string[] = [];

  for (let i = 0; i < unprocessedLeads.length; i++) {
    const lead = unprocessedLeads[i];
    const leadId = lead['Lead Id'] || lead['Email'];
    const email = lead['Email'];
    const rawFirstName = lead['First Name'] || 'there';
    const firstName = rawFirstName === 'there' ? 'there' : rawFirstName;
    const lastName = lead['Last Name'] || '';
    const company = lead['Company'] || 'your company';
    const fullName = firstName === 'there' ? 'Prospect' : `${firstName} ${lastName}`.trim();

    // GSTACK MANUFACTURING SEQUENCE: STEP 1
    const subject = `Manufacturing capacity at ${company}`;
    const textContent = `Hi ${firstName},
Internal operations and logistics leaders are having a tough time with Asian assembly lines lately. Tariffs, freight volatility, and long transit cycles are forcing a lot of reassessments.
We recently helped a similar manufacturing team transition some of their SKU lines to a shelter setup in Baja California—keeping operations in the same timezone and entirely avoiding USMCA import duties.
Would you be open to a quick chat to see if moving some of your SKU lines makes mathematical sense for your 2026 roadmap?
Best,
Denisse Martinez
Nearshore Navigator`;

    const htmlContent = `<div style="font-family: sans-serif; font-size: 14px; color: #000; line-height: 1.5;">${textContent.replace(/\n/g, '<br>')}</div>`;
    const scheduledTime = getScheduledTime(i);

    try {
      if (isDryRun) {
        if (i < 3 || i >= unprocessedLeads.length - 2) {
          console.log(`\n[DRY RUN ${i+1}/${unprocessedLeads.length}] To: ${email} | Scheduled: ${scheduledTime}\nSubject: ${subject}\n${textContent}\n`);
        }
      } else {
        await brevo.sendEmail({
          sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
          to: [{ email, name: fullName }],
          subject,
          htmlContent,
          scheduledAt: scheduledTime
        });

        // Safe DB insert using schema fields: name, email, company, source, status, tags
        const existingLead = await db.select().from(leads).where(eq(leads.email, email));
        if (existingLead.length === 0) {
          await db.insert(leads).values({
            name: fullName,
            email,
            company,
            phone: lead['Phone'] || '',
            status: 'queued',
            source: 'brevo_campaign',
            tags: JSON.stringify(['REAL_MANUFACTURING', 'STEP_1_SCHEDULED'])
          });
        } else {
          await db.update(leads)
            .set({ 
              status: 'queued', 
              tags: JSON.stringify(['REAL_MANUFACTURING', 'STEP_1_SCHEDULED']) 
            })
            .where(eq(leads.email, email));
        }
        
        console.log(`[${i+1}/${unprocessedLeads.length}] ✅ Scheduled for ${email} on ${scheduledTime}`);
      }
      newProcessedIds.push(leadId);
    } catch (e: any) {
      console.error(`[${i+1}/${unprocessedLeads.length}] ❌ Failed for ${email}: ${e.message}`);
    }

    if (!isDryRun && i < unprocessedLeads.length - 1) await sleep(200); // 5 emails per second
  }
  
  if (!isDryRun) {
    fs.writeFileSync(PROCESSED_FILE, JSON.stringify([...processedIds, ...newProcessedIds], null, 2));
    console.log(`✅ Saved ${newProcessedIds.length} leads to processed_leads.json`);
  }

  console.log('✅ Real Manufacturing Campaign scheduling complete.');
}

main().catch(console.error);
