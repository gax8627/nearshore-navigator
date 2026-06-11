import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';
import { brevo } from '../../lib/brevo';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CSV_FILE = path.join(process.cwd(), 'segmented_leads/segmented_leads_tier_2.csv');
const PROCESSED_FILE = path.join(process.cwd(), 'scripts/processed_leads.json');
const BATCH_SIZE = 500;

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
  console.log('🚀 Starting GStack Plain-Text Outreach (Anti-Bot)...');

  const processedIds: string[] = fs.existsSync(PROCESSED_FILE) ? JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf-8')) : [];
  
  const content = fs.readFileSync(CSV_FILE, 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });

  const candidates = records.filter((r: any) => !processedIds.includes(r['Lead Id']) && r['Email']);
  const batch = candidates.slice(0, BATCH_SIZE);

  console.log(`Found ${batch.length} unprocessed leads. Scheduling for 8 AM...`);
  
  const scheduledTime = getNext8AM();

  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const email = lead['Email'];
    const firstName = lead['First Name'] || 'there';
    const company = lead['Company'] || 'your company';

    // GSTACK PLAIN-TEXT TEMPLATE (No HTML formatting, no links, soft CTA)
    const subject = `Manufacturing capacity at ${company}`;
    const textContent = `Hi ${firstName},

I was looking into ${company}'s current manufacturing footprint and wanted to reach out directly.

A lot of industrial manufacturers we speak with are getting squeezed by recent supply chain tariffs and rising component costs in Asia. We recently helped a similar company move some of their assembly to a shelter setup in Baja California, cutting labor costs significantly while keeping things in the same timezone and eliminating USMCA duties.

Would you be open to a quick chat to see if moving some of your SKU lines makes mathematical sense for your 2026 roadmap?

Best,
Denisse Martinez
Nearshore Navigator`;

    // To ensure Brevo sends it as plain text and avoids bots, we format it as simple pre-formatted text or paragraphs with no links.
    const htmlContent = `<div style="font-family: sans-serif; font-size: 14px; color: #000;">${textContent.replace(/\n/g, '<br>')}</div>`;

    try {
      if (process.argv.includes('--dry-run')) {
        console.log(`\n[DRY RUN ${i+1}/${batch.length}] To: ${email}\nSubject: ${subject}\n${textContent}\n`);
      } else {
        await brevo.sendEmail({
          sender: { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
          to: [{ email, name: `${firstName} ${lead['Last Name']}` }],
          subject,
          htmlContent,
          scheduledAt: scheduledTime
        });

        processedIds.push(lead['Lead Id']);
        fs.writeFileSync(PROCESSED_FILE, JSON.stringify(processedIds, null, 2));
        console.log(`[${i+1}/${batch.length}] ✅ Scheduled plain-text email for ${email}`);
      }
    } catch (e: any) {
      console.error(`[${i+1}/${batch.length}] ❌ Failed for ${email}: ${e.message}`);
    }

    if (i < batch.length - 1) await sleep(1000);
  }
  
  console.log('✅ GStack outreach scheduling complete.');
}

main().catch(console.error);
