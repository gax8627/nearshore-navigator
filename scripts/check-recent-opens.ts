import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo'));
  console.log('🔍 Querying Brevo for all campaign opens from June 15, 2026 to today...');

  try {
    const res = await brevo.getEmailEvents({
      startDate: '2026-06-15',
      endDate: '2026-06-22',
      event: 'opened',
      limit: 1000
    });

    if (res && res.events) {
      console.log(`Found ${res.events.length} total open events:`);
      const openers = new Set<string>();
      res.events.forEach((e: any) => {
        openers.add(e.email.toLowerCase().trim());
      });
      console.log(`\nUnique openers: ${openers.size}`);
      Array.from(openers).forEach(email => console.log(`   * ${email}`));
    } else {
      console.log('No open events found or error:', res);
    }
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
  }
}

main();
