import dotenv from 'dotenv';
import path from 'path';

// Load env FIRST
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import('../lib/brevo');

  console.log('--- Detailed Campaign Stats ---');
  try {
    const res = await brevo.getCampaigns({ limit: 10 });
    if (res && res.campaigns) {
       for (const c of res.campaigns) {
         if (c.scheduledAt && c.scheduledAt.includes('2026-07-')) {
           console.log(`\nCampaign: ${c.name} [ID: ${c.id}]`);
           console.log(`Status: ${c.status}`);
           console.log(`Sent: ${c.sentValue || 0}`);
           console.log(`Statistics:`, JSON.stringify(c.statistics || {}, null, 2));
         }
       }
    }
  } catch (e) {
    console.error('API Error:', e);
  }
}

main();
