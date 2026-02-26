import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { inngest } from '../../lib/inngest/client';

/**
 * import_manufacturing_leads.ts
 * Parses a given CSV from Downloads and triggers the Inngest AI Prospecting Campaign for Contract Manufacturing.
 * 
 * Usage: npx tsx scripts/campaigns/import_manufacturing_leads.ts /path/to/leads.csv [--dry-run]
 */

async function main() {
  const args = process.argv.slice(2);
  const csvPath = args.find(a => !a.startsWith('--'));
  const isDryRun = args.includes('--dry-run');

  if (!csvPath) {
    console.error("❌ Please provide the path to the CSV file.");
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ File not found: ${csvPath}`);
    process.exit(1);
  }

  console.log(`📄 Reading ${csvPath}...`);
  const fileContent = fs.readFileSync(csvPath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  const validLeads = [];

  for (const row of records as any[]) {
    // Attempt to map standard B2B column names
    const firstName = row['Contact First Name'] || row['First Name'] || row['firstName'] || row['first_name'] || '';
    const lastName = row['Contact Last Name'] || row['Last Name'] || row['lastName'] || row['last_name'] || '';
    const company = row['ï»¿Business'] || row['Business'] || row['Company'] || row['Company Name'] || row['company'] || '';
    const website = row['Website'] || row['Company Website'] || row['website'] || row['Website Address'] || '';
    const email = row['Contact Email'] || row['Email'] || row['Email Address'] || row['email'] || '';

    if (firstName && company) {
       validLeads.push({
         name: `${firstName} ${lastName}`.trim(),
         company: company,
         website: website,
         email: email
       });
    }
  }

  if (validLeads.length === 0) {
    console.log("⚠️ No valid leads found. Check the CSV column headers.");
    process.exit(0);
  }

  const BATCH_SIZE = 25;
  const batch = validLeads.slice(0, BATCH_SIZE);
  
  console.log(`🚀 Queueing batch of ${batch.length} leads for AI Prospecting Agent (Contract Manufacturing)...`);

  if (isDryRun) {
    console.log(`[DRY RUN] Would send event: prospecting/start-campaign`);
    process.exit(0);
  }

  // Trigger Inngest Event with campaignType
  await inngest.send({
    name: 'prospecting/start-campaign',
    data: {
      campaignType: 'manufacturing',
      leads: batch
    }
  });

  console.log(`✅ Success! Event 'prospecting/start-campaign' (Manufacturing) dispatched.`);
}

main().catch(console.error);
