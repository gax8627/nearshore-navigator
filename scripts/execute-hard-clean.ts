
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

async function main() {
  const badEmailsFile = path.join(process.cwd(), 'scratch/bad_emails.json');
  if (!fs.existsSync(badEmailsFile)) {
    console.error('❌ bad_emails.json not found. Run get-all-bad-emails.ts first.');
    return;
  }

  const badEmails = new Set(JSON.parse(fs.readFileSync(badEmailsFile, 'utf-8')).map((e: string) => e.toLowerCase()));
  console.log(`🧹 Loaded ${badEmails.size} bad emails for cleaning.`);

  const leadsDir = path.join(process.cwd(), 'segmented_leads');
  const filesToClean = [
    path.join(leadsDir, 'feb17/tier1_med_device.json'),
    path.join(leadsDir, 'feb17/tier2_manufacturing.json'),
    path.join(leadsDir, 'segmented_leads_tier_1.csv'),
    path.join(leadsDir, 'segmented_leads_tier_2.csv'),
    path.join(leadsDir, 'segmented_leads_tier_3.csv')
  ];

  // Also find all .csv files in the root of segmented_leads
  const allFiles = fs.readdirSync(leadsDir);
  allFiles.forEach(file => {
    if (file.endsWith('.csv') || file.endsWith('.json')) {
      const fullPath = path.join(leadsDir, file);
      if (!filesToClean.includes(fullPath)) {
        filesToClean.push(fullPath);
      }
    }
  });

  console.log(`📂 Found ${filesToClean.length} potential files to clean.`);

  for (const file of filesToClean) {
    if (!fs.existsSync(file)) continue;

    const ext = path.extname(file);
    console.log(`   Processing ${path.basename(file)}...`);

    try {
      if (ext === '.json') {
        const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
          const originalCount = content.length;
          const cleaned = content.filter((item: any) => {
            const email = item.email || item.Email || item['Email Address'];
            return email && !badEmails.has(email.toLowerCase());
          });
          if (originalCount !== cleaned.length) {
            fs.writeFileSync(file, JSON.stringify(cleaned, null, 2));
            console.log(`      ✅ Cleaned ${originalCount - cleaned.length} emails from JSON.`);
          } else {
            console.log(`      ℹ️ No bad emails found in this JSON.`);
          }
        }
      } else if (ext === '.csv') {
        const rawContent = fs.readFileSync(file, 'utf-8');
        const records = parse(rawContent, { columns: true, skip_empty_lines: true });
        const originalCount = records.length;
        
        const cleaned = records.filter((item: any) => {
          const email = item.email || item.Email || item['Email Address'] || Object.values(item).find(v => typeof v === 'string' && v.includes('@'));
          return email && !badEmails.has(email.toString().toLowerCase());
        });

        if (originalCount !== cleaned.length) {
          const output = stringify(cleaned, { header: true });
          fs.writeFileSync(file, output);
          console.log(`      ✅ Cleaned ${originalCount - cleaned.length} emails from CSV.`);
        } else {
          console.log(`      ℹ️ No bad emails found in this CSV.`);
        }
      }
    } catch (err: any) {
      console.error(`      ❌ Error processing ${path.basename(file)}: ${err.message}`);
    }
  }

  console.log('\n✨ Hard clean complete. Database is now synchronized with Brevo suppression lists.');
}

main();
