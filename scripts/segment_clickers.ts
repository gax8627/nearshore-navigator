
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const ENGAGEMENT_FILE = path.join(process.cwd(), 'scripts/engagement_data.json');
const OUT_FILE = path.join(process.cwd(), 'segmented_leads/monday_clickers.json');

// Directories to search for CSVs
const SEARCH_DIRS = [
  path.join(process.cwd(), 'segmented_leads'),
  path.join(process.env.HOME || '', 'Downloads'),
  path.join(process.env.HOME || '', 'Downloads', 'Leads')
];

async function main() {
  const engagement = JSON.parse(fs.readFileSync(ENGAGEMENT_FILE, 'utf-8'));
  
  // 1. Identify Clickers
  const clickerEmails = Object.keys(engagement).filter(email => 
    engagement[email].status === 'clicked'
  );
  
  console.log(`Found ${clickerEmails.length} unique clickers.`);

  // 2. Load ALL CSV records into a big map for lookup
  const emailToRecordMap = new Map();

  for (const dir of SEARCH_DIRS) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));
    
    for (const file of files) {
      try {
        const filePath = path.join(dir, file);
        console.log(`Reading ${filePath}...`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const records = parse(content, { 
            columns: true, 
            skip_empty_lines: true,
            relax_quotes: true,
            trim: true
        });

        for (const record of records as any[]) {
            // Normalize keys (some CSVs have different headers)
            const email = record['Email'] || record['email'] || record['Business Email'];
            if (email) {
                emailToRecordMap.set(email.toLowerCase().trim(), record);
            }
        }
      } catch (e) {
        console.warn(`Failed to parse ${file}:`, e);
      }
    }
  }

  console.log(`Loaded database of ${emailToRecordMap.size} unique emails.`);

  // 3. Hydrate Clickers
  const clickersDetails = clickerEmails.map(email => {
    const record = emailToRecordMap.get(email.toLowerCase().trim());
    
    if (record) {
        // Try to find name/company fields
        const firstName = record['First Name'] || record['FirstName'] || record['first_name'] || '';
        const lastName = record['Last Name'] || record['LastName'] || record['last_name'] || '';
        const company = record['Company'] || record['CompanyName'] || record['company_name'] || '';
        const industry = record['Industry'] || record['industry'] || '';

        return {
            email,
            firstName,
            lastName,
            company,
            industry,
            lastInteraction: engagement[email].last_interaction
        };
    } else {
        return {
             email,
             firstName: 'there', 
             lastName: '', 
             company: 'your company',
             lastInteraction: engagement[email].last_interaction,
             missingDetails: true
        };
    }
  });

  // 4. Save
  fs.writeFileSync(OUT_FILE, JSON.stringify(clickersDetails, null, 2));
  console.log(`✅ Saved ${clickersDetails.length} clickers to ${OUT_FILE}`);
  
  // Log missing
  const missing = clickersDetails.filter(c => c.missingDetails);
  if (missing.length > 0) {
      console.log(`⚠️ Warning: ${missing.length} clickers were not found in any CSVs (missing names).`);
      console.log(missing.map(m => m.email));
  }
}

main();
