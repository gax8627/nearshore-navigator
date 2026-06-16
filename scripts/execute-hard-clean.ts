
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

function getLeadEmailsFromRecord(item: any): string[] {
  const emails: string[] = [];
  const keys = Object.keys(item);
  
  // Find keys containing 'email' (case-insensitive) and not containing internal staff terms
  const emailKeys = keys.filter(k => {
    const lk = k.toLowerCase();
    return lk.includes('email') && 
           !lk.includes('owner') && 
           !lk.includes('rep') && 
           !lk.includes('agent') && 
           !lk.includes('user') && 
           !lk.includes('member') && 
           !lk.includes('staff') && 
           !lk.includes('assignee');
  });

  if (emailKeys.length > 0) {
    emailKeys.forEach(k => {
      const val = item[k];
      if (typeof val === 'string' && val.includes('@')) {
        emails.push(val.trim().toLowerCase());
      }
    });
  } else {
    // Fallback: search values for any string with '@' (excluding keys that are internal)
    keys.forEach(k => {
      const lk = k.toLowerCase();
      if (!lk.includes('owner') && 
          !lk.includes('rep') && 
          !lk.includes('agent') && 
          !lk.includes('user') && 
          !lk.includes('member') && 
          !lk.includes('staff') && 
          !lk.includes('assignee')) {
        const val = item[k];
        if (typeof val === 'string' && val.includes('@')) {
          emails.push(val.trim().toLowerCase());
        }
      }
    });
  }
  return [...new Set(emails)];
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.csv') || file.endsWith('.json')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

async function main() {
  const badEmailsFile = path.join(process.cwd(), 'scratch/bad_emails.json');
  if (!fs.existsSync(badEmailsFile)) {
    console.error('❌ bad_emails.json not found. Run get-all-bad-emails.ts first.');
    return;
  }

  const badEmails = new Set(JSON.parse(fs.readFileSync(badEmailsFile, 'utf-8')).map((e: string) => e.toLowerCase().trim()));
  console.log(`🧹 Loaded ${badEmails.size} bad emails for cleaning.`);

  const leadsDir = path.join(process.cwd(), 'segmented_leads');
  const filesToClean = getAllFiles(leadsDir);

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
            const leadEmails = getLeadEmailsFromRecord(item);
            const hasBadEmail = leadEmails.some(email => badEmails.has(email));
            return !hasBadEmail;
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
          const leadEmails = getLeadEmailsFromRecord(item);
          const hasBadEmail = leadEmails.some(email => badEmails.has(email));
          return !hasBadEmail;
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
