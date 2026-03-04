import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

async function check() {
  const envPath = path.join(process.cwd(), '.env.local');
  dotenv.config({ path: envPath });

  const { brevo } = await import('../lib/brevo');
  
  console.log('--- Brevo Campaigns (Last 10) ---');
  try {
    const res = await brevo.getCampaigns({ limit: 10 });
    if (res && res.campaigns) {
       res.campaigns.forEach((c: any) => {
         console.log(`[${c.id}] ${c.name} - Status: ${c.status} - Scheduled: ${c.scheduledAt || 'N/A'}`);
       });
    } else {
       console.log('No campaigns found or error:', res);
    }
  } catch (e) {
    console.error('API Error:', e);
  }
}

check();
