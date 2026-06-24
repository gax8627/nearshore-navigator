import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo'));
  console.log('🔍 Querying Brevo for opened event details from June 15 to today...');

  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const res = await brevo.getEmailEvents({
      startDate: '2026-06-15',
      endDate: todayStr,
      event: 'opened',
      limit: 1000
    });

    if (res && res.events) {
      console.log(`Found ${res.events.length} opened events:`);
      res.events.forEach((e: any) => {
        console.log(` - Email: ${e.email} | Date: ${e.date} | Subject: ${e.subject} | Campaign ID: ${e.campId}`);
      });
    } else {
      console.log('No opened events found.');
    }
  } catch (err: any) {
    console.error('Error:', err.message);
  }
}

main().catch(console.error);
