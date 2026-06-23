import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const { brevo } = await import(path.join(process.cwd(), 'lib/brevo'));
  console.log('🔍 Querying Brevo for SMTP events (clicks, unsubscribes, complaints) from June 15 to today...');

  const events = ['clicks', 'unsubscribed', 'spam', 'bounces'];
  
  for (const eventType of events) {
    try {
      const res = await brevo.getEmailEvents({
        startDate: '2026-06-15',
        endDate: '2026-06-23',
        event: eventType as any,
        limit: 1000
      });

      if (res && res.events && res.events.length > 0) {
        console.log(`\n📬 Event: ${eventType} (Total: ${res.events.length})`);
        const uniqueEmails = new Set<string>();
        res.events.forEach((e: any) => {
          uniqueEmails.add(e.email.toLowerCase().trim());
        });
        console.log(`Unique contacts: ${uniqueEmails.size}`);
        Array.from(uniqueEmails).forEach(email => {
          const detail = res.events.find((e: any) => e.email.toLowerCase().trim() === email);
          console.log(`   * ${email} | Date: ${detail?.date} | Details: ${JSON.stringify(detail?.tags || detail?.subject || '')}`);
        });
      } else {
        console.log(`\nℹ️ Event: ${eventType} - None found`);
      }
    } catch (err: any) {
      console.error(`Error fetching ${eventType}:`, err.message);
    }
  }
}

main().catch(console.error);
