import fs from 'fs';
import path from 'path';
import { brevo } from '../lib/brevo';
import dotenv from 'dotenv';

// Manually load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
    }
  });
}

async function main() {
  const draftsPath = path.join(process.cwd(), 'scripts/manual_drafts.json');
  if (!fs.existsSync(draftsPath)) {
    console.error('Drafts file not found.');
    return;
  }

  const drafts = JSON.parse(fs.readFileSync(draftsPath, 'utf-8'));
  console.log(`🚀 Syncing ${drafts.length} manual drafts to Brevo...`);

  for (const draft of drafts) {
    console.log(`👤 Processing: ${draft.name} (${draft.company})`);
    
    try {
      // 1. Sync Contact
      await brevo.createContact({
        email: draft.email,
        attributes: {
          FNAME: draft.name.split(' ')[0],
          LNAME: draft.name.split(' ').slice(1).join(' '),
          COMPANY: draft.company,
        },
        updateEnabled: true
      });

      // 2. Send Immediately
      console.log(`   🚀 Sending email immediately...`);
      await brevo.sendEmail({
        to: [{ email: draft.email, name: draft.name }],
        subject: draft.subject,
        htmlContent: draft.htmlBody
      });

      console.log(`   ✅ Success! Email sent.`);
      await new Promise(r => setTimeout(r, 1000)); // 1s safety delay
    } catch (err: any) {
      console.error(`   ❌ Failed: ${err?.message || err}`);
    }
  }

  console.log('\n🏁 Manual batch complete.');
}

main().catch(console.error);
