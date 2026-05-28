import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

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
    process.exit(1);
  }

  const badEmails = new Set(
    JSON.parse(fs.readFileSync(badEmailsFile, 'utf-8')).map((e: string) => e.toLowerCase().trim())
  );
  console.log(`🔍 Loaded ${badEmails.size} bad emails for verification.`);

  const leadsDir = path.join(process.cwd(), 'segmented_leads');
  if (!fs.existsSync(leadsDir)) {
    console.error('❌ segmented_leads directory not found.');
    process.exit(1);
  }

  const files = getAllFiles(leadsDir);
  console.log(`📂 Found ${files.length} files in segmented_leads/ to verify.`);

  let totalFailures = 0;
  const failureDetails: { file: string; badEmails: string[] }[] = [];

  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file);
    const ext = path.extname(file);
    const foundInFile = new Set<string>();

    try {
      if (ext === '.json') {
        const content = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (Array.isArray(content)) {
          content.forEach((item: any) => {
            const leadEmails = getLeadEmailsFromRecord(item);
            leadEmails.forEach(email => {
              if (badEmails.has(email)) {
                foundInFile.add(email);
              }
            });
          });
        } else if (content && typeof content === 'object') {
          // If the file is not an array, check individual properties
          // e.g. key-value map where key or value could be lead emails
          Object.entries(content).forEach(([key, val]: [string, any]) => {
            // check key if it looks like an email and is not internal staff
            const lowerKey = key.trim().toLowerCase();
            if (lowerKey.includes('@') && !lowerKey.includes('owner') && !lowerKey.includes('rep')) {
              if (badEmails.has(lowerKey)) {
                foundInFile.add(lowerKey);
              }
            }
            if (typeof val === 'string' && val.includes('@')) {
              const lowerVal = val.trim().toLowerCase();
              if (badEmails.has(lowerVal)) {
                foundInFile.add(lowerVal);
              }
            }
          });
        }
      } else if (ext === '.csv') {
        const rawContent = fs.readFileSync(file, 'utf-8');
        const records = parse(rawContent, { columns: true, skip_empty_lines: true });
        records.forEach((item: any) => {
          const leadEmails = getLeadEmailsFromRecord(item);
          leadEmails.forEach(email => {
            if (badEmails.has(email)) {
              foundInFile.add(email);
            }
          });
        });
      }

      if (foundInFile.size > 0) {
        totalFailures += foundInFile.size;
        failureDetails.push({
          file: relativePath,
          badEmails: Array.from(foundInFile)
        });
        console.error(`❌ Verification FAILED for ${relativePath}: Found ${foundInFile.size} bad emails:`, Array.from(foundInFile));
      } else {
        console.log(`✅ Verification PASSED for ${relativePath}`);
      }
    } catch (err: any) {
      console.error(`⚠️ Error verifying ${relativePath}: ${err.message}`);
    }
  }

  console.log('\n======================================');
  console.log('Verification Summary:');
  console.log(`Total files scanned: ${files.length}`);
  console.log(`Total bad emails found: ${totalFailures}`);
  
  if (totalFailures === 0) {
    console.log('Status: PASS (No bad emails found in the database!)');
    process.exit(0);
  } else {
    console.log('Status: FAIL (Bad emails found!)');
    process.exit(1);
  }
}

main();
