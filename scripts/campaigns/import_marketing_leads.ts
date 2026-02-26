import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { inngest } from '../../lib/inngest/client';

/**
 * import_marketing_leads.ts
 * Parses a given CSV from Downloads and triggers the Inngest AI Prospecting Campaign.
 * 
 * Usage: npx tsx scripts/campaigns/import_marketing_leads.ts /path/to/leads.csv [--dry-run]
 */

async function main() {
  const args = process.argv.slice(2);
  const csvPath = args.find(a => !a.startsWith('--'));
  const isDryRun = args.includes('--dry-run');

  if (!csvPath) {
    console.error("❌ Please provide the path to the CSV file.");
    console.error("Usage: npx tsx scripts/campaigns/import_marketing_leads.ts /Users/gax8627/Downloads/Leads/Machine-shop-Austin-TX-Companies.csv");
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ File not found: ${csvPath}`);
    process.exit(1);
  }

  console.log(`📄 Reading ${csvPath}...`);
  const fileContent = fs.readFileSync(csvPath, 'utf8');
  
  // Parse CSV
  // Assuming standard Apollo/ZoomInfo export structure, but we will guess column names 
  // typical columns: "First Name", "Last Name", "Company", "Website"
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  console.log(`✅ Parsed ${records.length} total rows.`);

  const validLeads = [];

  for (const row of records as any[]) {
    // Attempt to map standard B2B column names
    const firstName = row['Contact First Name'] || row['First Name'] || row['firstName'] || row['first_name'] || '';
    const lastName = row['Contact Last Name'] || row['Last Name'] || row['lastName'] || row['last_name'] || '';
    const company = row['ï»¿Business'] || row['Business'] || row['Company'] || row['Company Name'] || row['company'] || '';
    const website = row['Website'] || row['Company Website'] || row['website'] || row['Website Address'] || '';
    const email = row['Contact Email'] || row['Email'] || row['Email Address'] || row['email'] || '';

    // We only strictly need a first name and a company
    // For prospecting, we'll construct the 'name' field for the agent
    if (firstName && company) {
       validLeads.push({
         name: `${firstName} ${lastName}`.trim(),
         company: company,
         website: website,
         email: email
       });
    }
  }

  console.log(`🎯 Found ${validLeads.length} parseable leads with Name + Company.`);

  if (validLeads.length === 0) {
    console.log("⚠️ No valid leads found. Check the CSV column headers (expected 'First Name', 'Company').");
    console.log("Sample row:", records[0]);
    process.exit(0);
  }

  // Take the first 50 leads to avoid overloading Tavily/Gemini limits
  const BATCH_SIZE = 25;
  const batch = validLeads.slice(0, BATCH_SIZE);
  
  console.log(`🚀 Queueing batch of ${batch.length} leads for AI Prospecting Agent...`);

  if (isDryRun) {
    console.log(`[DRY RUN] Would send event: prospecting/start-campaign`);
    console.log(`[DRY RUN] Leads array sample:`, batch.slice(0, 2));
    process.exit(0);
  }

  // Trigger Inngest Event
  await inngest.send({
    name: 'prospecting/start-campaign',
    data: {
      leads: batch
    }
  });

  console.log(`✅ Success! Event 'prospecting/start-campaign' dispatched to Inngest for ${batch.length} leads.`);
  console.log(`Make sure 'npx inngest dev' is running to process them.`);
}

main().catch(console.error);
