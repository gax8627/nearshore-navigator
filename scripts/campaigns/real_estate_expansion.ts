
import fs from 'fs';
import path from 'path';
import { brevo } from '../../lib/brevo';
import { parse } from 'csv-parse/sync';

// Campaign specific config
const CAMPAIGN_NAME = 'Real_Estate_Expansion_v1_Wave2';
const CSV_FILENAME = 'medical_new_batch.csv';
const BATCH_SIZE = 100;
const DELAY_SEC = 60; 

// Template
function generateEmail(lead: any) {
  const firstName = lead['First Name'] || 'there';
  const company = lead['Company'] || 'your company';
  const industry = lead['Industry'] || 'manufacturing';

  return {
    subject: `Class A Industrial Space in Baja / Monterrey for ${company}`,
    htmlBody: `
      <p>Hi ${firstName},</p>
      
      <p>I'm reaching out because <strong>${company}</strong> is in the ${industry} space—a sector we're seeing aggressive expansion for in Mexico right now.</p>

      <p>If you're currently evaluating relocation or additional warehouse/production capacity, Nearshore Navigator provides direct access to prime <strong>Class A Industrial inventory</strong> in Baja California (Tijuana/Mexicali) and Monterrey.</p>

      <p>We specifically help US companies with:</p>
      <ul>
        <li>Class A & Build-to-Suit (BTS) facilities (24' - 36' clear heights)</li>
        <li>Navigating tax/legal frameworks for foreign property acquisition</li>
        <li>Strategic site selection near Otay Mesa or Santa Teresa border crossings</li>
      </ul>

      <p>Are you exploring Mexico for a 2026 expansion, or just monitoring the space availability right now?</p>

      <p>I'd be happy to share a current inventory map for the Baja region if that's helpful.</p>
      
      <p>Worth a 10-minute intro call?</p>

      <p>You can book a time that works for you here: <br/>
      <a href="https://calendly.com/denisse-nearshorenavigator/30min">https://calendly.com/denisse-nearshorenavigator/30min</a></p>

      <p>Best,</p>
      
      <p><strong>Denisse Gastelum</strong><br>
      Lead Advisor | Nearshore Navigator<br>
      denisse@nearshorenavigator.com</p>
    `
  };
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log(`🚀 Starting Campaign: ${CAMPAIGN_NAME}`);
  
  const csvPath = path.join(process.cwd(), 'segmented_leads', CSV_FILENAME);
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Data file not found: ${csvPath}`);
    return;
  }

  const processedPath = path.join(process.cwd(), 'scripts', 'processed_leads.json');
  let processedIds: string[] = [];
  if (fs.existsSync(processedPath)) {
    processedIds = JSON.parse(fs.readFileSync(processedPath, 'utf-8'));
  }

  const records = parse(fs.readFileSync(csvPath, 'utf-8'), { 
    columns: true, 
    skip_empty_lines: true,
    trim: true 
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const leads = (records as any[])
    .filter((r: any) => {
      const email = r['Lead Id'] || r['Email'];
      const isValidEmail = email && emailRegex.test(email);
      const hasCompany = r['Company'] && r['Company'] !== 'your company';
      const isNew = !processedIds.includes(email);
      return isValidEmail && hasCompany && isNew;
    })
    .slice(0, BATCH_SIZE);

  console.log(`Found ${leads.length} new leads for Real Estate focus.`);

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const emailData = generateEmail(lead);
    
    console.log(`[${i+1}/${leads.length}] Sending to ${lead['First Name']} at ${lead['Company']}...`);

    if (process.argv.includes('--dry-run')) {
      console.log(`   Subject: ${emailData.subject}`);
    } else {
      try {
        await brevo.sendEmail({
            to: [{ email: lead['Email'], name: `${lead['First Name']} ${lead['Last Name']}` }],
            subject: emailData.subject,
            htmlContent: emailData.htmlBody
        });
        
        processedIds.push(lead['Lead Id'] || lead['Email']);
        fs.writeFileSync(processedPath, JSON.stringify(processedIds, null, 2));
        console.log('   ✅ Sent.');

      } catch (e: any) {
        console.error(`   ❌ Failed: ${e.message}`);
      }
    }

    if (i < leads.length - 1) {
        await sleep(DELAY_SEC * 1000);
    }
  }
}

main().catch(console.error);
