import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

async function check() {
  const envPath = path.join(process.cwd(), '.env.local');
  dotenv.config({ path: envPath });

  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo.ts'));
  
  console.log('--- Brevo Campaigns (Last 100) ---');
  try {
    const res = await brevo.getCampaigns({ limit: 100 });
    if (res && res.campaigns) {
       res.campaigns.forEach((c: any) => {
         console.log(`[${c.id}] ${c.name} - Status: ${c.status} - Scheduled: ${c.scheduledAt || 'N/A'}`);
       });
       const active = res.campaigns.filter((c: any) => ['draft', 'scheduled', 'queued', 'suspended'].includes(c.status));
       console.log(`\nActive/Draft/Scheduled Campaigns Count: ${active.length}`);
    } else {
       console.log('No campaigns found or error:', res);
    }
  } catch (e) {
    console.error('API Error:', e);
  }
}

check();
