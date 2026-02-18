
import fs from 'fs';
import path from 'path';
import { brevo } from '../../lib/brevo';
import { parse } from 'csv-parse/sync';

// Campaign specific config
const CAMPAIGN_NAME = 'CNC_Sheet_Metal_v2_Wave2';
const CSV_FILENAME = 'manufacturing_new_batch.csv';
const BATCH_SIZE = 100; 
const DELAY_SEC = 60; 

// Template
function generateEmail(lead: any) {
  const firstName = lead['First Name'] || 'there';
  const company = lead['Company'] || 'your company';
  const industry = lead['Industry'] || 'manufacturing';

  return {
    subject: `CNC + sheet metal overflow support for ${company}`,
    htmlBody: `
      <p>Hi ${firstName},</p>
      
      <p>I'm reaching out because <strong>${company}</strong> matches the profile of teams that often evaluate contract manufacturing / nearshore production in Mexico—mid-sized U.S. manufacturers in sectors like ${industry} with active needs around CNC machining, sheet metal fabrication, and outsourced production.</p>

      <p>If you're exploring Mexico this year, we help U.S. companies source and launch qualified partners in Baja California (Tijuana/Ensenada/Mexicali) and Monterrey / Nuevo León—typically for:</p>

      <ul>
        <li>CNC machining (lathes/milling), sheet metal, laser cutting, metal stamping, powder coating</li>
        <li>Contract manufacturing programs with ISO 9001-level expectations and DFM support</li>
        <li>Pilot runs → ramp-up → ongoing production, with supplier due diligence and QC checkpoints</li>
      </ul>

      <p>A couple quick questions to point you in the right direction:</p>

      <p>1) Are you currently outsourcing any machining/fabrication or assemblies (or considering it in the next 3–6 months)?</p>
      
      <p>2) If yes, what's the #1 driver—capacity, lead time, cost, supplier risk, or DFM / manufacturability?</p>

      <p>If it's relevant, I can share a short shortlist of Mexico partners that fit your process (CNC vs sheet metal vs mixed) and typical volumes.</p>

      <p>Worth a quick 10–15-minute call next week?</p>

      <p>You can book a time that works for you here: <br/>
      <a href="https://calendly.com/denisse-nearshorenavigator/30min">https://calendly.com/denisse-nearshorenavigator/30min</a></p>

      <p>Best,</p>
      
      <p><strong>Denisse Gastelum</strong><br>
      Lead Advisor | Nearshore Navigator<br>
      +52 (664) 123 7199<br>
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
    console.log(`   Please export your ZoomInfo search to this path.`);
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

  console.log(`Found ${leads.length} new leads to process.`);

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const emailData = generateEmail(lead);
    
    console.log(`[${i+1}/${leads.length}] Sending to ${lead['First Name']} at ${lead['Company']}...`);

    if (process.argv.includes('--dry-run')) {
      console.log(`   Subject: ${emailData.subject}`);
      console.log(`   Preview: ${emailData.htmlBody.substring(0, 100)}...`);
    } else {
      try {
        await brevo.sendEmail({
            to: [{ email: lead['Email'], name: `${lead['First Name']} ${lead['Last Name']}` }],
            subject: emailData.subject,
            htmlContent: emailData.htmlBody
        });
        
        // Mark processed
        processedIds.push(lead['Lead Id'] || lead['Email']);
        fs.writeFileSync(processedPath, JSON.stringify(processedIds, null, 2));
        console.log('   ✅ Sent.');

      } catch (e: any) {
        console.error(`   ❌ Failed: ${e.message}`);
      }
    }

    if (i < leads.length - 1) {
        console.log(`   ⏳ Waiting ${DELAY_SEC}s...`);
        await sleep(DELAY_SEC * 1000);
    }
  }
}

main().catch(console.error);
